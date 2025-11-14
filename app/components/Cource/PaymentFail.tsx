import React from "react";
import Link from "next/link";

const PaymentFail = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Помилка оплати</h2>
      <p className="text-gray-700 mb-6">
        Щось пішло не так під час оплати. Будь ласка, спробуйте ще раз.
      </p>
      <Link
        href="/client/cource"
        className="px-6 py-3 text-white bg-custom-sage rounded-lg hover:bg-custom-sage-dark transition"
      >
        Повернутися до курсу
      </Link>
    </div>
  );
};

export default PaymentFail;
