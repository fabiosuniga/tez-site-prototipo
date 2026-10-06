/* ============================================================
   TEZ & TEZ — Landing Page Interactivity
   Animations, Scroll Effects, Count-up, Mobile Nav, 3D Tilt, Spotlight
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. NAVBAR — Scroll Effect & Glassmorphism
  // ============================================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavbarScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Run on load


  // ============================================================
  // 2. MOBILE NAV TOGGLE & OVERLAY
  // ============================================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      if (navOverlay) navOverlay.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }


  // ============================================================
  // 3. SCROLL REVEAL — Intersection Observer
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }


  // ============================================================
  // 4. COUNT-UP ANIMATION — Numbers Strip
  // ============================================================
  function animateCountUp(element) {
    const target = element.getAttribute('data-target');
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    const numTarget = parseInt(target, 10);
    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(easedProgress * numTarget);

      element.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = prefix + numTarget + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const countElements = document.querySelectorAll('.number-value[data-target]');

  if (countElements.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    countElements.forEach(el => countObserver.observe(el));
  }


  // ============================================================
  // 5. SMOOTH SCROLL — Anchor Links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  // ============================================================
  // 6. FORM HANDLING & VISUAL FEEDBACK
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Visual feedback
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        submitBtn.textContent = 'Mensagem Enviada! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #059669, #10B981)';
        
        if (formStatus) {
          formStatus.textContent = 'Mensagem enviada com sucesso.';
        }

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          contactForm.reset();
          if (formStatus) formStatus.textContent = '';
        }, 3000);

      }, 1000);

      console.log('Form data:', data);
    });
  }


  // ============================================================
  // 7. ACTIVE NAV LINK — Based on Scroll Position
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

  function highlightNavLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });
  highlightNavLink(); // Run on load





  // ============================================================
  // 9. CARDS SPOTLIGHT EFFECT (Mouse tracking)
  // ============================================================
  const spotCards = document.querySelectorAll('.service-card, .module-card');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    spotCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--spot', `1`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--spot', `0`);
      });
    });
  }


  // ============================================================
  // 10. QUAD DIAGRAM INTERACTION
  // ============================================================
  const conciliationItems = document.querySelectorAll('.conciliation-item');
  const quadNodes = document.querySelectorAll('.quad-node');

  conciliationItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const nodeType = item.getAttribute('data-node');
      quadNodes.forEach(node => {
        if (node.getAttribute('data-node') === nodeType) {
          node.classList.add('active');
          node.style.borderColor = 'var(--amber-500)';
          node.style.transform = 'scale(1.1)';
          node.style.boxShadow = 'var(--shadow-amber)';
          node.style.zIndex = '10';
        } else {
          node.classList.remove('active');
          node.style.borderColor = '';
          node.style.transform = '';
          node.style.boxShadow = '';
          node.style.zIndex = '';
        }
      });
    });
    
    // Suporte para teclado / acessibilidade
    item.addEventListener('focus', () => {
      item.dispatchEvent(new Event('mouseenter'));
    });

    item.addEventListener('mouseleave', () => {
      quadNodes.forEach(node => {
        node.classList.remove('active');
        node.style.borderColor = '';
        node.style.transform = '';
        node.style.boxShadow = '';
        node.style.zIndex = '';
      });
    });
    
    item.addEventListener('blur', () => {
      item.dispatchEvent(new Event('mouseleave'));
    });
  });


  // ============================================================
  // 11. DYNAMIC FOOTER YEAR
  // ============================================================
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

});
