import { withRoute } from "@/lib/routeWrapper";
import { Homework } from "@/models/homeworkModel";
import { EHomeworkStatus } from "@/types/EHomeworkStatus";
import { UserRoles } from "@/types/UserRoles";
import { ApiFeatures } from "@/utils/apiFeatures";
import { NextResponse } from "next/server";

export const GET = withRoute(
  async (req) => {
    const { searchParams } = new URL(req.url);

    await import("@/models/moduleModel");
    await import("@/models/userModel");
    const query = Homework.find({
      status: EHomeworkStatus.Pending,
    })
      .populate("moduleId")
      .populate({ path: "userId", select: "email" })
      .sort({ createdAt: -1 });

    const features = new ApiFeatures(query, searchParams).paginate();
    const data = await features.query;
    const totalCount = await features.totalCount;
    return NextResponse.json({
      message: "Homeworks fetched successfully",
      data,
      totalCount,
    });
  },
  true,
  UserRoles.admin
);
