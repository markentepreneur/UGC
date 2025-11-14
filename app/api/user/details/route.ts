import { withRoute } from "@/lib/routeWrapper";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

export const GET = withRoute(async (_req, session) => {
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(session.user.id);
  return NextResponse.json({
    message: "User Details fetched successfully",
    data: user,
  });
}, true);
