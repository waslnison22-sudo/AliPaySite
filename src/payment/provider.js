// Платёжная абстракция AliPaySite.
//
// Сейчас активен ContactProvider: вместо банковской оплаты сайт ведёт
// клиента напрямую к мастеру (ссылка из src/config/master.js).
//
// В качестве боевого провайдера запланирован Platega API (https://platega.com):
//   1. Зарегистрироваться в личном кабинете Platega, получить Merchant Login / Password.
//   2. На бэкенде создать эндпоинт POST /api/payments/create, который шлёт:
//        POST https://app-api.platega.io/2.0/payment/direct/prepare
//        Headers: Merchant-Login, Merchant-Password, Content-Type: application/json
//        Body: { amount, currency: "RUB", orderId, description, successUrl, failUrl }
//      и возвращает клиенту { paymentUrl } из ответа Platega.
//   3. Выдать ссылку на эндпоинт в VITE_PAYMENT_API (см. .env.example) и
//      переключить VITE_PAYMENT_PROVIDER=contact -> platega.
//
// Ключи Мерчанта хранятся ТОЛЬКО на сервере — никогда во фронтенде.

import { MASTER } from '../config/master.js';

/* ── Заглушка: оплата через ссылку на мастера ─────────────────────── */
class ContactProvider {
  id = 'contact';
  label = 'Связь с мастером';
  isStub = true;

  async createPayment(order) {
    return {
      redirectUrl: MASTER.contactUrl,
      paymentId: `contact_${Date.now()}`,
      message: `Оплата не подключена — переведём вас в ${MASTER.contactLabel}.`,
    };
  }
}

/* ── Боевой провайдер: Platega API (включается после настройки бэкенда) */
class PlategaProvider {
  id = 'platega';
  label = 'Platega';
  isStub = false;

  async createPayment(order) {
    const api = import.meta.env.VITE_PAYMENT_API;
    if (!api) throw new Error('Не задан VITE_PAYMENT_API — эндпоинт создания платежа Platega.');
    const res = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: order.amount,
        currency: order.currency || 'RUB',
        orderId: order.orderId,
        description: order.description,
      }),
    });
    if (!res.ok) throw new Error(`Platega: ошибка создания платежа (${res.status})`);
    const data = await res.json();
    // Ожидаемый ответ бэкенда: { paymentUrl: "https://pay.platega.io/..." }
    return { redirectUrl: data.paymentUrl, paymentId: data.paymentId ?? null };
  }
}

const providers = {
  contact: new ContactProvider(),
  platega: new PlategaProvider(),
};

export const activeProvider =
  providers[import.meta.env.VITE_PAYMENT_PROVIDER] ?? providers.contact;
