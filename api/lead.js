module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    res.status(500).json({
      ok: false,
      error: "Telegram env vars are not configured",
    });
    return;
  }

  let body = req.body;

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (error) {
      res.status(400).json({ ok: false, error: "Invalid JSON" });
      return;
    }
  }

  const source = (body?.source || "").toString().trim();
  const format = (body?.format || "").toString().trim();
  const name = (body?.name || "").toString().trim();
  const contact = (body?.contact || "").toString().trim();
  const goal = (body?.goal || "").toString().trim();

  if (!name || !contact) {
    res.status(400).json({
      ok: false,
      error: "Name and contact are required",
    });
    return;
  }

  const message = [
    "🔥 Новая заявка с сайта MLM System",
    "",
    `Страница: ${source || "Не указана"}`,
    `Формат: ${format || "Не указан"}`,
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    `Запрос: ${goal || "Без комментария"}`,
  ].join("\n");

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const telegramPayload = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramPayload.ok) {
      throw new Error(telegramPayload.description || "Telegram API error");
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message || "Lead delivery failed",
    });
  }
};
