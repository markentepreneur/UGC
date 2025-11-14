// Create module documents by looping over seed data

import { Module } from "@/models/moduleModel";

const SEED_MODULES = [
  {
    title: "Модуль 1. Знайомство з професією UGC-креатора та контентмейкера",
    description:
      "• Хто такий UGC-креатор і чим він відрізняється від блогера\n• Скільки можна заробляти",
    videoUrl: "https://www.youtube.com/embed/NZETTTNbqdk",
    homeworkType: "watch",
    taskDescription: `<span style="color:#222;font-size:16px;">Пройди тест, щоб переконатися, що ти зрозумів(ла) основи професії UGC-креатора.</span>`,
    inputLabel: undefined,
    inputPlaceholder: undefined,
  },
  {
    title: "Модуль 2. Мобільна зйомка: техніка, світло, композиція",
    description:
      "• Як знімати якісно на телефон\n• Моя техніка, штатив, камери, мікрофон — яке обладнання потрібно для старту\n\nПрактика (воркшоп):\n• Як правильно ставити телефон на штатив\n• Освітлення та постановка кадру",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    homeworkType: "upload",
    taskDescription: `<div style="color:#2d3748;line-height:1.5;margin-bottom:10px;font-size:15px;">
        <p>Зніми коротке UGC-відео (до 30 секунд), де ти <b>нативно показуєш продукт</b>, без прямої реклами, але з чітким розумінням, чому він корисний і для кого.</p>
        <p style="color:#607080;font-style:italic;font-size:13px;">(Не обов'язково ідеальна зйомка — головне, щоб був сенс і структура.)</p>
      </div>`,
    inputLabel: "Завантажити відео (MP4, MOV, AVI)",
    inputPlaceholder: undefined,
  },
  {
    title: "Модуль 3. Монтаж без складнощів",
    description:
      "• Базові прийоми та легкі програми (CapCut, VN, Splice тощо)\n• Колір, переходи, субтитри\n• Збереження якості при експорті\n• Практика створення короткого відео",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    homeworkType: "upload",
    taskDescription: `<div style="color:#2d3748;font-size:15px;">
        <div style="margin-bottom:8px;">
          <span style="font-weight:600;display:block;">1. Змонтуй коротке відео (до 20–30 секунд) у будь-якому зручному додатку.</span>
          <span style="font-size:13px;">Обери будь-яку тему — наприклад, тест продукту, ранкову рутину чи <span style="font-style:italic;">before/after</span> — головне, щоб було цікаво і логічно.</span>
        </div>
        <div>
          <span style="font-weight:600;display:block;margin-bottom:4px;">2. Використай у відео:</span>
          <ul style="margin-left:18px;list-style-type:disc;">
            <li>мінімум 2 переходи,</li>
            <li>корекцію кольору (яскравість, контраст, тіні тощо),</li>
            <li>субтитри або текст на екрані.</li>
          </ul>
        </div>
      </div>`,
    inputLabel: "Завантажити відео (MP4, MOV, AVI)",
    inputPlaceholder: undefined,
  },
  {
    title: "Модуль 4. Створення професійного UGC-контенту",
    description:
      '• Побудова сценарію та сторітелінгу\n• Як продавати продукт "нативно"\n• Тренди у Reels і TikTok\n• Приклади відео, які купують бренди',
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    homeworkType: "watch",
    taskDescription: `<span style="color:#222;font-size:16px;">Пройди тест, щоб перевірити свої знання про сценарії, сторітелінг та нативну рекламу у UGC.</span>`,
    inputLabel: undefined,
    inputPlaceholder: undefined,
  },
  {
    title: "Модуль 5. Підготовка профілю до співпраці з брендами",
    description:
      "• Оформлення шапки профілю\n• Упакування блогу (стиль, біо, закріпи, візуал)\n• Приклади ідеального портфоліо\n• Як зробити та заповнити UGC-портфоліо (шаблони)",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    homeworkType: "input",
    taskDescription: `<ul style="color:#2d3748;font-size:15px;margin-bottom:10px;">
        <li style="margin-bottom:3px;">Онови свій профіль: напиши нове біо, оформи шапку, додай актуальні закріпи.</li>
        <li style="margin-bottom:3px;">Створи своє перше UGC-портфоліо (у Canva або Notion).</li>
        <li style="margin-bottom:3px;">Надішли скрін або лінк на свій профіль для фідбеку.</li>
      </ul>`,
    inputLabel: "Лінк на профіль або портфоліо",
    inputPlaceholder:
      "Вставте посилання на свій профіль Instagram, TikTok або UGC-портфоліо...",
  },
  {
    title: "Модуль 6. Як знаходити бренди та пропонувати свої послуги",
    description:
      "• Як правильно писати листи брендам (приклади повідомлень)\n• Платформи для пошуку замовлень (Collabstr, Billo, Trend.io тощо)\n• Як працювати з агентствами\n• Переговори та ціноутворення",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    homeworkType: "input",
    taskDescription: `<ul style="color:#2d3748;font-size:15px;">
        <li>Напиши лист бренду (по шаблону).</li>
      </ul>`,
    inputLabel: "Твій лист бренду",
    inputPlaceholder: "Напиши свій лист бренду тут...",
  },
  {
    title: "Модуль 7. Розвиток особистого бренду",
    description:
      "• Контент-план для особистого блогу\n• Як органічно рости в соцмережах без витрат\n• Як побудувати власний бренд, щоб бренди самі тебе знаходили",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    homeworkType: "watch",
    taskDescription: `<span style="color:#222;font-size:16px;">Пройди тест на розуміння концепції особистого бренду й основ його розвитку.</span>`,
    inputLabel: undefined,
    inputPlaceholder: undefined,
  },
  {
    title: "Модуль 8. Монетизація та співпраці",
    description:
      "• Як правильно писати брендам та пропонувати свої послуги\n• Бартер vs платна співпраця\n• Що робити, якщо бренд хоче лише одне відео\n• Формування цін",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    homeworkType: "input",
    taskDescription: `<p style="color:#2d3748;font-size:15px;line-height:1.4;">Створи шаблон відповіді бренду, який пропонує бартер, але ти хочеш перевести співпрацю в платний формат.</p>`,
    inputLabel: "Твій шаблон відповіді",
    inputPlaceholder: "Напиши свій шаблон відповіді тут...",
  },
];

// Loop over seed modules and create Module documents
export async function seedModules() {
  await Module.deleteMany({});

  for (const mod of SEED_MODULES) {
    await Module.create({
      title: mod.title,
      description: mod.description,
      videoUrl: mod.videoUrl,
      homeworkType: mod.homeworkType,
      taskDescription: mod.taskDescription,
      inputLabel: mod.inputLabel,
      inputPlaceholder: mod.inputPlaceholder,
    });
  }
}
