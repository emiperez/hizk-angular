import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RestService } from '../service/rest.service';

import { Term } from '../model/term';
import { Translation } from '../model/translation';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.sass']
})

export class TranslationsComponent implements OnInit {

	@ViewChild('level') levelSelect: ElementRef;
	levels:any = [];
	translations:any = [];
	public translation: Translation;

	public origin = new Term(null, 'de', '');
	public meaning = new Term(null, 'es', '');

	constructor(public rest:RestService) {
	}

	ngOnInit(): void {
		this.listLevels();
		this.translation = new Translation(this.origin, this.meaning, "A1");
		this.listLatestTranslations();
	}

	public ngAfterViewInit(): void {
		this.levelSelect.nativeElement.focus();
 	}

	listLevels() {
		this.levels = [];
		this.rest.list('translations/levels').subscribe((data: {}) => {
			this.levels = data;
			this.levels.reverse();
		});
	}

	listLatestTranslations() {
		this.rest.list('translations').subscribe((data: {}) => {
			this.translations = data;
		});
	}

	addTranslation() {
		this.rest.addTranslation(this.translation).subscribe((result) => {
			this.translations.unshift(result);
			console.log("ADD TRANSLATION: " + JSON.stringify(result));
			this.resetTranslation();
		}, (err) => {
			console.log(err);
		});
	}

	deleteTranslation(translation) {
		this.rest.deleteTranslation(translation).subscribe(res => {
			console.log("DELETE TRANSLATION: " + JSON.stringify(translation));
			this.translations.splice(this.translations.indexOf(translation, 0), 1);
		}, (err) => {
			console.log(err);
		});
	}

	resetTranslation() {
		this.origin.id = null;
		this.meaning.id = null;
		this.origin.text = '';
		this.meaning.text = '';
		this.levelSelect.nativeElement.focus();
	}

	editTerm(term) {
		this.rest.updateTerm(term).subscribe((result) => {
		console.log("TERM EDITED: + " + JSON.stringify(term));
		}, (err) => {
			console.log(err);
		});
	}
}
