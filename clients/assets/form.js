const forms = document.querySelectorAll("[data-lead-form]");

async function copyFallback(message, note) {
  try {
    await navigator.clipboard.writeText(message);
    note.textContent =
      "Заявка не отправилась автоматически, но текст скопирован. Его можно сразу вставить в Telegram.";
  } catch (error) {
    note.textContent =
      "Не удалось отправить заявку автоматически. Проверь настройки Telegram.";
  }
}

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const note = form.querySelector("[data-form-note]");
    const submitButton = form.querySelector('button[type="submit"]');
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const contact = (data.get("contact") || "").toString().trim();
    const format = (data.get("format") || "").toString().trim();
    const goal = (data.get("goal") || "").toString().trim();
    const source =
      form.getAttribute("data-source") ||
      document.title ||
      window.location.pathname;

    const message = [
      "Новая заявка с сайта MLM System",
      `Страница: ${source || "Не указана"}`,
      `Формат: ${format || "Не указан"}`,
      `Имя: ${name || "Не указано"}`,
      `Контакт: ${contact || "Не указан"}`,
      `Запрос: ${goal || "Без комментария"}`,
    ].join("\n");

    note.textContent = "Отправляем заявку...";
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source,
          format,
          name,
          contact,
          goal,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Lead send failed");
      }

      note.textContent =
        "Заявка отправлена. Мы получили ее и скоро свяжемся с тобой.";
      form.reset();
    } catch (error) {
      await copyFallback(message, note);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});
