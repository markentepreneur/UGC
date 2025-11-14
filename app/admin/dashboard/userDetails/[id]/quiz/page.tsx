import { IUserQuizAnswer } from "@/interfaces/IUserQuizAnswer";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";
import React from "react";

import { IQuizOption } from "@/interfaces/IQuizOption";
import { IQuizQuestion } from "@/interfaces/IQuizQuestion";

const AdminUserDetailsQuizPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const p = await params;
  const { data: quizAnswers } = await fetchRequestFromServer<{
    data: IUserQuizAnswer[];
  }>(`/api/admin/users/${p.id}/quiz`);

  return (
    <div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-4 py-4 sm:p-6">
          <h3 className="text-lg font-bold mb-2">
            Відповіді користувача на квіз
          </h3>
          {quizAnswers.length === 0 ? (
            <div className="text-gray-400 text-sm">
              Користувач ще не проходив квіз.
            </div>
          ) : (
            <ol className="space-y-5">
              {quizAnswers.map((ua, idx) => {
                const question = ua.questionId as unknown as IQuizQuestion;
                const answer = ua.answerId as unknown as IQuizOption;

                return (
                  <li
                    key={ua._id}
                    className="bg-gray-50 rounded-lg shadow px-4 py-3"
                  >
                    <div className="mb-1">
                      <span className="text-blue-700 font-semibold">
                        {idx + 1}. {question.title}
                      </span>
                      <div className="text-gray-700 font-normal mt-1">
                        {question.question}
                      </div>
                      {question.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {question.description}
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold mr-2">
                        Відповідь:
                      </span>
                      <span className="inline-block text-gray-900 font-medium">
                        {answer.text}
                      </span>
                    </div>
                    {/* Optionally show more answer info */}
                    {answer.featureTitle && (
                      <div className="mt-3 bg-blue-50 px-3 py-2 rounded">
                        <div className="text-blue-600 font-semibold">
                          {answer.featureTitle}
                        </div>
                        <div className="text-sm">
                          {answer.featureDescription}
                        </div>
                        {answer.featureBenefits &&
                          answer.featureBenefits.length > 0 && (
                            <ul className="list-disc pl-5 mt-2 text-sm text-blue-700">
                              {answer.featureBenefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                              ))}
                            </ul>
                          )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailsQuizPage;
