import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Question } from '../../question.model';
import { PlayQuestionService } from '../../../share/services/play-questions.service';
import { Answer } from '../../../share/answer.model';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-questions-item',
  templateUrl: './questions-item.component.html',
  styleUrls: ['./questions-item.component.css']
})

export class QuestionsItemComponent implements OnInit, OnDestroy {
  
  // key: answerNumber;  value: -1 => noAnswer, 1 => correct, 0 => incorrect, 2 => lockAnswer 
  userAnswersStatus: number[] = [-1, -1, -1, -1]; // we know there is 4 
  private subscriptionPlayQuestion: Subscription;

  @Output() answer = new EventEmitter<string>();
  @Input() question: Question;
  
  constructor(
    private playQuestionService: PlayQuestionService
  ) { 
  }

  ngOnInit(): void {
    this.restQuestionView();
  }

  restQuestionView() {
    this.subscriptionPlayQuestion = this.playQuestionService.restPlayRequset.subscribe( status => {
      this.userAnswersStatus = [-1, -1, -1, -1];
    })
  }

  checkAnswer(userAnswer: string, answerPosition: number) {
    const qustionId: number = this.question.id;
    this.userAnswersStatus = this.playQuestionService.checkUserAnswerAttempt(
      qustionId, 
      userAnswer, 
      answerPosition, 
      this.userAnswersStatus.slice())
  }

  lockQuestions(ignoreAnswerCell: number) {
    for (let i=0; i< this.userAnswersStatus.length; i++) {
      if (this.userAnswersStatus[i] !== ignoreAnswerCell ) {
        this.userAnswersStatus[i] = 2; // lock rest of Answers
      }
    }
  }

  ngOnDestroy() {
    this.subscriptionPlayQuestion.unsubscribe();
  } 

}
