import { Question } from "./question";

export class QuizSession {
    id: string;
    quizId: string;
    activeQuestion: Question;

    constructor(params) {
        let p = params || {};
        this.id = p.id;
        this.quizId = this.quizId;
        this.activeQuestion = p.activeQuestion;
    }
}