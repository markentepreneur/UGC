import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const CourceLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  // Protect route
  if (!session?.user) {
    redirect("/client/auth/login");
  }

  return children;
};

export default CourceLayout;
