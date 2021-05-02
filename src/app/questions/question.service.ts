import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public questionsChanged = new Subject<Question[]>();
  private questions: Question[];

  constructor() {}

  getQuestions() {
    return this.questions?.slice();
  }

  setQuestions(questions: Question[]) {
    this.questions = questions;
    this.questionsChanged.next(this.questions?.slice());
  }

  getNumberOfQuestions() { 
    return this.questions?.length;
  }

}
