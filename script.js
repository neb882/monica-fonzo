(() => {
  const root = document.documentElement;
  const topbar = document.getElementById("topbar");
  const pageShell = document.getElementById("page-shell");
  const progressBar = document.querySelector(".reading-progress");
  const brand = document.querySelector(".topbar-brand");
  const themeButton = document.querySelector(".theme-button");
  const menuButton = document.querySelector(".menu-button");
  const closeButton = document.querySelector(".drawer-close");
  const drawer = document.querySelector(".contents-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  const toast = document.querySelector(".toast");
  const skipLink = document.querySelector(".skip-link");
  const mainContent = document.getElementById("main-content");
  let toastTimer;
  let progressFrame;

  const iconMarkup = {
    light: '<path d="M12 3a9 9 0 1 0 9 9c-4.8 2.3-10.3-3.2-9-9Z"></path>',
    dark: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>',
  };

  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  function updateThemeButton() {
    if (!themeButton) return;
    const theme = currentTheme();
    themeButton.setAttribute(
      "aria-label",
      "Switch to " + (theme === "light" ? "dark" : "light") + " theme",
    );
    const icon = themeButton.querySelector("svg");
    if (icon) icon.innerHTML = iconMarkup[theme];
  }

  function toggleTheme() {
    const nextTheme = currentTheme() === "light" ? "dark" : "light";
    root.dataset.theme = nextTheme;
    try {
      localStorage.setItem("monica-fonzo-theme", nextTheme);
    } catch (_) {}
    updateThemeButton();
  }

  function updateReadingProgress() {
    const maximum = root.scrollHeight - window.innerHeight;
    const progress = maximum > 0
      ? Math.min(100, (window.scrollY / maximum) * 100)
      : 0;
    if (progressBar) {
      progressBar.style.transform = "scaleX(" + progress / 100 + ")";
    }
    if (brand) {
      const brandVisible = progress > 3;
      brand.classList.toggle("brand-visible", brandVisible);
      brand.setAttribute("aria-hidden", String(!brandVisible));
      if (brandVisible) {
        brand.removeAttribute("tabindex");
      } else {
        brand.setAttribute("tabindex", "-1");
      }
    }
  }

  function requestReadingProgressUpdate() {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(() => {
      progressFrame = 0;
      updateReadingProgress();
    });
  }

  function openDrawer() {
    if (!drawer || !backdrop || !menuButton) return;
    drawer.classList.add("drawer-open");
    backdrop.classList.add("drawer-open");
    drawer.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
    pageShell?.setAttribute("inert", "");
    topbar?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButton?.focus(), 0);
  }

  function closeDrawer({ restoreFocus = true } = {}) {
    if (!drawer || !backdrop || !menuButton) return;
    drawer.classList.remove("drawer-open");
    backdrop.classList.remove("drawer-open");
    drawer.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    pageShell?.removeAttribute("inert");
    topbar?.removeAttribute("inert");
    document.body.style.removeProperty("overflow");
    if (restoreFocus) window.setTimeout(() => menuButton.focus(), 0);
  }

  function showToast(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("toast-visible");
    toastTimer = window.setTimeout(
      () => toast.classList.remove("toast-visible"),
      2400,
    );
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Page link copied");
      return;
    } catch (_) {}

    const previousFocus = document.activeElement;
    const field = document.createElement("textarea");
    let copied = false;

    try {
      field.value = window.location.href;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      copied = Boolean(document.execCommand?.("copy"));
    } catch (_) {
      copied = false;
    } finally {
      field.remove();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    }

    showToast(
      copied
        ? "Page link copied"
        : "Copy unavailable — use your browser’s address bar",
    );
  }

  function filterClaims(button) {
    const filter = button.dataset.filter;
    const cards = Array.from(document.querySelectorAll(".claim-card"));
    let visible = 0;

    document.querySelectorAll(".filter-row button").forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle("filter-active", selected);
      candidate.setAttribute("aria-pressed", String(selected));
    });

    cards.forEach((card) => {
      const matches =
        filter === "all" ||
        card.querySelector(".evidence-" + filter) !== null;
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    const status = document.querySelector(".filter-status");
    if (status) {
      status.textContent =
        "Showing " + visible + " of " + cards.length + " claims";
    }
  }

  updateThemeButton();
  updateReadingProgress();
  window.addEventListener("scroll", requestReadingProgressUpdate, {
    passive: true,
  });
  window.addEventListener("resize", requestReadingProgressUpdate);
  themeButton?.addEventListener("click", toggleTheme);
  menuButton?.addEventListener("click", openDrawer);
  closeButton?.addEventListener("click", () => closeDrawer());
  backdrop?.addEventListener("click", () => closeDrawer());

  drawer?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      let target = null;
      try {
        target = document.getElementById(
          decodeURIComponent(link.hash.slice(1)),
        );
      } catch (_) {}

      closeDrawer({ restoreFocus: false });
      window.setTimeout(() => {
        if (target instanceof HTMLElement) {
          target.focus({ preventScroll: true });
        } else {
          menuButton?.focus();
        }
      }, 0);
    });
  });

  skipLink?.addEventListener("click", (event) => {
    if (!(mainContent instanceof HTMLElement)) return;
    event.preventDefault();
    mainContent.focus({ preventScroll: true });
    mainContent.scrollIntoView();
  });

  document.addEventListener("keydown", (event) => {
    if (!drawer?.classList.contains("drawer-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeDrawer();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const filterMap = {
    "All claims": "all",
    Official: "official",
    "1927 reporting": "contemporary",
    "Later reporting": "later",
    Unresolved: "unresolved",
  };

  document.querySelectorAll(".filter-row button").forEach((button) => {
    button.dataset.filter = filterMap[button.textContent.trim()] ?? "all";
    button.addEventListener("click", () => filterClaims(button));
  });

  const caseMapDialog = document.getElementById("case-map-dialog");
  const caseMapPreview = document.querySelector(".case-map-preview");
  const caseMapOpenButton = document.querySelector(".case-map-open");
  const caseMapCloseButton = document.querySelector("[data-close-case-map]");
  const caseMapZoomButtons = Array.from(document.querySelectorAll("[data-map-zoom]"));
  const caseMapZoomReadout = document.querySelector("[data-map-zoom-readout]");
  const caseMapViewport = document.querySelector(".case-map-dialog-viewport");
  const caseMapImage = document.querySelector(".case-map-dialog-image");
  const caseMapPointers = new Map();
  let caseMapPreviousFocus = null;
  let caseMapZoom = 1;
  let caseMapPanStart = null;
  let caseMapPinchStart = null;
  const caseMapZoomMin = 1;
  const caseMapZoomMax = 4;
  const caseMapZoomStep = 0.25;

  function clampCaseMapZoom(value) {
    return Math.min(caseMapZoomMax, Math.max(caseMapZoomMin, value));
  }

  function caseMapBaseWidth() {
    if (!(caseMapViewport instanceof HTMLElement)) return 0;
    return Math.max(caseMapViewport.clientWidth - 32, 240);
  }

  function updateCaseMapControls() {
    if (caseMapZoomReadout instanceof HTMLOutputElement) {
      caseMapZoomReadout.value = Math.round(caseMapZoom * 100) + "%";
      caseMapZoomReadout.textContent = caseMapZoomReadout.value;
    }
    caseMapZoomButtons.forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      const action = button.dataset.mapZoom;
      if (action === "in") button.disabled = caseMapZoom >= caseMapZoomMax;
      if (action === "out") button.disabled = caseMapZoom <= caseMapZoomMin;
      if (action === "reset") button.disabled = caseMapZoom === 1;
    });
  }

  function setCaseMapZoom(nextZoom, options = {}) {
    if (!(caseMapViewport instanceof HTMLElement) || !(caseMapImage instanceof HTMLElement)) return;

    const zoom = clampCaseMapZoom(nextZoom);
    const oldRect = caseMapImage.getBoundingClientRect();
    const anchorX = options.anchorX ?? caseMapViewport.clientWidth / 2;
    const anchorY = options.anchorY ?? caseMapViewport.clientHeight / 2;
    const oldScrollableWidth = Math.max(oldRect.width + 32, caseMapViewport.clientWidth);
    const oldScrollableHeight = Math.max(oldRect.height + 32, caseMapViewport.clientHeight);
    const ratioX = (caseMapViewport.scrollLeft + anchorX) / oldScrollableWidth;
    const ratioY = (caseMapViewport.scrollTop + anchorY) / oldScrollableHeight;

    caseMapZoom = zoom;
    caseMapImage.style.setProperty(
      "--case-map-dialog-width",
      caseMapBaseWidth() * caseMapZoom + "px",
    );

    // Force layout so the anchor can remain under the same point after zooming.
    const newRect = caseMapImage.getBoundingClientRect();
    const newScrollableWidth = Math.max(newRect.width + 32, caseMapViewport.clientWidth);
    const newScrollableHeight = Math.max(newRect.height + 32, caseMapViewport.clientHeight);

    if (options.resetPosition) {
      caseMapViewport.scrollLeft = 0;
      caseMapViewport.scrollTop = 0;
    } else {
      caseMapViewport.scrollLeft = ratioX * newScrollableWidth - anchorX;
      caseMapViewport.scrollTop = ratioY * newScrollableHeight - anchorY;
    }

    updateCaseMapControls();
  }

  function resetCaseMapView() {
    setCaseMapZoom(1, { resetPosition: true });
  }

  function openCaseMapDialog() {
    if (!(caseMapDialog instanceof HTMLDialogElement)) return;
    caseMapPreviousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    if (!caseMapDialog.open) caseMapDialog.showModal();
    document.body.style.overflow = "hidden";
    window.setTimeout(() => {
      const initialZoom = window.matchMedia("(max-width: 590px)").matches ? 2 : 1;
      setCaseMapZoom(initialZoom, { resetPosition: true });
      caseMapViewport?.focus();
    }, 0);
  }

  function closeCaseMapDialog() {
    if (!(caseMapDialog instanceof HTMLDialogElement) || !caseMapDialog.open) return;
    caseMapDialog.close();
  }

  function caseMapDistance(points) {
    const [first, second] = points;
    return Math.hypot(second.x - first.x, second.y - first.y);
  }

  function caseMapPointerCenter(points) {
    const [first, second] = points;
    return {
      x: (first.x + second.x) / 2,
      y: (first.y + second.y) / 2,
    };
  }

  function finishCaseMapPointer(pointerId) {
    caseMapPointers.delete(pointerId);
    if (!(caseMapViewport instanceof HTMLElement)) return;

    if (caseMapPointers.size === 1) {
      const remaining = Array.from(caseMapPointers.values())[0];
      caseMapPanStart = {
        x: remaining.x,
        y: remaining.y,
        scrollLeft: caseMapViewport.scrollLeft,
        scrollTop: caseMapViewport.scrollTop,
      };
    } else {
      caseMapPanStart = null;
    }

    caseMapPinchStart = null;
    if (!caseMapPointers.size) caseMapViewport.classList.remove("is-dragging");
  }

  caseMapPreview?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.closest(".case-map-open")) return;
    openCaseMapDialog();
  });

  caseMapOpenButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openCaseMapDialog();
  });

  caseMapCloseButton?.addEventListener("click", closeCaseMapDialog);

  caseMapDialog?.addEventListener("close", () => {
    document.body.style.removeProperty("overflow");
    caseMapPointers.clear();
    caseMapViewport?.classList.remove("is-dragging");
    if (caseMapPreviousFocus?.isConnected) {
      window.setTimeout(() => caseMapPreviousFocus.focus(), 0);
    }
  });

  caseMapDialog?.addEventListener("click", (event) => {
    if (event.target === caseMapDialog) closeCaseMapDialog();
  });

  caseMapZoomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.mapZoom;
      if (action === "in") setCaseMapZoom(caseMapZoom + caseMapZoomStep);
      if (action === "out") setCaseMapZoom(caseMapZoom - caseMapZoomStep);
      if (action === "reset") resetCaseMapView();
    });
  });

  caseMapViewport?.addEventListener(
    "wheel",
    (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const rect = caseMapViewport.getBoundingClientRect();
      setCaseMapZoom(
        caseMapZoom + (event.deltaY < 0 ? caseMapZoomStep : -caseMapZoomStep),
        { anchorX: event.clientX - rect.left, anchorY: event.clientY - rect.top },
      );
    },
    { passive: false },
  );

  caseMapViewport?.addEventListener("dblclick", (event) => {
    event.preventDefault();
    const rect = caseMapViewport.getBoundingClientRect();
    setCaseMapZoom(caseMapZoom === 1 ? 2 : 1, {
      anchorX: event.clientX - rect.left,
      anchorY: event.clientY - rect.top,
      resetPosition: caseMapZoom !== 1,
    });
  });

  caseMapViewport?.addEventListener("pointerdown", (event) => {
    if (!(caseMapViewport instanceof HTMLElement)) return;
    caseMapViewport.setPointerCapture?.(event.pointerId);
    caseMapPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    caseMapViewport.classList.add("is-dragging");

    if (caseMapPointers.size === 1) {
      caseMapPanStart = {
        x: event.clientX,
        y: event.clientY,
        scrollLeft: caseMapViewport.scrollLeft,
        scrollTop: caseMapViewport.scrollTop,
      };
    } else if (caseMapPointers.size === 2) {
      const points = Array.from(caseMapPointers.values());
      caseMapPinchStart = {
        distance: Math.max(caseMapDistance(points), 1),
        zoom: caseMapZoom,
      };
      caseMapPanStart = null;
    }
  });

  caseMapViewport?.addEventListener("pointermove", (event) => {
    if (!(caseMapViewport instanceof HTMLElement) || !caseMapPointers.has(event.pointerId)) return;
    event.preventDefault();
    caseMapPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (caseMapPointers.size === 2 && caseMapPinchStart) {
      const points = Array.from(caseMapPointers.values());
      const distance = caseMapDistance(points);
      const center = caseMapPointerCenter(points);
      const rect = caseMapViewport.getBoundingClientRect();
      setCaseMapZoom(caseMapPinchStart.zoom * (distance / caseMapPinchStart.distance), {
        anchorX: center.x - rect.left,
        anchorY: center.y - rect.top,
      });
      return;
    }

    if (caseMapPointers.size === 1 && caseMapPanStart && caseMapZoom > 1) {
      caseMapViewport.scrollLeft =
        caseMapPanStart.scrollLeft - (event.clientX - caseMapPanStart.x);
      caseMapViewport.scrollTop =
        caseMapPanStart.scrollTop - (event.clientY - caseMapPanStart.y);
    }
  });

  ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
    caseMapViewport?.addEventListener(eventName, (event) => {
      finishCaseMapPointer(event.pointerId);
    });
  });

  caseMapViewport?.addEventListener("keydown", (event) => {
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      setCaseMapZoom(caseMapZoom + caseMapZoomStep);
    } else if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      setCaseMapZoom(caseMapZoom - caseMapZoomStep);
    } else if (event.key === "0" || event.key.toLowerCase() === "f") {
      event.preventDefault();
      resetCaseMapView();
    }
  });

  window.addEventListener("resize", () => {
    if (caseMapDialog instanceof HTMLDialogElement && caseMapDialog.open) {
      setCaseMapZoom(caseMapZoom);
    }
  });

  document
    .querySelector(".footer-actions button:first-of-type")
    ?.addEventListener("click", copyLink);
  document
    .querySelector(".footer-actions button:nth-of-type(2)")
    ?.addEventListener("click", () => window.print());
})();
