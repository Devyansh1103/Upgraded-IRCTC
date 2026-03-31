# System Feedback & Status Visibility - Quick Reference Guide

**For Developers:** Copy-paste ready code patterns for all 8 booking scenarios.

---

## Navigation

- [Scenario 1: Searching Trains](#scenario-1-searching-trains)
- [Scenario 2: Loading Availability](#scenario-2-loading-availability)
- [Scenario 3: Processing Steps](#scenario-3-processing-steps)
- [Scenario 4: Processing Passenger Data](#scenario-4-processing-passenger-data)
- [Scenario 5: Payment Processing](#scenario-5-payment-processing)
- [Scenario 6: Confirming Booking](#scenario-6-confirming-booking)
- [Scenario 7: Booking Success](#scenario-7-booking-success)
- [Scenario 8: Refund Initiated](#scenario-8-refund-initiated)
- [Component Cheat Sheet](#component-cheat-sheet)
- [JavaScript Integration](#javascript-integration)

---

## Scenario 1: Searching Trains

**Use When:** User submits search form and system is fetching available trains  
**Duration:** 3-5 seconds  
**Elements:** Context card, large spinner, messaging, time estimate

```html
<!-- FULL PATTERN: Searching Trains -->
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">From Station</span>
    <span class="info-value">Delhi (NDLS)</span>
  </div>
  <div class="info-row">
    <span class="info-label">To Station</span>
    <span class="info-value">Mumbai (MMCT)</span>
  </div>
  <div class="info-row">
    <span class="info-label">Date</span>
    <span class="info-value">3 April 2026</span>
  </div>
  <div class="info-row">
    <span class="info-label">Class</span>
    <span class="info-value">3A AC</span>
  </div>
  <div class="info-row">
    <span class="info-label">Status</span>
    <span class="context-status processing">
      <span class="spinner sm"></span>
      Searching trains...
    </span>
  </div>
</div>

<div style="text-align: center; padding: 48px 16px; background: #f4f7fb; border-radius: 12px; margin-top: 24px;">
  <div class="spinner lg" style="margin: 0 auto 16px;"></div>
  <h3 style="font-size: 18px; font-weight: 700; color: #1f2a37; margin: 0 0 8px 0;">
    Searching Available Trains
  </h3>
  <p style="font-size: 14px; color: #4f5d75; margin: 0 0 16px 0;">
    Please wait while we fetch the best options for you...
  </p>
  <div style="font-size: 13px; color: #4f5d75;">
    ⏱️ This usually takes <strong>3-5 seconds</strong>
  </div>
</div>
```

---

## Scenario 2: Loading Availability

**Use When:** User clicked on train card and system is fetching seat map  
**Duration:** 2-3 seconds  
**Elements:** Context card, loading dots, skeleton placeholders

```html
<!-- FULL PATTERN: Loading Seat Availability -->
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">Train</span>
    <span class="info-value">Rajdhani Express (12002)</span>
  </div>
  <div class="info-row">
    <span class="info-label">Departure</span>
    <span class="info-value">20:15 IST</span>
  </div>
  <div class="info-row">
    <span class="info-label">Arrival</span>
    <span class="info-value">08:30 IST (+1)</span>
  </div>
  <div class="info-row">
    <span class="info-label">Fare</span>
    <span class="info-value">₹2,850</span>
  </div>
  <div class="info-row">
    <span class="info-label">Status</span>
    <span class="context-status processing">
      <span class="spinner sm"></span>
      Loading availability...
    </span>
  </div>
</div>

<div style="text-align: center; padding: 32px; margin-top: 24px;">
  <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 16px;">
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
  </div>
  <p style="font-size: 13px; color: #4f5d75; margin: 0;">
    Fetching seat map and availability...
  </p>
</div>

<!-- Alternative: Skeleton placeholders approach -->
<div style="display: grid; gap: 12px; margin-top: 24px;">
  <div class="skeleton-card"></div>
  <div class="skeleton-card"></div>
  <div class="skeleton-card"></div>
</div>
```

---

## Scenario 3: Processing Steps

**Use When:** User moves between booking steps (seats → passenger info)  
**Duration:** 2-3 seconds  
**Elements:** Step tracker, progress bar, current step indicator

```html
<!-- FULL PATTERN: Multi-Step Processing -->
<!-- Step Tracker -->
<div class="step-tracker">
  <div class="step-item completed">
    <div class="step-circle">✓</div>
    <div class="step-label">Train Selected</div>
  </div>
  <div class="step-item completed">
    <div class="step-circle">✓</div>
    <div class="step-label">Seats Picked</div>
  </div>
  <div class="step-item active">
    <div class="step-circle">3</div>
    <div class="step-label">Passenger Info</div>
  </div>
  <div class="step-item inactive">
    <div class="step-circle">4</div>
    <div class="step-label">Payment</div>
  </div>
  <div class="step-item inactive">
    <div class="step-circle">5</div>
    <div class="step-label">Confirm</div>
  </div>
</div>

<!-- Progress Bar -->
<div style="margin: 24px 0;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
    <span style="font-size: 13px; font-weight: 600; color: #1f2a37;">Overall Progress</span>
    <span class="progress-percentage" style="font-size: 13px; font-weight: 600; color: #1b4f9c;">60%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-bar-fill" style="width: 60%;"></div>
  </div>
</div>

<!-- Current Step Indicator -->
<div class="loading-state">
  <span class="loading-state-icon">
    <span class="spinner sm"></span>
  </span>
  <div class="loading-state-content">
    <h3 class="loading-state-title">Validating Passenger Information</h3>
    <p class="loading-state-description">We're verifying your details against our database. This helps prevent fraud and ensures smooth booking.</p>
  </div>
</div>
```

---

## Scenario 4: Processing Passenger Data

**Use When:** System is validating passenger details  
**Duration:** 3-5 seconds  
**Elements:** Context with spinner, inline loading state

```html
<!-- FULL PATTERN: Processing Passenger Data -->
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">Passengers</span>
    <span class="info-value">2 Passengers</span>
  </div>
  <div class="info-row">
    <span class="info-label">Status</span>
    <span class="context-status processing">
      <span class="spinner sm"></span>
      Validating information...
    </span>
  </div>
</div>

<div class="loading-state" style="margin-top: 24px;">
  <span class="loading-state-icon">
    <span class="spinner sm"></span>
  </span>
  <div class="loading-state-content">
    <h3 class="loading-state-title">Validating Passenger Information</h3>
    <p class="loading-state-description">We're verifying your details against our database. This helps prevent fraud and ensures smooth booking.</p>
  </div>
</div>

<div class="loading-state" style="margin-top: 16px;">
  <span class="loading-state-icon">
    <span class="spinner sm"></span>
  </span>
  <div class="loading-state-content">
    <h3 class="loading-state-title">Checking Eligibility</h3>
    <p class="loading-state-description">Verifying eligibility for senior citizen quota and special concessions...</p>
  </div>
</div>
```

---

## Scenario 5: Payment Processing

**Use When:** System is processing payment transaction  
**Duration:** 30-60 seconds  
**Elements:** Payment context, step-by-step timeline, time warning

```html
<!-- FULL PATTERN: Payment Processing -->
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">Passengers</span>
    <span class="info-value">2 Passengers</span>
  </div>
  <div class="info-row">
    <span class="info-label">Base Fare</span>
    <span class="info-value">₹2,450 × 2 = ₹4,900</span>
  </div>
  <div class="info-row">
    <span class="info-label">Taxes & Charges</span>
    <span class="info-value">₹740</span>
  </div>
  <div class="info-row">
    <span class="info-label">Total Amount</span>
    <span class="info-value" style="color: #1b4f9c; font-size: 16px; font-weight: 700;">₹5,640</span>
  </div>
  <div class="info-row" style="border-top: 2px solid #c6d4ea; padding-top: 16px; margin-top: 16px;">
    <span class="info-label">Payment Status</span>
    <span class="context-status processing">
      <span class="spinner sm"></span>
      Securing payment...
    </span>
  </div>
</div>

<!-- Payment Steps Timeline -->
<div style="display: flex; flex-direction: column; gap: 16px; margin-top: 24px;">
  <!-- Step 1: Active -->
  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <div style="flex-shrink: 0;">
      <div class="spinner sm"></div>
    </div>
    <div style="flex: 1;">
      <p style="font-size: 13px; font-weight: 600; color: #1f2a37; margin: 0 0 4px 0;">
        Preparing payment gateway
      </p>
      <p style="font-size: 12px; color: #4f5d75; margin: 0;">
        Setting up secure connection...
      </p>
    </div>
  </div>

  <!-- Step 2: Active -->
  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <div style="flex-shrink: 0;">
      <div class="spinner sm"></div>
    </div>
    <div style="flex: 1;">
      <p style="font-size: 13px; font-weight: 600; color: #1f2a37; margin: 0 0 4px 0;">
        Contacting your bank
      </p>
      <p style="font-size: 12px; color: #4f5d75; margin: 0;">
        Awaiting authorization...
      </p>
    </div>
  </div>

  <!-- Step 3: Pending -->
  <div style="display: flex; gap: 16px; align-items: flex-start; opacity: 0.5;">
    <div style="flex-shrink: 0; width: 16px; height: 16px; border-radius: 50%; border: 2px solid #c6d4ea;"></div>
    <div style="flex: 1;">
      <p style="font-size: 13px; font-weight: 600; color: #4f5d75; margin: 0 0 4px 0;">
        Confirming transaction
      </p>
      <p style="font-size: 12px; color: #4f5d75; margin: 0;">
        Pending...
      </p>
    </div>
  </div>
</div>

<!-- Time Warning -->
<p style="font-size: 12px; color: #4f5d75; margin: 24px 0 0 0; padding: 16px; background: #f4f7fb; border-radius: 8px;">
  ⏱️ <strong>Important:</strong> Do not close this window or navigate away. Processing usually takes 30-60 seconds.
</p>
```

---

## Scenario 6: Confirming Booking

**Use When:** Final step - system creating booking record  
**Duration:** 5-10 seconds  
**Elements:** Step tracker at step 5, progress animation, confirmation messaging

```html
<!-- FULL PATTERN: Confirming Booking -->
<!-- Step Tracker at Final Step -->
<div class="step-tracker">
  <div class="step-item completed">
    <div class="step-circle">✓</div>
    <div class="step-label">Train Selected</div>
  </div>
  <div class="step-item completed">
    <div class="step-circle">✓</div>
    <div class="step-label">Seats Picked</div>
  </div>
  <div class="step-item completed">
    <div class="step-circle">✓</div>
    <div class="step-label">Passenger Info</div>
  </div>
  <div class="step-item completed">
    <div class="step-circle">✓</div>
    <div class="step-label">Payment</div>
  </div>
  <div class="step-item active">
    <div class="step-circle">5</div>
    <div class="step-label">Confirm</div>
  </div>
</div>

<!-- Progress Animation -->
<div style="margin: 24px 0;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
    <span style="font-size: 13px; font-weight: 600; color: #1f2a37;">Overall Progress</span>
    <span class="progress-percentage" style="font-size: 13px; font-weight: 600; color: #1b4f9c;">100%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-bar-fill" style="width: 100%;"></div>
  </div>
</div>

<!-- Confirmation Message -->
<div class="loading-state">
  <span class="loading-state-icon">
    <span class="spinner sm"></span>
  </span>
  <div class="loading-state-content">
    <h3 class="loading-state-title">Confirming Your Booking</h3>
    <p class="loading-state-description">We're creating your booking record and generating your e-ticket. This will be securely sent to your email.</p>
  </div>
</div>
```

---

## Scenario 7: Booking Success

**Use When:** Booking is successfully completed  
**Duration:** Permanent (until user navigates away)  
**Elements:** Success checkmark animation, booking details, reference number

```html
<!-- FULL PATTERN: Booking Success -->
<div class="success-state">
  <div class="success-icon">✓</div>
  <h3 class="success-headline" style="font-size: 24px; margin-bottom: 16px;">
    Your Ticket Has Been Booked Successfully!
  </h3>
  <p class="success-message" style="font-size: 15px; margin-bottom: 24px;">
    Congratulations! Your train ticket booking is confirmed. Your e-ticket has been sent to your email. You can download it below or view it in your bookings.
  </p>

  <div class="success-details">
    <div class="success-detail-row">
      <span class="success-detail-label">Booking Reference</span>
      <span class="success-detail-value" style="font-family: monospace; font-size: 16px;">KXMN78</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Train</span>
      <span class="success-detail-value">Rajdhani Express (12002)</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Departure</span>
      <span class="success-detail-value">20:15 IST on 3 April 2026</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Arrival</span>
      <span class="success-detail-value">08:30 IST on 4 April 2026</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">From → To</span>
      <span class="success-detail-value">Delhi (NDLS) → Mumbai (MMCT)</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Passengers</span>
      <span class="success-detail-value">2 Passengers</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Seats</span>
      <span class="success-detail-value">3A/41, 3A/42</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Class</span>
      <span class="success-detail-value">3 Tier AC (3A)</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Total Amount</span>
      <span class="success-detail-value" style="color: #388e3c; font-size: 16px; font-weight: 700;">₹5,640</span>
    </div>
  </div>

  <button style="margin-top: 24px; padding: 12px 24px; background: #1b4f9c; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
    Download E-Ticket
  </button>
</div>

<!-- Additional Actions -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px;">
  <button style="padding: 12px; background: #f4f7fb; color: #1b4f9c; border: 1px solid #c6d4ea; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
    View in Bookings
  </button>
  <button style="padding: 12px; background: #f4f7fb; color: #1b4f9c; border: 1px solid #c6d4ea; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
    Share Booking
  </button>
</div>
```

---

## Scenario 8: Refund Initiated

**Use When:** User's refund request has been accepted and processing started  
**Duration:** Permanent (with status updates)  
**Elements:** Success state, refund timeline, tracking reference

```html
<!-- FULL PATTERN: Refund Initiated -->
<div class="success-state">
  <div class="success-icon">✓</div>
  <h3 class="success-headline" style="font-size: 24px; margin-bottom: 16px;">
    Your Refund Request Has Been Accepted
  </h3>
  <p class="success-message" style="font-size: 15px; margin-bottom: 24px;">
    Your refund is being processed. The amount will be credited back to your original payment method within the specified timeline.
  </p>

  <div class="success-details">
    <div class="success-detail-row">
      <span class="success-detail-label">Refund Amount</span>
      <span class="success-detail-value" style="color: #388e3c; font-weight: 700;">₹5,640</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Original Booking</span>
      <span class="success-detail-value">KXMN78</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Refund Reference</span>
      <span class="success-detail-value" style="font-family: monospace; font-size: 16px;">REF-2026-123456</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Expected Timeline</span>
      <span class="success-detail-value">1-5 Business Days</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Refund Method</span>
      <span class="success-detail-value">Original Payment Method</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Status</span>
      <span class="status-badge processing">
        <span class="spinner sm" style="display: inline-block;"></span>
        Processing
      </span>
    </div>
  </div>

  <p style="font-size: 13px; color: #4f5d75; margin-top: 24px; padding: 16px; background: #f4f7fb; border-radius: 8px;">
    You can track your refund status anytime using reference number <strong style="color: #1f2a37;">REF-2026-123456</strong>. If you don't see the refund within 5 business days, <a href="#" style="color: #1b4f9c; text-decoration: none;">contact our support</a>.
  </p>

  <button style="margin-top: 24px; padding: 12px 24px; background: #1b4f9c; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
    Track Refund
  </button>
</div>
```

---

## Component Cheat Sheet

### Spinners (Copy-Paste)

```html
<!-- Small Spinner (16px) -->
<span class="spinner sm"></span>

<!-- Base/Medium Spinner (20px) -->
<span class="spinner"></span>

<!-- Large Spinner (24px) -->
<span class="spinner lg"></span>
```

### Loading Dots

```html
<div style="display: flex; gap: 8px; justify-content: center;">
  <div class="loading-dot"></div>
  <div class="loading-dot"></div>
  <div class="loading-dot"></div>
</div>
```

### Skeleton Placeholders

```html
<!-- Text Skeleton -->
<div class="skeleton-text"></div>

<!-- Text Skeleton (custom width) -->
<div class="skeleton-text" style="width: 60%;"></div>

<!-- Heading Skeleton -->
<div class="skeleton-heading"></div>

<!-- Avatar Skeleton -->
<div class="skeleton-avatar"></div>

<!-- Button Skeleton -->
<div class="skeleton-button"></div>

<!-- Card Skeleton -->
<div class="skeleton-card"></div>
```

### Progress Bar

```html
<div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
    <span style="font-size: 13px; font-weight: 600;">Progress</span>
    <span class="progress-percentage">65%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-bar-fill" style="width: 65%;"></div>
  </div>
</div>
```

### Status Badges

```html
<!-- Processing Badge -->
<span class="status-badge processing">
  <span class="spinner sm" style="display: inline-block;"></span>
  Processing
</span>

<!-- Success Badge -->
<span class="status-badge success">
  ✓ Success
</span>
```

### Toast Notification

```html
<!-- Success Toast -->
<div class="toast success">
  <div class="toast-header">
    <span class="toast-icon">✓</span>
    <h4 class="toast-title">Payment Successful</h4>
  </div>
  <p class="toast-message">Your payment has been processed successfully.</p>
</div>

<!-- Loading Toast -->
<div class="toast loading">
  <div class="toast-header">
    <span class="toast-icon" style="display: inline-block;">
      <span class="spinner sm"></span>
    </span>
    <h4 class="toast-title">Processing Payment</h4>
  </div>
  <p class="toast-message">Please wait while we process your payment...</p>
</div>
```

### Estimated Time

```html
<div style="font-size: 13px; color: #4f5d75;">
  ⏱️ This usually takes <strong>3-5 seconds</strong>
</div>
```

---

## JavaScript Integration

### Basic Spinner Pattern

```javascript
// Show loading
const button = document.getElementById('submitBtn');
button.innerHTML = '<span class="spinner sm"></span> Loading...';
button.disabled = true;

// Hide loading
button.innerHTML = 'Original Text';
button.disabled = false;
```

### Form Submission with Feedback

```javascript
document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = e.target.querySelector('button');
  btn.innerHTML = '<span class="spinner sm"></span> Searching...';
  btn.disabled = true;
  
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: new FormData(e.target)
    });
    
    const data = await response.json();
    
    // Show results
    document.getElementById('results').innerHTML = renderResults(data);
    
  } catch (error) {
    console.error(error);
  } finally {
    btn.innerHTML = 'Search';
    btn.disabled = false;
  }
});
```

### Progress Update Pattern

```javascript
async function processMultiStepBooking(data) {
  const progressBar = document.querySelector('.progress-bar-fill');
  const currentStep = document.getElementById('currentStep');
  
  // Step 1
  updateProgress(progressBar, 20);
  updateStep(currentStep, 1);
  await processStep1(data);
  
  // Step 2
  updateProgress(progressBar, 40);
  updateStep(currentStep, 2);
  await processStep2(data);
  
  // Step 3
  updateProgress(progressBar, 60);
  updateStep(currentStep, 3);
  await processStep3(data);
  
  // Complete
  updateProgress(progressBar, 100);
  updateStep(currentStep, 'complete');
}

function updateProgress(bar, percent) {
  bar.style.width = percent + '%';
  bar.parentElement.querySelector('.progress-percentage').textContent = percent + '%';
}

function updateStep(elem, step) {
  // Update step tracker
}
```

### Toast Notification Pattern

```javascript
function showToast(type, title, message) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-header">
      <span class="toast-icon">${getIconFor(type)}</span>
      <h4 class="toast-title">${title}</h4>
    </div>
    <p class="toast-message">${message}</p>
  `;
  
  document.body.appendChild(toast);
  
  // Auto-remove after 4 seconds
  setTimeout(() => toast.remove(), 4000);
}

function getIconFor(type) {
  switch(type) {
    case 'success': return '✓';
    case 'loading': return '<span class="spinner sm"></span>';
    case 'error': return '✗';
    default: return 'ℹ️';
  }
}

// Usage
showToast('success', 'Payment Successful', 'Your payment has been processed.');
```

### Multi-State Component

```javascript
class BookingStep {
  constructor(element) {
    this.el = element;
    this.state = 'idle'; // idle, loading, success, error
  }
  
  setLoading(message = 'Loading...') {
    this.state = 'loading';
    this.el.innerHTML = `
      <div class="loading-state">
        <span class="loading-state-icon">
          <span class="spinner sm"></span>
        </span>
        <div class="loading-state-content">
          <h3 class="loading-state-title">${message}</h3>
        </div>
      </div>
    `;
  }
  
  setSuccess(message = 'Success!') {
    this.state = 'success';
    this.el.innerHTML = `
      <div class="success-state">
        <div class="success-icon">✓</div>
        <h3 class="success-headline">${message}</h3>
      </div>
    `;
  }
  
  setError(message = 'Error occurred') {
    this.state = 'error';
    this.el.innerHTML = `
      <div style="padding: 16px; background: #ffebee; border-radius: 8px; border-left: 4px solid #c62828;">
        <h3 style="color: #c62828; margin: 0 0 8px 0;">${message}</h3>
        <button onclick="location.reload()" style="padding: 8px 16px; background: #c62828; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Try Again
        </button>
      </div>
    `;
  }
}

// Usage
const step = new BookingStep(document.getElementById('stepContainer'));
step.setLoading('Processing your booking...');
```

---

## Common Integration Points

### In HTML Form Submission

```html
<form id="myForm" onsubmit="handleSubmit(event)">
  <input type="text" name="search" required>
  <button type="submit">
    <span id="btnText">Search</span>
    <span id="btnSpinner" style="display: none;">
      <span class="spinner sm"></span>
    </span>
  </button>
</form>

<script>
  async function handleSubmit(e) {
    e.preventDefault();
    
    const btn = e.target.querySelector('button');
    const text = btn.querySelector('#btnText');
    const spinner = btn.querySelector('#btnSpinner');
    
    text.style.display = 'none';
    spinner.style.display = 'inline-block';
    btn.disabled = true;
    
    try {
      // Do something
      await new Promise(r => setTimeout(r, 2000));
    } finally {
      text.style.display = 'inline';
      spinner.style.display = 'none';
      btn.disabled = false;
    }
  }
</script>
```

### In React Component

```jsx
export function BookingSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [trains, setTrains] = useState([]);
  
  const handleSearch = async (data) => {
    setIsLoading(true);
    try {
      const result = await fetch('/api/trains', {method: 'POST', body: JSON.stringify(data)});
      const json = await result.json();
      setTrains(json);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div style={{textAlign: 'center', padding: '48px 16px'}}>
        <div className="spinner lg" style={{margin: '0 auto 16px'}}></div>
        <h3>Searching Available Trains</h3>
        <p>Please wait while we fetch the best options for you...</p>
        <div style={{fontSize: '13px', color: '#4f5d75'}}>
          ⏱️ This usually takes <strong>3-5 seconds</strong>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {trains.map(train => <TrainCard key={train.id} train={train} />)}
    </div>
  );
}
```

---

## Quick Implementation Checklist

- [ ] Include `system-feedback.css` in HTML
- [ ] Add context cards for all loading states
- [ ] Add spinners/dots for visual feedback
- [ ] Add time estimates to long operations
- [ ] Use step trackers for multi-step processes
- [ ] Show progress bars with percentages
- [ ] Add success states with confirmation details
- [ ] Test with reduced motion enabled
- [ ] Test on mobile (480px), tablet (768px), desktop
- [ ] Test form submissions with network throttling
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

---

**📋 Copy-paste ready to go. Just customize the content and styling to match your specific flows!**
