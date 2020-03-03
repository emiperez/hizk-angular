import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RestService } from '../service/rest.service';
import { Exam } from '../model/exam';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.sass']
})

export class ExamComponent implements OnInit {

	locales:any = []; //TODO: move to Globals
	public exam: Exam;
	public correctAnswers: number;
	public wrongAnswers: number;

        constructor(public rest:RestService) {
        }

  ngOnInit(): void {
	this.listLocales();
	this.exam = new Exam(null, null, "es", "de", true, 20);
  }

        listLocales() {
                this.rest.list('terms/locales').subscribe((data: {}) => {
                        this.locales = data;
                });
        }
	
	restLocales(locale) {
		return this.locales.filter(function(element: string): boolean {
				return element !== locale;
			});
	}

        startExam() {
                this.rest.addExam(this.exam).subscribe((result) => {
                        console.log("START EXAM:" + JSON.stringify(result));
			this.exam = result;
			this.correctAnswers = 0;
			this.wrongAnswers = 0;
                }, (err) => {
                        console.log(err);
                });
        }

	onKeyEnter(event: KeyboardEvent) {
		var inputElement = event.target as HTMLInputElement;
		inputElement.disabled = true;
		this.rest.check('exams/' + this.exam.id + '/' + inputElement.id + '/' + inputElement.value).subscribe((response) => {
			console.log('CHECK STATUS: ' + response.status);
			if (response.status == 204) {
				inputElement.style.color = 'green';
				++this.correctAnswers;
			}
		}, (error) => {
			console.log(error.status + ' - ' + error.message);
			if (error.status == 404) {
				inputElement.style.color = 'red';
				++this.wrongAnswers;
			}
		});
	}
}
