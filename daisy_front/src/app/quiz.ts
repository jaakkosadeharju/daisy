import { Question } from "./question";

export class Quiz {
    id: string;
    title: string;
    questions: Question[];

    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.questions = [];
    }
}