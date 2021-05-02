import { BackendQuestionService } from '../../share/services/backend-question.service';
import { QuestionService } from '../question.service';
import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { PlayQuestionService } from '../../share/services/play-questions.service';
import { Answer } from 'src/app/share/answer.model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  questions: Question[];
  answers: Answer[];
 
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
    this.BackendService.fetchQuestions().subscribe();
  }

  questionsChanges() {
    this.questionService.questionsChanged.subscribe( 
      questions => {
        this.questions = questions;
      }, error => {
    })
    this.questions = this.questionService.getQuestions();
  }

  questionAnswerAdded() {
    this.playQuestionService.questionAnswerAdded.subscribe(
      answers => {
        this.answers = answers;
      }, error => {

    })
  }

  resetGame() {
    this.playQuestionService.handleRestPlay();
  }
  
}
