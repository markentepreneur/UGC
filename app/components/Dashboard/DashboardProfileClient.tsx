"use client";
import { Star, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface Props {
  modulesCount: number;
  completedHomeworksCount: number;
  submitedHomeworksCount: number;
}

const DashboardProfileClient: React.FC<Props> = ({
  modulesCount,
  completedHomeworksCount,
  submitedHomeworksCount,
}) => {
  const onLogout = async () => {
    await signOut({ callbackUrl: "/client/auth/login", redirect: true });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-4 md:p-6 relative overflow-hidden shadow-xl border border-gray-600">
        <div className="relative flex items-center gap-3 md:gap-4">
          <div className="flex-shrink-0 order-2 md:order-2">
            <Image
              src="/dashboard/profile/profile.png"
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain drop-shadow-2xl"
              width={144}
              height={144}
            />
          </div>
          <div className="flex-1 order-1 md:order-1 text-left">
            <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-2">
              <UserCircle className="w-3 h-3 text-gray-200" />
              <span className="text-[9px] md:text-[10px] font-semibold text-gray-200 uppercase tracking-wide">
                Твой аккаунт
              </span>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-white mb-1.5 md:mb-2 drop-shadow-sm leading-tight">
              Профіль
            </h2>
            <p className="text-gray-300 text-xs md:text-sm leading-snug">
              Управляй своим аккаунтом и отслеживай прогресс
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-300">
        <div className="flex items-center space-x-5 mb-8 pb-6 border-b border-gray-300">
          <div className="w-24 h-24 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
            <UserCircle className="w-12 h-12 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              Студентка UGC
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              kberezhna Academy
            </p>
            <div className="mt-2 inline-flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-md">
              <Star className="w-3.5 h-3.5 text-gray-700 fill-gray-700" />
              <span className="text-xs font-semibold text-gray-700">
                Активный студент
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Прогрес навчання
              </span>
              <span className="text-lg font-bold text-gray-900">
                {completedHomeworksCount}/ {modulesCount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    modulesCount > 0
                      ? (completedHomeworksCount / modulesCount) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {completedHomeworksCount}
              </div>
              <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                Уроків пройдено
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {submitedHomeworksCount}
              </div>
              <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                Заданий выполнено
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          Вийти з акаунта
        </button>
      </div>
    </div>
  );
};

export default DashboardProfileClient;
