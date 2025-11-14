"use client";
import React, { useState } from "react";
import { CheckCircle, FileText } from "lucide-react";
import { EHomeworkStatus } from "@/types/EHomeworkStatus";
import { EModuleHomeworkType } from "@/types/EModuleHomeworkType";
import { useRouter } from "next/navigation";
import { IHomework } from "@/interfaces/IHomework";
import { IModule } from "@/interfaces/IModule";
import { createFormData, fetchRequest } from "@/lib/fetchTools";
import Link from "next/link";

interface Props {
  homework: IHomework | null;
  module: IModule | null;
}

const LessonDetailsClient: React.FC<Props> = ({ homework, module }) => {
  const router = useRouter();

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [homeworkText, setHomeworkText] = useState("");

  const currentModule = module;

  // Only allow submission if homework is not submitted, or rejected
  const isSubmitAvailable =
    !homework?.homeworkSubmittedAt ||
    homework.status === EHomeworkStatus.Rejected;

  const handleSubmit = async () => {
    if (!currentModule?._id) return;

    try {
      setUploadingVideo(true);

      const reqData: {
        videoUrl?: File;
        homeworkText?: string;
        moduleId: string;
      } = { moduleId: currentModule._id };

      if (
        currentModule.homeworkType === EModuleHomeworkType.Upload &&
        videoFile
      ) {
        reqData.videoUrl = videoFile;
      }
      if (
        currentModule.homeworkType === EModuleHomeworkType.Input &&
        homeworkText
      ) {
        reqData.homeworkText = homeworkText;
      }

      await fetchRequest("/api/homeworks", "POST", createFormData(reqData));
      // Success message handling
      let successMessage =
        "✅ Успішно відправлено! Очікуй на фідбек від викладача.";
      if (currentModule.homeworkType === EModuleHomeworkType.Watch) {
        successMessage =
          "✅ Модуль переглянуто! Можеш переходити до наступного.";
      } else if (currentModule.homeworkType === EModuleHomeworkType.Input) {
        successMessage =
          "✅ Домашнє завдання успішно надіслано! Очікуй на фідбек від викладача.";
      } else if (currentModule.homeworkType === EModuleHomeworkType.Upload) {
        successMessage =
          "✅ Відео успішно завантажено! Очікуй на фідбек від викладача.";
      }
      alert(successMessage);
      setVideoFile(null);
      setHomeworkText("");
      router.push("/client/dashboard");
      // Optionally, you might want to refresh homework data here
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Помилка завантаження. Спробуйте ще раз.");
    } finally {
      setUploadingVideo(false);
    }
  };

  if (!currentModule) return null;

  const shouldShowRejectedBlock =
    homework?.status === EHomeworkStatus.Rejected &&
    currentModule.homeworkType !== EModuleHomeworkType.Watch;

  return (
    <div className="min-h-screen bg-custom-pink-light">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href={"/client/dashboard"}
          className="mb-6 text-custom-sage hover:text-custom-sage-dark font-medium flex items-center space-x-2"
        >
          <span>←</span>
          <span>Назад до уроків</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {currentModule.title}
          </h1>

          <div>
            <div className="aspect-video bg-gray-900 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
              <iframe
                src={currentModule.videoUrl}
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* Show "Rejected" block if rejected always (with submit below!) */}
            {shouldShowRejectedBlock && (
              <div className="mb-6">
                <div className="bg-gradient-to-r from-red-50 to-rose-100 border-2 border-red-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        {/* Cross icon */}
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-red-900 mb-2">
                        Домашнє завдання відхилено
                      </h4>
                      <p className="text-red-700 text-sm mb-3">
                        На жаль, твоя робота не відповідає вимогам. Переглянь
                        коментар викладача, внеси правки та відправ повторно.
                      </p>
                      {homework.adminFeedback && (
                        <div className="bg-red-100 border-l-4 border-red-400 px-4 py-2 mt-2 rounded text-red-800 text-sm">
                          <b>Коментар викладача:</b> {homework.adminFeedback}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other homework status blocks (except rejected) */}
            {homework &&
              currentModule.homeworkType !== EModuleHomeworkType.Watch &&
              !shouldShowRejectedBlock && (
                <div className="mb-6">
                  {homework.status === EHomeworkStatus.ApprovedWithNotes ? (
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                            <CheckCircle
                              className="w-7 h-7 text-white"
                              strokeWidth={2.5}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-yellow-900 mb-2">
                            Завдання схвалено з коментарем викладача
                          </h4>
                          <p className="text-yellow-700 text-sm mb-3">
                            Твоє завдання виконано добре, але є зауваження!
                          </p>
                          {homework.adminFeedback && (
                            <div className="bg-yellow-100 border-l-4 border-yellow-400 px-4 py-2 mt-2 rounded text-yellow-800 text-sm">
                              <b>Коментар викладача:</b>{" "}
                              {homework.adminFeedback}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : homework.status === EHomeworkStatus.Pending ? (
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                            <FileText
                              className="w-7 h-7 text-white"
                              strokeWidth={2.5}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-orange-900 mb-2">
                            Домашнє завдання на перевірці
                          </h4>
                          <p className="text-orange-700 text-sm">
                            Твоє домашнє завдання успішно відправлено! Очікуй на
                            фідбек від викладача. Зазвичай перевірка займає до
                            24 годин.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : homework.status === EHomeworkStatus.Approved ? (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle
                              className="w-7 h-7 text-white"
                              strokeWidth={2.5}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-green-900 mb-2">
                            Домашнє завдання перевірено!
                          </h4>
                          <p className="text-green-700 text-sm">
                            Чудова робота! Твоє домашнє завдання перевірено
                            викладачем. Можеш переходити до наступного модуля.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            {/* Homework submit form */}
            {currentModule.homeworkType !== EModuleHomeworkType.Watch &&
              isSubmitAvailable && (
                <div>
                  <div className="bg-custom-pink-light/50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Домашнє завдання:
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentModule.taskDescription || "",
                      }}
                    />
                    <div className="bg-white rounded-xl p-4 border-2 border-dashed border-custom-sage/30">
                      <label className="block">
                        {currentModule.inputLabel && (
                          <span className="text-sm font-semibold text-gray-700 mb-2 block">
                            {currentModule.inputLabel}
                          </span>
                        )}
                        {currentModule.homeworkType ===
                        EModuleHomeworkType.Upload ? (
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) =>
                              setVideoFile(e.target.files?.[0] || null)
                            }
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-custom-sage file:text-white
                                hover:file:bg-custom-sage-dark
                                file:cursor-pointer cursor-pointer"
                          />
                        ) : (
                          <textarea
                            value={homeworkText}
                            onChange={(e) => setHomeworkText(e.target.value)}
                            placeholder={currentModule.inputPlaceholder}
                            rows={
                              currentModule.homeworkType ===
                              EModuleHomeworkType.Input
                                ? 6
                                : 4
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-custom-sage focus:ring-2 focus:ring-custom-sage/20 outline-none resize-none text-sm"
                          />
                        )}
                      </label>
                      {currentModule.homeworkType ===
                        EModuleHomeworkType.Upload &&
                        videoFile && (
                          <div className="mt-3 text-sm text-gray-600">
                            Вибрано:{" "}
                            <span className="font-semibold">
                              {videoFile.name}
                            </span>
                            <span className="ml-2 text-gray-500">
                              ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                        )}
                      {currentModule.homeworkType ===
                        EModuleHomeworkType.Input &&
                        homeworkText && (
                          <div className="mt-3 text-sm text-gray-600">
                            Символів:{" "}
                            <span className="font-semibold">
                              {homeworkText.length}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={
                      currentModule.homeworkType === EModuleHomeworkType.Upload
                        ? !videoFile || uploadingVideo
                        : !homeworkText.trim() || uploadingVideo
                    }
                    className="w-full bg-custom-sage hover:bg-custom-sage-dark text-white font-semibold py-4 px-8 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingVideo
                      ? currentModule.homeworkType ===
                        EModuleHomeworkType.Upload
                        ? "Завантаження..."
                        : "Відправка..."
                      : "Відправити домашнє завдання"}
                  </button>
                </div>
              )}
            {/* For watch modules or finished modules, show single button to finish */}
            {currentModule.homeworkType === EModuleHomeworkType.Watch && (
              <button
                onClick={handleSubmit}
                disabled={!isSubmitAvailable || uploadingVideo}
                className="w-full mt-6 bg-custom-sage hover:bg-custom-sage-dark text-white font-semibold py-4 px-8 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitAvailable
                  ? uploadingVideo
                    ? "Завершення..."
                    : "Завершити модуль"
                  : "Модуль вже завершено"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailsClient;
