const swapButton = document.querySelector(".swap-btn");
const fromInput = document.querySelector("#from-station");
const toInput = document.querySelector("#to-station");
const journeyDateInput = document.querySelector("#journey-date");
const chips = document.querySelectorAll(".chip");
const searchBtn = document.querySelector("#search-btn");
const mobileSearchBtn = document.querySelector("#mobile-search-cta");
const searchMessage = document.querySelector("#search-message");
const utilityMessage = document.querySelector("#utility-message");
const progressTracker = document.querySelector("#progress-tracker");
const stepTitle = document.querySelector("#step-title");
const flowStatus = document.querySelector("#flow-status");
const flowFeedback = document.querySelector("#flow-feedback");
const checkpointNote = document.querySelector("#checkpoint-note");
const nextStepBtn = document.querySelector("#next-step-btn");
const backStepBtn = document.querySelector("#back-step-btn");
const reviewBtn = document.querySelector("#review-btn");
const continueBtn = document.querySelector("#continue-btn");
const routeChips = document.querySelectorAll(".route-chip");
const recentSearchesList = document.querySelector("#recent-searches-list");
const savedRoutesList = document.querySelector("#saved-routes-list");
const preferredStationsList = document.querySelector("#preferred-stations-list");
const savedPassengersList = document.querySelector("#saved-passengers-list");
const clearRecentBtn = document.querySelector("#clear-recent-btn");
const saveCurrentRouteBtn = document.querySelector("#save-current-route-btn");
const applyTatkalBtn = document.querySelector("#apply-tatkal-btn");
const lastBookingSummary = document.querySelector("#last-booking-summary");
const repeatLastBookingBtn = document.querySelector("#repeat-last-booking-btn");
const resumeStatus = document.querySelector("#resume-status");
const resumeBookingBtn = document.querySelector("#resume-booking-btn");
const discardResumeBtn = document.querySelector("#discard-resume-btn");
const openPassengerPageBtn = document.querySelector("#open-passenger-page-btn");
const quotaSelect = document.querySelector("#quota");
const classSelect = document.querySelector("#travel-class");
const serviceTabs = document.querySelectorAll(".service-tab");

const steps = [
  "Search",
  "Select Train",
  "Passenger Details",
  "Review",
  "Payment",
  "Ticket Confirmed"
];

let currentStep = 1;
const RECENT_KEY = "irctc_recent_searches";
const ROUTES_KEY = "irctc_saved_routes";
const PASSENGERS_KEY = "irctc_saved_passengers";
const RESUME_KEY = "irctc_resume_booking";
const LAST_BOOKING_KEY = "irctc_last_booking";

const defaultRoutes = [
  { from: "NDLS", to: "BCT" },
  { from: "SBC", to: "MAS" },
  { from: "HWH", to: "PURI" }
];

const defaultPassengers = [
  { name: "R. Sharma", type: "Adult" },
  { name: "S. Sharma", type: "Adult" },
  { name: "A. Sharma", type: "Child" }
];

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showUtilityMessage(text) {
  if (utilityMessage) {
    utilityMessage.textContent = text;
  }
}

function applyRoute(route) {
  if (!route || !fromInput || !toInput) {
    return;
  }
  fromInput.value = route.from;
  toInput.value = route.to;
  updateFieldLocks();
  showUtilityMessage(`Route applied: ${route.from} -> ${route.to}`);
}

function formatSearchLabel(search) {
  return `${search.from} -> ${search.to} | ${search.date || "Date pending"} | ${search.quota || "General"}`;
}

function renderRecentSearches() {
  if (!recentSearchesList) {
    return;
  }
  const recent = readStore(RECENT_KEY, []);
  recentSearchesList.innerHTML = "";

  if (!recent.length) {
    recentSearchesList.innerHTML = "<li><span class='utility-summary'>No recent searches yet.</span></li>";
    return;
  }

  recent.forEach((search) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = formatSearchLabel(search);
    button.addEventListener("click", () => {
      applyRoute(search);
      if (journeyDateInput && search.date) {
        journeyDateInput.value = search.date;
      }
      if (quotaSelect && search.quota) {
        quotaSelect.value = search.quota;
      }
      if (classSelect && search.travelClass) {
        classSelect.value = search.travelClass;
      }
      updateFieldLocks();
    });
    li.appendChild(button);
    recentSearchesList.appendChild(li);
  });
}

