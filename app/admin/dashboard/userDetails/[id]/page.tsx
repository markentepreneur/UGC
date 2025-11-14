import { IHomework } from "@/interfaces/IHomework";
import { IModule } from "@/interfaces/IModule";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";
import { EHomeworkStatus } from "@/types/EHomeworkStatus";
import { EModuleHomeworkType } from "@/types/EModuleHomeworkType";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const AdminUserDetailsModulesPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const p = await params;
  const modules = await fetchRequestFromServer<{ data: IModule[] }>(
    "/api/modules/"
  );
  const homeworks = await fetchRequestFromServer<{ data: IHomework[] }>(
    `/api/admin/users/${p.id}/homeworks`
  );
  return (
    <div className="space-y-3 sm:space-y-4">
      {modules.data.map((module) => {
        const progress = homeworks.data.find((p) => p.moduleId === module._id);
        const isCompleted = progress?.completed || false;
        const hasHomework = [
          EModuleHomeworkType.Input,
          EModuleHomeworkType.Upload,
        ].includes(module.homeworkType);
        const homeworkSubmitted = !!progress?.homeworkSubmittedAt || false;
        const homeworkReviewed =
          progress?.status !== EHomeworkStatus.Pending || false;

        return (
          <div
            key={module._id}
            className={`border-2 rounded-xl p-4 sm:p-5 ${
              isCompleted
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                    {module.title}
                  </h4>
                  {isCompleted && (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-3">
                  {module.description}
                </p>
              </div>
            </div>

            {hasHomework && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                    Домашнє завдання:
                  </span>
                  {homeworkSubmitted ? (
                    <span
                      className={`flex items-center space-x-1 text-xs sm:text-sm font-medium ${
                        homeworkReviewed ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {homeworkReviewed ? (
                        <>
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Перевірено</span>
                          <span className="sm:hidden">✓</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Очікує</span>
                          <span className="sm:hidden">⏳</span>
                        </>
                      )}
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Не здано</span>
                      <span className="sm:hidden">✗</span>
                    </span>
                  )}
                </div>

                {homeworkSubmitted && (
                  <div className="bg-white rounded-lg p-3 sm:p-4 mt-2">
                    {module.homeworkType === EModuleHomeworkType.Upload && (
                      <>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                          Відео учня:
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
                          {progress?.videoUrl ? (
                            <video
                              src={"/" + progress.videoUrl}
                              controls
                              className="w-full max-w-xs sm:max-w-sm rounded"
                            />
                          ) : (
                            <span className="text-gray-500">
                              Відео не завантажено
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    {module.homeworkType === EModuleHomeworkType.Input && (
                      <>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                          Текст учня:
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
                          {progress?.homeworkText || (
                            <span className="text-gray-500">
                              Текст порожній
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    {homeworkReviewed && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 space-y-2">
                        {progress?.status && (
                          <div className="text-xs sm:text-sm">
                            <span className="font-semibold text-gray-900">
                              Статус:{" "}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                progress.status === EHomeworkStatus.Approved
                                  ? "bg-green-100 text-green-800"
                                  : progress.status ===
                                    EHomeworkStatus.ApprovedWithNotes
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {progress.status === EHomeworkStatus.Approved &&
                                "Підтверджено"}
                              {progress.status ===
                                EHomeworkStatus.ApprovedWithNotes &&
                                "Підтверджено з порадами"}
                              {progress.status === EHomeworkStatus.Rejected &&
                                "Відхилено"}
                            </span>
                          </div>
                        )}
                        {progress?.grade && (
                          <div className="text-xs sm:text-sm">
                            <span className="font-semibold text-gray-900">
                              Оцінка:{" "}
                            </span>
                            <span className="text-gray-700">
                              {progress.grade}
                            </span>
                          </div>
                        )}
                        {progress?.adminFeedback && (
                          <div className="text-xs sm:text-sm">
                            <span className="font-semibold text-gray-900">
                              Відгук адміна:{" "}
                            </span>
                            <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                              {progress.adminFeedback}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminUserDetailsModulesPage;
