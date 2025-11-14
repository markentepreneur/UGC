import { withRoute } from "@/lib/routeWrapper";
import { User } from "@/models/userModel";
import { UserRoles } from "@/types/UserRoles";
import { NextResponse } from "next/server";

export const GET = withRoute<{ id: string }>(
  async (_req, _session, params) => {
    if (!params?.id) {
      return NextResponse.json(
        { message: "Invalid request: ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(params?.id);

    return NextResponse.json({
      message: "User fetched successfully",
      data: user,
    });
  },
  true,
  UserRoles.admin
);
