document.addEventListener("DOMContentLoaded", () => {
  const audioButton = document.getElementById("audio-toggle-btn");
  audioButton?.addEventListener("click", () => window.toggleAudio?.());

  const details = document.querySelector(".mobile-nav");
  document.addEventListener("click", (event) => {
    if (details?.open && !details.contains(event.target)) details.removeAttribute("open");
  });

  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
});
