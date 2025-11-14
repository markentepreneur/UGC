import BrandCard from "@/app/components/Dashboard/Brands/BrandCard";
import Link from "next/link";
import React from "react";

const brands = [
  { name: "CeraVe", category: "Косметика" },
  { name: "L'Oréal Paris", category: "Косметика" },
  { name: "Maybelline", category: "Косметика" },
  { name: "Estée Lauder", category: "Преміум косметика" },
  { name: "Syoss", category: "Догляд за волоссям" },
  { name: "Coco&Eve", category: "Догляд за волоссям" },
  { name: "Shark", category: "Побутова техніка" },
];

const BrandsPage = () => {
  return (
    <div className="fixed inset-0 bg-custom-pink-light z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href={"/client/dashboard/tools"}
          className="mb-6 text-[#8a9587] hover:text-[#6a7567] font-medium flex items-center space-x-2"
        >
          <span>←</span>
          <span>Назад до інструментів</span>
        </Link>

        <div className="bg-gradient-to-br from-[#9ca89f] to-[#8a9587] rounded-3xl p-6 mb-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-2">
            Бренди для бартеру
          </h2>
          <p className="text-white/90 text-sm">
            Список брендів, готових до співпраці
          </p>
        </div>

        <div className="space-y-3 pb-24">
          {brands.map((item) => (
            <BrandCard key={item.name} name="CeraVe" category="Косметика" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
