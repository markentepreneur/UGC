"use client";
import NavLink from "@/app/components/ui/Navlink";
import { CheckCircle, DollarSign, FileText, User } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const navLinks = [
  {
    href: "/admin/dashboard",
    activeClassName: "bg-blue-600 text-white shadow-lg",
    icon: <User className="w-5 h-5" />,
    label: <>Ліди ({0 /* leads.length */})</>,
  },
  {
    href: "/admin/dashboard/paid",
    activeClassName: "bg-green-600 text-white shadow-lg",
    icon: <DollarSign className="w-5 h-5" />,
    label: <>Оплатили ({0 /* paidUsers.length */})</>,
  },
  {
    href: "/admin/dashboard/subscribers",
    activeClassName: "bg-purple-600 text-white shadow-lg",
    icon: (
      <>
        <CheckCircle className="w-5 h-5" />
        <span className="w-5 h-5" />
      </>
    ),
    label: <>Підписники ({0 /* subscribers.length */})</>,
  },
  {
    href: "/admin/dashboard/homework",
    activeClassName: "bg-orange-600 text-white shadow-lg",
    icon: <FileText className="w-5 h-5" />,
    label: <>Завдання ({0 /* homeworkSubmissions.length */})</>,
  },
];

const AdminDashboardMainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Адмін панель
              </h1>
            </div>
            <button
              onClick={() => {
                signOut({ callbackUrl: "/admin/login", redirect: true });
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 sm:px-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              Вийти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              activeClassName={link.activeClassName}
              passiveClassName="bg-white text-gray-700 hover:bg-gray-100 shadow"
              className={`flex items-center justify-center sm:justify-start space-x-2 px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-colors`}
            >
              {link.icon}
              <span className="text-sm sm:text-base">{link.label}</span>
            </NavLink>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AdminDashboardMainLayout;
