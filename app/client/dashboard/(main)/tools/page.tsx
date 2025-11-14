import { Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardToolsPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#9ca89f] via-[#a8b4a6] to-[#8a9587] rounded-3xl p-4 md:p-6 relative overflow-hidden shadow-xl border border-white/20">
        <div className="relative flex items-center gap-3 md:gap-4">
          <div className="flex-shrink-0 order-2 md:order-2">
            <Image
              src="/dashboard/tools/contentCreator.png"
              alt="Content Creator"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain drop-shadow-2xl"
              width={144}
              height={144}
            />
          </div>
          <div className="flex-1 order-1 md:order-1 text-left">
            <div className="inline-flex items-center space-x-1.5 bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 mb-2">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[9px] md:text-[10px] font-semibold text-white uppercase tracking-wide">
                Твої помічники
              </span>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-white mb-1.5 md:mb-2 drop-shadow-sm leading-tight">
              ✨ Інструменти
            </h2>
            <p className="text-white/90 text-xs md:text-sm leading-snug">
              Корисні інструменти та ресурси, які я сама використовую
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href={"/client/dashboard/brands"}
          className="group relative bg-white rounded-3xl shadow-md p-6 transition-all duration-300 border-2 cursor-pointer hover:shadow-xl hover:-translate-y-1 border-transparent hover:border-[#9ca89f]/40"
        >
          <div className="flex items-start space-x-4">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-[#9ca89f] to-[#8a9587] group-hover:scale-110 shadow-lg">
                <Heart className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#9ca89f]/20 text-[#4a5447]">
                  💼 База
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 transition-colors text-[#4a5447] group-hover:text-[#8a9587]">
                Бренди для бартеру
              </h3>
              <p className="text-sm leading-relaxed text-[#5a6557]">
                Список брендів, готових до бартерної співпраці
              </p>
            </div>
          </div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#9ca89f]/0 via-[#9ca89f]/10 to-[#9ca89f]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardToolsPage;
