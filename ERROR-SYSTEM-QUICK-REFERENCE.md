# IRCTC Error States - Quick Developer Reference
## Copy-Paste Ready Examples & Cheat Sheet

---

## 🚀 Quick Start

### Step 1: Add CSS
```html
<link rel="stylesheet" href="error-states.css">
```

### Step 2: Use Pre-Built Components

---

## 📋 Common Error Patterns

### Pattern 1: Payment Declined
```html
<div class="error-modal-overlay">
  <div class="error-state-card">
    <div class="error-header">
      <div class="error-icon-wrapper error">❌</div>
      <div class="error-header-content">
        <h2 class="error-headline">Payment Could Not Be Processed</h2>
        <p class="error-subheadline">Your card was declined. You have not been charged.</p>
      </div>
    </div>

    <div class="booking-status-banner failed">
      <span class="status-badge failed">BOOKING NOT CREATED</span>
      <span class="status-text">No ticket has been reserved</span>
    </div>

    <div class="error-description">
      <h3>What Happened</h3>
      <div class="what-happened">
        <span class="what-happened-icon">🔴</span>
        <div class="what-happened-content">
          <strong>Payment Declined</strong>
          <span>Your bank or card issuer declined this transaction. Your account has not been charged.</span>
        </div>
      </div>
    </div>

    <div class="reassurance-box warning">
      <span class="reassurance-icon">⚠️</span>
      <div class="reassurance-content">
        <strong>Good News</strong>
        No booking has been created, so you can safely try again with a different card without risk of duplicate bookings.
      </div>
    </div>

    <div class="error-actions">
      <button class="action-button-primary">🔄 Try Again with Another Card</button>
      <button class="action-button-secondary">💰 Try Different Payment Method</button>
    </div>

    <div class="support-section">
      <div class="support-headline">Need Help?</div>
      <div class="support-options">
        <a href="tel:139" class="support-link">
          <span class="support-link-icon">📞</span>
          <span>Call IRCTC Support: 139</span>
        </a>
        <a href="#chat" class="support-link">
          <span class="support-link-icon">💬</span>
          <span>Live Chat Available 24/7</span>
        </a>
      </div>
    </div>
  </div>
</div>
```

---

### Pattern 2: Payment Timeout (Status Unclear)
```html
<div class="error-modal-overlay">
  <div class="error-state-card">
    <div class="error-header">
      <div class="error-icon-wrapper warning">⏱️</div>
      <div class="error-header-content">
        <h2 class="error-headline">Payment Took Too Long</h2>
        <p class="error-subheadline">We're not sure if your payment succeeded. Please check below.</p>
      </div>
    </div>

    <div class="booking-status-banner pending">
      <span class="status-badge pending">BOOKING UNDER VERIFICATION</span>
      <span class="status-text">Status will be confirmed within 2-3 minutes</span>
    </div>

    <div class="info-grid">
      <div class="info-box">
        <span class="info-box-label">Reference ID</span>
        <span class="info-box-value">PAY989765</span>
      </div>
      <div class="info-box">
        <span class="info-box-label">Amount</span>
        <span class="info-box-value">₹2,450</span>
      </div>
    </div>

    <div class="error-actions">
      <button class="action-button-primary">✅ Check My Booking Status</button>
      <button class="action-button-secondary">💳 Check Payment Status</button>
      <button class="action-button-tertiary">🔄 Retry Payment</button>
    </div>

    <div class="reassurance-box">
      <span class="reassurance-icon">✅</span>
      <div class="reassurance-content">
        <strong>Don't Panic</strong>
        Most payments succeed even with timeouts. If your bank shows a deduction, we will verify and book your ticket within 2-3 minutes.
      </div>
    </div>
  </div>
</div>
```

---

