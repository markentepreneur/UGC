import DashboardProfileClient from "@/app/components/Dashboard/DashboardProfileClient";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";
import React from "react";

const DashboardProfilePage = async () => {
  const res = await fetchRequestFromServer<{
    message: string;
    data: {
      modulesCount: number;
      completedHomeworksCount: number;
      submitedHomeworksCount: number;
    };
  }>("/api/user/stats");
  return <DashboardProfileClient {...res.data} />;
};

export default DashboardProfilePage;
