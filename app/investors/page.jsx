import { Logo } from "../Logo";
import { ThemeToggle } from "./ThemeToggle";

export const metadata = {
  title: "ТокенСток — инвестиционное предложение",
  robots: { index: false, follow: false },
};

const STYLE = `
  .inv-root{
    --bg: #faf9f6;
    --ink: #0c0c0c;
    --ink-2: #2a2a2a;
    --mute: #6c6c6c;
    --mute-2: #a8a6a0;
    --line: #1c1c1c;
    --line-2: #e6e3da;
    --paper: #f0ede4;
    --card: #ffffff;
    --hl: #0c0c0c;
    --hl-fg: #ffffff;
    --sans: var(--font-manrope), -apple-system, BlinkMacSystemFont, sans-serif;
    --mono: var(--font-jetbrains-mono), ui-monospace, Menlo, monospace;
    --tk-logo-mute: var(--mute);
    background: var(--bg); color: var(--ink);
    font-family: var(--sans);
    min-height: 100vh;
  }
  :root[data-theme="dark"] .inv-root{
    --bg: #0c0c0c;
    --ink: #f5f3ee;
    --ink-2: #d6d3cc;
    --mute: #8d8a82;
    --mute-2: #4a4844;
    --line: #f5f3ee;
    --line-2: #232220;
    --paper: #161513;
    --card: #15140f;
    --hl: #f5f3ee;
    --hl-fg: #0c0c0c;
  }

  .inv-root .wrap{ max-width: 760px; margin: 0 auto; padding: 0 36px; }
  .inv-root nav.top{
    position: sticky; top: 0; z-index: 50;
    background: color-mix(in oklab, var(--bg) 92%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line-2);
  }
  .inv-root nav.top .row{
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 0; gap: 16px;
  }
  .inv-root .badge{
    font-family: var(--mono); font-size: 11px; letter-spacing: .06em;
    text-transform: uppercase; color: var(--mute);
    padding: 4px 10px; border: 1px solid var(--line-2); border-radius: 999px;
  }

  .inv-root header.doc-head{ padding: 56px 0 28px; }
  .inv-root .eyebrow{
    font-family: var(--mono); font-size: 12px; letter-spacing: .08em;
    text-transform: uppercase; color: var(--mute);
    display: inline-flex; align-items: center; gap: 10px; margin-bottom: 24px;
  }
  .inv-root .eyebrow::before{
    content: ""; width: 24px; height: 1px; background: var(--mute); display: inline-block;
  }
  .inv-root h1.title{
    font-family: var(--sans); font-weight: 800;
    font-size: clamp(40px, 6.4vw, 60px);
    line-height: 1; letter-spacing: -0.03em;
    margin: 0 0 14px; text-wrap: balance;
  }
  .inv-root .doc-sub{
    font-family: var(--mono); font-size: 13px; color: var(--mute);
    letter-spacing: .03em;
  }

  .inv-root main{ padding: 8px 0 96px; }
  .inv-root h2{
    font-weight: 700; font-size: clamp(26px, 3.4vw, 32px);
    letter-spacing: -0.02em; margin: 56px 0 12px;
    line-height: 1.15; text-wrap: balance;
  }
  .inv-root h2 .num{
    display: inline-block; margin-right: 10px;
    font-family: var(--mono); font-size: 12px; color: var(--mute);
    font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
    vertical-align: middle;
  }
  .inv-root h3{
    font-weight: 600; font-size: 18px; letter-spacing: -0.01em;
    margin: 28px 0 10px;
  }
  .inv-root p{
    font-size: 16px; line-height: 1.6; color: var(--ink-2);
    margin: 0 0 14px;
  }
  .inv-root p strong, .inv-root li strong{ color: var(--ink); font-weight: 600; }
  .inv-root ul, .inv-root ol{ padding-left: 22px; margin: 0 0 18px; }
  .inv-root li{
    font-size: 16px; line-height: 1.6; color: var(--ink-2);
    margin-bottom: 6px;
  }
  .inv-root code{
    font-family: var(--mono); font-size: 13px;
    background: var(--paper); padding: 2px 6px; border-radius: 5px;
    color: var(--ink);
  }
  .inv-root blockquote{
    margin: 18px 0; padding: 14px 18px;
    border-left: 3px solid var(--ink);
    background: var(--paper);
    font-size: 16px; color: var(--ink); font-weight: 500;
  }
  .inv-root blockquote p{ margin: 0; color: var(--ink); }

  .inv-root .tbl-wrap{ overflow-x: auto; margin: 16px 0 22px; }
  .inv-root table{
    width: 100%; border-collapse: collapse;
    border: 1px solid var(--line-2); border-radius: 10px; overflow: hidden;
    font-size: 15px;
  }
  .inv-root th, .inv-root td{
    padding: 12px 14px; text-align: left;
    border-bottom: 1px solid var(--line-2);
    vertical-align: top;
  }
  .inv-root th{
    background: var(--paper); font-weight: 600; color: var(--ink);
    font-size: 13px; letter-spacing: 0; text-transform: none;
  }
  .inv-root tr:last-child td{ border-bottom: 0; }
  .inv-root td.num, .inv-root th.num{ text-align: right; font-family: var(--mono); }
  .inv-root tr.total td{
    border-top: 2px solid var(--ink); font-weight: 600; color: var(--ink);
    background: color-mix(in oklab, var(--paper) 60%, var(--bg));
  }

  .inv-root .divider{
    height: 1px; background: var(--line-2); border: 0;
    margin: 48px 0 0;
  }

  .inv-root footer.doc-foot{
    padding: 32px 0 56px; margin-top: 32px;
    border-top: 1px solid var(--line-2);
    font-family: var(--mono); font-size: 12px;
    color: var(--mute); line-height: 1.6;
  }
  .inv-root footer.doc-foot a{
    color: var(--ink); text-decoration: underline; text-underline-offset: 3px;
  }

  @media (max-width: 720px){
    .inv-root .wrap{ padding: 0 28px; }
    .inv-root header.doc-head{ padding: 36px 0 20px; }
    .inv-root h1.title{ font-size: clamp(32px, 8vw, 44px); }
    .inv-root h2{ font-size: clamp(22px, 5vw, 26px); margin: 40px 0 10px; }
    .inv-root p, .inv-root li{ font-size: 15px; }
    .inv-root table{ font-size: 13px; }
    .inv-root th, .inv-root td{ padding: 10px 11px; }
  }
`;

