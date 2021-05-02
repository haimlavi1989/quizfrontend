import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../../questions/question.model';
import { environment } from '../../../environments/environment';
import { Answer } from '../answer.model'

@Injectable({ providedIn: 'root' })

export class PlayQuestionService {

  public questionAnswerAdded = new Subject<Answer[]>();
  public restPlayRequset = new Subject<boolean>();
  private answers: Answer[] = [];

  constructor(
  ) {}

  addAnswer(answers: Answer) {
    this.answers.push(answers);
    this.questionAnswerAdded.next(this.answers?.slice());
  }

  handleRestPlay() {
    this.answers = [];
    this.restPlayRequset.next(true);
    this.questionAnswerAdded.next(this.answers?.slice());
  }

  getAnswers() {
    return this.answers?.slice()
  }

}
