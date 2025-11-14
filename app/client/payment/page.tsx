"use client";
import { CheckCircle, Zap, Lock, Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const offerFeatures = [
  {
    title: "Повний доступ до всіх модулів курсу",
    description: "5 модулів з відео-уроками та практичними завданнями",
  },
  {
    title: "Шаблони для роботи з брендами",
    description: "Готові скрипти для листів, презентацій та переговорів",
  },
  {
    title: "Чек-листи та покрокові інструкції",
    description: "Від створення профілю до першого замовлення",
  },
  {
    title: "Доступ до спільноти креаторів",
    description: "Обмін досвідом, підтримка та нетворкінг",
  },
  {
    title: "Всі майбутні оновлення безкоштовно",
    description: "Курс постійно оновлюється новими матеріалами",
  },
];

type PaymentOptionProps = {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle?: string;
  disabled?: boolean;
};

const PaymentOption: React.FC<PaymentOptionProps> = ({
  selected,
  onSelect,
  title,
  subtitle,
  disabled = false,
}) => (
  <button
    type="button"
    onClick={onSelect}
    disabled={disabled}
    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
      selected
        ? "border-custom-sage bg-custom-sage/10"
        : "border-gray-200 bg-white hover:border-custom-sage/50"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <div className="flex items-center space-x-3">
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          selected ? "border-custom-sage" : "border-gray-300"
        }`}
      >
        {selected && (
          <div className="w-3 h-3 rounded-full bg-custom-sage"></div>
        )}
      </div>
      <div className="text-left">
        <p className="font-semibold text-gray-900">{title}</p>
        {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
      </div>
    </div>
    <Lock className="w-5 h-5 text-gray-400" />
  </button>
);

const PaymentPage = () => {
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 45);
  const [selectedPayment, setSelectedPayment] = useState<
    "card" | "paypal" | null
  >(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      //? onPaymentSuccess();
    }, 2000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-custom-pink-light overflow-y-auto">
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
              Знижка 50% діє до закінчення таймера
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Останній крок до твоєї нової кар&apos;єри
          </h1>
          <p className="text-lg text-gray-600">
            Оплати зараз і одразу почни навчатися
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-custom-pink-light rounded-3xl shadow-2xl p-8 mb-6 border-2 border-custom-sage/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Стартовий пакет UGC-креатора
            </h2>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-lg text-gray-500 line-through">
                2999 грн
              </span>
              <span className="text-5xl font-bold text-custom-sage">1499</span>
              <span className="text-xl text-gray-500">грн</span>
            </div>
            <p className="text-sm text-gray-600">
              Доступ назавжди. Без підписок та прихованих платежів.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Що ти отримаєш одразу після оплати:
            </h3>
            <div className="space-y-3">
              {offerFeatures.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-custom-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900 font-semibold">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-custom-sage/10 to-custom-pink/10 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-3 mb-4">
              <Zap className="w-6 h-6 text-custom-sage flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Почни працювати з брендами вже через місяць
                </h3>
                <p className="text-sm text-gray-600">
                  Багато наших учениць отримують перші замовлення вже через 2-3
                  тижні після початку навчання. Ти навчишся створювати контент,
                  який хочуть бренди, і дізнаєшся, де їх шукати.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-4">
              Обери спосіб оплати
            </h3>

            <PaymentOption
              selected={selectedPayment === "card"}
              onSelect={() => setSelectedPayment("card")}
              title="Картка Visa / Mastercard"
              subtitle="Миттєва оплата"
            />
            <PaymentOption
              selected={selectedPayment === "paypal"}
              onSelect={() => setSelectedPayment("paypal")}
              title="PayPal"
              subtitle="Безпечна оплата"
            />
          </div>

          <button
            onClick={handlePayment}
            disabled={!selectedPayment || isProcessing}
            className="w-full bg-custom-sage hover:bg-custom-sage-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 px-8 rounded-full text-lg shadow-lg transition-all duration-300 active:scale-95 mb-4"
          >
            {isProcessing ? "Обробка платежу..." : "Оплатити 1499 грн"}
          </button>

          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-4">
            <Lock className="w-4 h-4" />
            <span>Захищене з&apos;єднання. Ваші дані в безпеці.</span>
          </div>

          <div className="text-center">
            <Link
              href={"#"}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Повернутися назад
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className="w-5 h-5 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <p className="text-sm text-gray-700 text-center mb-3 italic">
            &quot;Курс повністю окупився вже після першого замовлення! Тепер
            працюю з 3 брендами постійно. Дякую за чіткі інструкції та
            підтримку!&quot;
          </p>
          <p className="text-xs text-gray-600 text-center font-semibold">
            — Марія, 26 років, UGC-креатор
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
