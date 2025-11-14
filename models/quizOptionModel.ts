import mongoose, { Model, Document } from "mongoose";

export interface QuizOptionDocument extends Document {
  _id: string;
  questionId: mongoose.Types.ObjectId;
  text: string;
  featureTitle: string;
  featureDescription: string;
  featureBenefits: string[];
}

type QuizOptionModel = Model<QuizOptionDocument>;

export const quizOptionSchema = new mongoose.Schema<
  QuizOptionDocument,
  QuizOptionModel
>(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizQuestion",
      required: [true, "Question ID is required"],
    },

    text: {
      type: String,
      required: [true, "Text is required"],
    },
    featureTitle: {
      type: String,
      required: [true, "Feature title is required"],
    },
    featureDescription: {
      type: String,
      required: [true, "Feature description is required"],
    },

    featureBenefits: {
      type: [String],
      required: [true, "Feature benefits is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const QuizOption = (mongoose.models.QuizOption ||
  mongoose.model("QuizOption", quizOptionSchema)) as QuizOptionModel;
