import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service'
import { PlayQuestionService } from '../../share/services/play-questions.service';
import { Answer } from 'src/app/share/answer.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public answers: Answer[] = [];
  public questionsLength: number = 0;
  public answersCorrectLength: number = 0; 

  constructor(
    private playQuestionService: PlayQuestionService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.answers = this.playQuestionService.getAnswers() || [];
    this.questionsLength = this.questionService.getNumberOfQuestions();
    this.answersCorrectLength = this.correctAnswers()?.length;
  }

  correctAnswers() {
     return this.answers.filter( item => item.answerStatus === "correct");
  }



}