function renderSavedRoutes() {
  if (!savedRoutesList) {
    return;
  }
  const routes = readStore(ROUTES_KEY, defaultRoutes);
  savedRoutesList.innerHTML = "";

  routes.forEach((route) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${route.from} -> ${route.to}`;
    button.addEventListener("click", () => {
      applyRoute(route);
    });
    li.appendChild(button);
    savedRoutesList.appendChild(li);
  });

  if (preferredStationsList) {
    const stations = [...new Set(routes.flatMap((route) => [route.from, route.to]))].slice(0, 8);
    preferredStationsList.innerHTML = "";
    stations.forEach((station) => {
      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = station;
      preferredStationsList.appendChild(pill);
    });
  }
}

function renderSavedPassengers() {
  if (!savedPassengersList) {
    return;
  }
  const passengers = readStore(PASSENGERS_KEY, defaultPassengers);
  savedPassengersList.innerHTML = "";

  passengers.forEach((passenger) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${passenger.name} (${passenger.type})`;
    button.addEventListener("click", () => {
      showUtilityMessage(`${passenger.name} selected. Open Passenger Details to auto-fill traveller information.`);
    });
    li.appendChild(button);
    savedPassengersList.appendChild(li);
  });
}

function renderLastBooking() {
  if (!lastBookingSummary) {
    return;
  }
  const lastBooking = readStore(LAST_BOOKING_KEY, null);
  if (!lastBooking) {
    lastBookingSummary.textContent = "No recent booking available yet.";
    return;
  }

  lastBookingSummary.textContent = `${lastBooking.from} -> ${lastBooking.to}, ${lastBooking.date || "Date pending"}, ${lastBooking.quota || "General"}.`;
}

function captureFormSnapshot() {
  return {
    from: (fromInput?.value || "").trim(),
    to: (toInput?.value || "").trim(),
    date: (journeyDateInput?.value || "").trim(),
    quota: (quotaSelect?.value || "").trim(),
    travelClass: (classSelect?.value || "").trim(),
    step: currentStep,
    updatedAt: new Date().toISOString()
  };
}

function saveResumeState() {
  const snapshot = captureFormSnapshot();
  if (!snapshot.from && !snapshot.to && !snapshot.date) {
    return;
  }
  if (snapshot.step >= steps.length - 1) {
    localStorage.removeItem(RESUME_KEY);
    renderResumeState();
    return;
  }
  writeStore(RESUME_KEY, snapshot);
  renderResumeState();
}

function renderResumeState() {
  if (!resumeStatus) {
    return;
  }
  const resume = readStore(RESUME_KEY, null);
  if (!resume) {
    resumeStatus.textContent = "No incomplete booking found.";
    if (resumeBookingBtn) {
      resumeBookingBtn.disabled = true;
    }
    if (discardResumeBtn) {
      discardResumeBtn.disabled = true;
    }
    return;
  }

  resumeStatus.textContent = `Saved at step ${resume.step + 1}: ${resume.from || "--"} -> ${resume.to || "--"}, ${resume.date || "Date pending"}.`;
  if (resumeBookingBtn) {
    resumeBookingBtn.disabled = false;
  }
  if (discardResumeBtn) {
    discardResumeBtn.disabled = false;
  }
}

function saveRecentSearch() {
  const snapshot = captureFormSnapshot();
  const hasRequired = snapshot.from && snapshot.to && snapshot.date;
  if (!hasRequired) {
    return;
  }

  const recent = readStore(RECENT_KEY, []);
  const deduped = recent.filter((item) => !(item.from === snapshot.from && item.to === snapshot.to && item.date === snapshot.date));
  deduped.unshift(snapshot);
  writeStore(RECENT_KEY, deduped.slice(0, 5));
  renderRecentSearches();
}

