import { withRoute } from "@/lib/routeWrapper";
import { Module } from "@/models/moduleModel";
import { NextResponse } from "next/server";

export const GET = withRoute(async () => {
  const data = await Module.find({});
  return NextResponse.json({
    message: "Quiz questions fetched successfully",
    data,
  });
}, true);
