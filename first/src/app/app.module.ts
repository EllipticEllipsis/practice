import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreditsComponent } from "./credits/credits.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingleQuestionComponent } from './single-question/single-question.component';
import { PaperComponent } from './paper/paper.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HomeComponent,
    SingleQuestionComponent,
    PageNotFoundComponent,
    HttpClientModule,
    CreditsComponent,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'credits', component: CreditsComponent },
      { path: 'question/:id', component: SingleQuestionComponent },
      { path: 'paper/:part/:year/:paper', component: PaperComponent },
      { path: '**', component: PageNotFoundComponent }
    ])
  ]
})
export class AppModule { }
