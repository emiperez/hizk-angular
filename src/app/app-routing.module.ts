import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslationsComponent } from './translations/translations.component';
import { ExamComponent } from './exam/exam.component';


const routes: Routes = [
	{path: "", component: TranslationsComponent },
	{path: "exam", component: ExamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
