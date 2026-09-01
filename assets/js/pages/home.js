document.addEventListener("DOMContentLoaded", () => {
  const clockTime = document.getElementById("lab-current-time");
  const clockDate = document.getElementById("lab-current-date");
  const timeFormatter = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });
  const dateFormatter = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });

  const updateLabClock = () => {
    if (!clockTime || !clockDate) return;
    const now = new Date();
    clockTime.textContent = timeFormatter.format(now);
    clockTime.dateTime = now.toISOString();
    clockDate.textContent = dateFormatter.format(now);
  };

  updateLabClock();
  window.setInterval(updateLabClock, 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateLabClock();
  });

  const modal = document.getElementById("about-modal");
  if (!modal) return;

  let returnFocus = null;

  const openModal = (trigger) => {
    returnFocus = trigger;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector("[data-modal-close]")?.focus();
    window.playSynth?.("click");
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    returnFocus?.focus();
  };

  document.querySelectorAll("[data-modal-open='about-modal']").forEach((trigger) => {
    trigger.addEventListener("click", () => openModal(trigger));
  });

  modal.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
});
