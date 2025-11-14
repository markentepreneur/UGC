import { IQuizOption } from "./IQuizOption";

export interface IQuizQuestion {
  _id: string;
  question: string;
  multipleChoice?: boolean;
  description: string;
  title: string;
  image?: string;
  __v: 0;
  options: IQuizOption[];
}