### Pattern 3: Session Expired
```html
<div class="error-modal-overlay">
  <div class="error-state-card">
    <div class="error-header">
      <div class="error-icon-wrapper warning">⏰</div>
      <div class="error-header-content">
        <h2 class="error-headline">Your Session Has Expired</h2>
        <p class="error-subheadline">For your security, you were logged out after 30 minutes of inactivity.</p>
      </div>
    </div>

    <div class="booking-status-banner">
      <span class="status-badge" style="background: var(--status-warning); color: white;">SESSION ENDED</span>
      <span class="status-text">No booking was created. Your search data is saved.</span>
    </div>

    <div class="recovery-steps">
      <div class="recovery-steps-title">How to Continue</div>
      <div class="recovery-step">
        <div class="recovery-step-number">1</div>
        <div class="recovery-step-content">Log back into your IRCTC account</div>
      </div>
      <div class="recovery-step">
        <div class="recovery-step-number">2</div>
        <div class="recovery-step-content">Your previous search will appear automatically</div>
      </div>
      <div class="recovery-step">
        <div class="recovery-step-number">3</div>
        <div class="recovery-step-content">Review and continue booking</div>
      </div>
    </div>

    <div class="error-actions">
      <button class="action-button-primary">🔑 Log In Again</button>
      <button class="action-button-secondary">🏠 Start New Search</button>
    </div>
  </div>
</div>
```

---

### Pattern 4: Booking Incomplete - Missing Fields
```html
<div class="error-modal-overlay">
  <div class="error-state-card">
    <div class="error-header">
      <div class="error-icon-wrapper warning">⚠️</div>
      <div class="error-header-content">
        <h2 class="error-headline">Cannot Complete Booking</h2>
        <p class="error-subheadline">Some required information is missing or incorrect.</p>
      </div>
    </div>

    <div class="booking-status-banner">
      <span class="status-badge" style="background: var(--status-warning); color: white;">BOOKING INCOMPLETE</span>
      <span class="status-text">Please fill in all required fields</span>
    </div>

    <div class="form-field-error">
      <label>Passenger 1 - Mobile Number *</label>
      <input type="text" placeholder="Enter 10-digit mobile number" value="">
      <div class="form-field-error-message">
        <span>⚠️</span>
        <span>Mobile number is required for booking confirmation</span>
      </div>
    </div>

    <div class="error-actions">
      <button class="action-button-primary">✓ Complete Booking</button>
      <button class="action-button-tertiary">🔄 Start Over</button>
    </div>
  </div>
</div>
```

---

### Pattern 5: Technical Error / Server Error
```html
<div class="error-modal-overlay">
  <div class="error-state-card">
    <div class="error-header">
      <div class="error-icon-wrapper error">❌</div>
      <div class="error-header-content">
        <h2 class="error-headline">Something Went Wrong</h2>
        <p class="error-subheadline">We experienced a technical issue. Our team has been notified.</p>
      </div>
    </div>

    <div class="booking-status-banner failed">
      <span class="status-badge failed">BOOKING NOT CREATED</span>
      <span class="status-text">No charges were made</span>
    </div>

    <div class="info-grid">
      <div class="info-box">
        <span class="info-box-label">Error ID</span>
        <span class="info-box-value">ERR-2026-89456</span>
      </div>
      <div class="info-box">
        <span class="info-box-label">Time</span>
        <span class="info-box-value">14:32 IST</span>
      </div>
    </div>

    <div class="error-actions">
      <button class="action-button-primary">🔄 Try Again</button>
      <button class="action-button-secondary">🏠 Return Home</button>
    </div>

    <div class="support-section">
      <div class="support-headline">How We Can Help</div>
      <div class="support-options">
        <a href="tel:139" class="support-link">
          <span class="support-link-icon">📞</span>
          <span>Call Support: 139 (24/7 helpline)</span>
        </a>
        <a href="#email" class="support-link">
          <span class="support-link-icon">✉️</span>
          <span>Send Us Your Error ID for Investigation</span>
        </a>
      </div>
    </div>
  </div>
</div>
```

---

