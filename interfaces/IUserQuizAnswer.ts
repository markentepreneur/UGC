import { IQuizOption } from "./IQuizOption";
import { IQuizQuestion } from "./IQuizQuestion";

export interface IUserQuizAnswer {
  _id: string;
  questionId: IQuizQuestion;
  userId: string;
  answerId: IQuizOption;
}
