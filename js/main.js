/**
 * SOLENNE VILLAS — Main Scripts
 * Intro, hero slideshow, scroll reveal, mobile menu,
 * gallery lightbox, inquiry form, toast
 */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------- */
  /* INTRO                                     */
  /* ---------------------------------------- */
  var introOverlay = document.getElementById('introOverlay');
  var introSkip = document.getElementById('introSkip');
  var mainSite = document.getElementById('mainSite');
  var introTimer = null;
  var finished = false;

  function exitIntro() {
    if (finished) return;
    finished = true;
    if (introTimer) clearTimeout(introTimer);
    introOverlay.classList.add('fade-out');
    if (mainSite) mainSite.classList.add('visible');
    setTimeout(function () { introOverlay.style.display = 'none'; }, 1000);
  }

  if (introSkip) introSkip.addEventListener('click', exitIntro);
  if (prefersReduced) { exitIntro(); }
  else { introTimer = setTimeout(exitIntro, 3000); }

  /* ---------------------------------------- */
  /* HERO SLIDESHOW                            */
  /* ---------------------------------------- */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dot');
  var toggleBtn = document.getElementById('heroToggle');
  var heroSection = document.getElementById('hero');
  var currentSlide = 0;
  var slideInterval = null;
  var isPlaying = true;
  var slideDuration = 5000;

  function goToSlide(index) {
    if (index === currentSlide) return;
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].setAttribute('aria-hidden', 'true');
    dots[currentSlide].classList.remove('active');
    dots[currentSlide].setAttribute('aria-selected', 'false');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    slides[currentSlide].setAttribute('aria-hidden', 'false');
    dots[currentSlide].classList.add('active');
    dots[currentSlide].setAttribute('aria-selected', 'true');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function updateToggleBtn() {
    if (!toggleBtn) return;
    if (isPlaying && !prefersReduced) {
      toggleBtn.classList.add('playing');
      toggleBtn.setAttribute('aria-label', 'Pause slideshow');
    } else {
      toggleBtn.classList.remove('playing');
      toggleBtn.setAttribute('aria-label', 'Play slideshow');
    }
  }

  function startSlideshow() {
    if (slideInterval) clearInterval(slideInterval);
    if (prefersReduced) { stopSlideshow(); return; }
    slideInterval = setInterval(nextSlide, slideDuration);
    isPlaying = true;
    updateToggleBtn();
  }

  function stopSlideshow() {
    if (slideInterval) { clearInterval(slideInterval); slideInterval = null; }
    isPlaying = false;
    updateToggleBtn();
  }

  // Reduced-motion: disable autoplay, disable zoom/pan on slide images
  if (prefersReduced) {
    document.documentElement.classList.add('reduced-motion');
    isPlaying = false;
    updateToggleBtn();
  }

  if (slides.length > 1) {
    if (!prefersReduced) {
      startSlideshow();
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-slide'));
        if (!isNaN(idx)) {
          goToSlide(idx);
          if (!prefersReduced) startSlideshow();
        }
      });
    });

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        if (prefersReduced) return;
        if (isPlaying) stopSlideshow(); else startSlideshow();
      });
    }

    // Scoped arrow-key navigation: only when focus is inside hero area or on dots/toggle
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

      // Ignore if user is focused in a form element
      var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      // Only navigate if focus is inside hero, on hero-controls, on a hero-dot, or on the toggle
      var focusEl = document.activeElement;
      if (!focusEl) return;
      var isValidFocus = focusEl === toggleBtn ||
                         focusEl.classList.contains('hero-dot') ||
                         (heroSection && heroSection.contains(focusEl));
      if (!isValidFocus) return;

      if (e.key === 'ArrowRight') { nextSlide(); if (!prefersReduced) startSlideshow(); }
      if (e.key === 'ArrowLeft') { goToSlide((currentSlide - 1 + slides.length) % slides.length); if (!prefersReduced) startSlideshow(); }
    });
  }

  /* ---------------------------------------- */
  /* SCROLL REVEAL                             */
  /* ---------------------------------------- */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { observer.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  setTimeout(initScrollReveal, prefersReduced ? 100 : 3200);

  /* ---------------------------------------- */
  /* CHAPTER PARALLAX                         */
  /* ---------------------------------------- */
  var chapters = document.querySelectorAll('.chapter');
  if ('IntersectionObserver' in window && chapters.length) {
    var chapterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.2 });
    chapters.forEach(function (c) { chapterObserver.observe(c); });
  }

  /* ---------------------------------------- */
  /* NAVBAR SCROLL STATE                      */
  /* ---------------------------------------- */
  var navbar = document.getElementById('navbar');
  var navTicking = false;
  window.addEventListener('scroll', function () {
    if (!navTicking) {
      requestAnimationFrame(function () {
        if (navbar) {
          if (window.scrollY > 80) navbar.classList.add('scrolled');
          else navbar.classList.remove('scrolled');
        }
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });

  /* ---------------------------------------- */
  /* MOBILE MENU                              */
  /* ---------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) closeMobileMenu(); else openMobileMenu();
    });
    mobileMenu.querySelectorAll('.mobile-link, .mobile-cta').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
        hamburger.focus();
      }
    });
  }

  /* ---------------------------------------- */
  /* SMOOTH SCROLL                            */
  /* ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') { e.preventDefault(); return; }
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
        closeMobileMenu();
      }
    });
  });

  /* ---------------------------------------- */
  /* ACTIVE NAV TRACKING                      */
  /* ---------------------------------------- */
  var allNavLinks = document.querySelectorAll('.nav-links a, .mobile-link');
  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          allNavLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -30% 0px', threshold: 0 });
    document.querySelectorAll('section[id]').forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------------------------------------- */
  /* TOAST SYSTEM                             */
  /* ---------------------------------------- */
  var activeToast = null;
  function showToast(message) {
    if (activeToast) activeToast.remove();
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    document.body.appendChild(toast);
    activeToast = toast;
    void toast.offsetWidth;
    setTimeout(function () {
      toast.style.opacity = '0';
      if (activeToast === toast) activeToast = null;
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 400);
    }, 2500);
  }
  document.querySelectorAll('.footer-soon').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showToast(this.textContent.trim() + ' — coming soon');
    });
  });

  /* ---------------------------------------- */
  /* GALLERY LIGHTBOX                         */
  /* ---------------------------------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImage');
  var lightboxClose = document.getElementById('lightboxClose');
  var lastFocusedItem = null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lastFocusedItem = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    // Focus the close button
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightboxFunc() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    // Return focus to the gallery item that opened it
    if (lastFocusedItem && lastFocusedItem.focus) {
      lastFocusedItem.focus();
      lastFocusedItem = null;
    }
  }

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    var fullSrc = item.getAttribute('data-full');
    var imgEl = item.querySelector('img');
    var altText = imgEl ? imgEl.alt : '';

    item.addEventListener('click', function () {
      openLightbox(fullSrc, altText);
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(fullSrc, altText);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxFunc);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightboxFunc();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightboxFunc();
    }
  });

  /* ---------------------------------------- */
  /* INQUIRY FORM                             */
  /* ---------------------------------------- */
  var inquiryForm = document.getElementById('inquiryForm');
  var formFeedback = document.getElementById('formFeedback');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      this.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ff5f57';
          setTimeout(function () { field.style.borderColor = ''; }, 3000);
        }
      });

      if (!isValid) {
        formFeedback.className = 'form-feedback visible error';
        formFeedback.textContent = 'Please fill in all required fields.';
        return;
      }

      var emailField = this.querySelector('#inqEmail');
      if (emailField && emailField.value.trim()) {
        var emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.value = emailField.value.trim();
        if (!emailInput.checkValidity()) {
          formFeedback.className = 'form-feedback visible error';
          formFeedback.textContent = 'Please enter a valid email address.';
          emailField.style.borderColor = '#ff5f57';
          setTimeout(function () { emailField.style.borderColor = ''; }, 3000);
          return;
        }
      }

      var btn = this.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      formFeedback.className = 'form-feedback';

      setTimeout(function () {
        formFeedback.className = 'form-feedback visible success';
        formFeedback.innerHTML = 'Thank you. This demo inquiry has been received. For a real booking, connect a booking system. If you\'d like, email us directly at <a href="mailto:stay@solennevillas.com">stay@solennevillas.com</a>.';
        btn.textContent = originalText;
        btn.disabled = false;
        setTimeout(function () {
          formFeedback.className = 'form-feedback';
          formFeedback.innerHTML = '';
          inquiryForm.reset();
        }, 8000);
      }, 1200);
    });
  }

})();
