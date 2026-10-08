/* ============================================================
   TEZ & TEZ — Landing Page Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. NAVBAR — Scroll Effect & Glassmorphism
  // ============================================================
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
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
  // 5. FORM HANDLING — Envio real via Web3Forms
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const ACCESS_KEY_PLACEHOLDER = 'SUA_ACCESS_KEY_AQUI';

  // Mensagem de fallback com os canais diretos (texto fixo, sem dados do usuário)
  const FALLBACK_HTML =
    'Não foi possível enviar agora. Fale conosco pelo ' +
    '<a href="https://wa.me/5511996027342" target="_blank" rel="noopener noreferrer">WhatsApp</a> ' +
    'ou pelo e-mail <a href="mailto:contato@te2.com.br">contato@te2.com.br</a>.';

  function setStatus(type, html) {
    if (!formStatus) return;
    formStatus.classList.remove('is-error', 'is-success');
    if (type) formStatus.classList.add(`is-${type}`);
    formStatus.innerHTML = html;
  }

  if (contactForm) {
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;

    function resetButton() {
      submitBtn.classList.remove('is-success');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }

    // O evento "submit" só dispara depois que a validação nativa
    // (campos required, e-mail válido, consentimento LGPD) passou.
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot: se um bot marcou o campo invisível, finge sucesso e descarta
      const honeypot = contactForm.querySelector('[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        contactForm.reset();
        return;
      }

      const accessKey = contactForm.querySelector('[name="access_key"]')?.value;
      if (!accessKey || accessKey === ACCESS_KEY_PLACEHOLDER) {
        console.warn('[Formulário] Configure a Access Key do Web3Forms no index.html (campo "access_key").');
        setStatus('error', FALLBACK_HTML);
        return;
      }

      // Estado "Enviando…" com spinner
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Enviando...';
      setStatus(null, '');

      const payload = Object.fromEntries(new FormData(contactForm).entries());

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.success) {
          throw new Error(result.message || `HTTP ${response.status}`);
        }

        submitBtn.classList.add('is-success');
        submitBtn.textContent = 'Mensagem Enviada! ✓';
        setStatus('success', 'Recebemos sua mensagem. Em breve um especialista entrará em contato.');
        contactForm.reset();

        setTimeout(() => {
          resetButton();
          setStatus(null, '');
        }, 6000);

      } catch (error) {
        console.error('[Formulário] Falha no envio:', error);
        resetButton();
        setStatus('error', FALLBACK_HTML);
      }
    });
  }


  // ============================================================
  // 6. ACTIVE NAV LINK — Based on Scroll Position
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
  // 7. CARDS SPOTLIGHT EFFECT (Mouse tracking)
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
  // 8. CONCILIAÇÃO QUÁDRUPLA — Tooltips (toque/teclado) + Diagrama
  // ============================================================
  const conciliationItems = document.querySelectorAll('.conciliation-item');
  const quadNodes = document.querySelectorAll('.quad-node');
  const canHover = window.matchMedia('(hover: hover)');

  // Acende no diagrama o nó correspondente (ou apaga todos com null)
  function highlightNode(nodeType) {
    quadNodes.forEach(node => {
      node.classList.toggle('is-active', node.dataset.node === nodeType);
    });
  }

  function getOpenItem() {
    return document.querySelector('.conciliation-item.is-open');
  }

  // Abre o tooltip de um item (fecha os demais); null fecha todos
  function setOpenItem(item) {
    conciliationItems.forEach(i => i.classList.toggle('is-open', i === item));
    highlightNode(item ? item.dataset.node : null);
  }

  function toggleItem(item) {
    setOpenItem(item.classList.contains('is-open') ? null : item);
  }

  conciliationItems.forEach(item => {
    // Hover / foco: só destaca o nó no diagrama
    item.addEventListener('mouseenter', () => highlightNode(item.dataset.node));
    item.addEventListener('focus', () => highlightNode(item.dataset.node));

    item.addEventListener('mouseleave', () => {
      // Em desktop, o tooltip some ao tirar o mouse
      if (canHover.matches) item.classList.remove('is-open');
      const open = getOpenItem();
      highlightNode(open ? open.dataset.node : null);
    });

    item.addEventListener('blur', () => {
      const open = getOpenItem();
      highlightNode(open ? open.dataset.node : null);
    });

    // Toque / clique: abre e fecha o tooltip (essencial no celular)
    item.addEventListener('click', () => toggleItem(item));

    // Teclado: Enter/Espaço alterna, Esc fecha
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(item);
      } else if (e.key === 'Escape') {
        setOpenItem(null);
      }
    });
  });

  // Tocar/clicar fora fecha o tooltip aberto
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.conciliation-item')) setOpenItem(null);
  });


  // ============================================================
  // 9. PHONE NUMBER MASK
  // ============================================================
  const phoneInput = document.querySelector('.js-phone-mask');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  }


  // ============================================================
  // 10. FAQ ACCORDION
  // ============================================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const answer = question.nextElementSibling;

      // Close all other accordions
      faqQuestions.forEach(q => {
        if (q !== question) {
          q.setAttribute('aria-expanded', 'false');
          q.nextElementSibling.style.maxHeight = null;
        }
      });

      // Toggle current accordion
      question.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
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
