import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../question.model';
import { PlayQuestionService } from '../../../share/services/play-questions.service';
import { Answer } from '../../../share/answer.model';
 
@Component({
  selector: 'app-questions-item',
  templateUrl: './questions-item.component.html',
  styleUrls: ['./questions-item.component.css']
})

  /* 
  The user should have 3 strikes to get the answer wrong.
  For each wrong answer the user should see shake animation.
  The user wont be able to answer on same question more then once. - if correct answer lock/ move to another
  The user should be able to re generate all questions and restart. - need to take into considrations
  */

export class QuestionsItemComponent implements OnInit {
  
  private readonly maxwrongAnswersAmount: number = 3;
  private userAnswersAmount: number = 1;
  // key: answerNumber;  value: -1 => noAnswer, 1 => correct, 0 => incorrect, 2 => lockAnswer 
  userAnswersStatus: number[] = [-1, -1, -1, -1]; // we know there is 4 

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
    this.playQuestionService.restPlayRequset.subscribe( status => {
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
        for (let i=0; i< this.userAnswersStatus.length; i++) {
          if (this.userAnswersStatus[i] !== 1) {
            this.userAnswersStatus[i] = 2; // lock rest of Answers
          }
        }
        // update service
        this.playQuestionService.addAnswer(new Answer(this.question.id, "correct", this.userAnswersAmount));
        
      } else if (this.userAnswersAmount === this.maxwrongAnswersAmount) {
          this.userAnswersStatus[option] = 0; // mark as correct
          for (let i=0; i< this.userAnswersStatus.length; i++) {
            if (this.userAnswersStatus[i] !== 0 ) {
              this.userAnswersStatus[i] = 2;
            }
          }
          // update service
          this.playQuestionService.addAnswer(new Answer(this.question.id, "incorrect", this.userAnswersAmount));
          return;
      } else {
          this.userAnswersStatus[option] = 0; // mark as incorrect
          this.userAnswersAmount++;
      }
     
  }

}
