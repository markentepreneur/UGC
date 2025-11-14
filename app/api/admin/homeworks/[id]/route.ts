import { withRoute } from "@/lib/routeWrapper";
import { Homework } from "@/models/homeworkModel";
import { UserRoles } from "@/types/UserRoles";
import { NextResponse } from "next/server";

export const PUT = withRoute<{ id: string }>(
  async (req, session, params) => {
    const reqData = await req.json();

    const data = await Homework.findByIdAndUpdate(
      params?.id,
      {
        adminFeedback: reqData.adminFeedback,
        grade: reqData.grade,
        status: reqData.status,
        completed: reqData.completed,
      },
      { new: true, upsert: true }
    );
    if (!data) {
      return NextResponse.json({ error: "invalid id param" }, { status: 400 });
    }
    return NextResponse.json({
      message: "Homework updated successfully",
      data,
    });
  },
  true,
  UserRoles.admin
);
