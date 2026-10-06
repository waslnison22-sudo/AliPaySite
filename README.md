# Ali · AliPaySite

Сайт мастера Али: услуги, портфолио работ, оплата.

## Стек
React 18 + Vite. Запуск: `npm install && npm run dev`.

## Фирменный стиль
- Палитра: янтарь `#F5B544` → медь `#E8722A` на графите `#0D0A07` (`src/styles.css`, CSS-переменные).
- Иконка/логотип: монограмма «А» + монета — `src/components/Logo.jsx` и `public/favicon.svg`.

## Оплата
Сейчас — **заглушка**: кнопки оплаты ведут на ссылку мастера (`src/config/master.js`).
Замена ссылки на реальную = одна правка в этом файле.

План боевого подключения — **Platega API**:
1. Кабинет Platega → Merchant Login/Password (только на сервере!).
2. Бэкенд: `POST /api/payments/create` → `POST https://app-api.platega.io/2.0/payment/direct/prepare`, ответом `paymentUrl`.
3. `.env`: `VITE_PAYMENT_PROVIDER=platega`, `VITE_PAYMENT_API=...` — код менять не нужно, `PlategaProvider` уже готов (`src/payment/provider.js`).

## Фото работ
Положи снимки в `public/photos/` и добавь записи в `src/data/works.js` — галерея подхватит их автоматически. Сейчас там стилизованные плейсхолдеры.

```
src/
├── App.jsx              # страницы и секции
├── components/Logo.jsx  # фирменная иконка
├── config/master.js     # контакты/ссылка мастера
├── data/works.js        # портфолио
└── payment/provider.js  # contact-заглушка + Platega
```
