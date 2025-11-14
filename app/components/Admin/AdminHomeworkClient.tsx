"use client";
import { useDataList } from "@/hooks/useDataList";
import { IHomework } from "@/interfaces/IHomework";
import { IHomeworkWithModule } from "@/interfaces/IHomeworkWithModule";
import { fetchRequest } from "@/lib/fetchTools";
import { EHomeworkGrade } from "@/types/EHomeworkGrade";
import { EHomeworkStatus } from "@/types/EHomeworkStatus";
import { EModuleHomeworkType } from "@/types/EModuleHomeworkType";
import {
  CheckCircle,
  Clock,
  FileText,
  LoaderCircle,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import Pagination from "../ui/Pagination";
import ErrorView from "../ui/ErrorView";

interface Props {
  homeworksProp: IHomeworkWithModule[];
  itemsPerPage: number;
  totalCountProp: number;
}

const AdminHomeworkClient: React.FC<Props> = ({
  homeworksProp,
  totalCountProp,
  itemsPerPage,
}) => {
  const [reviewingHomework, setReviewingHomework] = useState<string | null>(
    null
  );
  const [submitError, setSubmitError] = useState("");
  const [submitloading, setSubmitLoading] = useState(false);

  const [feedback, setFeedback] = useState("");

  const fetchData = (page: number) => {
    return fetchRequest<{
      data: IHomeworkWithModule[];
      totalCount: number;
    }>(`/api/admin/homeworks/?page=${page}&limit=${itemsPerPage}`);
  };
  const {
    data: homeworks,
    loading,
    error,
    onUpdateData,
    totalCount,
    curPage,
  } = useDataList(fetchData, false, homeworksProp);

  const [grade, setGrade] = useState<EHomeworkGrade | "">("");

  const [homeworkStatus, setHomeworkStatus] = useState<EHomeworkStatus | "">(
    ""
  );

  const handleReviewSubmit = async (id: string) => {
    try {
      setSubmitError("");
      setSubmitLoading(true);

      if (!homeworkStatus) {
        alert("Виберіть статус перевірки");
        setSubmitLoading(false);
        return;
      }

      const updateData: Partial<IHomework> = {
        adminFeedback: feedback,
        grade: grade || undefined,
        status: homeworkStatus,
        completed: homeworkStatus !== EHomeworkStatus.Rejected,
      };

      await fetchRequest(`/api/admin/homeworks/${id}`, "PUT", updateData);
      setSubmitLoading(false);
      setSubmitError("");
      alert("Успішно перевірено домашнє завдання!");
      let page = curPage;
      if (homeworks.length === 1 && page > 1) {
        page = page - 1;
      }

      onUpdateData(page);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setSubmitLoading(false);
      setSubmitError("Сталася невідома помилка під час перевірки");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <LoaderCircle className="animate-spin" size={48} />
        <span style={{ marginLeft: "16px", fontSize: "1.1rem" }}>
          Loading...
        </span>
      </div>
    );
  }
  if (error)
    return (
      <ErrorView
        error={new Error("Failed to load")}
        reset={() => onUpdateData(curPage)}
      />
    );

  return (
    <div className="space-y-3 sm:space-y-4">
      {homeworks.map((hw) => (
        <div
          key={hw._id}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-orange-50 border-b border-orange-200">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2">
                  {hw.moduleId.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {hw?.userId.email}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Здано:{" "}
                  {new Date(hw.homeworkSubmittedAt).toLocaleString("uk-UA")}
                </p>
              </div>
              <span className="flex items-center space-x-1 text-orange-600 font-semibold text-xs sm:text-sm flex-shrink-0">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Очікує</span>
              </span>
            </div>
          </div>

          <div className="px-4 sm:px-6 py-4">
            {hw.moduleId.homeworkType === EModuleHomeworkType.Upload && (
              <>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Відео учня:
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
                  {hw.videoUrl ? (
                    <video
                      src={"/" + hw.videoUrl}
                      controls
                      className="w-full max-w-xs sm:max-w-sm rounded"
                    />
                  ) : (
                    <span className="text-gray-500">Відео не завантажено</span>
                  )}
                </div>
              </>
            )}
            {hw.moduleId.homeworkType === EModuleHomeworkType.Input && (
              <>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Текст учня:
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
                  {hw.homeworkText || (
                    <span className="text-gray-500">Текст порожній</span>
                  )}
                </div>
              </>
            )}

            {reviewingHomework !== hw._id ? (
              <button
                onClick={() => setReviewingHomework(hw._id)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base font-medium"
              >
                Перевірити
              </button>
            ) : (
              <div className="space-y-3 sm:space-y-4 mt-4 border-t pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Статус перевірки *
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        setHomeworkStatus(EHomeworkStatus.Approved)
                      }
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        homeworkStatus === "approved"
                          ? "border-green-600 bg-green-50 text-green-900"
                          : "border-gray-300 hover:border-green-400 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <div>
                          <div className="font-semibold text-sm sm:text-base">
                            Підтвердити виконання
                          </div>
                          <div className="text-xs sm:text-sm opacity-80">
                            Завдання виконано успішно
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        setHomeworkStatus(EHomeworkStatus.ApprovedWithNotes)
                      }
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        homeworkStatus === "approved_with_notes"
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-gray-300 hover:border-blue-400 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <div>
                          <div className="font-semibold text-sm sm:text-base">
                            Підтвердити з порадами
                          </div>
                          <div className="text-xs sm:text-sm opacity-80">
                            Добре, але є рекомендації
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        setHomeworkStatus(EHomeworkStatus.Rejected)
                      }
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        homeworkStatus === "rejected"
                          ? "border-red-600 bg-red-50 text-red-900"
                          : "border-gray-300 hover:border-red-400 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        <div>
                          <div className="font-semibold text-sm sm:text-base">
                            Відхилити
                          </div>
                          <div className="text-xs sm:text-sm opacity-80">
                            Потрібно переробити завдання
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Оцінка (опціонально)
                  </label>
                  <select
                    value={grade}
                    onChange={(e) =>
                      setGrade((e.target.value as EHomeworkGrade) || "")
                    }
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Без оцінки</option>
                    <option value={EHomeworkGrade.Excellent}>Відмінно</option>
                    <option value={EHomeworkGrade.Good}>Добре</option>
                    <option value={EHomeworkGrade.Satisfactory}>
                      Задовільно
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {homeworkStatus === "rejected"
                      ? "Причина відхилення *"
                      : "Відгук / Поради"}
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      homeworkStatus === "rejected"
                        ? "Поясніть що потрібно виправити..."
                        : homeworkStatus === "approved_with_notes"
                        ? "Напишіть поради та рекомендації..."
                        : "Додатковий коментар (опціонально)..."
                    }
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {submitError && (
                    <div className="w-full mb-2 text-red-600 font-medium text-sm sm:text-base">
                      {submitError}
                    </div>
                  )}
                  <button
                    onClick={() => handleReviewSubmit(hw._id)}
                    disabled={!homeworkStatus || submitloading}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base text-white
                      ${
                        submitloading || !homeworkStatus
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }
                    `}
                  >
                    {submitloading ? "Збереження..." : "Зберегти перевірку"}
                  </button>
                  <button
                    onClick={() => {
                      setReviewingHomework(null);
                      setFeedback("");
                      setGrade("");
                      setHomeworkStatus("");
                    }}
                    className="flex-1 sm:flex-none bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base"
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <Pagination
        currentPage={curPage}
        totalCount={totalCountProp || totalCount}
        onPageChange={onUpdateData}
        itemsPerPage={itemsPerPage}
      />
      {homeworks.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-sm sm:text-base text-gray-600">
            Немає здаих домашніх завдань
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminHomeworkClient;
