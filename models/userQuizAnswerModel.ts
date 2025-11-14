import mongoose, { Model, Document } from "mongoose";

export interface UserQuizAnswerDocument extends Document {
  _id: string;
  questionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  answerId: mongoose.Types.ObjectId;
}

type UserQuizAnswerModel = Model<UserQuizAnswerDocument>;

export const userQuizAnswerSchema = new mongoose.Schema<
  UserQuizAnswerDocument,
  UserQuizAnswerModel
>(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizQuestion",
      required: [true, "Question ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizOption",
      required: [true, "Answer ID is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const UserQuizAnswer = (mongoose.models.UserQuizAnswer ||
  mongoose.model(
    "UserQuizAnswer",
    userQuizAnswerSchema
  )) as UserQuizAnswerModel;
