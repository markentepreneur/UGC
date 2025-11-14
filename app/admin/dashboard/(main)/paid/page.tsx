import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminPaidPage = () => {
  const paidUsers: {
    id: string;
    email: string;
    created_at: string;
    subscription_active: string;
    subscription_end_date: string;
  }[] = [
    {
      id: "1",
      email: "user.one@example.com",
      created_at: "2024-06-01T11:00:00Z",
      subscription_active: "true",
      subscription_end_date: "2024-09-01T00:00:00Z",
    },
    {
      id: "2",
      email: "user.two@example.com",
      created_at: "2024-06-03T09:30:00Z",
      subscription_active: "false",
      subscription_end_date: "",
    },
    {
      id: "3",
      email: "user.three@example.com",
      created_at: "2024-06-04T14:15:00Z",
      subscription_active: "true",
      subscription_end_date: "2024-08-15T00:00:00Z",
    },
    {
      id: "4",
      email: "user.four@example.com",
      created_at: "2024-06-05T17:45:00Z",
      subscription_active: "false",
      subscription_end_date: "",
    },
    {
      id: "5",
      email: "user.five@example.com",
      created_at: "2024-06-06T08:05:00Z",
      subscription_active: "true",
      subscription_end_date: "2024-10-01T00:00:00Z",
    },
  ];
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Користувачі, які оплатили курс
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {paidUsers.map((user) => (
            <Link
              key={user.id}
              href={`/admin/dashboard/userDetails/${user.id}`}
              className="flex px-4 sm:px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                      {user.email}
                    </p>
                    {user.subscription_active && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 whitespace-nowrap">
                        Підписка
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Оплатив: {new Date(user.created_at).toLocaleString("uk-UA")}
                  </p>
                  {user.subscription_active && user.subscription_end_date && (
                    <p className="text-xs text-purple-600 mt-1">
                      Підписка до:{" "}
                      {new Date(user.subscription_end_date).toLocaleDateString(
                        "uk-UA"
                      )}
                    </p>
                  )}
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 transform rotate-180 flex-shrink-0 ml-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPaidPage;