### Pattern 6: Successful Booking (For Reference)
```html
<div class="error-modal-overlay">
  <div class="error-state-card">
    <div class="error-header">
      <div class="error-icon-wrapper success" style="animation: checkmark 0.5s ease-out;">✓</div>
      <div class="error-header-content">
        <h2 class="error-headline">Ticket Booking Confirmed!</h2>
        <p class="error-subheadline">Your booking has been successfully completed.</p>
      </div>
    </div>

    <div class="booking-status-banner confirmed">
      <span class="status-badge confirmed">TICKET CONFIRMED</span>
      <span class="status-text">Your seat has been reserved</span>
    </div>

    <div class="info-grid">
      <div class="info-box">
        <span class="info-box-label">Booking Reference</span>
        <span class="info-box-value">KXMN78</span>
      </div>
      <div class="info-box">
        <span class="info-box-label">Seat Number</span>
        <span class="info-box-value">B3/41</span>
      </div>
      <div class="info-box">
        <span class="info-box-label">Amount Paid</span>
        <span class="info-box-value">₹2,450</span>
      </div>
      <div class="info-box">
        <span class="info-box-label">Journey</span>
        <span class="info-box-value">03 Apr 2026</span>
      </div>
    </div>

    <div class="error-actions">
      <button class="action-button-primary">📱 Get E-Ticket</button>
      <button class="action-button-secondary">🔄 Book Another Ticket</button>
    </div>
  </div>
</div>
```

---

## 🚨 In-Page Alerts (Non-Modal)

### Alert: Field Validation Error
```html
<div class="error-alert">
  <span class="error-alert-icon">❌</span>
  <div class="error-alert-content">
    <h4 class="error-alert-headline">Invalid Ticket Count</h4>
    <p class="error-alert-description">You selected 48 passengers but the maximum is 6 tickets per booking.</p>
  </div>
  <button class="error-alert-close">✕</button>
</div>
```

### Alert: Warning / Connection Lost
```html
<div class="error-alert warning">
  <span class="error-alert-icon">⚠️</span>
  <div class="error-alert-content">
    <h4 class="error-alert-headline">Connection Lost</h4>
    <p class="error-alert-description">We lost connection to the server. Your booking form is saved locally.</p>
  </div>
  <button class="error-alert-close">✕</button>
</div>
```

### Alert: Info / Important Notice
```html
<div class="error-alert info">
  <span class="error-alert-icon">ℹ️</span>
  <div class="error-alert-content">
    <h4 class="error-alert-headline">High Demand - Limited Seats</h4>
    <p class="error-alert-description">This train is fully booked. Only Tatkal quota has seats for your date.</p>
  </div>
  <button class="error-alert-close">✕</button>
</div>
```

### Alert: Success
```html
<div class="error-alert success">
  <span class="error-alert-icon">✓</span>
  <div class="error-alert-content">
    <h4 class="error-alert-headline">Great News!</h4>
    <p class="error-alert-description">Your IRCTC Plus membership is active. You've earned 50 loyalty points!</p>
  </div>
  <button class="error-alert-close">✕</button>
</div>
```

---

## 🎯 Component Variants Cheat Sheet

### Error Icon Types
| Type | Code | Color | Usage |
|------|------|-------|-------|
| Error | ❌ | Red | Failed payments, errors |
| Warning | ⚠️ | Orange | Timeouts, pending |
| Timeout | ⏳ | Red | Server timeout |
| Session | ⏰ | Orange | Session expired |
| Check | ✓ | Green | Success, confirmed |
| Refund | 💸 | Orange | Refunding status |

### Status Badge Types
```html
<span class="status-badge confirmed">✓ TICKET CONFIRMED</span>
<span class="status-badge failed">✕ BOOKING NOT CREATED</span>
<span class="status-badge pending">⏳ BOOKING UNDER VERIFICATION</span>
<span class="status-badge refund">💸 REFUND IN PROGRESS</span>
```

### Button Types
```html
<!-- Primary: Most important action -->
<button class="action-button-primary">🔄 Try Again</button>

<!-- Secondary: Alternative action -->
<button class="action-button-secondary">💰 Different Card</button>

<!-- Tertiary: Help or less common action -->
<button class="action-button-tertiary">❓ Why Failed?</button>
```

### Banner Types
```html
<!-- Confirmed (Green) -->
<div class="booking-status-banner confirmed">
  <span class="status-badge confirmed">TICKET CONFIRMED</span>
  <span class="status-text">Your seat has been reserved</span>
</div>

<!-- Failed (Red) -->
<div class="booking-status-banner failed">
  <span class="status-badge failed">BOOKING NOT CREATED</span>
  <span class="status-text">No booking has been created</span>
</div>

<!-- Pending (Blue) -->
<div class="booking-status-banner pending">
  <span class="status-badge pending">BOOKING UNDER VERIFICATION</span>
  <span class="status-text">Status will be confirmed within 2-3 minutes</span>
</div>

<!-- Refund (Orange) -->
<div class="booking-status-banner refund">
  <span class="status-badge refund">REFUND IN PROGRESS</span>
  <span class="status-text">Funds will be in your account within 5-7 days</span>
</div>
```