export default function InvestorsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="inv-root">
        <nav className="top">
          <div className="wrap row">
            <a href="/" style={{ color: "inherit" }}><Logo /></a>
            <span className="badge">private · investors</span>
          </div>
        </nav>
        <ThemeToggle />

        <header className="doc-head">
          <div className="wrap">
            <div className="eyebrow">инвестиционное предложение</div>
            <h1 className="title">TOKENSTOK</h1>
            <p className="doc-sub">Магазин токенов нейросетей · 2026-05-14</p>
          </div>
        </header>

        <main>
          <div className="wrap">

            <h2><span className="num">01</span>Что это и зачем нужны деньги</h2>
            <p>Магазин токенов нейросетей по модели «оптовая закупка → розничная продажа с наценкой». Одна точка входа, <strong>181 модель</strong> в каталоге, оплата в рублях через российский эквайринг.</p>
            <p>Продукт уже собран (разработка + дизайн + прототип) — деньги нужны только на:</p>
            <ul>
              <li>юридическое оформление и подключение эквайринга,</li>
              <li>работу инфраструктуры (Cloud.ru) на 6 месяцев,</li>
              <li><strong>депозит у провайдеров токенов</strong> на 6 месяцев работы.</li>
            </ul>

            <h2><span className="num">02</span>Чек на старт: ~1.37 млн ₽</h2>
            <blockquote><p>На <strong>20 инвесторов = ~69 тыс ₽ с человека</strong>.</p></blockquote>

            <h3>Разбивка</h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Статья</th>
                    <th className="num">Сумма</th>
                    <th>Что покрывает</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Юр. оформление</td><td className="num">50 тыс ₽</td><td>ИП регистрация, оферта, политика, договор с эквайером</td></tr>
                  <tr><td>Подключение эквайринга и KYC</td><td className="num">30 тыс ₽</td><td>ЮKassa / CloudPayments — депозит и проверки</td></tr>
                  <tr><td>OPEX Cloud.ru × 6 мес</td><td className="num">~83 тыс ₽</td><td>сервера, БД, SSD, трафик — растут вместе с базой клиентов</td></tr>
                  <tr><td><strong>Депозит у провайдеров токенов</strong></td><td className="num"><strong>~1.03 млн ₽</strong></td><td><strong>главная статья</strong> — закупка токенов вперёд на 6 мес работы</td></tr>
                  <tr><td>Подушка безопасности (15%)</td><td className="num">~179 тыс ₽</td><td>резерв на непредвиденное</td></tr>
                  <tr className="total"><td>ИТОГО</td><td className="num">~1.37 млн ₽</td><td></td></tr>
                </tbody>
              </table>
            </div>

            <h3>Что НЕ входит (закрыто временем основателя)</h3>
            <ul>
              <li>Разработка (backend + frontend + админка) — собрано через Claude</li>
              <li>Дизайн и бренд — собрано</li>
              <li>Маркетинг — обеспечивается отдельно основателем</li>
              <li>Поддержка — только нейросети, людей в штате нет</li>
            </ul>

            <h2><span className="num">03</span>Юнит-экономика</h2>
            <p>Дефолтные вводные:</p>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Метрика</th><th className="num">Значение</th></tr></thead>
                <tbody>
                  <tr><td>ARPU / клиент / мес</td><td className="num">$20 (8 × 2.5 пополнений)</td></tr>
                  <tr><td>Средневзвешенная наценка</td><td className="num">37.5%</td></tr>
                  <tr><td>Контрибьюшн / клиент / мес</td><td className="num">~$2.4</td></tr>
                  <tr><td>Контрибьюшн-маржа</td><td className="num">~12%</td></tr>
                  <tr><td>Churn / мес</td><td className="num">8%</td></tr>
                  <tr><td>Жизнь клиента</td><td className="num">12.5 мес</td></tr>
                  <tr><td>LTV</td><td className="num">~$30</td></tr>
                  <tr><td>CAC эффективный</td><td className="num">$4.2</td></tr>
                  <tr><td><strong>LTV / CAC</strong></td><td className="num"><strong>~7.2× (хорошо)</strong></td></tr>
                  <tr><td>Payback клиента</td><td className="num">~1.7 мес</td></tr>
                </tbody>
              </table>
            </div>

            <h2><span className="num">04</span>Прогноз 12 месяцев</h2>
            <p>Стартовая база: <strong>50 клиентов</strong>, новых: <strong>40 в месяц</strong>, churn 8% ⇒</p>
            <ul>
              <li>Месяц 6: ~250 клиентов</li>
              <li>Месяц 12: ~440 клиентов</li>
              <li>Месяц 12 выручка: ~$5.7к / ~510 тыс ₽ в месяц</li>
            </ul>
            <p><strong>Когда выходим в плюс по EBITDA:</strong> месяц 4-5 (зависит от вводных).<br/>
            <strong>Когда инвестор отбивает свою долю:</strong> ~28 месяцев при дефолтных параметрах.</p>

            <h2><span className="num">05</span>Главные рычаги ускорения payback</h2>
            <ol>
              <li><strong>Поток новых клиентов</strong> — поднять с 40 до 200–500 в месяц через маркетинг</li>
              <li><strong>Микс моделей</strong> — сместить долю в сторону cheap (там наценка 60%+)</li>
              <li><strong>ARPU</strong> — увеличить средний чек или частоту пополнений (B2B-сегмент)</li>
              <li><strong>Снизить churn</strong> — программа лояльности, пакеты с накоплением</li>
            </ol>
            <p>При агрессивных вводных (200 новых/мес, средневзвешенная 45%) payback инвестора падает до <strong>8–12 месяцев</strong>.</p>

            <h2><span className="num">06</span>Бизнес-модель денежного потока</h2>
            <blockquote><p>«Каждый рубль с продаж сразу уходит в новую закупку токенов»</p></blockquote>
            <ol>
              <li>Клиент пополняет баланс через эквайринг</li>
              <li><strong>73 копейки</strong> с каждого рубля → закупка следующей партии токенов у провайдера (<code>1 / (1 + 0.375)</code>)</li>
              <li><strong>27 копеек</strong> остаются как маржа → идёт на эквайринг (4%), триалы/абуз (5%), чарджбэки (2%), Cloud.ru, юр-обслуживание, налоги, <strong>прибыль</strong></li>
            </ol>
            <p>Депозит у провайдеров нужен потому, что <strong>выручка приходит с задержкой эквайринга 3–5 дней</strong>, а провайдеры берут оплату вперёд.</p>

            <h2><span className="num">07</span>Сколько нужно на закупку токенов — 4 уровня</h2>
            <p>Одного «идеального» числа нет — зависит от аппетита к риску и плана роста.</p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Уровень</th>
                    <th className="num">Сумма</th>
                    <th>Логика</th>
                    <th>Риск</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Голый минимум</strong></td>
                    <td className="num">~80 тыс ₽</td>
                    <td>Только cash-gap эквайринга (~7 дней) + пара недель роста</td>
                    <td>Высокий — любая задержка платежа = провайдер отрубает</td>
                  </tr>
                  <tr>
                    <td><strong>Тонкий запуск</strong></td>
                    <td className="num">250–350 тыс ₽</td>
                    <td>Покрытие 2–3 мес закупок с учётом роста до ~120 клиентов</td>
                    <td>Средний — нужно докидывать через 2 мес</td>
                  </tr>
                  <tr>
                    <td><strong>«По уму» (базовый сценарий)</strong></td>
                    <td className="num">1,0–1,2 млн ₽</td>
                    <td>6 мес работы вперёд с подушкой на курс и провайдеров</td>
                    <td>Низкий — спишь спокойно</td>
                  </tr>
                  <tr>
                    <td><strong>Под рост 200 нов/мес</strong></td>
                    <td className="num">3,5–4 млн ₽</td>
                    <td>Если планируешь сразу качать маркетинг → база растёт втрое быстрее, закупка тоже</td>
                    <td>Низкий, но капитал-интенсивно</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Рекомендация: ~1,0 млн ₽</h3>
            <ol>
              <li><strong>Цикл денег самофинансируется уже с мес 1.</strong> Каждый рубль выручки → 73 коп сразу в следующую закупку. Через ~30 дней механизм крутится сам, депозит остаётся «масляной плёнкой».</li>
              <li><strong>Главный риск — не нехватка денег на закупку, а кассовые разрывы.</strong> Эквайринг может заморозить деньги на 7–14 дней при проверке, провайдер может потребовать предоплату побольше после скачка курса. 1 млн закрывает все эти сценарии.</li>
              <li><strong>Меньше 500 тыс — играешь в русскую рулетку.</strong> Один большой клиент уйдёт в чарджбэк → нельзя купить новую партию → клиенты видят «нет токенов» → отток.</li>
              <li><strong>Больше 1,5 млн — деньги работают вхолостую.</strong> Лучше потратить лишнее на маркетинг (CAC), это даст быстрее payback, чем лежащий депозит.</li>
            </ol>

            <h2><span className="num">08</span>Риски</h2>
            <ul>
              <li><strong>Демпинг конкурентов</strong> в РФ (token-shops с маржой 10–20%)</li>
              <li><strong>Цены провайдеров режутся каждые 6 мес</strong> — нужен регулярный пересмотр прайса</li>
              <li><strong>Валютный риск</strong> — закупка USD, продажа RUB</li>
              <li><strong>Эквайринг для РФ</strong> — ЮKassa/CloudPayments работают с проверками</li>
              <li><strong>Абуз</strong> — триалы, мультиаккаунты, чарджбэки (заложено 7% от выручки)</li>
              <li><strong>Юридическое</strong> — токены = цифровая услуга, нужен НПД/ИП/ООО, оферта, политика возвратов</li>
            </ul>

            <h2><span className="num">09</span>Условия инвестиции (черновик)</h2>
            <ul>
              <li>Чек: <strong>69 тыс ₽ × 20 человек = 1.37 млн ₽</strong></li>
              <li>Доля: к обсуждению (предлагаемый диапазон — пропорционально вкладу)</li>
              <li>Возврат: дивидендами с EBITDA после выхода в плюс (мес 5–6) ИЛИ выкуп долей при достижении целевой выручки</li>
              <li>Прозрачность: ежемесячный отчёт по P&L и метрикам из калькулятора</li>
            </ul>

          </div>

          <div className="wrap">
            <footer className="doc-foot">
              Все цифры пересчитываются в реальном времени в калькуляторе.<br/>
              Источники цен и формулы — на сайте <a href="/">tokenstok.ru</a>.
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
