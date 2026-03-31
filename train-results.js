const classFilter = document.querySelector("#global-class-filter");
const trainCards = document.querySelectorAll(".train-card");
const classPills = document.querySelectorAll(".class-pill");
const sortPills = document.querySelectorAll(".sort-row .pill");
const filterPanel = document.querySelector(".filters-sticky");
const mobileFilterToggle = document.querySelector("#mobile-filter-toggle");
const mobileRefineBtn = document.querySelector("#mobile-refine-btn");
const mobileContinueBtn = document.querySelector("#mobile-continue-btn");
const detailsSheet = document.querySelector("#mobile-details-sheet");
const detailsBackdrop = document.querySelector("#sheet-backdrop");
const detailsClose = document.querySelector("#sheet-close");
const detailsBody = document.querySelector("#sheet-body");
const detailsTitle = document.querySelector("#sheet-train-title");
const viewDetailBtns = document.querySelectorAll(".view-details-btn");
const bookNowBtns = document.querySelectorAll(".actions .primary-btn");
const modifySearchBtn = document.querySelector("#modify-search-btn");

function navigateWithTransition(url) {
  if (typeof window.playTransitionAndNavigate === "function") {
    window.playTransitionAndNavigate(url);
    return;
  }
  window.location.href = url;
}

function filterCards() {
  if (!classFilter) {
    return;
  }
  const value = classFilter.value;

  trainCards.forEach((card) => {
    const classes = (card.dataset.classes || "").split(",");
    const shouldShow = value === "ALL" || classes.includes(value);
    card.classList.toggle("filtered-out", !shouldShow);
  });
}

if (classFilter) {
  classFilter.addEventListener("change", filterCards);
}

classPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const parent = pill.closest(".class-block");
    if (!parent) {
      return;
    }
    parent.querySelectorAll(".class-pill").forEach((item) => item.classList.remove("active"));
    pill.classList.add("active");
  });
});

sortPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    sortPills.forEach((item) => item.classList.remove("active"));
    pill.classList.add("active");
  });
});

function toggleFilters(open) {
  if (!filterPanel || !mobileFilterToggle) {
    return;
  }

  const shouldOpen = typeof open === "boolean" ? open : !filterPanel.classList.contains("open");
  filterPanel.classList.toggle("open", shouldOpen);
  mobileFilterToggle.setAttribute("aria-expanded", String(shouldOpen));
  mobileFilterToggle.textContent = shouldOpen ? "Hide Filters" : "Show Filters";
}

if (mobileFilterToggle) {
  mobileFilterToggle.addEventListener("click", () => toggleFilters());
}

if (mobileRefineBtn) {
  mobileRefineBtn.addEventListener("click", () => {
    toggleFilters(true);
    filterPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function openDetails(card) {
  if (!detailsSheet || !detailsBody || !detailsTitle || !card) {
    return;
  }

  const trainName = card.querySelector(".train-id h2")?.textContent?.trim() || "Train Details";
  const trainType = card.querySelector(".train-id p")?.textContent?.trim() || "";
  const departure = card.querySelector(".timing-grid div:nth-child(1) strong")?.textContent?.trim() || "-";
  const arrival = card.querySelector(".timing-grid div:nth-child(2) strong")?.textContent?.trim() || "-";
  const duration = card.querySelector(".timing-grid div:nth-child(3) strong")?.textContent?.trim() || "-";
  const availability = card.querySelector(".status")?.textContent?.trim() || "-";
  const activeClass = card.querySelector(".class-pill.active")?.textContent?.trim() || card.querySelector(".class-pill")?.textContent?.trim() || "-";

  detailsTitle.textContent = trainName;
  detailsBody.innerHTML = `
    <p><strong>Type:</strong> ${trainType}</p>
    <p><strong>Departure:</strong> ${departure}</p>
    <p><strong>Arrival:</strong> ${arrival}</p>
    <p><strong>Duration:</strong> ${duration}</p>
    <p><strong>Availability:</strong> ${availability}</p>
    <p><strong>Selected Class:</strong> ${activeClass}</p>
  `;

  detailsSheet.setAttribute("aria-hidden", "false");
}

function closeDetails() {
  if (!detailsSheet) {
    return;
  }
  detailsSheet.setAttribute("aria-hidden", "true");
}

viewDetailBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".train-card");
    openDetails(card);
  });
});

detailsBackdrop?.addEventListener("click", closeDetails);
detailsClose?.addEventListener("click", closeDetails);

if (mobileContinueBtn) {
  mobileContinueBtn.addEventListener("click", () => {
    const visibleBookButton = Array.from(bookNowBtns).find((btn) => !btn.closest(".train-card")?.classList.contains("filtered-out"));
    visibleBookButton?.click();
  });
}

bookNowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    navigateWithTransition("passenger-details.html");
  });
});

if (modifySearchBtn) {
  modifySearchBtn.addEventListener("click", () => {
    navigateWithTransition("index.html#homepage");
  });
}

filterCards();
