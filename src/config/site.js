// Единая точка настройки контактов и заказа.
// Все кнопки «Заказать» на сайте используют ORDER_URL.
export const SITE = {
  name: 'ALI',
  tagline: 'Кастомная одежда на заказ',
  // Ссылка для оформления заказа (Telegram).
  // Пока оплата онлайн не подключена, заказ оформляется здесь.
  orderUrl:
    'https://t.me/VespidKitten875?text=' +
    encodeURIComponent(
      'Привет, хотел(-а) бы заказать у вас кастомную одежду! (далее сразу напишите что вам нужно)'
    ),
  // Дополнительные контакты
  telegramUrl: 'https://t.me/VespidKitten875',
  photosBaseUrl: 'https://fotora.ru/uploaded/?ID=ESRWR05102026202728',
};
