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
	this.exam = new Exam(null, null, "es", "de", true, 10);
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
		this.exam.id = null;
                this.rest.addExam(this.exam).subscribe((result) => {
                        console.log("START EXAM:" + JSON.stringify(result));
			this.exam = result;
			this.correctAnswers = 0;
			this.wrongAnswers = 0;
                }, (err) => {
                        console.log(err);
                });
        }

	changeAnswer(event: KeyboardEvent) {
		var inputElement = event.target as HTMLInputElement;
		let correctAnswers:any = [];
		this.rest.list('exams/' + this.exam.id + '/' + inputElement.id ).subscribe((result) => {
			console.log('CORRECT ANSWERS: ' + result);
			correctAnswers = result;
			if (correctAnswers.includes(inputElement.value)) {
				inputElement.style.color = 'green';
				++this.correctAnswers;
			} else {
				inputElement.value = correctAnswers[0];
				inputElement.style.color = "red";
				++this.wrongAnswers;
			}
		}, (error) => {
			console.log(error.status + ' - ' + error.message);
		});
	}
}