function saveLastBooking() {
  const snapshot = captureFormSnapshot();
  if (!snapshot.from || !snapshot.to) {
    return;
  }
  writeStore(LAST_BOOKING_KEY, snapshot);
  renderLastBooking();
}

function initializeUtilityData() {
  if (!localStorage.getItem(ROUTES_KEY)) {
    writeStore(ROUTES_KEY, defaultRoutes);
  }
  if (!localStorage.getItem(PASSENGERS_KEY)) {
    writeStore(PASSENGERS_KEY, defaultPassengers);
  }
}

function navigateWithTransition(url) {
  if (typeof window.playTransitionAndNavigate === "function") {
    window.playTransitionAndNavigate(url);
    return;
  }
  window.location.href = url;
}

function updateFieldLocks() {
  if (!fromInput || !toInput || !journeyDateInput || !classSelect || !quotaSelect) {
    return;
  }

  const fromFilled = fromInput.value.trim().length > 0;
  const toFilled = toInput.value.trim().length > 0;
  const dateFilled = String(journeyDateInput.value || "").trim().length > 0;

  toInput.disabled = !fromFilled;
  journeyDateInput.disabled = !fromFilled || !toFilled;
  classSelect.disabled = !fromFilled || !toFilled || !dateFilled;
  quotaSelect.disabled = !fromFilled || !toFilled || !dateFilled;
}

function validateSearchFields(showError) {
  if (!fromInput || !toInput || !journeyDateInput) {
    return false;
  }

  const fromValue = fromInput.value.trim();
  const toValue = toInput.value.trim();
  const journeyDateValue = String(journeyDateInput.value || "").trim();

  [fromInput, toInput, journeyDateInput].forEach((field) => {
    field.classList.remove("invalid");
    field.setAttribute("aria-invalid", "false");
  });

  if (!fromValue || !toValue || !journeyDateValue) {
    if (!fromValue) {
      fromInput.classList.add("invalid");
      fromInput.setAttribute("aria-invalid", "true");
    }
    if (!toValue) {
      toInput.classList.add("invalid");
      toInput.setAttribute("aria-invalid", "true");
    }
    if (!journeyDateValue) {
      journeyDateInput.classList.add("invalid");
      journeyDateInput.setAttribute("aria-invalid", "true");
    }

    if (showError && searchMessage) {
      searchMessage.textContent = "Please complete all required fields: From Station, To Station, and Journey Date.";
      searchMessage.classList.add("error");
      (fromValue ? (toValue ? journeyDateInput : toInput) : fromInput)?.focus();
    }
    return false;
  }

  if (fromValue.toLowerCase() === toValue.toLowerCase()) {
    fromInput.classList.add("invalid");
    toInput.classList.add("invalid");
    fromInput.setAttribute("aria-invalid", "true");
    toInput.setAttribute("aria-invalid", "true");
    if (showError && searchMessage) {
      searchMessage.textContent = "From and To station cannot be the same. Please correct and retry.";
      searchMessage.classList.add("error");
      toInput.focus();
    }
    return false;
  }

  if (showError && searchMessage) {
    searchMessage.classList.remove("error");
    searchMessage.textContent = "Search submitted. Next step: Select train availability.";
  }
  return true;
}

if (swapButton && fromInput && toInput) {
  swapButton.addEventListener("click", () => {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
    updateFieldLocks();
  });
}

routeChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const routeToken = chip.dataset.route || "";
    const parts = routeToken.split("|").map((value) => value.trim());
    if (parts.length === 2) {
      applyRoute({ from: parts[0], to: parts[1] });
      updateFieldLocks();
    }
  });
});

[fromInput, toInput, journeyDateInput].forEach((field) => {
  field?.addEventListener("input", updateFieldLocks);
  field?.addEventListener("change", updateFieldLocks);
});

