const forms = document.querySelectorAll("[data-lead-form]");

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const note = form.querySelector("[data-form-note]");
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const contact = (data.get("contact") || "").toString().trim();
    const format = (data.get("format") || "").toString().trim();
    const goal = (data.get("goal") || "").toString().trim();

    const message = [
      "Новая заявка с лендинга MLM System",
      `Формат: ${format || "Не указан"}`,
      `Имя: ${name || "Не указано"}`,
      `Контакт: ${contact || "Не указан"}`,
      `Запрос: ${goal || "Без комментария"}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(message);
      note.textContent =
        "Текст заявки скопирован. Теперь его можно вставить в Telegram, CRM или чат менеджера.";
      form.reset();
    } catch (error) {
      note.textContent =
        "Не удалось скопировать автоматически. Попробуй открыть страницу в браузере с доступом к буферу обмена.";
    }
  });
});
