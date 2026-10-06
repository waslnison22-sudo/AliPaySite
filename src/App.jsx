import { useState } from 'react';
import { SITE } from './config/site.js';
import { WORKS } from './data/works.js';
import { activeProvider } from './payment/provider.js';

const STEPS = [
  { n: '01', title: 'Идея', text: 'Присылаете фото или описание вещи, которую хотите.' },
  { n: '02', title: 'Обсуждение', text: 'Согласуем дизайн, материалы, размер и сроки.' },
  { n: '03', title: 'Пошив', text: 'Создаём кастом и показываем процесс по фото.' },
  { n: '04', title: 'Оплата и доставка', text: 'Онлайн-оплата скоро — сейчас всё оформляем в Telegram.' },
];

export default function App() {
  const [zoom, setZoom] = useState(null);
  const [busy, setBusy] = useState(false);

  // Сейчас «оплата» = переход на оформление заказа в Telegram.
  async function handleOrder(source) {
    setBusy(true);
    try {
      const res = await activeProvider.createPayment({
        orderId: `ali-${Date.now()}`,
        description: source,
      });
      if (res.message) console.info(res.message);
      window.open(res.redirectUrl, '_blank', 'noopener');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <header className="header">
        <a className="brand" href="#top" aria-label={SITE.name}>
          <img src="/logo.png" alt="Логотип ALI" className="brand-logo" width="40" height="40" />
          <span className="brand-name">{SITE.name}</span>
        </a>
        <nav className="nav">
          <a href="#works">Работы</a>
          <a href="#order">Как заказать</a>
        </nav>
        <button className="btn btn-sm" onClick={() => handleOrder('Кнопка в шапке')}>
          Заказать
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <p className="eyebrow">Индивидуальный пошив · ручная работа</p>
          <h1 className="hero-title">
            КАСТОМНАЯ<br />
            <span className="grad">ОДЕЖДА</span><br />
            НА ЗАКАЗ
          </h1>
          <p className="hero-sub">
            Уникальные вещи, которых больше ни у кого нет. Выберите идею из работ
            или пришлите свою — воплотим.
          </p>
          <div className="hero-actions">
            <button className="btn" disabled={busy} onClick={() => handleOrder('Hero-кнопка')}>
              {busy ? 'Открываем…' : 'Заказать'}
            </button>
            <a className="btn btn-ghost" href="#works">Смотреть работы</a>
          </div>
          <span className="pill">Оплата онлайн — скоро · пока заказ через Telegram</span>
        </section>

        <section id="works" className="section">
          <h2 className="section-title">Наши <span className="grad">работы</span></h2>
          <div className="gallery">
            {WORKS.map((w) => (
              <figure key={w.src} className="work" onClick={() => setZoom(w)}>
                <img src={w.src} alt={w.title} loading="lazy" />
                <figcaption>{w.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="order" className="section">
          <h2 className="section-title">Как <span className="grad">заказать</span></h2>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.n} className="step">
                <span className="step-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="cta">
            <p>Готовы обсудить вашу вещь?</p>
            <button className="btn" disabled={busy} onClick={() => handleOrder('CTA-блок')}>
              Заказать
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/logo.png" alt="" width="28" height="28" />
          <span>© {new Date().getFullYear()} {SITE.name} — {SITE.tagline.toLowerCase()}</span>
        </div>
        <a className="footer-tg" href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
      </footer>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)} role="dialog" aria-label={zoom.title}>
          <img src={zoom.src} alt={zoom.title} />
          <span className="lightbox-close">×</span>
        </div>
      )}
    </div>
  );
}
