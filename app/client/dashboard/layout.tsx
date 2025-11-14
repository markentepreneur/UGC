import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  // Protect route
  if (!session?.user) {
    redirect("/client/auth/login");
  }

  // Payment check
  if (!session.user.paidAt) {
    redirect("/client/cource");
  }

  return children;
};

export default DashboardLayout;
