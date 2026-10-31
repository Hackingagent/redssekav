/**
 * RADSSEKAV Business Organization - Hephzibah Palm Field Estate
 * Main JavaScript Application
 */

(function () {
  'use strict';

  // Constants
  const WA_PRIMARY = '237658345627';
  const WA_SECONDARY = '237676742037';
  const WA_TERTIARY = '237682174907';

  function createWhatsAppLink(text, phone = WA_PRIMARY) {
    return 'https://wa.me/' + phone + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char];
    });
  }

  /* ==========================================================================
     1. Interactive Fit & Qualification Quiz
     ========================================================================== */
  const QUESTIONS = [
    {
      key: 'Learns about real estate from',
      title: 'Where do you mainly learn about real estate?',
      options: ['YouTube videos', 'Shepherd Iwu David', 'Friends or family', 'Other']
    },
    {
      key: 'Heard about Magaji from',
      title: 'How did you hear about our Magaji project?',
      options: ['TikTok', 'Facebook', 'Conference', 'A friend or family member', 'Other']
    },
    {
      key: 'Agrees with partnership model',
      title: 'Magaji is a partnership development project funded by many buyers together (crowdfunding). Do you agree with this model?',
      options: ['Yes, I agree', 'No'],
      stopIndex: [1],
      exitMessage: 'Thank you for visiting. This project works only for partners who agree with the crowdfunding model. We hope to work with you on our future projects.'
    },
    {
      key: 'Offer',
      title: 'Which offer fits your budget?',
      options: ['400 m² · 1,750,000 FCFA', '1 hectare (10,000 m²) · 30,000,000 FCFA', 'Neither fits my budget'],
      stopIndex: [2],
      exitMessage: 'Thank you for visiting. These offers do not match your budget right now. We hope our future projects will.'
    },
    {
      key: 'Plans to buy',
      title: 'When do you intend to complete your purchase?',
      options: ['Within 1 week', 'Within 2 weeks', 'Within 3 weeks', 'Later than 3 weeks'],
      stopIndex: [3],
      exitMessage: 'Thank you for visiting. This offer is for buyers ready within 3 weeks. We hope to see you in a future project.'
    },
    {
      key: 'Funds',
      title: 'Do you have the money for this offer, or can you raise it within that time?',
      options: ['Yes, I have it', 'I can raise it within that time', 'No, I am only exploring'],
      stopIndex: [2],
      exitMessage: 'Thank you for your honesty. Come back when you are ready to buy. We hope to see you in a future project.'
    }
  ];

  let currentQuestionIndex = 0;
  let userAnswers = {};
  const quizContainer = document.getElementById('quiz-box');

  function renderQuizQuestion() {
    if (!quizContainer) return;

    const q = QUESTIONS[currentQuestionIndex];
    const totalQ = QUESTIONS.length;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / (totalQ + 1)) * 100);

    let html = `
      <div class="quiz-progress-wrap">
        <div class="quiz-step-label">
          <span>Question ${currentQuestionIndex + 1} of ${totalQ}</span>
          <span>${progressPercent}% Complete</span>
        </div>
        <div class="quiz-track">
          <div class="quiz-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
      <h3 class="quiz-question-title" id="quiz-question-title" tabindex="-1">${escapeHtml(q.title)}</h3>
      <div class="quiz-options">
    `;

    q.options.forEach((opt, idx) => {
      html += `
        <button type="button" class="quiz-opt-btn" data-option-index="${idx}">
          <span>${escapeHtml(opt)}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      `;
    });

    html += `</div>`;

    if (currentQuestionIndex > 0) {
      html += `
        <div class="quiz-nav-row">
          <button type="button" class="quiz-back-btn" data-action="prev-question">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Previous question
          </button>
        </div>
      `;
    }

    quizContainer.innerHTML = html;

    const heading = document.getElementById('quiz-question-title');
    if (heading && currentQuestionIndex > 0) {
      heading.focus();
    }
  }

  function renderExitMessage(msgText) {
    if (!quizContainer) return;

    quizContainer.innerHTML = `
      <div class="quiz-exit-box">
        <div class="quiz-exit-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h3 class="quiz-question-title">Thank You For Your Interest</h3>
        <p class="section-lead" style="margin-bottom: 24px;">${escapeHtml(msgText)}</p>
        <button type="button" class="btn btn-outline" data-action="restart-quiz">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          Start Qualification Again
        </button>
      </div>
    `;
  }

  function renderBookingForm() {
    if (!quizContainer) return;

    const html = `
      <div class="quiz-progress-wrap">
        <div class="quiz-step-label">
          <span style="color: var(--success); font-weight: 800;">✓ Pre-Qualified</span>
          <span>100% Complete</span>
        </div>
        <div class="quiz-track">
          <div class="quiz-bar-fill" style="width: 100%; background: var(--success);"></div>
        </div>
      </div>
      <h3 class="quiz-question-title" id="quiz-qualified-title" tabindex="-1">You Qualify! Confirm Your Site Visit</h3>
      <p style="margin-bottom: 20px; color: var(--ink-secondary);">
        Please enter your contact details to prepare your official site inspection confirmation via WhatsApp.
      </p>
      
      <form id="booking-form" class="booking-form" novalidate>
        <div class="form-group">
          <label class="form-label" for="booking-name">Full Name *</label>
          <input class="form-input" id="booking-name" name="name" type="text" autocomplete="name" placeholder="e.g. Samuel Forbi" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="booking-phone">WhatsApp Number *</label>
          <input class="form-input" id="booking-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+237 6xx xxx xxx" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="booking-location">Where do you currently reside? *</label>
          <select class="form-select" id="booking-location" name="location">
            <option value="Cameroon">Cameroon</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Europe">Europe</option>
            <option value="Gulf / Middle East">Gulf / Middle East</option>
            <option value="Canada">Canada</option>
            <option value="Other">Other Diaspora</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="booking-date">Preferred Day / Date for Site Visit *</label>
          <input class="form-input" id="booking-date" name="visitDate" type="text" placeholder="e.g. This Saturday morning at 10:00 AM" required>
        </div>

        <label class="form-checkbox-label" for="booking-confirm">
          <input id="booking-confirm" type="checkbox" name="confirmed" required>
          <span>I confirm that I, or my designated representative, will physically attend the site visit in Magaji, Mile 4 Nkwen.</span>
        </label>

        <button type="submit" class="btn btn-gold btn-whatsapp" style="margin-top: 10px; width: 100%;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.09c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.12.82.83-3.04-.2-.32a8.083 8.083 0 0 1-1.24-4.3c0-4.46 3.63-8.09 8.09-8.09 2.16 0 4.19.84 5.72 2.37 1.53 1.53 2.37 3.56 2.37 5.72 0 4.46-3.63 8.09-8.09 8.09zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.55-.42-.14-.01-.3-.01-.47-.01-.16 0-.43.06-.66.3-.23.24-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
          </svg>
          Prepare My WhatsApp Confirmation Message
        </button>

        <div id="booking-status-msg" class="form-status-msg" role="status"></div>
        <p class="note" style="font-size: 0.85rem; color: var(--ink-muted); margin-top: 4px;">
          🔒 Your details are kept confidential and used solely to coordinate your site inspection with our Bamenda team.
        </p>
      </form>

      <div class="quiz-nav-row">
        <button type="button" class="quiz-back-btn" data-action="prev-question">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to questions
        </button>
      </div>
    `;

    quizContainer.innerHTML = html;

    const heading = document.getElementById('quiz-qualified-title');
    if (heading) heading.focus();
  }

  // Quiz Event Delegation
  if (quizContainer) {
    quizContainer.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn) return;

      const action = btn.dataset.action;

      if (action === 'restart-quiz') {
        userAnswers = {};
        currentQuestionIndex = 0;
        renderQuizQuestion();
        return;
      }

      if (action === 'prev-question') {
        currentQuestionIndex = Math.max(0, currentQuestionIndex - 1);
        renderQuizQuestion();
        return;
      }

      const optIdxStr = btn.dataset.optionIndex;
      if (optIdxStr !== undefined) {
        const q = QUESTIONS[currentQuestionIndex];
        const optIdx = parseInt(optIdxStr, 10);
        userAnswers[q.key] = q.options[optIdx];

        // Check if this option terminates qualification
        if (q.stopIndex && q.stopIndex.includes(optIdx)) {
          renderExitMessage(q.exitMessage);
          return;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < QUESTIONS.length) {
          renderQuizQuestion();
        } else {
          renderBookingForm();
        }
      }
    });

    // Handle Booking Form Submission
    quizContainer.addEventListener('submit', function (e) {
      if (e.target.id !== 'booking-form') return;
      e.preventDefault();

      const form = e.target;
      const statusBox = document.getElementById('booking-status-msg');
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const location = form.location.value;
      const visitDate = form.visitDate.value.trim();
      const isConfirmed = form.confirmed.checked;

      if (!statusBox) return;

      if (!name || !phone || !visitDate) {
        statusBox.className = 'form-status-msg error';
        statusBox.textContent = 'Please fill in your name, WhatsApp phone number, and visit day.';
        return;
      }

      if (!isConfirmed) {
        statusBox.className = 'form-status-msg error';
        statusBox.textContent = 'Please tick the confirmation checkbox to agree to attend the site visit.';
        return;
      }

      // Generate structured message
      const message =
        `Hello RADSSEKAV Business Organization,\n\n` +
        `I have qualified on your portal and would like to confirm my site visit for the Hephzibah Palm Field Estate at Mile 4 Nkwen, Magaji.\n\n` +
        `• Name: ${name}\n` +
        `• WhatsApp: ${phone}\n` +
        `• Current Location: ${location}\n` +
        `• Selected Offer: ${userAnswers['Offer'] || '400 m² (1,750,000 FCFA)'}\n` +
        `• Purchase Timeline: ${userAnswers['Plans to buy'] || 'Within 2-3 weeks'}\n` +
        `• Funding Readiness: ${userAnswers['Funds'] || 'Ready'}\n` +
        `• Heard about Magaji from: ${userAnswers['Heard about Magaji from'] || 'Online'}\n` +
        `• Real Estate Knowledge: ${userAnswers['Learns about real estate from'] || 'Various'}\n` +
        `• Preferred Visit Date: ${visitDate}\n` +
        `• Attendance: Confirmed\n\n` +
        `Please confirm our meeting point and site guide. Thank you!`;

      const waUrl = createWhatsAppLink(message, WA_PRIMARY);

      statusBox.className = 'form-status-msg success';
      statusBox.innerHTML = `
        <div style="margin-bottom: 12px; font-weight: 700; font-size: 1.05rem;">
          🎉 Your WhatsApp Confirmation is Ready!
        </div>
        <p style="margin-bottom: 14px; color: inherit;">
          Click the button below to open WhatsApp and send your pre-filled site visit request directly to our team.
        </p>
        <a class="btn btn-whatsapp" href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer" style="width: 100%; font-size: 1.05rem;">
          Open WhatsApp &amp; Send Confirmation
        </a>
        <div style="margin-top: 10px; font-size: 0.85rem; opacity: 0.9;">
          Direct lines if needed: <strong>+237 658 345 627</strong> · <strong>+237 676 742 037</strong>
        </div>
      `;
    });
  }

  // Initialize quiz on load
  renderQuizQuestion();

  /* ==========================================================================
     2. Lightbox Modal for Images & Video
     ========================================================================== */
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxContainer = document.getElementById('lightbox-media-container');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close');

  function openLightbox(src, type, captionText) {
    if (!lightbox || !lightboxContainer) return;

    lightboxContainer.innerHTML = '';

    if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.style.maxHeight = '75vh';
      lightboxContainer.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = captionText || 'Enlarged Estate Media';
      lightboxContainer.appendChild(img);
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = captionText || '';
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    if (lightboxContainer) {
      // Pause any running video
      const v = lightboxContainer.querySelector('video');
      if (v) v.pause();
      lightboxContainer.innerHTML = '';
    }
    document.body.style.overflow = '';
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Attach Lightbox triggers to gallery items
  document.querySelectorAll('[data-lightbox-src]').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const src = this.getAttribute('data-lightbox-src');
      const type = this.getAttribute('data-lightbox-type') || 'image';
      const caption = this.getAttribute('data-lightbox-caption') || '';
      openLightbox(src, type, caption);
    });
  });

  /* ==========================================================================
     3. Mobile Navigation Drawer Toggle
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobileDrawer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     4. Pre-select Offer Button Handlers
     ========================================================================== */
  document.querySelectorAll('[data-select-offer]').forEach(btn => {
    btn.addEventListener('click', function () {
      const offer = this.getAttribute('data-select-offer');
      userAnswers['Offer'] = offer;

      // Scroll smoothly to quiz
      const quizSection = document.getElementById('form');
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     5. Respect Reduced Motion Query
     ========================================================================== */
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function syncReducedMotion(matches) {
    document.querySelectorAll('video[autoplay]').forEach(v => {
      if (matches) {
        v.removeAttribute('autoplay');
        v.pause();
      }
    });
  }
  syncReducedMotion(reducedMotionQuery.matches);
  reducedMotionQuery.addEventListener('change', e => syncReducedMotion(e.matches));

})();
