import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../../questions/question.model';
import { environment } from '../../../environments/environment';
import { BackendQuestionService } from './backend-question.service';
import { Answer } from '../answer.model'

@Injectable({ providedIn: 'root' })

export class PlayQuestionService {

  public questionAnswerAdded = new Subject<Answer[]>();
  public restPlayRequset = new Subject<boolean>();
  private answers: Answer[] = [];

  constructor(
    private BackendQuestionService: BackendQuestionService
  ) {}

  addAnswer(answers: Answer) {
    this.answers.push(answers);
    this.questionAnswerAdded.next(this.answers?.slice());
  }

  handleRestPlay() {
    this.answers = [];
    this.restPlayRequset.next(true);
    this.questionAnswerAdded.next(this.answers?.slice());
    this.BackendQuestionService.fetchQuestions().subscribe();
  }

  getAnswers() {
    return this.answers?.slice()
  }

}
