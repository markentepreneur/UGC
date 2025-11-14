import { withRoute } from "@/lib/routeWrapper";
import { QuizQuestion } from "@/models/quizQuestionModel";
import { NextResponse } from "next/server";

export const GET = withRoute(async () => {
  await import("@/models/quizOptionModel");
  const data = await QuizQuestion.find({}).populate("options");
  return NextResponse.json({
    message: "Quiz questions fetched successfully",
    data,
  });
});
