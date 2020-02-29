export class Exam {

	constructor(public id: number, 
			public when: Date, 
			public questionLocale: string,
			public answerLocale: string,
			public caseSensitive: boolean = true,
			public numberOfQuestions: number) {}
}
