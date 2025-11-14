import { EHomeworkGrade } from "@/types/EHomeworkGrade";
import { EHomeworkStatus } from "@/types/EHomeworkStatus";

export interface IHomework {
  _id: string;
  userId: string;
  moduleId: string;
  completed: boolean;
  homeworkSubmittedAt: Date;
  videoUrl?: string;
  homeworkText?: string;
  status: EHomeworkStatus;
  grade?: EHomeworkGrade;
  adminFeedback?: string;
}
