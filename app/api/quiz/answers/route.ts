import { withRoute } from "@/lib/routeWrapper";
import { UserQuizAnswer } from "@/models/userQuizAnswerModel";
import { NextResponse } from "next/server";

export const POST = withRoute(async (req: Request) => {
  const { answers } = await req.json();

  const data = await UserQuizAnswer.create(answers);
  return NextResponse.json({
    message: "Quiz answers added",
    data,
  });
});
