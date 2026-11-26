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


document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("activity-gallery");
  if (!gallery) return;
  const slides = Array.from(gallery.querySelectorAll(".activity-slide"));
  const controls = gallery.querySelector(".activity-controls");
  const count = gallery.querySelector(".activity-count");
  const selectors = Array.from(gallery.querySelectorAll("[data-activity-select]"));
  const play = gallery.querySelector("[data-activity-play]");
  const viewer = document.getElementById("activity-viewer");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (slides.length < 2 || !controls || !play) return;

  let current = 0;
  let playing = !motion.matches;
  let timer = null;
  let returnFocus = null;
  let previousOverflow = "";

  const schedule = () => {
    window.clearTimeout(timer);
    if (playing && !document.hidden && !viewer?.open && !gallery.matches(":hover") && !gallery.contains(document.activeElement)) {
      timer = window.setTimeout(() => show(current + 1), 6000);
    }
  };
  const updateViewer = () => {
    if (!viewer?.open) return;
    const image = slides[current].querySelector("img");
    const enlarged = viewer.querySelector("img");
    enlarged.src = image.currentSrc || image.src;
    enlarged.alt = image.alt;
    viewer.querySelector("h2").textContent = slides[current].querySelector("h3").textContent;
  };
  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    selectors.forEach((button, i) => button.setAttribute("aria-pressed", String(i === current)));
    count.textContent = (current + 1) + " / " + slides.length;
    updateViewer();
    schedule();
  };
  const setPlaying = (value) => {
    playing = value;
    count.setAttribute("aria-live", playing ? "off" : "polite");
    play.textContent = playing ? "暫停" : "播放";
    play.setAttribute("aria-label", playing ? "暫停自動輪播" : "播放自動輪播");
    play.setAttribute("aria-pressed", String(playing));
    schedule();
  };
  const moveManually = (index) => { setPlaying(false); show(index); };

  controls.hidden = false;
  gallery.querySelector("[data-activity-prev]").addEventListener("click", () => moveManually(current - 1));
  gallery.querySelector("[data-activity-next]").addEventListener("click", () => moveManually(current + 1));
  selectors.forEach((button, index) => button.addEventListener("click", () => moveManually(index)));
  play.addEventListener("click", () => setPlaying(!playing));
  gallery.addEventListener("mouseenter", schedule);
  gallery.addEventListener("mouseleave", schedule);
  gallery.addEventListener("focusin", () => setPlaying(false));
  gallery.addEventListener("focusout", schedule);
  document.addEventListener("visibilitychange", schedule);
  motion.addEventListener("change", () => { if (motion.matches) setPlaying(false); });

  if (viewer && typeof viewer.showModal === "function") {
    slides.forEach((slide, index) => {
      slide.querySelector("[data-activity-photo]").addEventListener("click", (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        setPlaying(false);
        returnFocus = event.currentTarget;
        previousOverflow = document.body.style.overflow;
        show(index);
        viewer.showModal();
        document.body.style.overflow = "hidden";
        updateViewer();
      });
    });
    viewer.querySelector("[data-activity-close]").addEventListener("click", () => viewer.close());
    viewer.querySelector("[data-activity-viewer-prev]").addEventListener("click", () => show(current - 1));
    viewer.querySelector("[data-activity-viewer-next]").addEventListener("click", () => show(current + 1));
    viewer.addEventListener("click", (event) => {
      if (event.target !== viewer) return;
      const box = viewer.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) viewer.close();
    });
    viewer.addEventListener("close", () => {
      document.body.style.overflow = previousOverflow;
      const activePhoto = slides[current].querySelector("[data-activity-photo]");
      (returnFocus?.isConnected && !returnFocus.closest("[hidden]") ? returnFocus : activePhoto).focus();
    });
    viewer.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        show(current + (event.key === "ArrowRight" ? 1 : -1));
      }
    });
  }
  setPlaying(playing);
});
