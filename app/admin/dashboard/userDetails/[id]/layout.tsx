import AdminDashboardTabbar from "@/app/components/Admin/AdminDashboardTabbar";
import LogoutBtn from "@/app/components/Admin/LogoutBtn";
import { IUser } from "@/interfaces/IUser";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const UserDetailsLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const p = await params;
  const res = await fetchRequestFromServer<{ data: IUser }>(
    `/api/admin/users/${p.id}`
  );
  const selectedUser = res.data;
  if (!selectedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center max-w-md mx-auto">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Користувача не знайдено
          </h2>
          <p className="mb-4 text-gray-700">
            Виникла помилка при завантаженні даних користувача або користувача
            не існує.
          </p>
          <Link
            href="#"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            ← Повернутися назад
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href={"/admin/dashboard/paid"}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Назад</span>
              </Link>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Деталі користувача
              </h1>
            </div>
            <LogoutBtn />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {selectedUser && (
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
              <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <h2 className="text-lg sm:text-xl font-bold">
                  {selectedUser.email}
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm mt-1">
                  Оплатив:{" "}
                  {new Date(selectedUser.createdAt).toLocaleString("uk-UA")}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <AdminDashboardTabbar userId={selectedUser._id} />
            </div>

            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsLayout;
