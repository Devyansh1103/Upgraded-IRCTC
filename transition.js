(function () {
  const overlay = document.querySelector("#transition-overlay");
  const video = document.querySelector("#transition-video");

  if (!overlay || !video) {
    return;
  }

  function applyRegularMode() {
    overlay.style.background = "rgba(18, 58, 116, 0.16)";
    video.style.width = "min(360px, 60vw)";
    video.style.maxHeight = "70vh";
    video.style.objectFit = "contain";
    video.style.opacity = "0.72";
    video.style.borderRadius = "10px";
  }

  function applyIntroMode() {
    overlay.style.background = "rgba(18, 58, 116, 0.08)";
    video.style.width = "100vw";
    video.style.maxHeight = "100vh";
    video.style.height = "100vh";
    video.style.objectFit = "cover";
    video.style.opacity = "0.86";
    video.style.borderRadius = "0";
  }

  function showOverlay() {
    applyRegularMode();
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
  }

  function hideOverlay() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    video.pause();
    applyRegularMode();
  }

  function playTransitionAndNavigate(url) {
    if (!url) {
      return;
    }

    showOverlay();
    video.currentTime = 0;

    const fallbackTimer = window.setTimeout(() => {
      window.location.href = url;
    }, 1100);

    video.addEventListener(
      "ended",
      () => {
        window.clearTimeout(fallbackTimer);
        window.location.href = url;
      },
      { once: true }
    );

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {
        window.clearTimeout(fallbackTimer);
        window.location.href = url;
      });
    }
  }

  window.playTransitionAndNavigate = playTransitionAndNavigate;

  // Intercept page-to-page anchor navigation for consistent transitions.
  document.addEventListener("click", (event) => {
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!anchor) {
      return;
    }

    const href = anchor.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
      return;
    }

    event.preventDefault();
    playTransitionAndNavigate(anchor.href);
  });

  // Play transition when landing on home page.
  if (document.body.dataset.introTransition === "true") {
    showOverlay();
    applyIntroMode();
    video.currentTime = 0;

    video.addEventListener(
      "ended",
      () => {
        hideOverlay();
      },
      { once: true }
    );

    const introPlay = video.play();
    if (introPlay && typeof introPlay.catch === "function") {
      introPlay.catch(() => {
        window.setTimeout(hideOverlay, 500);
      });
    }

    window.setTimeout(hideOverlay, 1600);
  }
})();
