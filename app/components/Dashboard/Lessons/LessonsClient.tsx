"use client";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import React from "react";
import LessonCard from "./Lessoncard";
import { IHomework } from "@/interfaces/IHomework";
import { IModule } from "@/interfaces/IModule";
import { EHomeworkStatus } from "@/types/EHomeworkStatus";

interface Props {
  homeworks: IHomework[];
  modules: IModule[];
}

const LessonsClient: React.FC<Props> = ({ homeworks, modules }) => {
  const getModuleStatus = (index: number) => {
    const curModule = modules.at(index);
    const prevModule = modules.at(index - 1);

    const moduleHomework = homeworks.find(
      (item) => item.moduleId === curModule?._id
    );
    const prevModuleHomework = homeworks.find(
      (item) => item.moduleId === prevModule?._id
    );
    if (curModule) {
      if (moduleHomework?.completed) return "completed";

      if (
        index === 0 ||
        (prevModuleHomework &&
          prevModuleHomework?.status !== EHomeworkStatus.Pending)
      )
        return "unlocked";
    }

    return "locked";
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-custom-pink via-custom-pink-dark to-custom-sage rounded-3xl shadow-xl p-4 md:p-6 border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
        <div className="relative flex items-center gap-3 md:gap-4">
          <div className="flex-shrink-0 order-2 md:order-2">
            <Image
              src="/dashboard/lessons/ugcCreator.png"
              alt="UGC Creator"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain drop-shadow-2xl"
              width={144}
              height={144}
            />
          </div>
          <div className="flex-1 order-1 md:order-1 text-left">
            <div className="inline-flex items-center space-x-1.5 bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 mb-2">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[9px] md:text-[10px] font-semibold text-white uppercase tracking-wide">
                Твій навчальний шлях
              </span>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-white mb-1.5 md:mb-2 drop-shadow-sm leading-tight">
              «Стартовий пакет креатора»
            </h2>
            <p className="text-white/90 text-xs md:text-sm leading-snug">
              Привіт! Я Карина, і я дуже рада, що ти тут. Разом пройдемо шлях
              від основ до твоїх перших замовлень
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <p className="text-gray-600">
              Модулі не знайдено. Перевірте консоль браузера для деталей.
            </p>
          </div>
        ) : (
          modules.map((module, index) => {
            const status = getModuleStatus(index);

            const moduleHomework = homeworks.find(
              (item) => item.moduleId === module._id
            );
            const homeworkStatus = moduleHomework?.homeworkSubmittedAt
              ? moduleHomework.status !== EHomeworkStatus.Pending
                ? "reviewed"
                : "submitted"
              : "not_submitted";

            return (
              <LessonCard
                key={module._id}
                number={index + 1}
                title={module.title}
                id={module._id}
                status={
                  status === "completed"
                    ? "completed"
                    : status === "unlocked"
                    ? "available"
                    : "locked"
                }
                homeworkStatus={
                  status !== "locked" ? homeworkStatus : undefined
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default LessonsClient;
