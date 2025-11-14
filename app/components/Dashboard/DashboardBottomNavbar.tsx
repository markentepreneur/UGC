"use client";
import { BookOpen, Sparkles, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import NavLink from "../ui/Navlink";

const navItems = [
  {
    key: "lessons",
    label: "Уроки",
    icon: BookOpen,
    href: "/client/dashboard",
    activeClassName: "text-custom-pink scale-110",
    passiveClassName: "text-gray-400 hover:text-gray-600",
    bgActive:
      "bg-gradient-to-br from-custom-pink-light to-custom-pink/20 shadow-md",
    bgPassive: "group-hover:bg-gray-50",
    type: "link",
  },
  {
    key: "tools",
    label: "Інструменти",
    icon: Sparkles,
    href: "/client/dashboard/tools",
    activeClassName: "text-[#8a9587] scale-110",
    passiveClassName: "text-gray-400 hover:text-gray-600",
    bgActive: "bg-gradient-to-br from-[#b8c4b5] to-[#a8b4a6]/40 shadow-md",
    bgPassive: "group-hover:bg-gray-50",
  },
  {
    key: "profile",
    label: "Профиль",
    icon: UserCircle,
    href: "/client/dashboard/profile",
    activeClassName: "text-gray-900 scale-110",
    passiveClassName: "text-gray-400 hover:text-gray-600",
    bgActive: "bg-gradient-to-br from-gray-200 to-gray-300 shadow-md",
    bgPassive: "group-hover:bg-gray-50",
  },
];

const DashboardBottomNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-custom-pink/10 px-6 py-4 shadow-2xl">
      <div className="max-w-6xl mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavLink
              key={item.key}
              href={item.href}
              activeClassName={item.activeClassName}
              passiveClassName={item.passiveClassName}
              className={`group flex flex-col items-center space-y-1.5 transition-all duration-300 `}
            >
              <div
                className={`p-2 rounded-2xl transition-all ${
                  isActive ? item.bgActive : item.bgPassive
                }`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default DashboardBottomNavbar;
