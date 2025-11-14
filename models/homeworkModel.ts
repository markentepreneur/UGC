import { EHomeworkGrade } from "@/types/EHomeworkGrade";
import { EHomeworkStatus } from "@/types/EHomeworkStatus";
import mongoose, { Model, Document } from "mongoose";

export interface HomeworkDocument extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  moduleId: mongoose.Types.ObjectId;
  completed: boolean;
  homeworkSubmittedAt: Date;
  videoUrl?: string;
  homeworkText?: string;
  status: EHomeworkStatus;
  grade?: EHomeworkGrade;
  adminFeedback?: string;
}

type HomeworkModel = Model<HomeworkDocument>;

export const homeworkSchema = new mongoose.Schema<
  HomeworkDocument,
  HomeworkModel
>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    homeworkSubmittedAt: {
      type: Date,
    },
    videoUrl: {
      type: String,
    },
    homeworkText: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(EHomeworkStatus),
      required: true,
      default: EHomeworkStatus.Pending,
    },
    grade: {
      type: String,
      enum: Object.values(EHomeworkGrade),
    },
    adminFeedback: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const Homework = (mongoose.models.Homework ||
  mongoose.model("Homework", homeworkSchema)) as HomeworkModel;
