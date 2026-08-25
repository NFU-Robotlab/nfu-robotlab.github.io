document.addEventListener("DOMContentLoaded", () => {
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
