import { withRoute } from "@/lib/routeWrapper";
import { uploadFile } from "@/lib/uploadFile";
import { Homework } from "@/models/homeworkModel";
import { Module } from "@/models/moduleModel";
import { EHomeworkStatus } from "@/types/EHomeworkStatus";
import { EModuleHomeworkType } from "@/types/EModuleHomeworkType";
import { NextResponse } from "next/server";
import path from "path";

export const GET = withRoute(async (_req, session) => {
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await Homework.find({ userId: session.user.id });
  return NextResponse.json({
    message: "Quiz questions fetched successfully",
    data,
  });
}, true);

export const POST = withRoute(async (req, session) => {
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const reqData = Object.fromEntries(formData.entries());
  if (!reqData.moduleId) {
    return NextResponse.json(
      { error: "module id is important" },
      { status: 400 }
    );
  }
  const moduleData = await Module.findById(reqData.moduleId);
  if (!moduleData) {
    return NextResponse.json(
      { error: "module with provided id not found" },
      { status: 400 }
    );
  }
  switch (moduleData.homeworkType) {
    case EModuleHomeworkType.Input:
      if (!reqData.homeworkText) {
        return NextResponse.json(
          { error: "homeworkText is required" },
          { status: 400 }
        );
      }
      delete reqData.videoUrl;
      break;
    case EModuleHomeworkType.Upload:
      if (!reqData.videoUrl) {
        return NextResponse.json(
          { error: "videoUrl is required" },
          { status: 400 }
        );
      }
      const file = reqData.videoUrl as File;
      const ext = path.extname(file.name);
      const savePath =
        "homework/videos/" +
        `${session.user.id}-${reqData.moduleId}-${Date.now()}${ext}`;
      await uploadFile(file, savePath);
      reqData.videoUrl = savePath;
      delete reqData.homeworkText;
      break;
    case EModuleHomeworkType.Watch:
      delete reqData.homeworkText;
      delete reqData.videoUrl;
      break;
  }

  const data = await Homework.findOneAndUpdate(
    { moduleId: reqData.moduleId, userId: session.user.id },
    {
      userId: session.user.id,
      homeworkSubmittedAt: Date.now(),
      completed: false,
      status: EHomeworkStatus.Pending,
      videoUrl: reqData.videoUrl,
      homeworkText: reqData.homeworkText,
      moduleId: reqData.moduleId,
    },
    { new: true, upsert: true }
  );
  if (!data) {
    return NextResponse.json({ error: "invalid id param" }, { status: 400 });
  }
  return NextResponse.json({
    message: "Homework submitted successfully",
    data,
  });
}, true);
