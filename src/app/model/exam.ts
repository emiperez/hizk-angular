import{ Term } from './term';
 
export class Exam {

	constructor(public id: number, 
			public when: Date, 
			public level: String,
			public questionLocale: string,
			public answerLocale: string,
			public caseSensitive: boolean = true,
			public latest: number,
			public numberOfQuestions: number,
			public questions: Term[] = null) {}
}
