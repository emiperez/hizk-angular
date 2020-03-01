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
                }, (err) => {
                        console.log(err);
                });
        }
}
