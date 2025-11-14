import React from "react";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Оплата пройшла успішно!
      </h2>
      <p className="text-gray-700 mb-6">
        Дякуємо за покупку курсу. Ви вже маєте повний доступ до платформи.
      </p>
      <Link
        href="/client/dashboard"
        className="px-6 py-3 text-white bg-custom-sage rounded-lg hover:bg-custom-sage-dark transition"
      >
        Перейти до дашборду
      </Link>
    </div>
  );
};

export default PaymentSuccess;
