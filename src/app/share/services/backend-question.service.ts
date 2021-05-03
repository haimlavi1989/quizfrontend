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
              this.convertSpecialChar(question.question),
              this.convertSpecialChar(question.correct_answer),
              this.convertSpecialCharArray(question.incorrect_answers));
          });
        }),
        tap( question => {
          this.questionService.setQuestions(question);
        })

      );
  }

  convertSpecialChar(str) {
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&gt;/g, ">"); 
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    return str;
  }

  convertSpecialCharArray(array: string[]) {
    return array.map( item => this.convertSpecialChar(item))
  }

}
