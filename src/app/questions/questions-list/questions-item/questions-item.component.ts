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
  
  private readonly maxwrongAnswersAmount: number = 3;
  private userAnswersAmount: number = 1;
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
      this.userAnswersAmount = 1;
    })
  }

  checkAnswer(answer, option) {
    
     if (this.userAnswersAmount > this.maxwrongAnswersAmount) { // ensure no extra attempt
      return;
     }

     if (answer === this.question.correct_answer ) {
        this.userAnswersStatus[option] = 1; // mark as correct
        this.lockQuestions(1);
        // update service
        this.playQuestionService.addAnswer(new Answer(this.question.id, "correct", this.userAnswersAmount));
        
      } else if (this.userAnswersAmount === this.maxwrongAnswersAmount) {
          this.userAnswersStatus[option] = 0; // mark as correct
          this.lockQuestions(0);
          // update service
          this.playQuestionService.addAnswer(new Answer(this.question.id, "incorrect", this.userAnswersAmount));
          return;
      } else {
          this.userAnswersStatus[option] = 0; // mark as incorrect
          this.userAnswersAmount++;
      }
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
