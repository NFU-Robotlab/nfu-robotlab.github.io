document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const transitionCurtain = document.querySelector(".page-transition-curtain");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (root.classList.contains("is-page-entering")) {
    window.setTimeout(() => root.classList.remove("is-page-entering"), 320);
  }

  if (transitionCurtain) {
    document.querySelectorAll(".desktop-nav a, .mobile-nav a").forEach((link) => {
      let destination;
      try {
        destination = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      const isLearningPage = destination.origin === window.location.origin && destination.pathname.endsWith("/ta.html");
      const isAdminPage = destination.hostname === "nfu-robotlab-internal-docs.robotlabnfu.workers.dev";
      if (!isLearningPage && !isAdminPage) return;

      link.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank" || reduceMotion.matches || root.classList.contains("is-page-leaving")) return;

        event.preventDefault();
        const rect = link.getBoundingClientRect();
        const x = Number.isFinite(event.clientX) && event.clientX > 0 ? event.clientX : rect.left + rect.width / 2;
        const y = Number.isFinite(event.clientY) && event.clientY > 0 ? event.clientY : rect.top + rect.height / 2;
        const farthestX = Math.max(x, window.innerWidth - x);
        const farthestY = Math.max(y, window.innerHeight - y);
        const scale = Math.ceil(Math.hypot(farthestX, farthestY) / 24) + 2;

        root.style.setProperty("--transition-x", `${x}px`);
        root.style.setProperty("--transition-y", `${y}px`);
        root.style.setProperty("--transition-scale", scale);

        if (destination.origin === window.location.origin) {
          try {
            sessionStorage.setItem("nfu-page-transition-v1", JSON.stringify({
              x: x / window.innerWidth,
              y: y / window.innerHeight,
              scale
            }));
          } catch {}
        }

        root.classList.remove("is-page-entering");
        root.classList.add("is-page-leaving");
        window.setTimeout(() => window.location.assign(destination.href), 250);
      });
    });
  }

  const details = document.querySelector(".mobile-nav");
  document.addEventListener("click", (event) => {
    if (details?.open && !details.contains(event.target)) details.removeAttribute("open");
  });

  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12 });

      revealItems.forEach((item) => observer.observe(item));
    }
  }

  const assistiveMenu = document.querySelector("[data-assistive-menu]");
  const assistiveToggle = assistiveMenu?.querySelector("[data-assistive-toggle]");
  const assistiveToolbar = assistiveMenu?.querySelector(".assistive-toolbar");
  const fontScaleSlider = assistiveMenu?.querySelector("#assistive-font-slider");
  const fontScaleValue = assistiveMenu?.querySelector("#assistive-font-value");
  const fontScaleReset = assistiveMenu?.querySelector("[data-font-reset]");
  if (!assistiveMenu || !assistiveToggle || !assistiveToolbar) return;

  const positionStorageKey = "nfu-assistive-position-v1";
  const fontScaleStorageKey = "nfu-font-scale-v1";
  const edgeMargin = 12;
  let dragState = null;
  let suppressClick = false;

  const setOpen = (isOpen, restoreFocus = false) => {
    assistiveMenu.classList.toggle("is-open", isOpen);
    assistiveToggle.setAttribute("aria-expanded", String(isOpen));
    assistiveToggle.setAttribute("aria-label", isOpen ? "關閉常用網站工具列" : "開啟常用網站工具列");
    assistiveToolbar.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) assistiveToolbar.querySelector("a")?.focus({ preventScroll: true });
    if (!isOpen && restoreFocus) assistiveToggle.focus({ preventScroll: true });
  };

  const clampPosition = (left, top) => {
    const width = assistiveMenu.offsetWidth;
    const height = assistiveMenu.offsetHeight;
    const safeTop = Math.max(edgeMargin, Math.min(top, window.innerHeight - height - edgeMargin));
    const safeLeft = Math.max(edgeMargin, Math.min(left, window.innerWidth - width - edgeMargin));
    return { left: safeLeft, top: safeTop };
  };

  const applyPosition = (left, top, save = false) => {
    const next = clampPosition(left, top);
    const menuHeight = assistiveMenu.offsetHeight;
    const toolbarHeight = assistiveToolbar.offsetHeight;
    const spaceAbove = next.top - edgeMargin;
    const spaceBelow = window.innerHeight - next.top - menuHeight - edgeMargin;
    assistiveMenu.style.left = `${next.left}px`;
    assistiveMenu.style.top = `${next.top}px`;
    assistiveMenu.style.right = "auto";
    assistiveMenu.style.bottom = "auto";
    assistiveMenu.classList.toggle("opens-right", next.left < window.innerWidth / 2);
    assistiveMenu.classList.toggle("opens-down", spaceAbove < toolbarHeight + 14 && spaceBelow > spaceAbove);
    if (save) localStorage.setItem(positionStorageKey, JSON.stringify(next));
  };

  const applyFontScale = (rawScale, save = false) => {
    const scale = Math.max(85, Math.min(140, Number(rawScale) || 100));
    document.documentElement.style.fontSize = `${scale}%`;
    if (fontScaleSlider) {
      fontScaleSlider.value = String(scale);
      fontScaleSlider.setAttribute("aria-valuetext", `${scale}%`);
    }
    if (fontScaleValue) fontScaleValue.value = `${scale}%`;
    if (save) localStorage.setItem(fontScaleStorageKey, String(scale));

    requestAnimationFrame(() => {
      if (!assistiveMenu.style.left) return;
      const rect = assistiveMenu.getBoundingClientRect();
      applyPosition(rect.left, rect.top, true);
    });
  };

  try {
    applyFontScale(localStorage.getItem(fontScaleStorageKey) || 100);
  } catch {
    applyFontScale(100);
  }

  fontScaleSlider?.addEventListener("input", () => applyFontScale(fontScaleSlider.value, true));
  fontScaleReset?.addEventListener("click", () => applyFontScale(100, true));

  try {
    const savedPosition = JSON.parse(localStorage.getItem(positionStorageKey));
    if (Number.isFinite(savedPosition?.left) && Number.isFinite(savedPosition?.top)) {
      applyPosition(savedPosition.left, savedPosition.top);
    }
  } catch {
    localStorage.removeItem(positionStorageKey);
  }

  assistiveToggle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const rect = assistiveMenu.getBoundingClientRect();
    dragState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
      moved: false
    };
    assistiveToggle.setPointerCapture(event.pointerId);
  });

  assistiveToggle.addEventListener("pointermove", (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;
    if (!dragState.moved && Math.hypot(deltaX, deltaY) < 6) return;
    dragState.moved = true;
    setOpen(false);
    assistiveMenu.classList.add("is-dragging");
    applyPosition(dragState.left + deltaX, dragState.top + deltaY);
  });

  const finishDrag = (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    if (dragState.moved) {
      const rect = assistiveMenu.getBoundingClientRect();
      applyPosition(rect.left, rect.top, true);
      suppressClick = true;
    }
    assistiveMenu.classList.remove("is-dragging");
    dragState = null;
  };

  assistiveToggle.addEventListener("pointerup", finishDrag);
  assistiveToggle.addEventListener("pointercancel", finishDrag);

  assistiveToggle.addEventListener("click", () => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    setOpen(!assistiveMenu.classList.contains("is-open"));
  });

  assistiveToolbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (assistiveMenu.classList.contains("is-open") && !assistiveMenu.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && assistiveMenu.classList.contains("is-open")) setOpen(false, true);
  });

  window.addEventListener("resize", () => {
    const rect = assistiveMenu.getBoundingClientRect();
    if (assistiveMenu.style.left) applyPosition(rect.left, rect.top, true);
  });
});
