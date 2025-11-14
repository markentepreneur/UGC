"use client";
import Image from "next/image";
import React from "react";
import CourceHeader from "../../components/Cource/CourceHeader";
import { fetchRequest } from "@/lib/fetchTools";

const INSTAGRAM_URL = "https://www.instagram.com/kberezhna/";

const brands = [
  {
    src: "/cource/maybelline.png",
    alt: "Maybelline",
  },
  {
    src: "/cource/shark.png",
    alt: "Shark Beauty",
  },
  {
    src: "/cource/ceraVe.png",
    alt: "CeraVe",
  },
  {
    src: "/cource/syoss.png",
    alt: "Syoss",
  },
  {
    src: "/cource/cocoEve.png",
    alt: "Coco & Eve",
  },
  {
    src: "/cource/loreal.png",
    alt: "L'Oréal",
  },
  {
    src: "/cource/privat24.png",
    alt: "Privat24",
  },
  {
    src: "/cource/esteeLauder.png",
    alt: "Estée Lauder",
  },
];

const courseBenefits = [
  {
    icon: "🎬",
    title: "Навчишся знімати відео, які купують бренди",
    description: "Я покажу покроково — від ідеї до готового ролику",
  },
  {
    icon: "🤝",
    title: "Дізнаєшся, як знаходити замовлення від брендів",
    description: "Покажу свої робочі схеми — без агентств і складностей",
  },
  {
    icon: "📱",
    title: "Прокачаєш свій профіль",
    description: "Щоб тебе знаходили бренди і хотіли з тобою працювати",
  },
  {
    icon: "💡",
    title: "Розберешся в структурі та сторітелінгу",
    description: "Навчу робити ролики, які захоплюють і продають",
  },
  {
    icon: "🎥",
    title: "Станеш впевненою перед камерою",
    description:
      "Покажу, як працювати зі світлом і знімати красиво навіть на телефон",
  },
  {
    icon: "💼",
    title: "Зробиш портфоліо, яке працює за тебе",
    description: "Покажеш свій стиль і почнеш отримувати замовлення",
  },
  {
    icon: "🚀",
    title: "Опануєш просування UGC-креатора",
    description: "Покажу, як рости, не витрачаючи гроші на рекламу",
  },
];

const reviews = [
  {
    src: "/cource/dummyAvatar.jpeg",
    alt: "Учасниця 1",
    name: "Анна, 24 роки",
    text: "За місяць після курсу отримала перші 3 платні замовлення від брендів косметики. Тепер заробляю від 50 000₴ на місяць на зйомках UGC-контенту. Раніше навіть не думала, що це можливо!",
  },
  {
    src: "/cource/dummyAvatar2.webp",
    alt: "Учасниця 2",
    name: "Марія, 28 років",
    text: "Пройшла курс і одразу створила портфоліо. Вже через 2 тижні отримала пропозицію від великого бренду одягу. Зняла для них 5 роликів, які набрали тисячі переглядів!",
  },
  {
    src: "/cource/dummyAvatar3.webp",
    alt: "Учасниця 3",
    name: "Олена, 31 рік",
    text: "Я мама в декреті, і цей курс допоміг мені почати працювати з брендами, не виходячи з дому. За 3 місяці почала регулярно отримувати замовлення. Знімаю контент для фуд-брендів і товарів для дітей!",
  },
  {
    src: "/cource/dummyAvatar4.jpeg",
    alt: "Учасниця 4",
    name: "Дарʼя, 22 роки",
    text: "Після курсу зрозуміла, як правильно знімати та монтувати контент. Тепер працюю з 7 постійними брендами і отримую замовлення щотижня. Відчуваю себе справжнім професіоналом!",
  },
];

const faqItems = [
  {
    question: "Чи підійде новачку?",
    answer:
      "Так, курс створений спеціально для тих, хто тільки починає. Я навчу тебе всьому з нуля — від налаштування телефону до монтажу і перших замовлень від брендів.",
  },
  {
    question: "Чи можна знімати тільки на телефон?",
    answer:
      "Так! Більшість брендів приймають контент, знятий на сучасний смартфон. Я покажу, як виставити світло та ракурс, щоб відео виглядало професійно.",
  },
  {
    question: "Як швидко я зможу почати працювати з брендами?",
    answer:
      "Багато моїх студенток отримують перші замовлення вже через 2-3 тижні після старту. Я покажу, де шукати бренди і як правильно з ними працювати.",
  },
];

const courseIncludes = [
  {
    icon: "🎥",
    title: "9 відеоуроків",
    description:
      "Короткі і практичні, без води — тільки те, що реально потрібне для старту",
  },
  {
    icon: "📸",
    title: "Практичні завдання",
    description: "Для кожного уроку — щоб ти відразу закріпила знання ділом",
  },
  {
    icon: "🛠️",
    title: "Готові шаблони",
    description:
      "Бриф для бренду, шаблон пропозиції, портфоліо, чек-листи — бери й використовуй",
  },
  {
    icon: "💬",
    title: "Чат підтримки",
    description:
      "Спільнота дівчат, які так само починають як і ти — тут тебе завжди підтримають",
  },
];

