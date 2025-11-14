import { EModuleHomeworkType } from "@/types/EModuleHomeworkType";
import mongoose, { Model, Document } from "mongoose";

export interface ModuleDocument extends Document {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  homeworkType: EModuleHomeworkType;
  taskDescription: string;
  inputLabel?: string;
  inputPlaceholder?: string;
}

type ModuleModel = Model<ModuleDocument>;

export const moduleSchema = new mongoose.Schema<ModuleDocument, ModuleModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    videoUrl: {
      type: String,
    },
    homeworkType: {
      type: String,
      enum: Object.values(EModuleHomeworkType),
      required: [true, "Homework type is required"],
    },
    taskDescription: {
      type: String,
    },
    inputLabel: {
      type: String,
    },
    inputPlaceholder: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const Module = (mongoose.models.Module ||
  mongoose.model("Module", moduleSchema)) as ModuleModel;
