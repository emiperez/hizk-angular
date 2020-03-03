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


	list(what: string): Observable<any> {
		console.log('list WHAT: ' + what);
		what = this.sanitize(what);
		console.log('sanitized WHAT: ' + what);
		if(what && what.length > 0) {
			return this.http.get(endpoint + what).pipe(
				map(this.extractData));
		}
		return null;
	}	

	check(what: string): Observable<any> {
		console.log('check WHAT: ' + what);
		return this.http.get(endpoint + what, {observe: 'response'});
	}
		
	
	addTranslation(translation): Observable<any> {
		console.log(translation);
		return this.http.post<any>(endpoint + 'translations', JSON.stringify(translation), httpOptions).pipe(
			tap((translation) => console.log(`added translation=${translation.origin.text} - ${translation.meaning.text}`)),
			catchError(this.handleError<any>('addTranslation'))
		);
	}

	addExam(exam): Observable<any> {
		console.log(exam);
		return this.http.post<any>(endpoint + 'exams', JSON.stringify(exam), httpOptions).pipe(
			tap((exam) => console.log(`added exam=${exam.id}`)),
			catchError(this.handleError<any>('addExam'))
		);
	}

	updateTerm(term): Observable<any> {
		return this.http.put(endpoint + 'terms/', JSON.stringify(term), httpOptions).pipe(
			tap(_ => console.log(`updated term = ${term.locale}- ${term.text}`)),
			catchError(this.handleError<any>('updateTerm'))
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

	private handleError<T> (operation = 'operation', result?: T) {
		  return (error: any): Observable<T> => {
			  console.error(error);
			  return of(result as T);
		  }
	};

	private sanitize(requestPath): string {
		return requestPath.replace(/[^a-z\-\/]/gi, '-').replace(/^\-+/g, '').replace(/\-+$/g,'').trim();
	}
}

