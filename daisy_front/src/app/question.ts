import { QuestionOption } from "./question_option";

export class Question {
  id: string;
  questionText: string;
  options: QuestionOption[];
}