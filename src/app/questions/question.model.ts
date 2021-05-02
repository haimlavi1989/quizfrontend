
export class Question {
    id?: number;
    category?: string;
    difficulty?: string;
    type?: string;

    constructor(
        public question: string,
        public correct_answer: string,
        public incorrect_answers: string[],
        public shuffle_answers?: string[],
    ) {
        this.id = Date.now();
        this.shuffle_answers = this.shuffleAnswers(this.correct_answer, this.incorrect_answers);
    }

      shuffleAnswers(correct_answer, incorrect_answers) {
        const tempArray = [correct_answer, ...incorrect_answers];

        return this.shuffleArray(tempArray);
      }

      shuffleArray(array) {
        array = array.slice();  
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    
}
