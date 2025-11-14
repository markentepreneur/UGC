"use client";
import { useDataList } from "@/hooks/useDataList";
import { IUser } from "@/interfaces/IUser";
import { fetchRequest } from "@/lib/fetchTools";
import React, { useState } from "react";
import ErrorView from "../ui/ErrorView";
import { LoaderCircle } from "lucide-react";
import Pagination from "../ui/Pagination";
import { useRouter } from "next/navigation";

interface Props {
  leadsProp: IUser[];
  itemsPerPage: number;
  totalCountProp: number;
}

const AdminLeadsClient: React.FC<Props> = ({
  leadsProp,
  itemsPerPage,
  totalCountProp,
}) => {
  const router = useRouter();
  const [filterPaids, setFilterPaids] = useState(false);
  const fetchData = (page: number, paid?: boolean) => {
    return fetchRequest<{
      data: IUser[];
      totalCount: number;
    }>(`/api/admin/users/?page=${page}&limit=${itemsPerPage}&paidAt=${paid}`);
  };
  const {
    data: leads,
    loading,
    updateLoading,
    error,
    onUpdateData,
    totalCount,
    curPage,
  } = useDataList(fetchData, false, leadsProp);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <LoaderCircle className="animate-spin" size={48} />
        <span style={{ marginLeft: "16px", fontSize: "1.1rem" }}>
          Loading...
        </span>
      </div>
    );
  }
  if (error)
    return (
      <ErrorView
        error={new Error("Failed to load")}
        reset={() => onUpdateData(curPage)}
      />
    );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Користувачі на сторінці оффера
        </h2>
        {/* Filter options */}
        <div className="flex items-center gap-3">
          <label className="flex items-center text-sm font-normal text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className={`mr-1.5 accent-custom-sage ${
                updateLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              checked={filterPaids}
              disabled={updateLoading}
              onChange={() => {
                setFilterPaids((v) => {
                  onUpdateData(curPage, !v);
                  return !v;
                });
              }}
            />
            Оплатили
            {updateLoading && (
              <span className="ml-2">
                <LoaderCircle
                  className="animate-spin text-custom-sage"
                  size={18}
                />
              </span>
            )}
          </label>
        </div>
      </div>
      <div className="overflow-x-auto">
        {leads.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            Немає користувачів для відображення.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата реєстрації
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr
                  onClick={() =>
                    router.push(`/admin/dashboard/userDetails/${lead._id}`)
                  }
                  key={lead._id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                    {lead.email}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleString("uk-UA")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={curPage}
          totalCount={totalCountProp || totalCount}
          onPageChange={onUpdateData}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default AdminLeadsClient;
