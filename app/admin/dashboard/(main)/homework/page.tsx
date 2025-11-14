import AdminHomeworkClient from "@/app/components/Admin/AdminHomeworkClient";
import { IHomeworkWithModule } from "@/interfaces/IHomeworkWithModule";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";
import React from "react";
const ITEMS_PER_PAGE = 20;

const AdminHomeworksPage = async () => {
  const homeworks = await fetchRequestFromServer<{
    data: IHomeworkWithModule[];
    totalCount: number;
  }>(`/api/admin/homeworks/?limit=${ITEMS_PER_PAGE}&page=1`);

  return (
    <AdminHomeworkClient
      itemsPerPage={ITEMS_PER_PAGE}
      homeworksProp={homeworks.data}
      totalCountProp={homeworks.totalCount}
    />
  );
};

export default AdminHomeworksPage;
