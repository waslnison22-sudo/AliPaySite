// Галерея работ мастера.
//
// ВАЖНО: фото, которые присылались ранее, до этого репозитория не дошли —
// в истории Git их нет. Чтобы добавить реальное фото:
//   1. Положи файл в public/photos/  (например, public/photos/kitchen-01.jpg)
//   2. Добавь запись в массив WORKS ниже: { src: '/photos/kitchen-01.jpg', title: '...' }
//
// Пока используются аккуратные SVG-заглушки в фирменном стиле,
// чтобы сайт выглядел цельно и не был пустым.

const ph = (label, hue) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${hue}22"/>
      <stop offset="1" stop-color="#14100B"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="#14100B"/>
  <rect width="800" height="600" fill="url(#bg)"/>
  <g stroke="${hue}" stroke-width="3" fill="none" opacity="0.7">
    <rect x="60" y="60" width="680" height="480" rx="24"/>
    <path d="M120 420 L300 260 L430 380 L540 290 L680 420"/>
    <circle cx="560" cy="170" r="44"/>
  </g>
  <text x="400" y="520" font-family="Arial, sans-serif" font-size="34" fill="${hue}" text-anchor="middle" opacity="0.9">${label}</text>
  <text x="400" y="556" font-family="Arial, sans-serif" font-size="20" fill="#9A8F7E" text-anchor="middle">фото работы — скоро здесь</text>
</svg>
  `)}`;

export const WORKS = [
  { src: ph('Ремонт под ключ', '#F5B544'), title: 'Ремонт квартиры под ключ', tag: 'Жилое' },
  { src: ph('Ванная комната', '#E8722A'), title: 'Ванная под ключ', tag: 'Санузел' },
  { src: ph('Кухня', '#F5B544'), title: 'Кухня-гостиная', tag: 'Жилое' },
  { src: ph('Электрика', '#E8722A'), title: 'Электромонтаж в офисе', tag: 'Коммерция' },
  { src: ph('Штукатурка', '#F5B544'), title: 'Выравнивание стен', tag: 'Отделка' },
  { src: ph('Плитка', '#E8722A'), title: 'Укладка плитки', tag: 'Отделка' },
];