function renderProgress() {
  if (!progressTracker) {
    return;
  }

  const items = progressTracker.querySelectorAll("li");
  items.forEach((item, index) => {
    item.classList.remove("done", "active", "current");
    if (index < currentStep) {
      item.classList.add("done");
    } else if (index === currentStep) {
      item.classList.add("active", "current");
    }
  });

  if (stepTitle) {
    stepTitle.textContent = `Step ${currentStep + 1}: ${steps[currentStep]}`;
  }
  if (flowStatus) {
    flowStatus.textContent = `You are currently in ${steps[currentStep]}. Next: ${steps[Math.min(currentStep + 1, steps.length - 1)]}.`;
  }
  if (flowFeedback) {
    flowFeedback.textContent =
      currentStep < 5
        ? "Booking is in progress. Keep details ready to avoid delays."
        : "Success. Ticket is confirmed and booking workflow is complete.";
  }
  if (checkpointNote) {
    checkpointNote.textContent = `You are on step ${currentStep + 1} of ${steps.length}.`;
  }

  saveResumeState();

  if (currentStep === steps.length - 1) {
    saveLastBooking();
  }
}

if (searchBtn && fromInput && toInput && searchMessage) {
  searchBtn.addEventListener("click", () => {
    const isValid = validateSearchFields(true);
    if (!isValid) {
      return;
    }

    saveRecentSearch();
    saveResumeState();
    navigateWithTransition("train-results.html");
  });
}

if (mobileSearchBtn && searchBtn) {
  mobileSearchBtn.addEventListener("click", () => {
    searchBtn.click();
    searchMessage?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

if (nextStepBtn) {
  nextStepBtn.addEventListener("click", () => {
    if (currentStep >= 1 && !validateSearchFields(true)) {
      return;
    }
    if (currentStep < steps.length - 1) {
      currentStep += 1;
      renderProgress();
    }
  });
}

if (backStepBtn) {
  backStepBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep -= 1;
      renderProgress();
    }
  });
}

if (reviewBtn) {
  reviewBtn.addEventListener("click", () => {
    if (!validateSearchFields(true)) {
      return;
    }
    navigateWithTransition("payment.html");
  });
}

if (continueBtn) {
  continueBtn.addEventListener("click", () => {
    if (!validateSearchFields(true)) {
      return;
    }
    navigateWithTransition("passenger-details.html");
  });
}

if (progressTracker) {
  const stepItems = progressTracker.querySelectorAll("li");
  stepItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (index <= currentStep) {
        currentStep = index;
        renderProgress();
      } else if (searchMessage) {
        searchMessage.textContent = "You can move forward only after completing required current details.";
        searchMessage.classList.add("error");
      }
    });
  });
}

if (clearRecentBtn) {
  clearRecentBtn.addEventListener("click", () => {
    localStorage.removeItem(RECENT_KEY);
    renderRecentSearches();
    showUtilityMessage("Recent searches cleared.");
  });
}

if (saveCurrentRouteBtn) {
  saveCurrentRouteBtn.addEventListener("click", () => {
    const from = (fromInput?.value || "").trim();
    const to = (toInput?.value || "").trim();
    if (!from || !to) {
      showUtilityMessage("Enter both From and To station before saving a route.");
      return;
    }

    const routes = readStore(ROUTES_KEY, defaultRoutes);
    const exists = routes.some((route) => route.from.toLowerCase() === from.toLowerCase() && route.to.toLowerCase() === to.toLowerCase());
    if (!exists) {
      routes.unshift({ from, to });
      writeStore(ROUTES_KEY, routes.slice(0, 10));
      renderSavedRoutes();
    }
    showUtilityMessage(`Route saved: ${from} -> ${to}`);
  });
}

if (applyTatkalBtn) {
  applyTatkalBtn.addEventListener("click", () => {
    if (quotaSelect) {
      quotaSelect.value = "Tatkal";
    }
    showUtilityMessage("Tatkal quota selected. Continue with train search.");
  });
}

