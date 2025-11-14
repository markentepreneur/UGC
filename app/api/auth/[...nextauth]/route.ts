import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/models/userModel";
import { connectToDatabase } from "@/lib/mongoose";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        if (!credentials?.email || !credentials?.password) return null;
        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          paidAt: user.paidAt,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.paidAt = user.paidAt;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        await connectToDatabase();

        // 🔄 Always fetch fresh user data from DB
        const freshUser = await User.findById(token.id).lean();

        if (freshUser) {
          session.user = {
            id: freshUser._id.toString(),
            email: freshUser.email,
            role: freshUser.role,
            paidAt: freshUser.paidAt, // always up to date
          };
        }
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