---

## 🔧 JavaScript Examples

### Show Payment Failed Modal
```javascript
function showPaymentFailed() {
  const modal = document.querySelector('.error-modal-overlay');
  modal.innerHTML = `
    <!-- Copy Pattern 1 HTML here -->
  `;
  modal.classList.remove('hidden');
}
```

### Show In-Page Alert
```javascript
function showValidationError(message) {
  const alert = document.createElement('div');
  alert.className = 'error-alert';
  alert.innerHTML = `
    <span class="error-alert-icon">❌</span>
    <div class="error-alert-content">
      <h4 class="error-alert-headline">Validation Error</h4>
      <p class="error-alert-description">${message}</p>
    </div>
    <button class="error-alert-close">✕</button>
  `;
  
  document.querySelector('#form-container').insertBefore(
    alert,
    document.querySelector('#form-container').firstChild
  );
  
  // Close button functionality
  alert.querySelector('.error-alert-close').addEventListener('click', function() {
    alert.remove();
  });
}

// Usage
showValidationError('Email address is required');
```

### Hide Modal
```javascript
function closeErrorModal() {
  document.querySelector('.error-modal-overlay').classList.add('hidden');
}
```

### Handle Button Click
```javascript
document.querySelector('.action-button-primary').addEventListener('click', function() {
  console.log('User clicked primary action');
  // Retry payment, check status, etc.
});
```

---

## 📱 Mobile Adjustments

The CSS is already responsive, but here are key breakpoints:

```css
/* Desktop: 1200px+ - Full layout */
/* Tablet: 640px - 1200px - Single column with touch optimization */
/* Mobile: < 640px - Full width, stacked buttons */

/* Animation disabled on low-power devices */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## ✅ Validation Checklist

Before deploying error states:
- [ ] All error messages are clear, non-technical
- [ ] Booking status is always visible and unambiguous
- [ ] Every error has 2+ actionable recovery buttons
- [ ] Support contact options are included
- [ ] Colors meet WCAG AA contrast requirements
- [ ] Tested on mobile (414px), tablet (768px), desktop (1440px)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces errors (role="alert")
- [ ] No duplicate payment risk in messaging
- [ ] Error IDs provided for support reference
- [ ] Reassurance messaging reduces user panic
- [ ] Tested with payment provider's staging environment

---

## 🎬 Loading States

### Show Spinner While Checking Status
```html
<div style="text-align: center; padding: 20px;">
  <div class="loading-spinner"></div>
  <p>Checking your booking status...</p>
</div>
```

### CSS Spinner
The CSS already includes:
```css
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border);
  border-top-color: var(--irctc-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

---

## 🔗 Quick Links

- **Full Demo**: Open `error-states-demo.html` in browser
- **Full Documentation**: Read `ERROR-SYSTEM-DOCUMENTATION.md`
- **CSS File**: `error-states.css` has all components and animations
- **View HTML**: `error-states-demo.html` has all patterns ready to copy

---

## 💡 Common Mistakes to Avoid

❌ **DON'T**: Show error ID without support contact
✅ **DO**: Show error ID with "Contact support with this ID"

❌ **DON'T**: Use only red color for status
✅ **DO**: Use color + text badge + banner

❌ **DON'T**: Vague button text like "OK" or "Dismiss"
✅ **DO**: Action-oriented text like "Retry" or "Check Status"

❌ **DON'T**: Leave user with no recovery options
✅ **DO**: Always provide 2+ next steps

❌ **DON'T**: Technical error codes as primary message
✅ **DO**: Human-friendly explanation with error ID for support

---

## 🚀 Implementation Order

1. Add `error-states.css` to your HTML
2. Test modal display with Pattern 1 (Payment Failed)
3. Update payment.js to call error modal
4. Add in-page alerts for form validation
5. Test on mobile and accessibility
6. Deploy to staging environment
7. Gather user feedback
8. Deploy to production

---

**Last Updated**: 2026
**Status**: Production Ready ✅
**Questions**: Refer to ERROR-SYSTEM-DOCUMENTATION.md
