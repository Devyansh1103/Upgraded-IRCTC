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
      alert(`Welcome, ${name}! Account created.`);
      registerForm.reset();
      hide(registerModal);
      hide(overlay);
      setTimeout(() => navigateWithTransition("passenger-details.html"), 500);
    });
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
    width: min(420px, 90vw);
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(18, 58, 116, 0.24);
    padding: 32px;
    display: none;
  `;
  loginModal.innerHTML = `
    <button type="button" id="login-close" style="position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 28px; cursor: pointer; width: 32px; height: 32px;">&times;</button>
    <h3 style="margin-top: 0; margin-bottom: 24px; color: #123a74; font-size: 20px;">Login to Your Account</h3>
    <form id="login-form" style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label style="font-weight: 600; font-size: 14px; color: #123a74;">Email</label>
        <input type="email" id="login-email" placeholder="Enter email" style="padding: 12px; border: 1px solid #c6d4ea; border-radius: 6px; font-size: 14px;">
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label style="font-weight: 600; font-size: 14px; color: #123a74;">Password</label>
        <input type="password" id="login-password" placeholder="Enter password" style="padding: 12px; border: 1px solid #c6d4ea; border-radius: 6px; font-size: 14px;">
      </div>
      <button type="submit" style="padding: 12px; background: #1b4f9c; color: #fff; border: none; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer;">Login</button>
      <p style="margin: 16px 0 0; font-size: 13px; text-align: center;"><a href="#" id="switch-to-register-from-login" style="color: #1b4f9c; cursor: pointer;">Register</a></p>
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
    width: min(420px, 90vw);
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(18, 58, 116, 0.24);
    padding: 32px;
    display: none;
  `;
  registerModal.innerHTML = `
    <button type="button" id="register-close" style="position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 28px; cursor: pointer;">&times;</button>
    <h3 style="margin-top: 0; margin-bottom: 24px; color: #123a74; font-size: 20px;">Create Account</h3>
    <form id="register-form" style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label style="font-weight: 600; font-size: 14px; color: #123a74;">Name</label>
        <input type="text" id="register-name" placeholder="Full name" style="padding: 12px; border: 1px solid #c6d4ea; border-radius: 6px; font-size: 14px;">
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label style="font-weight: 600; font-size: 14px; color: #123a74;">Email</label>
        <input type="email" id="register-email" placeholder="Enter email" style="padding: 12px; border: 1px solid #c6d4ea; border-radius: 6px; font-size: 14px;">
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label style="font-weight: 600; font-size: 14px; color: #123a74;">Password</label>
        <input type="password" id="register-password" placeholder="Min 6 chars" style="padding: 12px; border: 1px solid #c6d4ea; border-radius: 6px; font-size: 14px;">
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label style="font-weight: 600; font-size: 14px; color: #123a74;">Confirm</label>
        <input type="password" id="register-confirm" placeholder="Confirm password" style="padding: 12px; border: 1px solid #c6d4ea; border-radius: 6px; font-size: 14px;">
      </div>
      <button type="submit" style="padding: 12px; background: #1b4f9c; color: #fff; border: none; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer;">Register</button>
      <p style="margin: 16px 0 0; font-size: 13px; text-align: center;"><a href="#" id="switch-to-login-from-register" style="color: #1b4f9c; cursor: pointer;">Login</a></p>
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
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showModal(loginModal);
  });

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showModal(registerModal);
  });

  // Close buttons
  document.querySelector("#login-close").addEventListener("click", hideAll);
  document.querySelector("#register-close").addEventListener("click", hideAll);

  // Overlay click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) hideAll();
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
    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    const users = readStore("irctc_users", []);
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      writeStore("irctc_user_auth", { email, name: user.name, isAuthenticated: true });
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
