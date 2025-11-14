"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutBtn = () => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/admin/login", redirect: true });
      }}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 sm:px-4 rounded-lg transition-colors text-sm sm:text-base"
    >
      Вийти
    </button>
  );
};

export default LogoutBtn;
