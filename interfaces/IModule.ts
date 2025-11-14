import { EModuleHomeworkType } from "@/types/EModuleHomeworkType";

export interface IModule {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  homeworkType: EModuleHomeworkType;
  taskDescription?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
}
