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
  const track = gallery.querySelector(".activity-slides");
  const slides = Array.from(gallery.querySelectorAll(".activity-slide"));
  const controls = gallery.querySelector(".activity-controls");
  const count = gallery.querySelector(".activity-count");
  const selectors = Array.from(gallery.querySelectorAll("[data-activity-select]"));
  const play = gallery.querySelector("[data-activity-play]");
  const viewer = document.getElementById("activity-viewer");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (slides.length < 2 || !controls || !play || !track) return;

  const viewerPlay = viewer?.querySelector("[data-activity-viewer-play]");
  const speed = viewer?.querySelector("[data-activity-speed]");
  const speedLabel = viewer?.querySelector(".activity-projection-speed");
  const viewerCount = viewer?.querySelector(".activity-viewer-count");
  const projectButtons = Array.from(document.querySelectorAll("[data-activity-project]"));
  let current = 0;
  let playing = !motion.matches;
  let projecting = false;
  let timer = null;
  let idleTimer = null;
  let interval = 6000;
  let returnFocus = null;
  let previousOverflow = "";
  let requestedFullscreen = false;
  let enteredFullscreen = false;
  let dragState = null;
  let suppressPhotoClick = false;
  let scrollTimer = null;

  const schedule = () => {
    window.clearTimeout(timer);
    const blocked = !projecting && viewer?.open;
    if (playing && !document.hidden && !blocked) timer = window.setTimeout(() => show(current + 1), interval);
  };
  const updateViewer = () => {
    if (!viewer?.open) return;
    const image = slides[current].querySelector("img");
    const enlarged = viewer.querySelector("img");
    enlarged.src = image.currentSrc || image.src;
    enlarged.alt = image.alt;
    viewer.querySelector("h2").textContent = slides[current].querySelector("h3").textContent;
    if (viewerCount) viewerCount.textContent = (current + 1) + " / " + slides.length;
  };
  const updateCurrent = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-current", i === current));
    selectors.forEach((button, i) => button.setAttribute("aria-pressed", String(i === current)));
    count.textContent = (current + 1) + " / " + slides.length;
    updateViewer();
  };
  const centerCurrent = (behavior = motion.matches ? "auto" : "smooth") => {
    const slide = slides[current];
    track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2, behavior });
  };
  const nearestIndex = () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    return slides.reduce((best, slide, index) => {
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      const previous = Math.abs(slides[best].offsetLeft + slides[best].offsetWidth / 2 - center);
      return distance < previous ? index : best;
    }, 0);
  };
  const show = (index) => {
    updateCurrent(index);
    centerCurrent();
    schedule();
  };
  const setPlaying = (value) => {
    playing = value;
    count.setAttribute("aria-live", playing ? "off" : "polite");
    for (const button of [play, viewerPlay].filter(Boolean)) {
      button.textContent = playing ? "暫停" : "播放";
      button.setAttribute("aria-label", playing ? "暫停自動輪播" : "播放自動輪播");
      button.setAttribute("aria-pressed", String(playing));
    }
    schedule();
  };
  const revealControls = () => {
    window.clearTimeout(idleTimer);
    viewer?.classList.remove("controls-idle");
    if (projecting && playing) idleTimer = window.setTimeout(() => viewer.classList.add("controls-idle"), 3000);
  };
  const moveManually = (index) => {
    if (!projecting) setPlaying(false);
    show(index);
    revealControls();
  };

  // Touch and trackpads use the browser's native horizontal scrolling.
  track.addEventListener("scroll", () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      if (dragState?.moved) return;
      updateCurrent(nearestIndex());
      schedule();
    }, 160);
  }, { passive: true });
  track.addEventListener("wheel", () => setPlaying(false), { passive: true });
  track.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    setPlaying(false);
    if (event.pointerType !== "mouse") return;
    dragState = { id: event.pointerId, x: event.clientX, scroll: track.scrollLeft, moved: false };
  });
  track.addEventListener("pointermove", (event) => {
    if (!dragState || dragState.id !== event.pointerId) return;
    const delta = event.clientX - dragState.x;
    if (!dragState.moved && Math.abs(delta) < 6) return;
    if (!dragState.moved) {
      dragState.moved = true;
      track.classList.add("is-dragging");
      track.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    track.scrollLeft = dragState.scroll - delta;
  });
  const finishDrag = (event) => {
    if (!dragState || dragState.id !== event.pointerId) return;
    const moved = dragState.moved;
    dragState = null;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    if (moved) {
      suppressPhotoClick = true;
      window.setTimeout(() => { suppressPhotoClick = false; }, 0);
      show(nearestIndex());
    }
  };
  track.addEventListener("pointerup", finishDrag);
  track.addEventListener("pointercancel", finishDrag);
  track.addEventListener("click", (event) => {
    if (!suppressPhotoClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  track.addEventListener("dragstart", (event) => event.preventDefault());
  track.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? slides.length - 1 : current + (event.key === "ArrowRight" ? 1 : -1);
    moveManually(next);
  });
  window.addEventListener("resize", () => centerCurrent("auto"));

  controls.hidden = false;
  gallery.querySelector("[data-activity-prev]").addEventListener("click", () => moveManually(current - 1));
  gallery.querySelector("[data-activity-next]").addEventListener("click", () => moveManually(current + 1));
  selectors.forEach((button, index) => button.addEventListener("click", () => moveManually(index)));
  play.addEventListener("click", () => setPlaying(!playing));
  gallery.addEventListener("focusin", (event) => {
    if (!projecting && event.target.matches(":focus-visible")) setPlaying(false);
  });
  gallery.addEventListener("focusout", schedule);
  document.addEventListener("visibilitychange", schedule);
  motion.addEventListener("change", () => { if (motion.matches && !projecting) setPlaying(false); });

  if (viewer && typeof viewer.showModal === "function") {
    const openViewer = (index, trigger, projection) => {
      if (viewer.open) return;
      returnFocus = trigger;
      previousOverflow = document.body.style.overflow;
      setPlaying(false);
      show(index);
      viewer.showModal();
      document.body.style.overflow = "hidden";
      projecting = projection;
      viewer.classList.toggle("is-projecting", projection);
      if (viewerPlay) viewerPlay.hidden = !projection;
      if (speedLabel) speedLabel.hidden = !projection;
      viewer.querySelector("[data-activity-close]").textContent = projection ? "結束投影 ✕" : "關閉 ✕";
      const shortcuts = viewer.querySelector("[data-activity-shortcuts]");
      if (shortcuts) shortcuts.textContent = projection ? "空白鍵暫停／播放 · ← → 切換 · Esc 關閉" : "← → 切換 · Esc 關閉";
      updateViewer();
      if (projection) {
        slides.forEach((slide) => { slide.querySelector("img").loading = "eager"; });
        viewer.tabIndex = -1;
        viewer.focus({ preventScroll: true });
        setPlaying(true);
        revealControls();
        // Fullscreen requires the launch button's user gesture; the dialog
        // itself cannot be a Fullscreen API target.
        if (!document.fullscreenElement && typeof document.documentElement.requestFullscreen === "function") {
          requestedFullscreen = true;
          try {
            Promise.resolve(document.documentElement.requestFullscreen()).then(() => {
              if (projecting) enteredFullscreen = document.fullscreenElement === document.documentElement;
              else if (document.fullscreenElement === document.documentElement) document.exitFullscreen?.().catch(() => {});
            }).catch(() => { requestedFullscreen = false; });
          } catch {
            requestedFullscreen = false;
          }
        }
      }
    };

    slides.forEach((slide, index) => {
      slide.querySelector("[data-activity-photo]").addEventListener("click", (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openViewer(index, event.currentTarget, false);
      });
    });
    projectButtons.forEach((button) => {
      button.hidden = false;
      button.addEventListener("click", () => openViewer(current, button, true));
    });
    viewer.querySelector("[data-activity-close]").addEventListener("click", () => viewer.close());
    viewer.querySelector("[data-activity-viewer-prev]").addEventListener("click", () => moveManually(current - 1));
    viewer.querySelector("[data-activity-viewer-next]").addEventListener("click", () => moveManually(current + 1));
    viewerPlay?.addEventListener("click", () => { setPlaying(!playing); revealControls(); });
    speed?.addEventListener("change", () => {
      const value = Number(speed.value);
      if ([3000, 6000, 10000].includes(value)) interval = value;
      schedule();
      revealControls();
    });
    viewer.addEventListener("pointermove", revealControls);
    viewer.addEventListener("pointerdown", revealControls);
    viewer.addEventListener("focusin", revealControls);
    viewer.addEventListener("click", (event) => {
      if (projecting || event.target !== viewer) return;
      const box = viewer.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) viewer.close();
    });
    viewer.addEventListener("close", () => {
      projecting = false;
      setPlaying(false);
      window.clearTimeout(idleTimer);
      viewer.classList.remove("is-projecting", "controls-idle");
      document.body.style.overflow = previousOverflow;
      if (requestedFullscreen && document.fullscreenElement === document.documentElement) document.exitFullscreen?.().catch(() => {});
      requestedFullscreen = false;
      enteredFullscreen = false;
      const activePhoto = slides[current].querySelector("[data-activity-photo]");
      (returnFocus?.isConnected && !returnFocus.matches("[data-activity-photo]") ? returnFocus : activePhoto).focus({ preventScroll: true });
    });
    document.addEventListener("fullscreenchange", () => {
      if (!projecting || !requestedFullscreen) return;
      if (document.fullscreenElement === document.documentElement) enteredFullscreen = true;
      else if (enteredFullscreen && viewer.open) viewer.close();
    });
    viewer.addEventListener("keydown", (event) => {
      revealControls();
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        moveManually(current + (event.key === "ArrowRight" ? 1 : -1));
      }
      if (projecting && (event.key === " " || event.code === "Space") && !event.target.matches("button, select, input, textarea, a")) {
        event.preventDefault();
        setPlaying(!playing);
        revealControls();
      }
    });
  }
  updateCurrent(0);
  centerCurrent("auto");
  setPlaying(playing);
});
