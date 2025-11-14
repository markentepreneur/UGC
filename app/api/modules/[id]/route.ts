import { withRoute } from "@/lib/routeWrapper";
import { Homework } from "@/models/homeworkModel";
import { Module } from "@/models/moduleModel";
import { NextResponse } from "next/server";

export const GET = withRoute<{ id: string }>(async (_req, session, params) => {
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!params?.id) {
    return NextResponse.json({ error: "invalid id param" }, { status: 400 });
  }

  const moduleData = await Module.findById(params.id);
  if (!moduleData) {
    return NextResponse.json({ error: "invalid id param" }, { status: 400 });
  }
  const homework = await Homework.findOne({
    moduleId: moduleData._id,
  });

  return NextResponse.json({
    message: "Quiz questions fetched successfully",
    data: {
      module: moduleData,
      homework,
    },
  });
}, true);
