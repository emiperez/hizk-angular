import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8080/';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':  'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class RestService {

	constructor(private http: HttpClient) { }

	private extractData(res: Response) {
		  let body = res;
		  return body || { };
	}

	updateTerm(term): Observable<any> {
		return this.http.put(endpoint + 'terms/' + term.id, JSON.stringify(term), httpOptions).pipe(
			tap(_ => console.log(`updated term = ${term.locale}- ${term.text}`)),
			catchError(this.handleError<any>('updateTerm'))
		);
	}

	list(what: string): Observable<any> {
		console.log('WHAT: ' + what);
		what = what.replace(/[^a-z\-\/]/gi, '-').replace(/^\-+/g, '').replace(/\-+$/g,'').trim();
		console.log('WHAT2: ' + what);
		if(what && what.length > 0) {
			return this.http.get(endpoint + what).pipe(
				map(this.extractData));
		}
		return null;
	}	
	
	addTranslation(translation): Observable<any> {
		console.log(translation);
		return this.http.post<any>(endpoint + 'translations', JSON.stringify(translation), httpOptions).pipe(
			tap((translation) => console.log(`added translation=${translation.origin.text} - ${translation.meaning.text}`)),
			catchError(this.handleError<any>('addTranslation'))
		);
	}

	deleteTranslation(translation): Observable<any> {
		let uri = endpoint + 'translations/' + translation.origin.id + '/' + translation.meaning.id;
		console.log("DELETE URI: " + uri);
		return this.http.delete<any>(uri , httpOptions).pipe(
			tap(_ => console.log(`deleted translation=${translation.origin.text} - ${translation.meaning.text}`)),
			catchError(this.handleError<any>('deleteTranslation'))
  		);
	}

	addExam(exam): Observable<any> {
		console.log(exam);
		return this.http.post<any>(endpoint + 'exam', JSON.stringify(exam), httpOptions).pipe(
			tap((exam) => console.log(`added exam=${exam.id}`)),
			catchError(this.handleError<any>('addExam'))
		);
	}

	private handleError<T> (operation = 'operation', result?: T) {
		  return (error: any): Observable<T> => {
			  console.error(error);
			  return of(result as T);
		  }
	};
}

