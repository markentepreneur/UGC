import AdminLeadsClient from "@/app/components/Admin/AdminLeadsClient";
import { IUser } from "@/interfaces/IUser";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";
import React from "react";
const ITEMS_PER_PAGE = 20;

const AdminLeadsPage = async () => {
  const res = await fetchRequestFromServer<{
    data: IUser[];
    totalCount: number;
  }>(`/api/admin/users?limit=${ITEMS_PER_PAGE}&page=1`);
  return (
    <AdminLeadsClient
      leadsProp={res.data}
      itemsPerPage={ITEMS_PER_PAGE}
      totalCountProp={res.totalCount}
    />
  );
};

export default AdminLeadsPage;
