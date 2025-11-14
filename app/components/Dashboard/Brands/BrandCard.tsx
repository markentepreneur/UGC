"use client";
import React from "react";

interface Props {
  name: string;
  category: string;
}

const BrandCard: React.FC<Props> = ({ name, category }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 hover:border-[#9ca89f]/50 rounded-2xl p-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
          <p className="text-sm text-gray-600">{category}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-[#9ca89f]/20 text-[#4a5447] font-semibold px-3 py-1 rounded-full">
            Бартер
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
