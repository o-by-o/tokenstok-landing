# tokenstok-landing

Лендинг **ТокенСток** — маркетплейс 218 AI-моделей под одним API-ключом. Next.js 16 + React 19.

Порт варианта **A · Маркет** из дизайн-бандла Claude Design ([snapshot here](https://github.com/o-by-o/maket4ik)). Один экран, чистый монохром, дружелюбный поп-тон.

## Запуск

```bash
npm install
PORT=3418 npm run dev
# http://localhost:3418
```

## Что внутри

| Секция | Содержимое |
|---|---|
| **Nav** | Логотип «токен / сток» с пульс-точкой + меню + 2 CTA |
| **Hero** | 218 моделей · готовы · «Все нейросети в одном кошельке. Платишь только за то, что используешь.» + живой typewriter demo |
| **Trust** | Один ключ — все провайдеры (OpenAI · Anthropic · Google · Meta · Mistral · DeepSeek · +14) |
| **Каталог** | 9 карточек моделей (GPT-5 / Claude / Gemini / DeepSeek / Llama / Mistral / DALL·E / Suno) |
| **Как работает** | 3 шага — Положи / Возьми ключ / Запускай |
| **Цены** | PAYG (рекомендуем) + Команда 990 ₽/мес |
| **Отзывы** | 3 quote |
| **FAQ** | 6 expandable Q&A |
| **CTA** | Email signup |
| **Footer** | 4 cols + legal |

## Логотип

`app/Logo.jsx` — расшариваемый компонент (используется в nav + footer). Скопирован в кабинет (`o-by-o/tokenstok-cabinet`) для общего бренда.
