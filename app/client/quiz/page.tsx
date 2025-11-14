import QuizClient from "@/app/components/QuizClient";
import { IQuizQuestion } from "@/interfaces/IQuizQuestion";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";
import React from "react";

const QuizPage = async () => {
  const res = await fetchRequestFromServer<{ data: IQuizQuestion[] }>(
    "/api/quiz/questions/"
  );

  return <QuizClient data={res.data} />;
};

export default QuizPage;
