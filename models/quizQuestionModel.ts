import mongoose, { Model, Document } from "mongoose";

export interface QuizQuestionDocument extends Document {
  _id: string;
  question: string;
  multipleChoice?: boolean;
  description: string;
  title: string;
  image?: string;
  options?: mongoose.Types.ObjectId[]; // Include options in the schema and typing
}

type QuizQuestionModel = Model<QuizQuestionDocument>;

export const quizQuestionSchema = new mongoose.Schema<
  QuizQuestionDocument,
  QuizQuestionModel
>(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    multipleChoice: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    image: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

quizQuestionSchema.virtual("options", {
  ref: "QuizOption",
  localField: "_id",
  foreignField: "questionId",
});

export const QuizQuestion = (mongoose.models.QuizQuestion ||
  mongoose.model("QuizQuestion", quizQuestionSchema)) as QuizQuestionModel;
