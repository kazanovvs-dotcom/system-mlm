# Настройка заявок через Telegram

Чтобы формы на сайте отправляли заявки автоматически, в проекте Vercel нужно добавить 2 переменные окружения:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Что делать

1. Открой проект в Vercel.
2. Перейди в `Settings` → `Environment Variables`.
3. Добавь:
   - `TELEGRAM_BOT_TOKEN` = токен Telegram-бота
   - `TELEGRAM_CHAT_ID` = chat id, куда должны приходить заявки
4. Сохрани переменные.
5. Сделай redeploy проекта или дождись следующего автодеплоя.

## Как работает сейчас

- фронтенд отправляет форму в `/api/lead`
- Vercel-функция `api/lead.js` пересылает заявку в Telegram
- если Telegram не настроен, фронтенд делает fallback: копирует заявку в буфер

## Какие страницы уже подключены

- `landing.html`
- `partner.html`
- `system.html`
- `support.html`
