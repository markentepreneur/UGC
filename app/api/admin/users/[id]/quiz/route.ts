import { withRoute } from "@/lib/routeWrapper";
import { UserQuizAnswer } from "@/models/userQuizAnswerModel";
import { UserRoles } from "@/types/UserRoles";
import { NextResponse } from "next/server";

export const GET = withRoute<{ id: string }>(
  async (_req, _session, params) => {
    await import("@/models/quizQuestionModel");
    await import("@/models/quizOptionModel");

    const data = await UserQuizAnswer.find({ userId: params?.id })
      .populate("questionId")
      .populate("answerId");

    if (!data) {
      return NextResponse.json({ error: "invalid id param" }, { status: 400 });
    }
    return NextResponse.json({
      message: "User quiz answers  fetched successfully",
      data,
    });
  },
  true,
  UserRoles.admin
);
