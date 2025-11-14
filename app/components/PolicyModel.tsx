"use client";
import { X } from "lucide-react";
import React, { ReactNode } from "react";

export type PolicyModalType = "privacy" | "terms" | "payment" | "refund";
interface Props {
  type: PolicyModalType;
  onClose: () => void;
}

const contents: Record<
  PolicyModalType,
  { title: ReactNode; content: ReactNode }
> = {
  privacy: {
    title: "Політика конфіденційності",
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p className="text-lg">
          Ми цінуємо вашу конфіденційність та захищаємо ваші персональні дані.
        </p>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Які дані ми збираємо
          </h3>
          <p className="text-base">
            Ми збираємо тільки необхідну інформацію: email адресу та відповіді
            на квіз для персоналізації вашого навчання.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Як ми використовуємо дані
          </h3>
          <p className="text-base">
            Ваші дані використовуються виключно для надання доступу до курсу та
            покращення навчального досвіду.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Безпека даних
          </h3>
          <p className="text-base">
            Всі дані зберігаються в захищеній базі даних з використанням
            сучасних методів шифрування.
          </p>
        </div>
      </div>
    ),
  },
  terms: {
    title: "Умови використання",
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p className="text-lg">
          Використовуючи наш курс, ви погоджуєтесь з наступними умовами:
        </p>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Доступ до курсу
          </h3>
          <p className="text-base">
            Після оплати ви отримуєте необмежений доступ до всіх матеріалів
            курсу назавжди.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Авторські права
          </h3>
          <p className="text-base">
            Всі матеріали курсу захищені авторським правом. Забороняється
            копіювання та розповсюдження матеріалів без дозволу.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Відповідальність
          </h3>
          <p className="text-base">
            Ви несете відповідальність за збереження безпеки вашого облікового
            запису.
          </p>
        </div>
      </div>
    ),
  },
  payment: {
    title: "Умови оплати",
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Способи оплати
          </h3>
          <p className="text-base">
            Ми приймаємо оплату через безпечні платіжні системи.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Вартість курсу
          </h3>
          <p className="text-base">
            Спеціальна ціна: 1499 грн (замість 2999 грн). Оплата одноразова, без
            підписок.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Доступ після оплати
          </h3>
          <p className="text-base">
            Доступ до курсу надається автоматично одразу після підтвердження
            оплати.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Безпека платежів
          </h3>
          <p className="text-base">
            Всі платежі обробляються через захищені канали з використанням
            шифрування.
          </p>
        </div>
      </div>
    ),
  },
  refund: {
    title: "Політика повернення коштів",
    content: (
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Умови повернення
          </h3>
          <p className="text-base">
            Ви можете повернути кошти протягом 14 днів після покупки, якщо ви не
            отримали доступ до курсу з технічних причин.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Процес повернення
          </h3>
          <p className="text-base">
            Для повернення коштів зв&aposяжіться з нашою службою підтримки,
            вказавши номер замовлення та причину повернення.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Терміни повернення
          </h3>
          <p className="text-base">
            Кошти повертаються протягом 5-10 робочих днів після схвалення
            запиту.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 mb-3">Виключення</h3>
          <p className="text-base">
            Повернення коштів не здійснюється, якщо ви вже отримали доступ до
            більшості матеріалів курсу.
          </p>
        </div>
      </div>
    ),
  },
};

const PolicyModel: React.FC<Props> = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white animate-fade-in">
      <div className="h-full flex flex-col">
        <div className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {contents[type].title}
            </h2>
            <button
              onClick={onClose}
              className="p-3 rounded-full border-2 border-gray-900 hover:text-custom-sage hover:border-custom-sage text-black transition-all duration-300"
            >
              <X className="w-6 h-6 text-inherit" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {contents[type].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyModel;
