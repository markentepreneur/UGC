import { withRoute } from "@/lib/routeWrapper";
import { User } from "@/models/userModel";
import { UserRoles } from "@/types/UserRoles";
import { ApiFeatures } from "@/utils/apiFeatures";
import { NextResponse } from "next/server";

export const GET = withRoute(
  async (req) => {
    const { searchParams } = new URL(req.url);

    const filter = {
      role: { $ne: UserRoles.admin },
      paidAt: { $exists: searchParams.get("paidAt") === "true" },
    };
    const query = User.find(filter);
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
