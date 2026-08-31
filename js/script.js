/**
 * StudentHub — Digital Campus Portal
 * Core Client-Side Architecture & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. THEME INITIALIZATION & TOGGLE SYSTEM
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem('studenthub_theme');
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('studenthub_theme', theme);
  };

  // Initial load theme application
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Listen to OS system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('studenthub_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ==========================================
  // 2. MOBILE NAVIGATION MENU (HAMBURGER)
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      hamburgerBtn.classList.toggle('is-active');
      mainNav.classList.toggle('is-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!mainNav.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        mainNav.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 3. ACCESSIBLE FAQ ACCORDIONS
  // ==========================================
  const faqHeaders = document.querySelectorAll('.faq-accordion-header');

  faqHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const body = parentItem.querySelector('.faq-accordion-body');

      // Close all other accordion items for clean single-view
      faqHeaders.forEach((otherHeader) => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          otherHeader.parentElement.classList.remove('is-open');
          const otherBody = otherHeader.parentElement.querySelector('.faq-accordion-body');
          if (otherBody) otherBody.hidden = true;
        }
      });

      // Toggle current item
      header.setAttribute('aria-expanded', String(!isExpanded));
      parentItem.classList.toggle('is-open', !isExpanded);
      if (body) {
        body.hidden = isExpanded;
      }
    });
  });

  // ==========================================
  // 4. PASSWORD VISIBILITY TOGGLE
  // ==========================================
  const passwordToggles = document.querySelectorAll('.password-toggle-btn');

  passwordToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetInput = document.getElementById(targetId);
      const icon = btn.querySelector('.toggle-eye-icon');

      if (targetInput) {
        const isPassword = targetInput.type === 'password';
        targetInput.type = isPassword ? 'text' : 'password';

        if (icon) {
          icon.classList.toggle('fa-eye', isPassword);
          icon.classList.toggle('fa-eye-slash', !isPassword);
        }
      }
    });
  });

  // ==========================================
  // 5. EVENT FILTERING & LIVE SEARCH
  // ==========================================
  const searchInput = document.getElementById('eventSearchInput');
  const filterPills = document.querySelectorAll('.filter-pill');
  const eventCards = document.querySelectorAll('.events-catalog-section .event-card');

  const filterEvents = () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activePill = document.querySelector('.filter-pill.active');
    const selectedCategory = activePill ? activePill.getAttribute('data-category') : 'all';

    eventCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const title = card.querySelector('.event-heading')?.textContent.toLowerCase() || '';
      const snippet = card.querySelector('.event-snippet')?.textContent.toLowerCase() || '';
      const venue = card.querySelector('.event-venue')?.textContent.toLowerCase() || '';

      const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
      const matchesSearch = title.includes(query) || snippet.includes(query) || venue.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', filterEvents);
  }

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      filterEvents();
    });
  });

  // ==========================================
  // 6. INTERACTIVE STAR RATING (FEEDBACK)
  // ==========================================
  const ratingButtons = document.querySelectorAll('.star-rating-btn');
  const ratingValueInput = document.getElementById('ratingValueInput');

  if (ratingButtons.length > 0) {
    ratingButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const rating = index + 1;
        if (ratingValueInput) ratingValueInput.value = String(rating);

        ratingButtons.forEach((b, idx) => {
          b.classList.toggle('active', idx < rating);
        });
      });
    });
  }

  // ==========================================
  // 7. SMOOTH SCROLL FOR IN-PAGE ANCHORS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ==========================================
  // 8. ACCESSIBLE BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.createElement('button');
  backToTopBtn.type = 'button';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.className = 'btn btn-primary';
  backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';

  Object.assign(backToTopBtn.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '44px',
    height: '44px',
    padding: '0',
    borderRadius: '50%',
    zIndex: '999',
    display: 'none',
    boxShadow: 'var(--shadow-lg)'
  });

  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.display = 'inline-flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  console.log('StudentHub initialized cleanly in ' + (htmlRoot.getAttribute('data-theme') || 'light') + ' mode.');
});