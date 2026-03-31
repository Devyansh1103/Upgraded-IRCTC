const methodTabs = document.querySelectorAll(".method-tab");
const panes = {
  upi: document.querySelector("#pane-upi"),
  card: document.querySelector("#pane-card"),
  netbanking: document.querySelector("#pane-netbanking"),
  wallet: document.querySelector("#pane-wallet")
};
const payBtn = document.querySelector("#pay-btn");
const paymentSummaryToggle = document.querySelector("#payment-summary-toggle");
const paymentSummaryPanel = document.querySelector(".summary-panel");
const checklistToggle = document.querySelector("#payment-checklist-toggle");
const checklistBlock = document.querySelector(".reassurance-block");
const mobilePayBtn = document.querySelector("#mobile-pay-btn");
const mobilePayBackBtn = document.querySelector("#mobile-pay-back-btn");
const desktopBackBtn = document.querySelector("#payment-back-btn");
const paymentMessage = document.querySelector("#payment-message");
const timerEl = document.querySelector("#payment-timer");
const timerCard = document.querySelector("#timer-card");

function navigateWithTransition(url) {
  if (typeof window.playTransitionAndNavigate === "function") {
    window.playTransitionAndNavigate(url);
    return;
  }
  window.location.href = url;
}

let remainingSeconds = 9 * 60 + 30;

function showPane(method) {
  methodTabs.forEach((tab) => {
    const isActive = tab.dataset.method === method;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  Object.keys(panes).forEach((key) => {
    const pane = panes[key];
    if (pane) {
      pane.classList.toggle("active", key === method);
    }
  });
}

methodTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showPane(tab.dataset.method);
    if (paymentMessage) {
      paymentMessage.classList.remove("error");
      paymentMessage.textContent = "";
    }
  });
});

function markInvalid(selector, invalid) {
  const input = document.querySelector(selector);
  if (!input) {
    return null;
  }
  input.classList.toggle("invalid", invalid);
  input.setAttribute("aria-invalid", invalid ? "true" : "false");
  return invalid ? input : null;
}

function validateCurrentMethod() {
  const active = document.querySelector(".method-tab.active");
  if (!active) {
    return { isValid: false, firstInvalidField: null };
  }
  const method = active.dataset.method;
  let firstInvalidField = null;

  const captureInvalid = (field) => {
    if (field && !firstInvalidField) {
      firstInvalidField = field;
    }
  };

  if (method === "upi") {
    const upi = document.querySelector("#upi-id");
    const upiValue = String(upi?.value || "").trim();
    captureInvalid(markInvalid("#upi-id", !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiValue)));
  }

  if (method === "card") {
    const cardNumber = String(document.querySelector("#card-number")?.value || "").replace(/\s/g, "");
    const cardName = String(document.querySelector("#card-name")?.value || "").trim();
    const expiry = String(document.querySelector("#card-expiry")?.value || "").trim();
    const cvv = String(document.querySelector("#card-cvv")?.value || "").trim();

    captureInvalid(markInvalid("#card-number", !/^\d{16}$/.test(cardNumber)));
    captureInvalid(markInvalid("#card-name", cardName.length < 3));
    captureInvalid(markInvalid("#card-expiry", !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)));
    captureInvalid(markInvalid("#card-cvv", !/^\d{3,4}$/.test(cvv)));
  }

  if (method === "netbanking") {
    const bank = String(document.querySelector("#bank-select")?.value || "").trim();
    captureInvalid(markInvalid("#bank-select", !bank));
  }

  if (method === "wallet") {
    const wallet = String(document.querySelector("#wallet-select")?.value || "").trim();
    captureInvalid(markInvalid("#wallet-select", !wallet));
  }

  return { isValid: !firstInvalidField, firstInvalidField };
}

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
    if (target.classList.contains("invalid") && String(target.value || "").trim()) {
      target.classList.remove("invalid");
      target.setAttribute("aria-invalid", "false");
    }
  }
});

if (payBtn) {
  payBtn.addEventListener("click", () => {
    if (!paymentMessage) {
      return;
    }

    const validation = validateCurrentMethod();
    if (!validation.isValid) {
      paymentMessage.textContent = "Please complete selected payment method details correctly before proceeding.";
      paymentMessage.classList.add("error");
      validation.firstInvalidField?.focus();
      return;
    }

    paymentMessage.classList.remove("error");
    paymentMessage.textContent =
      "Redirecting to secure payment. Do not refresh this page. Ticket will be confirmed after successful transaction.";

    setTimeout(() => {
      navigateWithTransition("index.html");
    }, 900);
  });
}

if (desktopBackBtn) {
  desktopBackBtn.addEventListener("click", () => {
    navigateWithTransition("passenger-details.html");
  });
}

if (paymentSummaryToggle && paymentSummaryPanel) {
  paymentSummaryToggle.addEventListener("click", () => {
    const isOpen = paymentSummaryPanel.classList.toggle("open");
    paymentSummaryToggle.setAttribute("aria-expanded", String(isOpen));
    paymentSummaryToggle.textContent = isOpen ? "Hide Booking Summary" : "Show Booking Summary";
  });
}

if (checklistToggle && checklistBlock) {
  checklistToggle.addEventListener("click", () => {
    const collapsed = checklistBlock.classList.toggle("collapsed");
    checklistToggle.setAttribute("aria-expanded", String(!collapsed));
    checklistToggle.textContent = collapsed ? "Expand" : "Collapse";
  });
}

if (mobilePayBtn && payBtn) {
  mobilePayBtn.addEventListener("click", () => {
    payBtn.click();
    paymentMessage?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

if (mobilePayBackBtn && desktopBackBtn) {
  mobilePayBackBtn.addEventListener("click", () => desktopBackBtn.click());
}

function updateTimer() {
  if (!timerEl) {
    return;
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (remainingSeconds <= 120 && timerCard) {
    timerCard.style.background = "#fff2f2";
    timerCard.style.borderColor = "#e7b7b7";
  }

  if (remainingSeconds > 0) {
    remainingSeconds -= 1;
  }
}

setInterval(updateTimer, 1000);
updateTimer();
