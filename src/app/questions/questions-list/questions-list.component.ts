import { BackendQuestionService } from '../../share/services/backend-question.service';
import { QuestionService } from '../question.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '../question.model';
import { PlayQuestionService } from '../../share/services/play-questions.service';
import { Answer } from 'src/app/share/answer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, OnDestroy {

  questions: Question[];
  answers: Answer[];
  private SubscriptionfetchQuestions: Subscription;
  private SubscriptionQuestionsChanged: Subscription;
  private SubscriptionquestionAnswerAdded: Subscription;
  spinner: boolean = true;
 
	constructor(
    private BackendService: BackendQuestionService,
    private questionService: QuestionService,
    private playQuestionService: PlayQuestionService
  ) { 
  }
  
	ngOnInit() {
    this.fetchQustionFromBackend();
    this.questionsChanges();
    this.questionAnswerAdded();
  }

  fetchQustionFromBackend() {
    this.SubscriptionfetchQuestions = this.BackendService.fetchQuestions().subscribe();
  }

  questionsChanges() {
    this.SubscriptionQuestionsChanged = this.questionService.questionsChanged.subscribe( 
      questions => {
        this.questions = questions;
        this.spinner = false;
      }, error => {
        this.spinner = false;
    })
    this.questions = this.questionService.getQuestions();
  }

  questionAnswerAdded() {
    this.SubscriptionquestionAnswerAdded = this.playQuestionService.questionAnswerAdded.subscribe(
      answers => {
        this.answers = answers;
      }, error => {

    })
  }

  resetGame() {
    this.playQuestionService.handleRestPlay();
  }

  ngOnDestroy() {
    this.SubscriptionfetchQuestions.unsubscribe();
    this.SubscriptionQuestionsChanged.unsubscribe();
    this.SubscriptionquestionAnswerAdded.unsubscribe();
  }
  
}