if (repeatLastBookingBtn) {
  repeatLastBookingBtn.addEventListener("click", () => {
    const lastBooking = readStore(LAST_BOOKING_KEY, null);
    if (!lastBooking) {
      showUtilityMessage("No previous booking details available.");
      return;
    }

    applyRoute(lastBooking);
    if (journeyDateInput && lastBooking.date) {
      journeyDateInput.value = lastBooking.date;
    }
    if (quotaSelect && lastBooking.quota) {
      quotaSelect.value = lastBooking.quota;
    }
    if (classSelect && lastBooking.travelClass) {
      classSelect.value = lastBooking.travelClass;
    }
    updateFieldLocks();
    showUtilityMessage("Last booking details applied to the search form.");
  }
}

if (resumeBookingBtn) {
  resumeBookingBtn.addEventListener("click", () => {
    const resume = readStore(RESUME_KEY, null);
    if (!resume) {
      return;
    }

    applyRoute(resume);
    if (journeyDateInput && resume.date) {
      journeyDateInput.value = resume.date;
    }
    if (quotaSelect && resume.quota) {
      quotaSelect.value = resume.quota;
    }
    if (classSelect && resume.travelClass) {
      classSelect.value = resume.travelClass;
    }
    updateFieldLocks();
    currentStep = Math.max(0, Math.min(Number(resume.step) || 0, steps.length - 1));
    renderProgress();
    showUtilityMessage(`Resumed booking from step ${currentStep + 1}.`);
  });
}

if (discardResumeBtn) {
  discardResumeBtn.addEventListener("click", () => {
    localStorage.removeItem(RESUME_KEY);
    renderResumeState();
    showUtilityMessage("Saved incomplete booking discarded.");
  });
}

if (openPassengerPageBtn) {
  openPassengerPageBtn.addEventListener("click", () => {
    window.location.href = "passenger-details.html";
  });
}

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetMap = {
      Flights: "train-results.html",
      Hotels: "train-results.html",
      Buses: "train-results.html",
      Tourism: "train-results.html",
      Meals: "payment.html",
      Lounge: "passenger-details.html",
      "Retiring Room": "passenger-details.html"
    };
    const label = tab.textContent?.trim() || "";
    const target = targetMap[label] || "index.html";
    navigateWithTransition(target);
  });
});

initializeUtilityData();
renderRecentSearches();
renderSavedRoutes();
renderSavedPassengers();
renderLastBooking();
renderResumeState();
updateFieldLocks();
renderProgress();

