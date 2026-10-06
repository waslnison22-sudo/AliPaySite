# ALI · Кастомная одежда на заказ

Лендинг-витрина: галерея реальных работ, шаги оформления заказа и подготовка к приёму оплаты.

## Стек
React 18 + Vite. Стиль — фирменный (чёрный фон + неоново-сине-фиолетовый градиент официального логотипа). Логотип и favicon — официальные файлы магазина (`public/logo.png`, `public/favicon.png`).

## Запуск
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # прод-сборка в dist/
```

## Оплата / заказ
Сейчас кнопки **«Заказать»** ведут на Telegram с готовым текстом сообщения — это заглушка вместо эквайринга. Слово «мастер» на сайте не используется.

Ссылка настраивается в одном месте: `src/config/site.js` → `SITE.orderUrl`.

### Подключение Platega (в планах)
1. Зарегистрироваться на https://platega.io и получить Merchant-Login / Merchant-Password.
2. Реализовать бэкенд-эндпоинт `POST /api/payments/platega/create`, который хранит ключи и вызывает
   `app-api.platega.io` (`POST /2.0/payment/direct/prepare`). Ключи — только на сервере.
3. Раскомментировать `PlategaProvider` в `src/payment/provider.js`.
4. Создать `.env` из `.env.example` и указать `VITE_PAYMENT_PROVIDER=platega`.

Фронтенд менять не придётся — переключение через интерфейс `activeProvider`.

## Структура
```
public/logo.png, favicon.png   — официальный логотип и иконка
public/photos/                 — фото работ (галерея)
src/App.jsx                    — страницы/секции
src/config/site.js             — контакты и ссылка заказа
src/data/works.js              — список работ для галереи
src/payment/provider.js        — платёжная абстракция (contact → platega)
```
