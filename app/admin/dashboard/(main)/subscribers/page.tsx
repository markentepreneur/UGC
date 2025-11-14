import React from "react";

const AdminSubscribersPage = () => {
  const subscribers: {
    id: string;
    email: string;
    subscription_start_date: string | null;
    subscription_end_date: string | null;
  }[] = [
    {
      id: "1",
      email: "olena.symonenko@example.com",
      subscription_start_date: "2024-06-01T08:00:00Z",
      subscription_end_date: "2024-07-01T08:00:00Z",
    },
    {
      id: "2",
      email: "dmytro.kovalchuk@example.com",
      subscription_start_date: "2024-05-12T12:00:00Z",
      subscription_end_date: "2024-06-12T12:00:00Z",
    },
    {
      id: "3",
      email: "iryna.kushnir@example.com",
      subscription_start_date: "2024-06-10T15:30:00Z",
      subscription_end_date: "2024-07-10T15:30:00Z",
    },
    {
      id: "4",
      email: "andriy.bondarenko@example.com",
      subscription_start_date: "2024-06-05T09:00:00Z",
      subscription_end_date: "2024-07-05T09:00:00Z",
    },
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Активні підписники на інструменти (165 грн/міс)
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Початок підписки
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Кінець підписки
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscribers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 sm:px-6 py-8 text-center text-sm text-gray-500"
                >
                  Немає активних підписників
                </td>
              </tr>
            ) : (
              subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                    {subscriber.email}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                    {subscriber.subscription_start_date
                      ? new Date(
                          subscriber.subscription_start_date
                        ).toLocaleDateString("uk-UA")
                      : "-"}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                    {subscriber.subscription_end_date
                      ? new Date(
                          subscriber.subscription_end_date
                        ).toLocaleDateString("uk-UA")
                      : "-"}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Активна
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscribersPage;
