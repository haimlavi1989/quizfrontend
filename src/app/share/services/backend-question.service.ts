import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Question } from '../../questions/question.model';
import { environment } from '../../../environments/environment';
import { QuestionService } from '../../questions/question.service';

interface response {
  response_code: number;
  results: Question[];
}

@Injectable({ providedIn: 'root' })
export class BackendQuestionService {

  private resource: string = 'questions';

  constructor(
    private http: HttpClient,
    private questionService: QuestionService
  ) {}

  fetchQuestions() {
    return this.http
      .get<response>(
        `${environment.apiUrl}${this.resource}`
      )
      .pipe(
        map( response => {
          return response?.results.map( question => {
            return new Question(
              this.convertQustion(question.question),
              question.correct_answer,
              question.incorrect_answers);
          });
        }),
        tap( question => {
          this.questionService.setQuestions(question);
          console.log(question);
        })

      );
  }

  convertQustion(str) {
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    return str;
  }
}
