import { NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { withRoute } from "@/lib/routeWrapper";
import { AppError } from "@/utils/appError";
import { ErrorTypes } from "@/types/ErrorTypes";
import { UserRoles } from "@/types/UserRoles";
import crypto from "crypto";
// import { sendRegistrationEmail } from "@/lib/posmark";

export const POST = withRoute(async (req: Request) => {
  const { email } = await req.json();

  if (!email)
    throw new AppError("Email is required", 400, {
      email: ErrorTypes.invalidvalue,
    });

  const generatedPassword = crypto
    .randomBytes(12)
    .toString("base64")
    .slice(0, 12);

  const newUser = await User.create({
    email,
    password: generatedPassword,
    role: UserRoles.client,
  });

  //   send password to email message
  // sendRegistrationEmail({
  //   to: email,
  //   password: generatedPassword,
  // });
  console.log({ generatedPassword });
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password,
    ...user
  } = newUser.toObject();
  return NextResponse.json({
    message: "User registered successfully",
    user,
  });
});
