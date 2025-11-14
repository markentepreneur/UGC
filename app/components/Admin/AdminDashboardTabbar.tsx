import React from "react";
import NavLink from "../ui/Navlink";

interface Props {
  userId: string;
}

const AdminDashboardTabbar: React.FC<Props> = ({ userId }) => {
  return (
    <div className="flex justify-center space-x-4 sm:space-x-6 my-4">
      <NavLink
        href={`/admin/dashboard/userDetails/${userId}`}
        className={`px-6 py-3 rounded-t-xl font-semibold transition-colors text-base sm:text-lg`}
        activeClassName="bg-blue-600 text-white shadow"
        passiveClassName="bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        Модулі
      </NavLink>
      <NavLink
        href={`/admin/dashboard/userDetails/${userId}/quiz`}
        className={`px-6 py-3 rounded-t-xl font-semibold transition-colors text-base sm:text-lg`}
        activeClassName="bg-blue-600 text-white shadow"
        passiveClassName="bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        Квіз
      </NavLink>
    </div>
  );
};

export default AdminDashboardTabbar;