const CourceClient = () => {
  const onPay = async () => {
    const res = await fetchRequest<object>("/api/payment", "POST", {});
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://secure.wayforpay.com/pay";

    Object.keys(res).forEach((key) => {
      const value = res[key as keyof typeof res];
      const input = document.createElement("input");
      input.type = "hidden";
      if (Array.isArray(value)) {
        input.name = key + "[]";
        input.value = value[0];
      } else {
        input.name = key;
        input.value = value as string;
      }
      form.appendChild(input);
    });

    document.body.appendChild(form);

    form.submit();
  };

  return (
    <div className="min-h-screen bg-custom-pink-light overflow-y-auto">
      <CourceHeader />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Дивись, що я для тебе підготувала!
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
            За цим планом ти зможеш почати працювати з брендами вже цього місяця
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Я зібрала все, що сама використовувала на старті — тільки перевірені
            інструменти
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/cource/iphone.png"
              alt="Course Platform"
              className="w-48 md:w-64 mx-auto object-contain"
              width={256}
              height={256}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Що включає курс
          </h2>

          <div className="bg-custom-sage-light/20 rounded-xl p-6 mb-6 border-2 border-custom-sage/30">
            <div className="flex items-start space-x-3 mb-4">
              <div className="text-3xl flex-shrink-0">🎥</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">9 відеоуроків</h3>
                <p className="text-sm text-gray-700">
                  Кожен урок — це структурована інформація, яку легко сприймати.
                  Вся теорія підкріплена прикладами з моєї практики
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 mb-4">
              <div className="text-3xl flex-shrink-0">📝</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Домашні завдання
                </h3>
                <p className="text-sm text-gray-700">
                  Після кожного уроку — практичне завдання, щоб закріпити
                  матеріал і почати застосовувати знання одразу
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-3xl flex-shrink-0">💬</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Особистий фідбек від мене
                </h3>
                <p className="text-sm text-gray-700">
                  Я особисто перевіряю кожне домашнє завдання та даю детальний
                  зворотний зв&apos;язок. Ти отримаєш конкретні рекомендації, що
                  покращити у твоїх роботах
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Що ми будемо робити разом
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {courseIncludes.map((item, index) => (
              <div
                key={index}
                className="bg-custom-pink-light p-4 rounded-xl text-center"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-custom-pink-light rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border-2 border-custom-sage/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Чому варто обрати саме мій курс?
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <Image
                src="/cource/instagramAvatar.png"
                alt="Каріна - інфлюєнсер і контент-кріейтор"
                className="w-full h-full object-cover rounded-full drop-shadow-lg"
                width={128}
                height={128}
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-gray-700 leading-relaxed mb-4">
                Я інфлюєнсер і контент-кріейтор з понад{" "}
                <span className="font-semibold text-custom-pink-dark">
                  п&apos;ятирічним досвідом
                </span>
                . Створюю б&apos;юті та фешн контент, веду свій влог і
                співпрацюю з брендами.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white px-4 py-2 rounded-full shadow-sm border-2 border-custom-pink/30 flex items-center gap-2 hover:shadow-md hover:border-custom-pink/50 transition-all duration-200 cursor-pointer"
                >
                  <Image
                    src="/cource/instagram.png"
                    alt="Instagram"
                    className="w-4 h-4 object-contain"
                    width={16}
                    height={16}
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    90K+ підписників
                  </span>
                </a>
                <a
                  href="https://www.tiktok.com/@kberezhnaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white px-4 py-2 rounded-full shadow-sm border-2 border-custom-pink/30 flex items-center gap-2 hover:shadow-md hover:border-custom-pink/50 transition-all duration-200 cursor-pointer"
                >
                  <Image
                    src="/cource/tiktok.png"
                    alt="TikTok"
                    className="w-4 h-4 object-contain"
                    width={16}
                    height={16}
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    500K+ підписників
                  </span>
                </a>
              </div>
              <p className="text-gray-700 leading-relaxed">
                За цей час я зняла{" "}
                <span className="font-semibold text-custom-sage-dark">
                  сотні відео
                </span>
                , навчилася працювати з різними форматами та розуміти, що саме
                &quot;чіпляє&quot; аудиторію. Тепер хочу поділитися цим досвідом
                і допомогти тобі створювати контент, який не просто збирає
                перегляди, а й{" "}
                <span className="font-semibold text-custom-sage-dark">
                  приносить реальний дохід
                </span>{" "}
                ❤️
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-custom-sage/10 to-custom-pink-light/30 rounded-2xl p-6 mb-6 border-2 border-custom-sage/20">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
              Хочеш жити як блогер, але без мільйона підписників?
            </h3>
            <p className="text-center text-gray-700 mb-6">
              Я розповім, як отримувати подарунки від брендів, відвідувати
              закриті евенти і салони краси — все це доступно тобі вже зараз
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-md text-center border-2 border-custom-sage/30">
                <div className="text-4xl mb-3">🎁</div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Подарунки від брендів
                </h4>
                <p className="text-sm text-gray-600">
                  Косметика, одяг, техніка — я розповім, як отримувати все це
                  безкоштовно
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md text-center border-2 border-custom-sage/30">
                <div className="text-4xl mb-3">✨</div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Доступ на евенти
                </h4>
                <p className="text-sm text-gray-600">
                  Презентації, запуски, закриті заходи — сама часто туди ходжу і
                  тебе навчу
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md text-center border-2 border-custom-sage/30">
                <div className="text-4xl mb-3">💅</div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Б&apos;юті-привілеї
                </h4>
                <p className="text-sm text-gray-600">
                  Покажу, як отримувати безкоштовні послуги салонів за контент
                </p>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border-2 border-custom-sage/40">
              <p className="text-center text-gray-800 font-semibold text-base md:text-lg mb-2">
                💡 І це все без величезної аудиторії!
              </p>
              <p className="text-center text-gray-600 text-sm md:text-base">
                Брендам потрібен якісний контент, а не мільйони підписників. Я
                знаю, як це працює зсередини, тому що живу цим кожен день. У
                мене є реальний досвід, реальні результати і реальна підтримка
                від брендів. І я щиро хочу, щоб у тебе теж це вийшло!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="bg-gradient-to-br from-custom-pink-light to-white rounded-2xl p-6 mb-6 border-2 border-custom-sage">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                «Стартовий пакет креатора»
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700 flex items-center justify-center">
                  <span className="mr-2">💬</span> Доступ до всіх модулів і
                  матеріалів
                </p>
                <p className="text-sm text-gray-700 flex items-center justify-center">
                  <span className="mr-2">⏰</span> Без підписок, назавжди
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md mb-4">
              <div className="text-center">
                <div className="text-sm text-gray-500 line-through mb-3">
                  замість 2999 грн
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-custom-sage">
                    1499
                  </span>
                  <span className="text-xl font-normal text-gray-500">грн</span>
                </div>
              </div>
            </div>

            <button
              onClick={onPay}
              className="flex justify-center items-center w-full bg-custom-sage hover:bg-custom-sage-dark text-white font-bold py-5 px-8 rounded-full text-lg shadow-lg transition-all duration-300 active:scale-95 mb-3"
            >
              Отримати курс за 1499 грн
            </button>

            <p className="text-xs text-center text-gray-600">
              Доступ одразу після оплати. Всі оновлення назавжди твої.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Що ти отримаєш на курсі
          </h2>

          <div className="space-y-4">
            {courseBenefits.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Результати учасниць школи
          </h2>

          <div className="overflow-x-auto -mx-8 px-8">
            <div
              className="flex space-x-4 pb-4"
              style={{ minWidth: "max-content" }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-custom-pink-light rounded-xl p-6 flex-shrink-0 w-80"
                >
                  <div className="flex items-start space-x-4">
                    <Image
                      src={review.src}
                      alt={review.alt}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      width={64}
                      height={64}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-700">{review.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-custom-sage-light/20 rounded-2xl shadow-xl p-8 mb-6 border-2 border-custom-sage/20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Бренди, з якими я співпрацюю
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Ці та багато інших брендів довіряють мені свою рекламу. Я навчу
            тебе, як вибудувати такі ж партнерства
          </p>

          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
              {brands.map((brand) => (
                <div
                  key={brand.alt}
                  className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center p-2 transition-transform hover:scale-105"
                >
                  <Image
                    width={80}
                    height={80}
                    src={brand.src}
                    alt={brand.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 italic">
              🤝 І це тільки частина. Кожен місяць — нові проєкти з топовими
              компаніями
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ❓ FAQ
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="bg-custom-pink-light rounded-xl p-5 cursor-pointer group"
              >
                <summary className="font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{item.question}</span>
                  <span className="text-custom-sage text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm text-gray-700 mt-3 pl-0">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-custom-pink-light to-white rounded-2xl p-6 border-2 border-custom-sage">
          <div className="bg-white rounded-xl p-6 shadow-md mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 line-through mb-3">
                замість 2999 грн
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-custom-sage">
                  1499
                </span>
                <span className="text-xl font-normal text-gray-500">грн</span>
              </div>
            </div>
          </div>

          <button
            onClick={onPay}
            className="flex justify-center items-center w-full bg-custom-sage hover:bg-custom-sage-dark text-white font-bold py-5 px-8 rounded-full text-lg shadow-lg transition-all duration-300 active:scale-95 mb-3"
          >
            Купити курс за 1499 грн
          </button>

          <p className="text-xs text-center text-gray-600">
            Миттєвий доступ після оплати. Підтримка та оновлення включені.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourceClient;
