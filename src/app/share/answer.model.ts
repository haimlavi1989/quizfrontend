import { Question } from '../questions/question.model';

export class Answer {

   constructor(
     public questionId: number,
     public answerStatus: string,
     public attempts: number
   ) {

   }
}