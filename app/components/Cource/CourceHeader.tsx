"use client";
import React, { useEffect, useState } from "react";

const CourceHeader = () => {
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 45);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-custom-sage to-custom-sage-dark shadow-lg">
      <div className="max-w-3xl mx-auto px-6 py-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-1">
            <div className="flex items-baseline">
              <span className="text-5xl font-bold text-white">
                {String(minutes).padStart(2, "0")}
              </span>
              <span className="text-sm text-white/90 ml-1">хв</span>
            </div>
            <span className="text-5xl font-bold text-white">:</span>
            <div className="flex items-baseline">
              <span className="text-5xl font-bold text-white">
                {String(seconds).padStart(2, "0")}
              </span>
              <span className="text-sm text-white/90 ml-1">сек</span>
            </div>
          </div>
          <p className="text-sm text-white/95 font-medium">
            Спеціальна пропозиція діє
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourceHeader;
