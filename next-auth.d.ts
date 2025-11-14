// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      role?: string;
      id?: string | null;
      paidAt?: Date;
    };
  }

  interface User {
    role?: string;
    paidAt?: Date;
  }

  interface JWT {
    role?: string;
    paidAt?: Date;
  }
}