// ========== AUTHENTICATION SYSTEM - BUILDS MODALS FROM JAVASCRIPT ==========
function setupAuthentication() {
  const loginBtn = document.querySelector("#login-card");
  const registerBtn = document.querySelector("#register-card");
  const topLoginLink = document.querySelector('.top-strip .right-links a[href="#login-card"]');
  const topRegisterLink = document.querySelector('.top-strip .right-links a[href="#register-card"]');

  if (!loginBtn || !registerBtn) return; // Exit if buttons don't exist

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "auth-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(18, 58, 116, 0.5);
    backdrop-filter: blur(2px);
    z-index: 2000;
    display: none;
  `;

  // Create login modal
  const loginModal = document.createElement("div");
  loginModal.id = "login-modal";
  loginModal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2001;
    width: min(460px, 92vw);
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 18px 50px rgba(18, 58, 116, 0.28);
    padding: 26px 28px;
    display: none;
  `;
  loginModal.innerHTML = `
    <button type="button" id="login-close" style="position: absolute; top: 10px; right: 12px; background: none; border: none; font-size: 26px; cursor: pointer; width: 32px; height: 32px; color: #41587a;">&times;</button>
    <h3 style="margin: 0 auto 20px; width: fit-content; color: #0e3b7a; font-size: 40px; line-height: 1; letter-spacing: 1px; border-bottom: 2px solid #335b9f; padding-bottom: 8px;">LOGIN</h3>
    <form id="login-form" style="display: flex; flex-direction: column; gap: 10px;">
      <label for="login-username" style="font-weight: 700; font-size: 30px; color: #0b3975;">User Name</label>
      <input type="text" id="login-username" placeholder="Enter username or email" style="padding: 12px 4px; border: none; border-bottom: 1px solid #d5deeb; font-size: 18px; outline: none;">

      <label for="login-password" style="margin-top: 6px; font-weight: 700; font-size: 30px; color: #0b3975;">Password</label>
      <div style="position: relative;">
        <input type="password" id="login-password" placeholder="Enter password" style="width: 100%; padding: 12px 44px 12px 4px; border: none; border-bottom: 1px solid #d5deeb; font-size: 18px; outline: none;">
        <button type="button" id="login-toggle-pass" aria-label="Show password" style="position: absolute; right: 6px; top: 50%; transform: translateY(-50%); border: none; background: transparent; cursor: pointer; color: #6a7789; font-size: 19px;">&#128065;</button>
      </div>

      <a href="#" style="margin-top: 6px; color: #0f4fa8; font-weight: 700; font-size: 24px; text-decoration: none; letter-spacing: 0.4px;">FORGOT ACCOUNT DETAILS?</a>

      <label style="display: flex; gap: 10px; align-items: flex-start; margin-top: 2px; font-size: 13px; color: #113f7d; line-height: 1.35;">
        <input type="checkbox" id="login-visual-option" style="margin-top: 2px; width: 16px; height: 16px;">
        <span>Visually impaired users may select this option to receive OTP instead of CAPTCHA</span>
      </label>

      <button type="submit" style="margin-top: 8px; padding: 12px; background: #df6b21; color: #fff; border: none; border-radius: 8px; font-size: 30px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer;">SIGN IN</button>
      <p style="margin: 8px 0 0; font-size: 13px; text-align: center; color: #234b80;">New user? <a href="#" id="switch-to-register-from-login" style="color: #0f4fa8; font-weight: 700; cursor: pointer;">REGISTER</a></p>
    </form>
  `;

  // Create register modal
  const registerModal = document.createElement("div");
  registerModal.id = "register-modal";
  registerModal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2001;
    width: min(460px, 92vw);
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 18px 50px rgba(18, 58, 116, 0.28);
    padding: 26px 28px;
    display: none;
  `;
  registerModal.innerHTML = `
    <button type="button" id="register-close" style="position: absolute; top: 10px; right: 12px; background: none; border: none; font-size: 26px; cursor: pointer; color: #41587a;">&times;</button>
    <h3 style="margin: 0 auto 20px; width: fit-content; color: #0e3b7a; font-size: 32px; line-height: 1; letter-spacing: 0.8px; border-bottom: 2px solid #335b9f; padding-bottom: 8px;">REGISTER</h3>
    <form id="register-form" style="display: flex; flex-direction: column; gap: 10px;">
      <label for="register-name" style="font-weight: 700; font-size: 16px; color: #0b3975;">Full Name</label>
      <input type="text" id="register-name" placeholder="Enter full name" style="padding: 10px 4px; border: none; border-bottom: 1px solid #d5deeb; font-size: 16px; outline: none;">

      <label for="register-email" style="font-weight: 700; font-size: 16px; color: #0b3975;">Email ID</label>
      <input type="email" id="register-email" placeholder="Enter email" style="padding: 10px 4px; border: none; border-bottom: 1px solid #d5deeb; font-size: 16px; outline: none;">

      <label for="register-password" style="font-weight: 700; font-size: 16px; color: #0b3975;">Password</label>
      <div style="position: relative;">
        <input type="password" id="register-password" placeholder="Minimum 6 characters" style="width: 100%; padding: 10px 44px 10px 4px; border: none; border-bottom: 1px solid #d5deeb; font-size: 16px; outline: none;">
        <button type="button" id="register-toggle-pass" aria-label="Show password" style="position: absolute; right: 6px; top: 50%; transform: translateY(-50%); border: none; background: transparent; cursor: pointer; color: #6a7789; font-size: 18px;">&#128065;</button>
      </div>

      <label for="register-confirm" style="font-weight: 700; font-size: 16px; color: #0b3975;">Confirm Password</label>
      <input type="password" id="register-confirm" placeholder="Re-enter password" style="padding: 10px 4px; border: none; border-bottom: 1px solid #d5deeb; font-size: 16px; outline: none;">

      <button type="submit" style="margin-top: 8px; padding: 12px; background: #df6b21; color: #fff; border: none; border-radius: 8px; font-size: 18px; font-weight: 700; letter-spacing: 0.4px; cursor: pointer;">CREATE ACCOUNT</button>
      <p style="margin: 8px 0 0; font-size: 13px; text-align: center; color: #234b80;">Already registered? <a href="#" id="switch-to-login-from-register" style="color: #0f4fa8; font-weight: 700; cursor: pointer;">LOGIN</a></p>
    </form>
  `;

  // Inject modals into body
  document.body.appendChild(overlay);
  document.body.appendChild(loginModal);
  document.body.appendChild(registerModal);

  // Helper functions
  function showModal(modal) {
    overlay.style.display = "block";
    modal.style.display = "block";
  }

  function hideAll() {
    overlay.style.display = "none";
    loginModal.style.display = "none";
    registerModal.style.display = "none";
  }

  // Button events
  function openLogin(e) {
    e.preventDefault();
    showModal(loginModal);
  }

  function openRegister(e) {
    e.preventDefault();
    showModal(registerModal);
  }

  loginBtn.addEventListener("click", openLogin);
  registerBtn.addEventListener("click", openRegister);
  topLoginLink?.addEventListener("click", openLogin);
  topRegisterLink?.addEventListener("click", openRegister);

  // Close buttons
  document.querySelector("#login-close").addEventListener("click", hideAll);
  document.querySelector("#register-close").addEventListener("click", hideAll);

  // Overlay click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) hideAll();
  });

  // Password visibility toggles
  document.querySelector("#login-toggle-pass").addEventListener("click", () => {
    const input = document.querySelector("#login-password");
    input.type = input.type === "password" ? "text" : "password";
  });

  document.querySelector("#register-toggle-pass").addEventListener("click", () => {
    const input = document.querySelector("#register-password");
    input.type = input.type === "password" ? "text" : "password";
  });

  // Switch links
  document.querySelector("#switch-to-register-from-login").addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "none";
    registerModal.style.display = "block";
  });

  document.querySelector("#switch-to-login-from-register").addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.style.display = "none";
    loginModal.style.display = "block";
  });

  // LOGIN form
  document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameOrEmail = document.querySelector("#login-username").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    if (!usernameOrEmail || !password) {
      alert("Fill all fields");
      return;
    }

    const users = readStore("irctc_users", []);
    const normalized = usernameOrEmail.toLowerCase();
    const user = users.find(u => (u.email?.toLowerCase() === normalized || u.name?.toLowerCase() === normalized) && u.password === password);

    if (user) {
      writeStore("irctc_user_auth", { email: user.email, name: user.name, isAuthenticated: true });
      alert(`Welcome ${user.name}!`);
      hideAll();
      setTimeout(() => navigateWithTransition("passenger-details.html"), 500);
    } else {
      alert("Invalid credentials");
    }
  });

  // REGISTER form
  document.querySelector("#register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#register-name").value.trim();
    const email = document.querySelector("#register-email").value.trim();
    const password = document.querySelector("#register-password").value.trim();
    const confirm = document.querySelector("#register-confirm").value.trim();

    if (!name || !email || !password || !confirm) {
      alert("Fill all fields");
      return;
    }

    if (name.length < 3) {
      alert("Name too short");
      return;
    }

    if (password.length < 6) {
      alert("Password min 6 chars");
      return;
    }

    if (password !== confirm) {
      alert("Passwords don't match");
      return;
    }

    const users = readStore("irctc_users", []);
    if (users.some(u => u.email === email)) {
      alert("Email exists");
      return;
    }

    users.push({ name, email, password });
    writeStore("irctc_users", users);
    writeStore("irctc_user_auth", { email, name, isAuthenticated: true });

    alert(`Account created! Welcome ${name}!`);
    hideAll();
    setTimeout(() => navigateWithTransition("passenger-details.html"), 500);
  });
}

// Initialize auth
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupAuthentication);
} else {
  setupAuthentication();
}
