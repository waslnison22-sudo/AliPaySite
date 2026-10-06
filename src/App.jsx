import { useState } from 'react';
import Logo from './components/Logo.jsx';
import { WORKS } from './data/works.js';
import { MASTER } from './config/master.js';
import { activeProvider } from './payment/provider.js';

const SERVICES = [
  {
    title: 'Косметический ремонт',
    price: 'от 4 500 ₽/м²',
    points: ['Поклейка обоев, покраска', 'Замена напольного покрытия', 'Уборка после работ'],
  },
  {
    title: 'Ремонт под ключ',
    price: 'от 9 800 ₽/м²',
    featured: true,
    points: ['Дизайн-проект и смета', 'Черновая и чистовая отделка', 'Электрика и сантехника', 'Гарантия 2 года'],
  },
  {
    title: 'Отдельные работы',
    price: 'по договорённости',
    points: ['Укладка плитки', 'Электромонтаж', 'Сборка мебели'],
  },
];

export default function App() {
  const [loading, setLoading] = useState(false);

  // Оплата-заглушка: вместо банковского эквайринга ведём клиента к мастеру.
  async function handlePay(service) {
    setLoading(true);
    try {
      const result = await activeProvider.createPayment({
        orderId: `ali-${Date.now()}`,
        description: `${service.title} — заказ через AliPaySite`,
        amount: service.price,
      });
      if (result.message) console.info(result.message);
      window.open(result.redirectUrl, '_blank', 'noopener');
    } catch (e) {
      alert('Не удалось инициировать оплату: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <a className="brand" href="#top">
            <Logo size={38} />
            <span className="brand-name">
              Али<span>Pay</span> · мастер
            </span>
          </a>
          <nav className="nav">
            <a href="#services">Услуги</a>
            <a href="#works">Работы</a>
            <a href="#pay">Оплата</a>
            <a href={MASTER.contactUrl}>Контакты</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <span className="badge">
              {activeProvider.isStub ? 'Онлайн-оплата временно через мастера' : `Оплата: ${activeProvider.label}`}
            </span>
            <h1>
              Ремонт и отделка <em>под ключ</em> от мастера Али
            </h1>
            <p>
              Честная смета, аккуратная работа и гарантия. Выберите услугу — оплата
              оформляется напрямую со мной, без посредников и предоплат втемную.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#services">Выбрать услугу</a>
              <a className="btn btn-ghost" href={MASTER.contactUrl}>
                Написать в {MASTER.contactLabel.split(' ')[0]}
              </a>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="container">
            <h2 className="section-title">Услуги и цены</h2>
            <p className="section-sub">Ориентировочные стоимости — финальная цена после замера и сметы.</p>
            <div className="grid">
              {SERVICES.map((s) => (
                <article key={s.title} className={`card${s.featured ? ' featured' : ''}`}>
                  <h3>{s.title}</h3>
                  <div className="price">{s.price}</div>
                  <ul>
                    {s.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <button className="btn btn-primary" disabled={loading} onClick={() => handlePay(s)}>
                    Оплатить / Заказать
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="works">
          <div className="container">
            <h2 className="section-title">Фото работ</h2>
            <p className="section-sub">Портфолио мастера — реальные объекты после ремонта.</p>
            <div className="gallery">
              {WORKS.map((w) => (
                <figure key={w.title} className="work">
                  <img src={w.src} alt={w.title} loading="lazy" />
                  <figcaption className="work-meta">
                    <strong>{w.title}</strong>
                    <span className="tag">{w.tag}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="note">
              <b>Пока здесь плейсхолдеры.</b> Твои фото не дошли до репозитория — положи их в{' '}
              <code>public/photos/</code> и добавь пути в <code>src/data/works.js</code>, и галерея
              сразу оживёт.
            </div>
          </div>
        </section>

        <section id="pay">
          <div className="container">
            <h2 className="section-title">Как оплатить</h2>
            <div className="paybox">
              <span className="status">
                Провайдер: {activeProvider.label} {activeProvider.isStub && '· заглушка'}
              </span>
              <p>
                Банковский эквайринг ещё не подключён. Сейчас кнопка «Оплатить» открывает{' '}
                {MASTER.contactLabel} ({MASTER.contactUrl}) — там согласовываем сумму и способ
                оплаты. В следующем обновлении подключим <b>Platega API</b>: оплата картой и СБП
                прямо на сайте.
              </p>
              <div className="pay-methods">
                <span>Скоро: карты Visa / MC / МИР</span>
                <span>Скоро: СБП</span>
                <span>Сейчас: напрямую мастеру</span>
              </div>
              <a className="btn btn-primary" href={MASTER.contactUrl}>Перейти к мастеру</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <Logo size={26} />
          <span>© {new Date().getFullYear()} Али · AliPaySite — {MASTER.phone}</span>
        </div>
      </footer>
    </>
  );
}
