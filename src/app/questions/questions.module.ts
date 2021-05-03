import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsItemComponent } from './questions-list/questions-item/questions-item.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { PrimeModule } from './../share/prime.module';
import { ResultsComponent } from './results/results.component'
import { LoadingSpinnerComponent } from '../share/componenets/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionsListComponent,
    QuestionsItemComponent,
    ResultsComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    PrimeModule
  ]
})
export class QuestionsModule { }
