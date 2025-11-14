import { withRoute } from "@/lib/routeWrapper";
import { Homework } from "@/models/homeworkModel";
import { UserRoles } from "@/types/UserRoles";
import { NextResponse } from "next/server";

export const GET = withRoute<{ id: string }>(
  async (_req, _session, params) => {
    const data = await Homework.find({ userId: params?.id });

    if (!data) {
      return NextResponse.json({ error: "invalid id param" }, { status: 400 });
    }
    return NextResponse.json({
      message: "User homeworks  fetched successfully",
      data,
    });
  },
  true,
  UserRoles.admin
);
