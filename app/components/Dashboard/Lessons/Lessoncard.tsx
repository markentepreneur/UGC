import { CheckCircle, Play, Lock, FileText } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  number: number;
  title: string;
  status: "available" | "locked" | "completed";
  homeworkStatus?: "not_submitted" | "submitted" | "reviewed";
}

function LessonCard({ number, title, status, homeworkStatus, id }: Props) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  const Wrapper = isLocked || !id ? "div" : Link;
  return (
    <Wrapper
      href={`/client/dashboard/${id}`}
      className={`group relative bg-white rounded-3xl shadow-lg p-6 transition-all duration-300 border-2 ${
        isLocked
          ? "opacity-60 cursor-not-allowed border-gray-200"
          : "cursor-pointer hover:shadow-2xl hover:-translate-y-2 border-transparent hover:border-custom-pink/50"
      } ${
        isCompleted
          ? "border-custom-sage/50 bg-gradient-to-br from-custom-sage-light/20 via-white to-white"
          : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-shrink-0">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isCompleted
                  ? "bg-gradient-to-br from-custom-sage to-custom-sage-dark shadow-lg"
                  : isLocked
                  ? "bg-gradient-to-br from-gray-300 to-gray-400"
                  : "bg-gradient-to-br from-custom-pink to-custom-pink-dark group-hover:scale-110 shadow-lg"
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
              ) : isLocked ? (
                <Lock className="w-6 h-6 text-gray-100" strokeWidth={2} />
              ) : (
                <Play className="w-6 h-6 text-white" strokeWidth={2.5} />
              )}
            </div>
            <div
              className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md ${
                isCompleted
                  ? "bg-custom-sage text-white"
                  : isLocked
                  ? "bg-gray-400 text-white"
                  : "bg-custom-pink text-white"
              }`}
            >
              {number}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-base font-bold transition-colors leading-tight ${
                isCompleted
                  ? "text-custom-sage-dark"
                  : isLocked
                  ? "text-gray-500"
                  : "text-gray-900 group-hover:text-custom-pink-dark"
              }`}
            >
              {title}
            </h3>
            {homeworkStatus && !isLocked && (
              <div className="mt-2">
                {homeworkStatus === "submitted" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                    <FileText className="w-3 h-3" />
                    На перевірці
                  </span>
                )}
                {homeworkStatus === "reviewed" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3" />
                    Перевірено
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 ml-3">
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all ${
              isCompleted
                ? "bg-custom-sage-light text-custom-sage-dark"
                : isLocked
                ? "bg-gray-200 text-gray-500"
                : "bg-custom-pink-light text-custom-pink-dark group-hover:scale-110"
            }`}
          >
            {isCompleted ? "✓" : isLocked ? "🔒" : "→"}
          </span>
        </div>
      </div>

      {!isLocked && !isCompleted && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-custom-pink/0 via-custom-sage/10 to-custom-pink/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </Wrapper>
  );
}

export default LessonCard;
