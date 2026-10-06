// Платёжная абстракция сайта.
//
// Сейчас активен ContactProvider: вместо банковского эквайринга кнопка
// «Заказать» ведёт на Telegram (SITE.orderUrl).
//
// В планах — подключение приёма оплаты через Platega API:
// https://platega.io (документация: https://docs.platega.io)
// Для боевого режима потребуется бэкенд-эндпоинт, который хранит
// Merchant-Login / Merchant-Password и вызывает API Platega
// (ключи НИКОГДА не должны попадать во фронтенд).

import { SITE } from '../config/site.js';

class ContactProvider {
  key = 'contact';
  async createPayment(order) {
    return {
      provider: this.key,
      status: 'contact',
      redirectUrl: SITE.orderUrl,
      message: `Оплата онлайн ещё не подключена — заказ оформляется в Telegram (${order?.description ?? ''})`,
    };
  }
}

// ЗАГОТОВКА: Platega API. Включается после появления серверного эндпоинта.
// class PlategaProvider {
//   key = 'platega';
//   async createPayment(order) {
//     // Бэкенд формирует платёж на app-api.platega.io
//     // POST /2.0/payment/direct/prepare (headers: Merchant-Login, Merchant-Password)
//     const res = await fetch('/api/payments/platega/create', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         orderId: order.orderId,
//         amount: order.amount,
//         currency: 'RUB',
//         description: order.description,
//       }),
//     });
//     if (!res.ok) throw new Error('Platega: ошибка создания платежа');
//     const data = await res.json();
//     return { provider: this.key, status: 'pending', redirectUrl: data.paymentUrl, paymentId: data.paymentId };
//   }
// }

const providers = {
  contact: new ContactProvider(),
  // platega: new PlategaProvider(),
};

export const activeProvider =
  providers[import.meta.env.VITE_PAYMENT_PROVIDER] ?? providers.contact;
