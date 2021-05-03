import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../../questions/question.model';
import { environment } from '../../../environments/environment';
import { BackendQuestionService } from './backend-question.service';
import { Answer } from '../answer.model'
 import { QuestionService } from '../../questions/question.service';

@Injectable({ providedIn: 'root' })

export class PlayQuestionService {

  private readonly maxwrongAnswersAmount: number = 3;
  public questionAnswerAdded = new Subject<Answer[]>();
  public restPlayRequset = new Subject<boolean>();
  private answers: Answer[] = [];

  constructor(
    private BackendQuestionService: BackendQuestionService,
    private questionService: QuestionService
  ) {}

  addAnswer(answers: Answer) {
    this.answers.push(answers);
    this.questionAnswerAdded.next(this.answers?.slice());
  }

   //  userAnswersStatus: number[] - represent each quiz question status
  // key: answerNumber;  value: -1 => noAnswer, 1 => correct, 0 => incorrect, 2 => lockAnswer
  checkUserAnswerAttempt(qustionId: number, userAnswer: string, answerPosition: number, userAnswersStatus: number[]) {
    userAnswersStatus = userAnswersStatus.slice();
    console.log(this.userAnswerAmount(userAnswersStatus));
    if ( this.userAnswerAmount(userAnswersStatus) > this.maxwrongAnswersAmount) { // ensure no extra attempt
     return userAnswersStatus;
    }

    let chekAnswer: boolean = this.questionService.checkAnswer(qustionId, userAnswer, answerPosition);
    if ( chekAnswer ) {
        console.log(true);
        userAnswersStatus[answerPosition] = 1; // mark as correct
        this.lockQuestions(1, userAnswersStatus);
        this.addAnswer(new Answer(qustionId, "correct"))
        return userAnswersStatus;
     } else if ( this.userAnswerAmount(userAnswersStatus) === this.maxwrongAnswersAmount) {
         console.log("max");
         userAnswersStatus[answerPosition] = 0; // mark as incorrect
         this.lockQuestions(0, userAnswersStatus);
         this.addAnswer(new Answer(qustionId, "incorrect"))
         return userAnswersStatus;
     } else {
         console.log(false);
         userAnswersStatus[answerPosition] = 0; // mark as incorrect
     }
     return userAnswersStatus;
 }

 lockQuestions(ignoreAnswerCell: number, userAnswersStatus: number[]) {
   for (let i=0; i< userAnswersStatus.length; i++) {
     if (userAnswersStatus[i] !== ignoreAnswerCell ) {
       userAnswersStatus[i] = 2; // lock rest of Answers
     }
   }
 }

 userAnswerAmount(userAnswersStatus: number[]) {
   return userAnswersStatus.filter( item => item === 0).length +1;
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
