import { useState } from 'react';
import { getPaymentProvider, formatPrice } from './payment/provider.js';

const PLANS = [
  { id: 'basic', title: 'Базовый', price: 990, note: 'на 1 месяц' },
  { id: 'pro', title: 'Про', price: 2490, note: 'на 1 месяц', popular: true },
  { id: 'team', title: 'Команда', price: 7900, note: 'на 1 месяц' },
];

export default function App() {
  const [selected, setSelected] = useState('pro');
  const [status, setStatus] = useState(null); // null | {kind:'loading'|'done'|'error'}
  const plan = PLANS.find((p) => p.id === selected);

  async function handlePay() {
    setStatus({ kind: 'loading' });
    try {
      const provider = getPaymentProvider();
      const result = await provider.createPayment({
        amount: plan.price,
        currency: 'RUB',
        description: `AliPaySite: тариф «${plan.title}»`,
      });
      setStatus({ kind: 'done', result });
    } catch (e) {
      setStatus({ kind: 'error', message: e.message });
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>AliPaySite</h1>
        <p className="tagline">Онлайн-оплата для вашего бизнеса — скоро здесь.</p>
        <span className="badge badge-stub">Режим: заглушка • реальные платежи отключены</span>
      </header>

      <main>
        <section className="plans">
          {PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`plan ${p.id === selected ? 'plan--active' : ''}`}
              onClick={() => setSelected(p.id)}
            >
              {p.popular && <span className="badge badge-popular">Популярный</span>}
              <h3>{p.title}</h3>
              <div className="price">{formatPrice(p.price)}</div>
              <div className="note">{p.note}</div>
            </button>
          ))}
        </section>

        <section className="paybox">
          <button
            type="button"
            className="pay-btn"
            onClick={handlePay}
            disabled={status?.kind === 'loading'}
          >
            {status?.kind === 'loading' ? 'Обработка…' : `Оплатить ${formatPrice(plan.price)}`}
          </button>

          {status?.kind === 'done' && (
            <div className="notice notice-ok">
              <strong>Демо-платёж «выполнен» (без списания средств)</strong>
              <p>{status.result.message}</p>
              <p className="mono">ID: {status.result.paymentId}</p>
            </div>
          )}
          {status?.kind === 'error' && (
            <div className="notice notice-err">
              <strong>Ошибка:</strong> <p>{status.message}</p>
            </div>
          )}

          <details className="howto">
            <summary>Как подключить настоящий приём платежей</summary>
            <ol>
              <li>Выберите провайдера: ЮKassa (РФ/СНГ) или Stripe (международные).</li>
              <li>Заведите серверный эндпоинт <code>POST /api/payments/create</code> — секретные ключи должны быть только на сервере.</li>
              <li>Скопируйте <code>.env.example</code> в <code>.env</code>, укажите <code>VITE_PAYMENT_PROVIDER=yookassa|stripe</code> и ключи.</li>
              <li>В <code>src/payment/provider.js</code> классы <code>YooKassaProvider</code>/<code>StripeProvider</code> уже готовы к включению.</li>
              <li>Настройте webhook подтверждения статуса платежа на бэкенде.</li>
            </ol>
          </details>
        </section>
      </main>

      <footer>
        <p>© 2026 AliPaySite. Демонстрационная страница — оплата является заглушкой.</p>
      </footer>
    </div>
  );
}
