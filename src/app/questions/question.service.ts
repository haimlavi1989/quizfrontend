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

  checkAnswer(qustionId: number, userAnswer: string, answerPosition: number) {
    let questionArray = this.questions.filter( item => item.id === qustionId );
    if (questionArray[0].correct_answer === userAnswer 
      && questionArray[0].shuffle_answers[answerPosition]) {
      return true;
    }
    return false;
  }

  getNumberOfQuestions() { 
    return this.questions?.length;
  }

}
