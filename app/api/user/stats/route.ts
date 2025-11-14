import { withRoute } from "@/lib/routeWrapper";
import { Homework } from "@/models/homeworkModel";
import { Module } from "@/models/moduleModel";
import { NextResponse } from "next/server";

export const GET = withRoute(async (_req, session) => {
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const modulesCount = await Module.countDocuments({});
  const homeworks = await Homework.find({ userId: session?.user.id });
  const completedHomeworksCount = homeworks.filter(
    (homework) => homework.completed
  ).length;
  const submitedHomeworksCount = homeworks.filter(
    (homework) => homework.homeworkSubmittedAt
  ).length;
  return NextResponse.json({
    message: "User Stats fetched successfully",
    data: {
      modulesCount,
      completedHomeworksCount,
      submitedHomeworksCount,
    },
  });
}, true);
