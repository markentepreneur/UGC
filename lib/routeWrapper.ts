import { NextResponse } from "next/server";
import { connectToDatabase } from "./mongoose";
import { AppError } from "@/utils/appError";
import { ErrorTypes } from "@/types/ErrorTypes";
import { UserRoles } from "@/types/UserRoles";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Wrap your route handler to:
 *  - connect to DB
 *  - catch errors
 *  - map Mongoose errors
 */
export function withRoute<P>(
  handler: (
    req: Request,
    session: Session | null,
    params: P | undefined
  ) => Promise<NextResponse>,
  sessionRequired?: boolean,
  roleRequired?: UserRoles
) {
  return async (
    req: Request,
    { params }: { params: Promise<P | undefined> }
  ) => {
    const session = await getServerSession(authOptions);
    const paramsRes = await params;

    if (sessionRequired) {
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      if (roleRequired) {
        if (session.user.role !== roleRequired) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      }
    }

    try {
      // Ensure Mongoose is connected
      await connectToDatabase();

      // Call the actual handler
      return await handler(req, session, paramsRes);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Convert Mongoose / Mongo errors to consistent AppError
      let error = new AppError(
        err.message || "Internal Server Error",
        err.statusCode || 500,
        err?.errors
      );

      // CastError
      if (err.name === "CastError") {
        error = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
      }

      // Duplicate key error
      if (err.code === 11000) {
        const entries = Object.entries(err.keyValue)
          .map(([k, v]) => `'${v}' for field '${k}'`)
          .join(",");
        error = new AppError(
          `Duplicate value(s) ${entries}`,
          400,
          Object.fromEntries(
            Object.keys(err.keyValue).map((k) => [k, ErrorTypes.duplicateValue])
          )
        );
      }

      // ValidationError
      if (err.name === "ValidationError") {
        const fieldErrors: Record<string, string> = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.entries(err.errors).forEach(([k]: any) => {
          fieldErrors[k] = ErrorTypes.invalidvalue;
        });
        error = new AppError("Invalid input data", 400, fieldErrors);
      }

      return NextResponse.json(
        {
          status: "error",
          message: error.message,
          errors: error.errors || null,
        },
        { status: error.statusCode }
      );
    }
  };
}
