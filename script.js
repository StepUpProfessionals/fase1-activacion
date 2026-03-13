/* ============================================================
   ENGLISH FOR WORK — Fase 1: Activación Estructural Profesional
   script.js
   ============================================================ */

'use strict';

/* ─── Nav: scroll state ──────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ─── Smooth scroll for anchor links ────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('nav')
        ? document.getElementById('nav').offsetHeight
        : 0;

      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ─── Intersection Observer: fade-in on scroll ───────────────── */
(function initFadeIn() {
  // Add fade-in class to all qualifying elements
  const selectors = [
    '.check-card',
    '.result-item',
    '.modulo-card',
    '.sesion-block',
    '.online-item',
    '.pilar',
    '.ruta-summary',
    '.ruta-extra',
    '.inversion-card',
    '.positioning-block',
    '.why-content',
    '.objetivo-main',
    '.online-note',
    '.section-label',
    '.section-title',
    '.section-intro',
    '.cta-inner',
  ];

  const elements = document.querySelectorAll(selectors.join(', '));

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything immediately
    elements.forEach(function (el) { el.style.opacity = '1'; });
    return;
  }

  elements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.10,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });

  // Stagger children in grids
  const grids = document.querySelectorAll(
    '.check-grid, .results-grid, .modulos-grid, .sesiones-grid, .online-grid, .pilares-grid'
  );

  grids.forEach(function (grid) {
    const children = grid.querySelectorAll('.fade-in');
    children.forEach(function (child, index) {
      child.style.transitionDelay = (index * 0.07) + 's';
    });
  });
})();


/* ─── Active nav highlight on scroll ────────────────────────── */
(function initActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navHeight = document.getElementById('nav')
    ? document.getElementById('nav').offsetHeight + 24
    : 80;

  const onScroll = function () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - navHeight;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav a[href^="#"]').forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();
