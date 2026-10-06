/**
 * Платёжный модуль AliPaySite.
 *
 * Архитектура: единый интерфейс PaymentProvider с реализациями.
 * Сейчас активна заглушка (StubProvider) — реальных списаний нет.
 * Для боевого запуска достаточно:
 *   1) реализовать/подключить YooKassaProvider или StripeProvider;
 *   2) выставить VITE_PAYMENT_PROVIDER в .env;
 *   3) добавить серверный эндпоинт для создания платежей (секреты — только на сервере!).
 */

const CURRENCY_SYMBOL = { RUB: '₽', USD: '$', EUR: '€' };

export function formatPrice(amount, currency = 'RUB') {
  const sym = CURRENCY_SYMBOL[currency] ?? currency;
  return `${amount.toLocaleString('ru-RU')} ${sym}`;
}

/** Заглушка: имитирует сетевую задержку и возвращает фиктивный результат. */
class StubProvider {
  name = 'stub';

  async createPayment({ amount, currency = 'RUB', description = '' }) {
    // Имитация обращения к платёжному шлюзу
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return {
      status: 'pending_stub',
      paymentId: `stub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      confirmationUrl: null,
      amount,
      currency,
      description,
      message:
        'Платёж не проводился: это демонстрационная заглушка. ' +
        'Реальный эквайринг будет подключён позже.',
    };
  }
}

/**
 * Шаблон реального провайдера (ЮKassa). НЕ АКТИВЕН до появления бэкенда.
 * Боевая схема: браузер -> POST /api/payments/create -> бэкенд создаёт счёт
 * через ЮKassa API (Idempotence-Key, секретный ключ) -> возвращает confirmation_url.
 */
class YooKassaProvider {
  name = 'yookassa';

  async createPayment(payload) {
    const res = await fetch('/api/payments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, provider: 'yookassa' }),
    });
    if (!res.ok) throw new Error(`Ошибка создания платежа: ${res.status}`);
    return res.json();
  }
}

/** Шаблон Stripe Checkout. НЕ АКТИВЕН до появления бэкенда. */
class StripeProvider {
  name = 'stripe';

  async createPayment(payload) {
    const res = await fetch('/api/checkout/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, provider: 'stripe' }),
    });
    if (!res.ok) throw new Error(`Ошибка создания сессии: ${res.status}`);
    return res.json();
  }
}

const providers = {
  stub: new StubProvider(),
  yookassa: new YooKassaProvider(),
  stripe: new StripeProvider(),
};

// В dev-режиме Vite подхватывает import.meta.env из .env (VITE_* переменные)
const ACTIVE = import.meta.env?.VITE_PAYMENT_PROVIDER || 'stub';

export function getPaymentProvider() {
  return providers[ACTIVE] ?? providers.stub;
}
