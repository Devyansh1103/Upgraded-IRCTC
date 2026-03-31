# System Feedback & Status Visibility - Design System Documentation

**Version:** 1.0  
**Last Updated:** 2026  
**Audience:** Product Managers, UX Designers, Front-End Developers, QA Teams  

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Problem Statement](#problem-statement)
3. [Solution Overview](#solution-overview)
4. [Component Library](#component-library)
5. [All 8 Booking Scenarios](#all-8-booking-scenarios)
6. [Color Palette & Semantics](#color-palette--semantics)
7. [Typography & Spacing](#typography--spacing)
8. [Animations & Micro-Interactions](#animations--micro-interactions)
9. [Implementation Guidelines](#implementation-guidelines)
10. [Accessibility Requirements](#accessibility-requirements)
11. [Best Practices](#best-practices)
12. [Integration Examples](#integration-examples)

---

## Design Philosophy

### Core Principles

**1. Always Communicating**
- The system should never leave users wondering "is it working?"
- Every action gets immediate visual feedback
- Continuous progress indication for long operations
- Estimated time remaining relieves anxiety

**2. Context Preserved**
- Critical booking information stays visible during loading
- Users never lose sight of what they're booking
- Reassurance through visibility (train details, passenger count, payment amount)
- Context cards bridge the gap between user action and system response

**3. Reassuring Tone**
- Replace technical language with human-friendly messaging
- Explain WHY the system is waiting ("Verifying your details against our database")
- Provide helpful hints ("Do not close this window")
- Build trust through transparency

**4. Low-Stress Experience**
- Loading states should feel quick and smooth
- Animations are gentle (0.2s-0.8s), not intrusive
- Visual hierarchy guides attention naturally
- Colors maintain IRCTC's official, trustworthy identity

---

## Problem Statement

### User Pain Points During Booking

**Anxiety from Uncertainty**
- "Is the system hung?"
- "Did my payment go through?"
- "How long will this take?"
- Leads to duplicate submissions, lost bookings, support tickets

**Context Loss During Loading**
- Train information disappears while searching for availability
- Payment details hidden while processing
- Passenger data forgotten during validation
- Creates cognitive burden restarting context

**Technical Error Messages**
- "Gateway timeout error 504"
- "Connection refused"
- Incomprehensible to non-technical users
- Triggers panic instead of action

**Lack of Progress Visibility**
- No indication of what step we're on in multi-step booking
- No progress bar showing overall completion
- No time estimate for completion
- Creates abandonment risk

---

## Solution Overview

### What We're Delivering

A comprehensive system feedback design system that makes **loading, processing, confirmation, and completion states crystal clear and reassuring** while maintaining 100% IRCTC brand consistency.

### Key Capabilities

| Capability | Implementation | User Benefit |
|---|---|---|
| **Visual Loaders** | Spinners, loading dots, pulse animations | Users see action is happening |
| **Context Cards** | Preserve booking details during loading | Users never lose context |
| **Progress Tracking** | Step trackers, progress bars with percentage | Users know where they are in the journey |
| **Time Indicators** | Estimated time remaining | Reduces anxiety by setting expectations |
| **Skeleton States** | Progressive loading mimics final layout | Reduces perceived load time |
| **Success Confirmations** | Clear completion states with details | Builds confidence in successful booking |
| **Inline Messaging** | Non-blocking feedback for background tasks | Communication without disruption |
| **Toast Notifications** | Subtle real-time alerts and updates | Users stay informed of status changes |
| **Accessibility** | WCAG AA compliance, keyboard support | Inclusive experience for all users |
| **Responsiveness** | Works perfectly on mobile (480px), tablet (768px), desktop | Bookings work on any device |

---

## Component Library

### 1. Spinner Loaders (3 Sizes)

**Purpose:** Indicate active processing  
**Usage:** Pair with reassuring context text  
**Sizes:** Small (16px), Base/Medium (20px), Large (24px)

```html
<!-- Small Spinner -->
<span class="spinner sm"></span>

<!-- Base Spinner -->
<span class="spinner"></span>

<!-- Large Spinner -->
<span class="spinner lg"></span>
```

**Animation Details:**
- Full rotation: 0.8s
- Smooth, continuous rotation
- Uses CSS keyframes (no JavaScript needed)
- Reduced motion support via `prefers-reduced-motion` media query

**When to Use:**
- ✅ Searching for trains (use large spinner)
- ✅ Processing payments (use base spinner)
- ✅ Inline status indicators (use small spinner)
- ❌ NOT for sequential operations (use step tracker instead)

---

### 2. Loading Dots Animation

**Purpose:** Show incremental progress or buffer state  
**Usage:** Pair with messaging to indicate different types of loading

```html
<div style="display: flex; gap: 8px;">
  <div class="loading-dot"></div>
  <div class="loading-dot"></div>
  <div class="loading-dot"></div>
</div>
```

**Animation Details:**
- Each dot bounces in sequence
- Creates wave-like motion
- Duration: 1.4s per cycle
- Uses CSS animation (bounce keyframe)

**When to Use:**
- ✅ Fetching data from multiple sources
- ✅ Sequential operations (station search, class availability, etc.)
- ✅ Minimalist loading state
- ❌ NOT for critical operations (use spinner instead)

---

### 3. Pulse Animation

**Purpose:** Subtle indicator of ongoing background processing  
**Usage:** For non-urgent background tasks

```html
<div class="pulse-indicator"></div>
```

**Animation Details:**
- Opacity fades in and out smoothly
- Duration: 2s per cycle
- Very subtle, non-intrusive
- Uses `prefers-reduced-motion` for accessibility

**When to Use:**
- ✅ Auto-save operations
- ✅ Background sync tasks
- ✅ Gentle "I'm still here" indicators
- ❌ NOT for user-initiated operations

---

### 4. Skeleton Loading Placeholders (6 Types)

**Purpose:** Show content structure while data loads  
**Usage:** Replace real content during initial fetch

```html
<!-- Text Skeleton -->
<div class="skeleton-text"></div>

<!-- Heading Skeleton -->
<div class="skeleton-heading"></div>

<!-- Avatar Skeleton -->
<div class="skeleton-avatar"></div>

<!-- Button Skeleton -->
<div class="skeleton-button"></div>

<!-- Card Skeleton -->
<div class="skeleton-card"></div>

<!-- Custom width -->
<div class="skeleton-text" style="width: 60%;"></div>
```

**Animation Details:**
- Shimmer effect sweeps left to right
- Duration: 1.5s per cycle
- Linear gradient creates shimmering appearance
- Uses CSS keyframes

**When to Use:**
- ✅ Fetching train list
- ✅ Loading seat map
- ✅ Retrieving passenger data
- ✅ Loading payment options
- ❌ NOT for form validation (use inline errors instead)

---

### 5. Context Cards (Processing State)

**Purpose:** Preserve critical booking information during loading  
**Usage:** Shows what user is booking, keeps focus

```html
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">Train</span>
    <span class="info-value">Rajdhani Express (12002)</span>
  </div>
  <div class="info-row">
    <span class="info-label">Status</span>
    <span class="context-status processing">
      <span class="spinner sm"></span>
      Loading availability...
    </span>
  </div>
</div>
```

**Variants:**
- `.context-card.processing` - Active operation (blue left border)
- `.context-card.completed` - Finished (green left border)
- `.context-card.error` - Error state (red left border)

**When to Use:**
- ✅ Show train details while searching availability
- ✅ Display passenger summary during data processing
- ✅ Show payment details during transaction
- ✅ Remind users of their choices during multi-step operations

---

### 6. Progress Bar with Percentage

**Purpose:** Show linear progress for multi-step operations  
**Usage:** Pair with percentage indicator

```html
<div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
    <span style="font-weight: 600;">Overall Progress</span>
    <span class="progress-percentage">60%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-bar-fill" style="width: 60%;"></div>
  </div>
</div>
```

**Styling Details:**
- Smooth gradient fill (IRCTC blue)
- Rounded corners for modern feel
- 8px height (accessible touch target)
- Shimmer animation shows activity

**When to Use:**
- ✅ Multi-step booking (show overall progress)
- ✅ Batch operations (processing X of Y items)
- ✅ Long-running operations (download, upload, etc.)
- ✅ Always pair with percentage (not just visual bar)

---

### 7. Step Tracker / Timeline (4 States)

**Purpose:** Show where user is in multi-step process  
**Usage:** Display all steps and current position

```html
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
```

**Step States:**
- **Completed** - Checkmark, green color, 100% opacity
- **Active** - Number, IRCTC blue, glow effect
- **Inactive** - Number, light gray, 50% opacity
- **Processing** - Spinner, loading state (optional)

**When to Use:**
- ✅ Train Selection (1) → Seats (2) → Passenger Info (3) → Payment (4) → Confirmation (5)
- ✅ Refund requests with multiple approval steps
- ✅ Any process with 3+ sequential steps
- ✅ Always show remaining steps to orient user

---

### 8. Success States (Checkmark Animation)

**Purpose:** Clear, positive confirmation of completion  
**Usage:** Celebrate successful transactions

```html
<div class="success-state">
  <div class="success-icon">✓</div>
  <h3 class="success-headline">Your Ticket Has Been Booked Successfully!</h3>
  <p class="success-message">Congratulations! Your train ticket booking is confirmed.</p>

  <div class="success-details">
    <div class="success-detail-row">
      <span class="success-detail-label">Booking Reference</span>
      <span class="success-detail-value">KXMN78</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Train</span>
      <span class="success-detail-value">Rajdhani Express (12002)</span>
    </div>
  </div>
</div>
```

**Animation Details:**
- Checkmark scales in smoothly (0.6s)
- Slight overshoot on scale (1.2x) for delight
- High visibility in green color
- Transitions to static state post-animation

**When to Use:**
- ✅ Full booking confirmation
- ✅ Payment successfully processed
- ✅ Step completion (passenger info saved, etc.)
- ✅ File upload complete
- ✅ Any successful completion users should celebrate

---

### 9. Status Badges

**Purpose:** Show current status at a glance  
**Usage:** Pair with spinner for processing, checkmark for success

```html
<!-- Processing Badge -->
<span class="status-badge processing">
  <span class="spinner sm"></span>
  Processing
</span>

<!-- Success Badge -->
<span class="status-badge success">
  ✓ Success
</span>
```

**Variants:**
- `.status-badge.processing` - Active operation (blue background, spinner)
- `.status-badge.success` - Completed (green background, checkmark)

**When to Use:**
- ✅ In-page status display (e.g., "Payment Status: Processing")
- ✅ Booking confirmation (e.g., "Booking Status: Confirmed")
- ✅ Multi-item operations (show per-item status)

---

### 10. Inline Loading States

**Purpose:** Show non-blocking operations without disrupting form  
**Usage:** For side tasks that don't require modal overlay

```html
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

**Components:**
- Icon (left): Spinner or other indicator
- Content (right): Title and descriptive text
- Maintains full card styling (border, padding, background)

**When to Use:**
- ✅ Background validation tasks
- ✅ Secondary operations that don't block main flow
- ✅ Verification tasks running in parallel
- ✅ Information fetching without blocking UI

---

### 11. Toast Notifications

**Purpose:** Provide subtle, non-intrusive alerts  
**Usage:** Real-time updates without modal disruption

```html
<!-- Loading Toast -->
<div class="toast loading">
  <div class="toast-header">
    <span class="toast-icon" style="display: inline-block;">
      <span class="spinner sm"></span>
    </span>
    <h4 class="toast-title">Processing Payment</h4>
  </div>
  <p class="toast-message">Contacting payment gateway. Please don't close this window.</p>
</div>

<!-- Success Toast -->
<div class="toast success">
  <div class="toast-header">
    <span class="toast-icon">✓</span>
    <h4 class="toast-title">Payment Successful</h4>
  </div>
  <p class="toast-message">Your payment has been processed. Booking confirmed.</p>
</div>
```

**Variants:**
- `.toast.success` - Success messages (green left border)
- `.toast.loading` - Processing messages (blue left border)
- `.toast.warning` - Alerts (orange left border)
- `.toast.error` - Problems (red left border)

**When to Use:**
- ✅ Seat availability alerts ("Only 3 seats left!")
- ✅ Session warnings ("Session expires in 5 minutes")
- ✅ Real-time updates ("Train delay notification")
- ✅ Background task completion ("Your receipt has been emailed")
- ❌ NOT for critical information (use modals)

---

### 12. Estimated Time Remaining

**Purpose:** Set user expectations for wait time  
**Usage:** Show estimated completion time

```html
<div class="estimated-time">
  ⏱️ This usually takes <strong>3-5 seconds</strong>
</div>

<!-- Alternative styling -->
<div class="estimated-time">
  ⏱️ Estimated time: <strong>2 minutes</strong>
</div>
```

**Usage Guidelines:**
- Always provide realistic time estimates
- Based on typical operation times
- Helps prevent duplicate submissions
- Reassures users system is still working

**When to Use:**
- ✅ Train search (typically 3-5 seconds)
- ✅ Seat availability (typically 2-3 seconds)
- ✅ Payment processing (typically 30-60 seconds)
- ✅ Booking confirmation (typically 5-10 seconds)

---

## All 8 Booking Scenarios

### Scenario 1: Searching Trains

**When:** User enters search criteria (from, to, date, class) and clicks search  
**Duration:** 3-5 seconds typically  
**User Mental Model:** "Is the system working?"

**Design Implementation:**

1. **Show Context** - Display search parameters in preserved card
2. **Visual Feedback** - Large spinner indicates active search
3. **Messaging** - "Searching Available Trains"
4. **Time Estimate** - "This usually takes 3-5 seconds"
5. **Prevent Re-submission** - Disable search button with visual feedback

**HTML Pattern:**
```html
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">From Station</span>
    <span class="info-value">Delhi (NDLS)</span>
  </div>
  <!-- more details -->
  <div class="info-row">
    <span class="info-label">Status</span>
    <span class="context-status processing">
      <span class="spinner sm"></span>
      Searching trains...
    </span>
  </div>
</div>

<div class="state-preview">
  <div class="spinner lg"></div>
  <h3>Searching Available Trains</h3>
  <p>Please wait while we fetch the best options for you...</p>
  <div class="estimated-time">⏱️ This usually takes <strong>3-5 seconds</strong></div>
</div>
```

**Best Practices:**
- Keep search parameters visible
- Use large spinner for prominence
- Show specific destination in messaging
- Provide time expectation
- Disable interaction to prevent duplicate searches

---

### Scenario 2: Loading Seat Availability

**When:** User clicks on a train to view seat map  
**Duration:** 2-3 seconds typically  
**User Mental Model:** "What seats are available for my train?"

**Design Implementation:**

1. **Context Card** - Show selected train details
2. **Skeleton Loading** - Display seat map structure with shimmer
3. **Visual Indicator** - Animate loading dots or spinner
4. **Reassurance** - Explain what's loading ("Fetching seat map...")

**HTML Pattern:**
```html
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">Train</span>
    <span class="info-value">Rajdhani Express (12002)</span>
  </div>
  <!-- more details -->
</div>

<div style="display: flex; gap: 8px; justify-content: center;">
  <div class="loading-dot"></div>
  <div class="loading-dot"></div>
  <div class="loading-dot"></div>
</div>
<p>Fetching seat map...</p>
```

**Best Practices:**
- Show confirmed train selection to orient user
- Use skeleton placeholders that match final seat layout
- Animate dots to show progress is happening
- Include messaging explaining what's loading

---

### Scenario 3: Moving to Next Booking Step

**When:** User completes current step and moves to next (e.g., seats → passenger info)  
**Duration:** 2-3 seconds typically  
**User Mental Model:** "Am I on the next step now?"

**Design Implementation:**

1. **Step Tracker** - Show current position in 5-step process
2. **Progress Bar** - Display overall booking progress
3. **Button Feedback** - Show loading state on submit button
4. **Context Preservation** - Keep previous step details visible

**HTML Pattern:**
```html
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
  <!-- more steps -->
</div>

<div class="progress-bar">
  <div class="progress-bar-fill" style="width: 60%;"></div>
</div>
```

**Best Practices:**
- Always show full step path (context)
- Highlight current step prominently
- Show progress percentage
- Mark completed steps with checkmarks
- Update dynamically as user progresses

---

### Scenario 4: Processing Passenger Data

**When:** User enters passenger details and submits  
**Duration:** 3-5 seconds typically  
**User Mental Model:** "Are my details being validated?"

**Design Implementation:**

1. **Inline Loading** - Non-blocking feedback in context card
2. **Detailed Messaging** - Explain what validation is happening
3. **Data Preserved** - Show entered details while validating
4. **Field States** - Optional: Show which fields are being validated

**HTML Pattern:**
```html
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">Passengers</span>
    <span class="info-value">2 Passengers</span>
  </div>
  <div class="info-row">
    <span class="info-label">Status</span>
    <span class="context-status processing">
      <span class="spinner sm"></span>
      Validating passenger information...
    </span>
  </div>
</div>

<div class="loading-state">
  <span class="loading-state-icon">
    <span class="spinner sm"></span>
  </span>
  <div class="loading-state-content">
    <h3>Validating Passenger Information</h3>
    <p>We're verifying your details to prevent fraud and ensure smooth booking.</p>
  </div>
</div>
```

**Best Practices:**
- Keep entered data visible during validation
- Use non-blocking inline state (don't overlay form)
- Explain WHY we're validating
- Show which step is happening
- Maintain field accessibility throughout

---

### Scenario 5: Preparing Payment

**When:** System is setting up payment gateway and confirming with user's bank  
**Duration:** 30-60 seconds typically  
**User Mental Model:** "Is my payment being processed safely?"

**Design Implementation:**

1. **Payment Context** - Show final booking summary (amount, items, passenger count)
2. **Step Indicator** - Show which payment step is happening (preparing → contacting bank → confirming)
3. **Time Estimate** - Clear expectation: "30-60 seconds"
4. **Reassurance Message** - "Do not close this window"

**HTML Pattern:**
```html
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">Total Amount</span>
    <span class="info-value" style="color: #1b4f9c; font-size: 18px;">₹5,640</span>
  </div>
  <div class="info-row">
    <span class="info-label">Payment Status</span>
    <span class="context-status processing">
      <span class="spinner sm"></span>
      Securing payment...
    </span>
  </div>
</div>

<div style="display: flex; flex-direction: column; gap: 16px;">
  <div style="display: flex; gap: 16px;">
    <div class="spinner sm"></div>
    <div>
      <p style="font-weight: 600; margin: 0;">Preparing payment gateway</p>
      <p style="font-size: 12px; color: #4f5d75; margin: 4px 0 0 0;">Setting up secure connection...</p>
    </div>
  </div>
  <!-- more steps -->
</div>

<p style="font-size: 12px; color: #4f5d75;">⏱️ Do not close this window or navigate away. Usually takes 30-60 seconds.</p>
```

**Best Practices:**
- Always show final payment amount prominently
- Break down steps (preparing → contacting → confirming)
- Provide realistic time estimate
- Warn against closing/navigating away
- Show context card with full booking details
- Use reassuring, clear language

---

### Scenario 6: Confirming Booking

**When:** Final step - system consolidating data and creating booking record  
**Duration:** 5-10 seconds typically  
**User Mental Model:** "Is my booking being created?"

**Design Implementation:**

1. **Final Step Indicator** - "5 of 5" in step tracker
2. **Progress Animation** - Show smooth progress toward completion
3. **Confirmation Messaging** - "Confirming your booking..."
4. **Full Context** - Show train, passengers, seats, amount

**HTML Pattern:**
```html
<div class="step-item active">
  <div class="step-circle">5</div>
  <div class="step-label">Confirm</div>
</div>

<div class="progress-bar">
  <div class="progress-bar-fill" style="width: 100%; animation: shimmer 1.5s infinite;"></div>
</div>

<div class="loading-state">
  <span class="loading-state-icon">
    <span class="spinner sm"></span>
  </span>
  <div class="loading-state-content">
    <h3>Confirming Your Booking</h3>
    <p>We're creating your booking record and generating your e-ticket...</p>
  </div>
</div>
```

**Best Practices:**
- Show we're at the final step
- Animate progress bar smooth-filling
- Use reassuring messaging
- Keep full booking context visible
- Prepare to show success state next

---

### Scenario 7: Ticket Booked Successfully

**When:** Booking complete - confirmation created, e-ticket generated  
**Duration:** Permanent (until user navigates away)  
**User Mental Model:** "My booking is confirmed! Where's my ticket?"

**Design Implementation:**

1. **Success Animation** - Large checkmark with scale animation
2. **Clear Headline** - "Your Ticket Has Been Booked Successfully!"
3. **Booking Summary** - Show reference number, train, date, seats, amount
4. **Next Steps** - What to do next (email sent, show e-ticket, etc.)

**HTML Pattern:**
```html
<div class="success-state">
  <div class="success-icon">✓</div>
  <h3 class="success-headline">Your Ticket Has Been Booked Successfully!</h3>
  <p class="success-message">Congratulations! Your booking is confirmed.</p>

  <div class="success-details">
    <div class="success-detail-row">
      <span class="success-detail-label">Booking Reference</span>
      <span class="success-detail-value">KXMN78</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Train</span>
      <span class="success-detail-value">Rajdhani Express (12002)</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Seats</span>
      <span class="success-detail-value">3A/41, 3A/42</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Total Amount</span>
      <span class="success-detail-value">₹5,640</span>
    </div>
  </div>
</div>

<button style="background: #1b4f9c; color: white; padding: 12px 24px;">Download E-Ticket</button>
```

**Best Practices:**
- Show prominent checkmark animation
- Use celebratory but professional tone
- Show complete booking reference prominently
- Display all key details (what, when, where, how much)
- Provide clear next step (download, email confirmation, etc.)
- Keep reference number easily copyable

---

### Scenario 8: Refund Initiated / Request Accepted

**When:** User requested refund or cancellation - system processing  
**Duration:** 5-10 seconds (or ongoing if async process)  
**User Mental Model:** "Is my refund being processed?"

**Design Implementation:**

1. **Status Indication** - Show that refund processing started
2. **Timeline** - When to expect refund (1-5 business days typically)
3. **Amount** - Clear indication of refund amount
4. **Reference** - Refund request reference number
5. **Next Steps** - How to check status

**HTML Pattern:**
```html
<div class="success-state">
  <div class="success-icon">✓</div>
  <h3 class="success-headline">Your Refund Request Has Been Accepted</h3>
  <p class="success-message">Your refund is being processed. The amount will be credited to your account.</p>

  <div class="success-details">
    <div class="success-detail-row">
      <span class="success-detail-label">Refund Amount</span>
      <span class="success-detail-value">₹5,640</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Timeline</span>
      <span class="success-detail-value">1-5 Business Days</span>
    </div>
    <div class="success-detail-row">
      <span class="success-detail-label">Refund Reference</span>
      <span class="success-detail-value">REF-2026-123456</span>
    </div>
  </div>
</div>

<p style="font-size: 13px; color: #4f5d75; margin-top: 16px;">
  You can track your refund status using reference number <strong>REF-2026-123456</strong>
</p>
```

**Best Practices:**
- Confirm request was accepted (removes anxiety)
- Show clear refund timeline (manage expectations)
- Show refund amount prominently
- Provide tracking reference
- Explain what happens next
- Offer support contact if issues arise

---

## Color Palette & Semantics

### Core IRCTC Colors (Preserved)

| Color | Hex | Usage | Semantics |
|-------|-----|-------|-----------|
| **IRCTC Blue** | `#1b4f9c` | Primary buttons, spinners, active states, accents | Trust, authority, action |
| **IRCTC Dark Blue** | `#123a74` | Headers, footer, contrast text | Serious, official, government |
| **Light IRCTC Blue** | `#c6d4ea` | Borders, disabled states, backgrounds | Subtle, secondary |
| **Success Green** | `#388e3c` | Checkmarks, confirmed states, positive actions | Success, completion, trust |
| **Error Red** | `#c62828` | Error states, failed payment, warnings | Error, attention, action needed |
| **Background Light** | `#f4f7fb` | Page background, preview areas | Clean, official |
| **Text Dark** | `#1f2a37` | Body text, labels | Readable, professional |
| **Text Muted** | `#4f5d75` | Secondary text, hints, descriptions | Secondary, less important |

### CSS Variable Implementation

```css
:root {
  /* Primary Brand */
  --irctc-blue: #1b4f9c;
  --irctc-dark-blue: #123a74;
  --irctc-light-blue: #c6d4ea;
  --irctc-bg: #f4f7fb;

  /* Status Colors */
  --status-success: #388e3c;
  --status-error: #c62828;
  --status-warning: #f57c00;
  --status-processing: #1b4f9c;

  /* Text */
  --text: #1f2a37;
  --muted: #4f5d75;

  /* UI */
  --border: #c6d4ea;
  --card: #ffffff;
}
```

---

## Typography & Spacing

### Typography Scale (Preserved)

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| **Page Header** | 32px | 700 | Main page titles |
| **Section Header** | 24px | 700 | Section/scenario titles |
| **Component Headline** | 20px | 700 | Card titles, step labels |
| **Subheading** | 16px | 700 | Dialog titles, status messages |
| **Body** | 14px | 400 | Main content, descriptions |
| **Secondary** | 13px | 400 | Secondary text, info details |
| **Label** | 12px | 600-700 | Form labels, badges, info labels |
| **Hint** | 12px | 400 | Hints, help text, timestamps |

### Spacing Scale (Preserved)

| Name | Size | Usage |
|------|------|-------|
| **xs** | 4px | Tight spacing (icon gaps, tight lines) |
| **sm** | 8px | Close spacing (padding, small gaps) |
| **md** | 16px | Standard spacing (padding, section separation) |
| **lg** | 24px | Generous spacing (between sections) |
| **xl** | 32px | Large spacing (major sections) |
| **2xl** | 48px | Extra large (between major components) |

### CSS Variables for Spacing

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
}
```

---

## Animations & Micro-Interactions

### CSS Keyframes Defined

**1. Spin Animation** (Spinners)
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
/* Duration: 0.8s linear infinite */
```

**2. Bounce Animation** (Loading dots)
```css
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
}
/* Duration: 1.4s infinite, staggered timing */
```

**3. Pulse Animation** (Subtle indicators)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
/* Duration: 2s infinite */
```

**4. Shimmer Animation** (Skeleton loading)
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
/* Duration: 1.5s infinite */
```

**5. Checkmark Animation** (Success states)
```css
@keyframes checkmark {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}
/* Duration: 0.6s ease-out, one-time */
```

**6. Slide Animation** (Toast notifications)
```css
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
/* Duration: 0.3s ease-out */
```

### Timing & Pacing

| Duration | Use Case | Purpose |
|----------|----------|---------|
| **0.2s** | Color changes, state updates | Quick visual feedback |
| **0.3s** | Toast appearance, button hovers | Perceived responsiveness |
| **0.6s** | Checkmark completion | Celebratory moment |
| **0.8s** | Spinner rotation | Smooth, not distracting |
| **1.4s** | Loading dots bounce | Visual rhythm |
| **1.5s** | Skeleton shimmer | Perceptible but not jarring |
| **2s** | Pulse animation | Very subtle background motion |

### Accessibility & Motion Preferences

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Guidelines

### Step 1: Include CSS Framework

Add `system-feedback.css` to your HTML:

```html
<link rel="stylesheet" href="system-feedback.css">
```

### Step 2: Choose Appropriate Component

Determine which states apply to your workflow:

| Workflow Step | Primary Component | Secondary Components |
|---------------|-------------------|----------------------|
| Initial load | Spinner lg | Context card |
| Data fetch | Skeleton cards | Loading dots |
| Processing | Inline loading | Progress bar |
| Confirmation | Step tracker | Success state |
| Completion | Success state with details | Toast notification |

### Step 3: Maintain Context

Always preserve critical information during loading:

**DO:**
```html
<!-- ✅ Good: Context preserved -->
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">Train</span>
    <span class="info-value">Rajdhani Express</span>
  </div>
</div>
```

**DON'T:**
```html
<!-- ❌ Bad: Context hidden -->
<div class="loading-overlay">
  <div class="spinner"></div>
</div>
```

### Step 4: Provide Reassurance

Combine visual feedback with clear messaging:

```html
<div class="state-preview">
  <div class="spinner lg"></div>
  <h3>Searching Available Trains</h3>
  <p>Please wait while we fetch the best options for you...</p>
  <div class="estimated-time">⏱️ This usually takes <strong>3-5 seconds</strong></div>
</div>
```

### Step 5: Test on Multiple Devices

- Desktop (1200px+)
- Tablet (768px)
- Mobile (480px)
- Reduced motion enabled
- Dark mode (optional)

---

## Accessibility Requirements (WCAG 2.1 AA)

### Color Contrast

- Text on background: minimum 4.5:1 ratio
- UI components: minimum 3:1 ratio
- Verified for all color combinations

### Keyboard Navigation

- All interactive elements keyboard accessible
- Focus indicators clearly visible
- Tab order logical and predictable
- Spinners don't receive focus (decorative)

### Screen Reader Support

```html
<!-- Use aria-live for dynamic content -->
<div aria-live="polite" aria-label="Payment processing status">
  <span class="spinner sm"></span>
  Processing payment...
</div>

<!-- Use aria-hidden for decorative elements -->
<span class="spinner lg" aria-hidden="true"></span>

<!-- Use role and aria-label for status -->
<div role="status" aria-label="60% complete">
  <div class="progress-bar">
    <div class="progress-bar-fill" style="width: 60%;"></div>
  </div>
</div>
```

### Motion & Animation

- Spinners respect `prefers-reduced-motion`
- Animations are not essential to functionality
- Content remains accessible with animations disabled
- No flashing (ensures seizure safety)

### Form Integration

```html
<!-- Loading state on form submission -->
<button id="submitBtn">Search Trains</button>
<script>
  submitBtn.addEventListener('click', () => {
    submitBtn.innerHTML = '<span class="spinner sm"></span> Searching...';
    submitBtn.disabled = true;
  });
</script>
```

---

## Best Practices

### 1. Always Communicate State

**DO:** Show what's happening  
**DON'T:** Leave user guessing

```html
<!-- ✅ Good -->
<div class="loading-state">
  <span class="spinner sm"></span>
  Validating passenger information...
</div>

<!-- ❌ Bad -->
<div></div> <!-- Silent loading -->
```

### 2. Preserve Context

**DO:** Keep important information visible  
**DON'T:** Hide context while loading

```html
<!-- ✅ Good -->
<div class="context-card processing">
  <div class="info-row">
    <span class="info-label">Amount</span>
    <span class="info-value">₹5,640</span>
  </div>
</div>

<!-- ❌ Bad -->
<!-- Amount hidden while processing -->
```

### 3. Set Time Expectations

**DO:** Provide time estimates  
**DON'T:** Leave user wondering how long

```html
<!-- ✅ Good -->
<p>⏱️ This usually takes <strong>3-5 seconds</strong></p>

<!-- ❌ Bad -->
<p>Loading...</p>
```

### 4. Use Appropriate Component Size

**DO:** Match component size to importance  
**DON'T:** Use wrong size for context

```html
<!-- ✅ Good -->
<div class="spinner lg"></div> <!-- For train search -->
<div class="spinner sm"></div> <!-- For badges -->

<!-- ❌ Bad -->
<div class="spinner sm"></div> <!-- Too small for main operation -->
```

### 5. Maintain Brand Consistency

**DO:** Use IRCTC color palette  
**DON'T:** Introduce new colors

```html
<!-- ✅ Good -->
<div class="success-state">
  <div class="success-icon">✓</div> <!-- Green: #388e3c -->
</div>

<!-- ❌ Bad -->
<div style="color: #00ff00;">✓</div> <!-- Neon green -->
```

### 6. Layer Loading States

**DO:** Show hierarchy of loading  
**DON'T:** Show all spinners equally

```html
<!-- ✅ Good -->
<div class="step-tracker">
  <!-- Completed steps with checkmarks -->
  <!-- Active step highlighted -->
  <!-- Inactive steps dimmed -->
</div>

<!-- ❌ Bad -->
<div class="spinner"></div> <!-- All spinners same -->
```

### 7. Avoid False Positives

**DO:** Only show loading when actually loading  
**DON'T:** Show loading perpetually

```javascript
// ✅ Good
button.addEventListener('click', () => {
  button.innerHTML = '<span class="spinner sm"></span> Searching...';
  fetch(url).then(data => {
    button.innerHTML = 'Search Trains';
    button.disabled = false;
  });
});

// ❌ Bad
button.innerHTML = '<span class="spinner sm"></span> Searching...';
// Never removes spinner
```

### 8. Progressive Enhancement

**DO:** Work without JavaScript  
**DON'T:** Require JavaScript for basic feedback

```html
<!-- ✅ Good -->
<style>
  .loading-state { display: flex; }
  .spinner { animation: spin 0.8s linear infinite; }
</style>
<!-- Works even if JavaScript is disabled -->

<!-- ❌ Bad -->
<script>
  // Only shows loading if JavaScript runs
  showLoadingSpinner();
</script>
```

---

## Integration Examples

### Example 1: Train Search

```html
<form id="searchForm">
  <input type="text" placeholder="From Station" name="from">
  <input type="text" placeholder="To Station" name="to">
  <input type="date" name="date">
  <button id="searchBtn" type="submit">Search Trains</button>
</form>

<div id="results"></div>

<script>
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = e.target.querySelector('button');
    btn.innerHTML = '<span class="spinner sm"></span> Searching...';
    btn.disabled = true;

    const formData = new FormData(searchForm);
    
    try {
      const response = await fetch('/api/trains', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData))
      });
      
      const trains = await response.json();
      
      // Show results
      results.innerHTML = trains.map(train => `
        <div class="train-card">
          <h3>${train.name}</h3>
          <p>${train.from} → ${train.to}</p>
          <button onclick="selectTrain('${train.id}')">Select</button>
        </div>
      `).join('');
      
    } catch (error) {
      // Show error feedback
      results.innerHTML = '<p style="color: red;">Search failed. Please try again.</p>';
    } finally {
      btn.innerHTML = 'Search Trains';
      btn.disabled = false;
    }
  });
</script>
```

### Example 2: Multi-Step Booking

```html
<div id="bookingWizard">
  <!-- Step Tracker -->
  <div class="step-tracker">
    <div class="step-item completed">
      <div class="step-circle">✓</div>
      <div class="step-label">Train Selected</div>
    </div>
    <div class="step-item active" id="currentStep">
      <div class="step-circle">2</div>
      <div class="step-label">Seats</div>
    </div>
    <div class="step-item inactive">
      <div class="step-circle">3</div>
      <div class="step-label">Passenger Info</div>
    </div>
  </div>

  <!-- Progress -->
  <div>
    <div class="progress-bar">
      <div class="progress-bar-fill" style="width: 40%;"></div>
    </div>
  </div>

  <!-- Step Content -->
  <div id="stepContent"></div>

  <button id="continueBtn">Continue</button>
</div>

<script>
  let currentStep = 2;

  continueBtn.addEventListener('click', async () => {
    continueBtn.innerHTML = '<span class="spinner sm"></span> Loading...';
    continueBtn.disabled = true;

    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));

    currentStep++;
    updateStepTracker();
    updateProgress();
    updateContent();

    continueBtn.innerHTML = 'Continue';
    continueBtn.disabled = false;
  });

  function updateProgress() {
    const percent = (currentStep / 5) * 100;
    document.querySelector('.progress-bar-fill').style.width = percent + '%';
  }

  function updateStepTracker() {
    document.querySelectorAll('.step-item').forEach((item, index) => {
      const step = index + 1;
      item.className = 'step-item ' + (
        step < currentStep ? 'completed' :
        step === currentStep ? 'active' :
        'inactive'
      );
    });
  }
</script>
```

---

## Conclusion

This System Feedback & Status Visibility design system provides all the components needed to make IRCTC bookings feel **transparent, reassuring, and fast** — even when the system is actually working hard in the background.

By applying these patterns consistently across the booking journey, we reduce user anxiety, prevent duplicate submissions, build trust, and ultimately create a more delightful booking experience that keeps users confident in the system and engaged throughout their journey.

**Key Takeaway:** Always tell users what's happening. Context is your friend. Time estimates are reassurance.
