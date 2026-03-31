const passengerForm = document.querySelector("#passenger-form");
const formMessage = document.querySelector("#form-message");
const addPassengerBtn = document.querySelector("#add-passenger-btn");
const copySavedBtn = document.querySelector("#copy-saved-btn");
const passengerList = document.querySelector("#passenger-list");
const summaryPassengerCount = document.querySelector("#summary-passenger-count");
const summaryPanel = document.querySelector(".summary-panel");
const summaryToggle = document.querySelector("#mobile-summary-toggle");
const mobileBackBtn = document.querySelector("#mobile-back-btn");
const mobileContinueBtn = document.querySelector("#mobile-continue-btn");
const desktopBackBtn = document.querySelector("#passenger-back-btn");
const desktopSubmitBtn = document.querySelector("#passenger-continue-btn");

function navigateWithTransition(url) {
  if (typeof window.playTransitionAndNavigate === "function") {
    window.playTransitionAndNavigate(url);
    return;
  }
  window.location.href = url;
}

let passengerCount = 2;

function updatePassengerCount() {
  if (summaryPassengerCount) {
    summaryPassengerCount.textContent = String(passengerCount);
  }
}

function validateRequiredFields() {
  if (!passengerForm) {
    return false;
  }

  const requiredFields = passengerForm.querySelectorAll("[data-required='true']");
  let isValid = true;
  let firstInvalidField = null;
  let invalidCount = 0;

  requiredFields.forEach((field) => {
    const value = String(field.value || "").trim();
    field.classList.remove("invalid");
    field.setAttribute("aria-invalid", "false");

    if (!value) {
      isValid = false;
      invalidCount += 1;
      field.classList.add("invalid");
      field.setAttribute("aria-invalid", "true");
      if (!firstInvalidField) {
        firstInvalidField = field;
      }
    }

    if (field.id === "mobile" && value) {
      const mobileOk = /^[0-9]{10}$/.test(value);
      if (!mobileOk) {
        isValid = false;
        invalidCount += 1;
        field.classList.add("invalid");
        field.setAttribute("aria-invalid", "true");
        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    }
  });

  return { isValid, firstInvalidField, invalidCount };
}

function buildPassengerCard(index) {
  const wrapper = document.createElement("article");
  wrapper.className = "passenger-card";
  wrapper.setAttribute("data-passenger-card", "true");

  wrapper.innerHTML = `
    <div class="passenger-card-head">
      <h4>Passenger ${index}</h4>
      <span class="passenger-status">Required details</span>
      <button type="button" class="passenger-toggle" aria-expanded="true">Collapse</button>
    </div>
    <div class="passenger-grid">
      <label>Full Name <em>*</em>
        <input type="text" name="name-${index}" data-required="true" placeholder="Enter full name as per ID">
        <small>Required</small>
      </label>
      <label>Age <em>*</em>
        <input type="number" name="age-${index}" data-required="true" min="1" max="120" placeholder="Age">
        <small>Required</small>
      </label>
      <label>Gender <em>*</em>
        <select name="gender-${index}" data-required="true">
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Transgender</option>
        </select>
        <small>Required</small>
      </label>
      <label>Berth Preference
        <select name="berth-${index}">
          <option>No Preference</option>
          <option>Lower</option>
          <option>Middle</option>
          <option>Upper</option>
          <option>Side Lower</option>
          <option>Side Upper</option>
        </select>
        <small>Optional</small>
      </label>
      <label class="wide">Senior Citizen / Concession
        <select name="concession-${index}">
          <option>Not Applicable</option>
          <option>Senior Citizen</option>
          <option>Divyang</option>
          <option>Other Eligible Concession</option>
        </select>
        <small>Optional</small>
      </label>
    </div>
  `;

  return wrapper;
}

function setupPassengerAccordions() {
  const cards = passengerList?.querySelectorAll("[data-passenger-card]") || [];
  cards.forEach((card, index) => {
    const toggle = card.querySelector(".passenger-toggle");
    if (!toggle || toggle.dataset.bound === "true") {
      return;
    }

    toggle.dataset.bound = "true";
    if (window.matchMedia("(max-width: 640px)").matches && index > 0) {
      card.classList.add("collapsed");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Expand";
    }

    toggle.addEventListener("click", () => {
      const collapsed = card.classList.toggle("collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.textContent = collapsed ? "Expand" : "Collapse";
    });
  });
}

if (addPassengerBtn && passengerList) {
  addPassengerBtn.addEventListener("click", () => {
    if (passengerCount >= 6) {
      if (formMessage) {
        formMessage.textContent = "Maximum 6 passengers can be added in one booking.";
        formMessage.classList.add("error");
      }
      return;
    }

    passengerCount += 1;
    passengerList.appendChild(buildPassengerCard(passengerCount));
    setupPassengerAccordions();
    updatePassengerCount();

    if (formMessage) {
      formMessage.classList.remove("error");
      formMessage.textContent = `Passenger ${passengerCount} added.`;
    }
  });
}

if (copySavedBtn && passengerList) {
  copySavedBtn.addEventListener("click", () => {
    const firstName = passengerList.querySelector("input[name='name-1']");
    const firstAge = passengerList.querySelector("input[name='age-1']");
    const firstGender = passengerList.querySelector("select[name='gender-1']");

    if (firstName) {
      firstName.value = "Ravi Kumar";
    }
    if (firstAge) {
      firstAge.value = "34";
    }
    if (firstGender) {
      firstGender.value = "Male";
    }

    if (formMessage) {
      formMessage.classList.remove("error");
      formMessage.textContent = "Saved passenger details copied to Passenger 1.";
    }
  });
}

if (passengerForm) {
  passengerForm.addEventListener("input", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
      if (target.classList.contains("invalid") && String(target.value || "").trim()) {
        target.classList.remove("invalid");
        target.setAttribute("aria-invalid", "false");
      }
    }
  });

  passengerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const validation = validateRequiredFields();

    if (!formMessage) {
      return;
    }

    if (!validation.isValid) {
      formMessage.textContent = `Please correct ${validation.invalidCount} required field(s) before continuing.`;
      formMessage.classList.add("error");
      validation.firstInvalidField?.focus();
      return;
    }

    formMessage.classList.remove("error");
    formMessage.textContent = "Passenger details verified. Next step: Review Booking.";
    navigateWithTransition("payment.html");
  });
}

if (desktopBackBtn) {
  desktopBackBtn.addEventListener("click", () => {
    navigateWithTransition("train-results.html");
  });
}

if (summaryToggle && summaryPanel) {
  summaryToggle.addEventListener("click", () => {
    const isOpen = summaryPanel.classList.toggle("open");
    summaryToggle.setAttribute("aria-expanded", String(isOpen));
    summaryToggle.textContent = isOpen ? "Hide Booking Summary" : "Show Booking Summary";
  });
}

if (mobileBackBtn && desktopBackBtn) {
  mobileBackBtn.addEventListener("click", () => desktopBackBtn.click());
}

if (mobileContinueBtn && desktopSubmitBtn) {
  mobileContinueBtn.addEventListener("click", () => desktopSubmitBtn.click());
}

updatePassengerCount();
setupPassengerAccordions();
