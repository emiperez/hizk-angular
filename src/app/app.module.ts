import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslationsComponent } from './translations/translations.component';
import { ExamComponent } from './exam/exam.component';

@NgModule({
  declarations: [
    AppComponent,
    TranslationsComponent,
    ExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
