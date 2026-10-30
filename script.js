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
  // 1.5 HERO BACKGROUND VIDEO — Autoplay Seguro, Pausa Offscreen & Acessibilidade
  // ============================================================
  const heroVideo = document.getElementById('hero-bg-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function syncHeroVideoPlayback(isIntersecting = true) {
      if (motionQuery.matches || !isIntersecting) {
        heroVideo.pause();
      } else {
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }

    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => syncHeroVideoPlayback(entry.isIntersecting));
      }, { threshold: 0.05 });
      heroObserver.observe(heroVideo);
    } else {
      syncHeroVideoPlayback(true);
    }

    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', () => syncHeroVideoPlayback(true));
    }

    // Transição suave no looping (Dissolve in/out cinematográfico)
    const FADE_TRIGGER_TIME = 1.2;
    let isFadingOut = false;

    function handleVideoFadeLoop() {
      if (!heroVideo.duration || Number.isNaN(heroVideo.duration)) return;

      const timeLeft = heroVideo.duration - heroVideo.currentTime;

      // Inicia o fade out suave antes do fim do vídeo
      if (timeLeft <= FADE_TRIGGER_TIME && heroVideo.currentTime > 1 && !isFadingOut) {
        isFadingOut = true;
        heroVideo.classList.add('is-fading');
      }

      // Ao reiniciar no segundo 0, faz o fade in gradual
      if (heroVideo.currentTime < 0.6 && isFadingOut) {
        isFadingOut = false;
        heroVideo.classList.remove('is-fading');
      }
    }

    heroVideo.addEventListener('timeupdate', handleVideoFadeLoop);

    heroVideo.addEventListener('seeked', () => {
      if (heroVideo.currentTime < 1 && isFadingOut) {
        isFadingOut = false;
        heroVideo.classList.remove('is-fading');
      }
    });

    heroVideo.addEventListener('ended', () => {
      isFadingOut = false;
      heroVideo.classList.remove('is-fading');
      heroVideo.currentTime = 0;
      const p = heroVideo.play();
      if (p !== undefined) p.catch(() => {});
    });
  }


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
  // 5. FORM HANDLING & UTM TRACKING — Oracle APEX ORDS (OAuth2)
  // ============================================================
  const APEX_ENDPOINT = 'https://t3z.com.br/ords/desenv/site/contato';
  const ORDS_TOKEN_ENDPOINT = 'https://t3z.com.br/ords/desenv/oauth/token';
  // NOTA ARQUITETURAL: No ambiente de produção final, estas credenciais devem
  // ser movidas para um backend proxy (ex: /api/contato ou Serverless Worker).
  // No protótipo atual, viabilizam a validação imediata do fluxo protegido com o ORDS.
  const ORDS_CLIENT_ID = 'IVYtP46ZeC2iiF0sYCXdaQ..';
  const ORDS_CLIENT_SECRET = 'cO3vnCqCNfBnMeyhju8qLw..';

  async function getOrdsBearerToken() {
    try {
      const cached = sessionStorage.getItem('tez_ords_token');
      const expiry = sessionStorage.getItem('tez_ords_token_exp');
      if (cached && expiry && Date.now() < Number(expiry)) {
        return cached;
      }
    } catch (e) { }

    const basicAuth = btoa(`${ORDS_CLIENT_ID}:${ORDS_CLIENT_SECRET}`);
    const params = new URLSearchParams({ grant_type: 'client_credentials' });

    const tokenRes = await fetch(ORDS_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!tokenRes.ok) {
      throw new Error(`Falha na autorização OAuth: HTTP ${tokenRes.status}`);
    }

    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    try {
      const maxAgeMs = ((tokenData.expires_in || 3600) - 60) * 1000;
      sessionStorage.setItem('tez_ords_token', token);
      sessionStorage.setItem('tez_ords_token_exp', (Date.now() + maxAgeMs).toString());
    } catch (e) { }

    return token;
  }

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Captura e persistência de parâmetros UTM da URL (LinkedIn, Ads, Campanhas)
  function initUtmCapture() {
    try {
      const params = new URLSearchParams(window.location.search);
      const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

      utmFields.forEach(key => {
        const value = params.get(key);
        if (value) {
          sessionStorage.setItem(`tez_${key}`, value);
        }
      });

      // Injeta nos campos ocultos do formulário
      utmFields.forEach(key => {
        const input = document.getElementById(key);
        if (input) {
          input.value = sessionStorage.getItem(`tez_${key}`) || '';
        }
      });
    } catch (e) {
      console.warn('[UTM] Não foi possível ler parâmetros:', e);
    }
  }
  initUtmCapture();

  const STATUS_MESSAGES = {
    pt: {
      sending: 'Enviando...',
      successBtn: 'Mensagem enviada! ✓',
      success: 'Mensagem recebida. Um especialista da TEZ & TEZ responde em até um dia útil.',
      error: 'Não foi possível enviar agora. Fale conosco pelo <a href="https://wa.me/5511996027342?text=Ol%C3%A1%2C%20acessei%20o%20site%20da%20TEZ%20%26%20TEZ%20e%20gostaria%20de%20falar%20com%20um%20especialista%20sobre%20gest%C3%A3o%20de%20ativos." target="_blank" rel="noopener noreferrer">WhatsApp</a> ou pelo e-mail <a href="mailto:contato@te2.com.br">contato@te2.com.br</a>.'
    },
    en: {
      sending: 'Sending...',
      successBtn: 'Message sent! ✓',
      success: 'Message received. A TEZ & TEZ specialist will reply within one business day.',
      error: 'Unable to send at this moment. Reach us via <a href="https://wa.me/5511996027342" target="_blank" rel="noopener noreferrer">WhatsApp</a> or email <a href="mailto:contato@te2.com.br">contato@te2.com.br</a>.'
    },
    it: {
      sending: 'Invio in corso...',
      successBtn: 'Messaggio inviato! ✓',
      success: 'Messaggio ricevuto. Uno specialista di TEZ & TEZ risponderà entro un giorno lavorativo.',
      error: 'Impossibile inviare al momento. Contattaci via <a href="https://wa.me/5511996027342" target="_blank" rel="noopener noreferrer">WhatsApp</a> o via email <a href="mailto:contato@te2.com.br">contato@te2.com.br</a>.'
    }
  };

  function getLang() {
    try {
      const saved = localStorage.getItem('tez_lang');
      return ['pt', 'en', 'it'].includes(saved) ? saved : 'pt';
    } catch (e) {
      return 'pt';
    }
  }

  function setStatus(type, html) {
    if (!formStatus) return;
    formStatus.classList.remove('is-error', 'is-success');
    if (type) formStatus.classList.add(`is-${type}`);
    formStatus.innerHTML = html;
  }

  if (contactForm) {
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn ? submitBtn.textContent : 'Enviar mensagem';

    function resetButton() {
      if (!submitBtn) return;
      submitBtn.classList.remove('is-success');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot anti-spam: se preenchido por bot, simula sucesso e descarta
      const honeypot = contactForm.querySelector('[name="website_hp"]');
      if (honeypot && honeypot.value.trim() !== '') {
        contactForm.reset();
        return;
      }

      const lang = getLang();
      const msgs = STATUS_MESSAGES[lang] || STATUS_MESSAGES.pt;

      // Estado "Enviando…" com spinner
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner" aria-hidden="true"></span> ${msgs.sending}`;
      }
      setStatus(null, '');

      // Timestamp ISO para conformidade com a LGPD
      const isoTimestamp = new Date().toISOString();
      const timestampInput = document.getElementById('consentimento_data_hora');
      if (timestampInput) timestampInput.value = isoTimestamp;

      // Monta o payload estruturado para o ORDS
      const payload = {
        nome: contactForm.querySelector('[name="nome"]')?.value.trim() || '',
        empresa: contactForm.querySelector('[name="empresa"]')?.value.trim() || '',
        email: contactForm.querySelector('[name="email"]')?.value.trim() || '',
        telefone: contactForm.querySelector('[name="telefone"]')?.value.trim() || '',
        area_interesse: contactForm.querySelector('[name="area_interesse"]')?.value || '',
        mensagem: contactForm.querySelector('[name="mensagem"]')?.value.trim() || '',
        consentimento_lgpd: contactForm.querySelector('[name="consentimento_lgpd"]')?.checked ? 'Sim' : 'Não',
        consentimento_data_hora: isoTimestamp,
        utm_source: sessionStorage.getItem('tez_utm_source') || '',
        utm_medium: sessionStorage.getItem('tez_utm_medium') || '',
        utm_campaign: sessionStorage.getItem('tez_utm_campaign') || '',
        utm_content: sessionStorage.getItem('tez_utm_content') || ''
      };

      try {
        // Obtém token de autorização Bearer via OAuth2
        const bearerToken = await getOrdsBearerToken();

        const response = await fetch(APEX_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || (result.status && result.status !== 'sucesso')) {
          throw new Error(result.mensagem || `HTTP ${response.status}`);
        }

        // Sucesso visual
        if (submitBtn) {
          submitBtn.classList.add('is-success');
          submitBtn.textContent = msgs.successBtn;
        }
        setStatus('success', msgs.success);
        contactForm.reset();

        // Repreenche UTMs nos campos ocultos após o reset
        initUtmCapture();

        // Dispara evento de conversão no LinkedIn e Analytics (Seção 06)
        trackEvent('form_submission_success', {
          area_interesse: payload.area_interesse,
          origem: payload.utm_source || 'direto'
        });

        try {
          window.dispatchEvent(new CustomEvent('tez:lead_submitted', { detail: payload }));
        } catch (evErr) { }

        setTimeout(() => {
          resetButton();
          setStatus(null, '');
        }, 7000);

      } catch (error) {
        console.error('[Formulário APEX] Falha no envio:', error);
        resetButton();
        setStatus('error', msgs.error);
      }
    });
  }


  // ============================================================
  // 5.5 MEDIÇÃO DE CONVERSÕES E EVENTOS (Seção 06 — LinkedIn & GA4)
  // ============================================================
  function trackEvent(eventName, eventData = {}) {
    // 1. LinkedIn Insight Tag (Partner ID: 560349316)
    try {
      if (typeof window.lintrk === 'function') {
        window.lintrk('track', { conversion_id: 560349316 });
      }
    } catch (e) { }

    // 2. Google Analytics 4 (pronto para quando o ID for configurado)
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventData);
      }
    } catch (e) { }

    // 3. Log para validação no Console
    console.log(`[TEZ Tracking] Evento: ${eventName}`, eventData);
  }

  // Evento 1: Clique em "Agendar demonstração"
  document.querySelectorAll('a[href="#contato"], .btn-primary, #hero-cue-demo').forEach(btn => {
    btn.addEventListener('click', () => {
      trackEvent('cta_demo_click', { label: btn.textContent.trim() });
      const interestSelect = document.getElementById('contact-interest');
      if (interestSelect) {
        interestSelect.value = 'Agendar demonstração';
      }
    });
  });

  // Evento 2: Clique no WhatsApp
  const waBtn = document.getElementById('whatsapp-float');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      trackEvent('whatsapp_click', { channel: 'float_button' });
    });
  }

  // Evento 3: Clique no E-mail corporativo
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('email_click', { email: link.getAttribute('href') });
    });
  });

  // Evento 4: Interação com os cartões dos 7 módulos
  document.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('click', () => {
      const moduleName = card.querySelector('.module-title')?.textContent.trim() || 'modulo';
      trackEvent('module_interaction', { module: moduleName });
    });
  });

  // Evento 5: Rolagem a 75% da página (mostra interesse no conteúdo)
  let scroll75Sent = false;
  window.addEventListener('scroll', () => {
    if (scroll75Sent) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && (window.scrollY / totalHeight) >= 0.75) {
      scroll75Sent = true;
      trackEvent('scroll_75', { depth: '75%' });
    }
  }, { passive: true });


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
  const spotCards = document.querySelectorAll('.service-card, .module-card, .segment-card');
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


  // ============================================================
  // 12. WHATSAPP FLOAT BUTTON — Scroll Visibility
  // ============================================================
  const whatsappFloat = document.getElementById('whatsapp-float');
  if (whatsappFloat) {
    function handleWhatsAppVisibility() {
      whatsappFloat.classList.toggle('is-visible', window.scrollY > 300);
    }
    window.addEventListener('scroll', handleWhatsAppVisibility, { passive: true });
    handleWhatsAppVisibility();
  }

  // ============================================================
  // 13. SELETOR DE IDIOMA EXECUTIVO (PT / EN / IT)
  // Tradução nativa in-memory de alta performance (0ms, sem reload)
  // ============================================================
  const translations = {
    "pt": {
      "nav.platform": "Plataforma TGA",
      "nav.modules": "Módulos",
      "nav.segments": "Segmentos",
      "nav.services": "Serviços",
      "nav.compliance": "Conformidade",
      "nav.contact": "Contato",
      "nav.cta": "Agendar demonstração",
      "nav.lang_mobile": "Idioma / Language",
      "hero.badge": "<span class=\"dot\"></span> TEZ &amp; TEZ · Tecnologia em Gestão de Ativos",
      "hero.title": "Gestão de ativos com dados confiáveis, <span class=\"highlight\">do campo à decisão</span>",
      "hero.desc": "A Plataforma TGA valida as informações da base de ativos e registra seu histórico. A equipe TEZ &amp; TEZ apoia a implantação, as análises e o atendimento às exigências regulatórias.",
      "hero.cta_demo": "Agendar demonstração",
      "hero.cta_platform": "Conhecer a Plataforma TGA",
      "hero.hl1": "100% aderente à regulação ANEEL",
      "hero.hl2": "Conciliação Físico-Contábil",
      "num.since": "Desde",
      "num.years": "Atuação no setor regulado",
      "num.modules": "Módulos na Plataforma TGA",
      "num.segments": "Segmentos regulados",
      "num.aneel": "Credenciada pela ANEEL",
      "about.label": "Quem somos",
      "about.title": "Tecnologia própria e uma equipe que conhece a regulação",
      "about.p1": "A TEZ &amp; TEZ é uma empresa de tecnologia em gestão de ativos. Desenvolve a Plataforma TGA e presta assessoria e consultoria a empresas de infraestrutura regulada: distribuição e transmissão de energia, gás canalizado e saneamento. Desde 1993, a equipe trabalha com inventário, conciliação, bases regulatórias e base de remuneração, do campo à contabilidade.",
      "about.p2": "A base de tudo é a <strong>Conciliação Quádrupla</strong>, entre inventário, projeto, físico e contábil: é ela que identifica sobras, faltas e divergências patrimoniais e sustenta a base de ativos em auditorias e revisões tarifárias.",
      "about.tip_inv": "Levantamento e codificação de todos os ativos em campo conforme o padrão MCPSE, com registro fotográfico e relatórios integrados.",
      "about.tip_proj": "Validação dos dados de projeto de engenharia, para que cada ativo esteja documentado e alinhado com as especificações originais da obra.",
      "about.tip_fis": "Verificação presencial em subestações, usinas e linhas de transmissão para confirmar a existência, localização e estado real de cada ativo.",
      "about.tip_cont": "Batimento dos registros contábeis do ativo imobilizado, identificando sobras, faltas e divergências patrimoniais para conformidade regulatória.",
      "about.quad_center": "Conciliação<br>Quádrupla",
      "about.node_inv": "Inventário",
      "about.node_proj": "Projeto",
      "about.node_fis": "Físico",
      "about.node_cont": "Contábil",
      "seg.label": "Segmentos prioritários",
      "seg.title": "Quatro segmentos, uma base de ativos confiável",
      "seg.subtitle": "Tecnologia em nuvem e assessoria técnica especializada adaptadas às regras de cada órgão regulador.",
      "seg.c1_title": "Distribuição",
      "seg.c1_sub": "Da obra à BDGD, com dados conciliados e validados.",
      "seg.c1_desc": "Módulos da Plataforma TGA para obras, movimentação do imobilizado, conciliação físico-contábil, validação da BDGD e cálculo da BRR, com apoio da equipe TEZ &amp; TEZ.",
      "seg.c1_tag": "Setor Elétrico · ANEEL",
      "seg.c2_title": "Transmissão",
      "seg.c2_sub": "Cadastro e BDIT validados para o envio ao ONS.",
      "seg.c2_desc": "AXON valida a BDIT e apoia o envio ao ONS. ELO concilia o cadastro técnico e os registros contábeis. A equipe acompanha a implantação e as análises.",
      "seg.c2_tag": "Alta Tensão · ONS / ANEEL",
      "seg.c3_title": "Gás canalizado",
      "seg.c3_sub": "Base de ativos da rede de gás com dados confiáveis e histórico rastreável.",
      "seg.c3_desc": "Equipe com experiência em utilities de energia, água e gás, apoiada por tecnologia própria para organizar a base de ativos, do cadastro à contabilidade.",
      "seg.c3_tag": "Utilities de Gás",
      "seg.c4_title": "Saneamento",
      "seg.c4_sub": "Ativos de água e esgoto com dados confiáveis, do campo à decisão.",
      "seg.c4_desc": "Base de ativos conciliada e histórico das movimentações para companhias de saneamento, com apoio às exigências regulatórias do setor.",
      "seg.c4_tag": "Água e Esgoto",
      "plat.label": "Plataforma TGA",
      "plat.title": "Sete módulos para o ciclo do ativo",
      "plat.subtitle": "Plataforma SaaS em nuvem, com arquitetura Oracle, multiusuário e multiempresa. Cada módulo responde a uma etapa da gestão da base de ativos; a equipe TEZ &amp; TEZ acompanha a implantação e as análises.",
      "plat.m1_badge": "01 · Obras",
      "plat.m1_desc": "Gestão de obras. Registra a obra desde o início no padrão que a base de ativos vai exigir, com validação regulatória.",
      "plat.m1_t1": "Gestão de Obras",
      "plat.m1_t2": "Padrão Regulatório",
      "plat.m2_badge": "02 · Imobilizado",
      "plat.m2_desc": "Movimentação do imobilizado. Rastreia adições, baixas e transferências do ativo imobilizado em serviço.",
      "plat.m2_t1": "Adições &amp; Baixas",
      "plat.m2_t2": "Ativo em Serviço",
      "plat.m3_badge": "03 · Conciliação",
      "plat.m3_desc": "Conciliação físico-contábil. Concilia campo, cadastro e contabilidade e mantém o histórico das divergências tratadas, com relatórios de conciliação.",
      "plat.m3_t1": "Físico × Contábil",
      "plat.m3_t2": "Relatórios de Conciliação",
      "plat.m4_badge": "04 · BDGD",
      "plat.m4_desc": "Validação da BDGD. Valida a base geográfica antes do envio à ANEEL, com checagem de entidades.",
      "plat.m4_t1": "Validação BDGD",
      "plat.m4_t2": "Checagem ANEEL",
      "plat.m5_badge": "05 · BDIT / ONS",
      "plat.m5_desc": "Hub ONS/BDIT. Valida a BDIT e apoia o envio ao ONS, com exportação em vários formatos.",
      "plat.m5_t1": "Validação BDIT",
      "plat.m5_t2": "Hub ONS",
      "plat.m6_badge": "06 · BRR",
      "plat.m6_desc": "Cálculo da BRR. Calcula a base de remuneração regulatória com memória auditável e apoia a elaboração de laudos.",
      "plat.m6_t1": "Base de Remuneração",
      "plat.m6_t2": "Memória Auditável",
      "plat.m6_t3": "Laudos BRR",
      "plat.m7_badge": "Módulo Transversal · Automação Geral",
      "plat.m7_desc": "Automação de fluxos. Automatiza fluxos de trabalho entre as etapas, com rastreamento de tarefas e gestão de evidências.",
      "plat.m7_t1": "Automação de Fluxos",
      "plat.m7_t2": "Rastreamento de Tarefas",
      "plat.m7_t3": "Gestão de Evidências",
      "plat.m7_t4": "Integração de Etapas",
      "serv.label": "Assessoria e consultoria",
      "serv.title": "Assessoria e consultoria em gestão de ativos",
      "serv.subtitle": "Serviços que preparam a base de ativos e sustentam a plataforma: do levantamento de campo ao atendimento à fiscalização.",
      "serv.s1_title": "Inventário físico e levantamento de campo",
      "serv.s1_desc": "Vistoria técnica em subestações, usinas e linhas, com codificação MCPSE, registro fotográfico e relatórios integrados. Garantia de acurácia para a regularização dos dados.",
      "serv.s2_title": "Conciliação Quádrupla",
      "serv.s2_desc": "Alinhamento entre inventário, projeto, físico e contábil para identificar sobras, faltas e divergências patrimoniais. Base pronta para auditorias e revisões tarifárias.",
      "serv.s3_title": "Apoio à fiscalização da ANEEL (SFF)",
      "serv.s3_desc": "Suporte técnico nas fiscalizações, com foco na Base de Remuneração Regulatória (BRR), organização das evidências e atendimento às exigências do processo.",
      "serv.s4_title": "Gestão de dados e informações",
      "serv.s4_desc": "Diagnóstico e auditoria de bancos de dados de ativos, com governança e rastreabilidade das informações.",
      "serv.banner": "Consultoria regulatória estratégica e assessoria em gestão da BRR, conformidade de ativos e cadastro operacional, conforme o escopo de cada proposta.",
      "comp.label": "Conformidade",
      "comp.title": "Normativos que a plataforma e os serviços seguem",
      "comp.subtitle": "A Plataforma TGA e os serviços da TEZ &amp; TEZ seguem o Manual de Controle Patrimonial do Setor Elétrico (MCPSE) da ANEEL e os normativos aplicáveis a cada segmento.",
      "comp.compliance_text": "Fomos credenciadas na ANEEL para elaboração de laudos da Base de Remuneração Regulatória (BRR) e apoio à fiscalização (SFF), a TEZ & TEZ garante total aderência ao Manual de Controle Patrimonial do Setor Elétrico (MCPSE), a PRORET, ao PRODIST (BDGD – DDA) da ANEEL e BDIT (DDO) da ONS em todos os seus processos com suas soluções",
      "faq.label": "Perguntas frequentes",
      "faq.title": "Perguntas frequentes",
      "faq.subtitle": "Respostas diretas sobre metodologia, integração e atendimento regulatório.",
      "faq.q1": "O que é a Conciliação Quádrupla?",
      "faq.a1": "É o alinhamento entre o inventário físico de campo, as especificações de projeto, a situação encontrada em campo e os registros contábeis. Ela identifica sobras, faltas e divergências patrimoniais e deixa a base de ativos pronta para auditorias e revisões tarifárias.",
      "faq.q2": "Quais normativos a Plataforma TGA e os serviços atendem?",
      "faq.a2": "O Manual de Controle Patrimonial do Setor Elétrico (MCPSE), o PRODIST, o PRORET, as exigências da ANEEL para a Base de Remuneração Regulatória (BRR) e para a fiscalização, e os procedimentos do ONS para a BDIT.",
      "faq.q3": "A Plataforma TGA se integra ao nosso ERP (SAP, Oracle)?",
      "faq.a3": "Sim. A plataforma roda em nuvem com arquitetura Oracle e se integra aos principais ERPs do mercado, como SAP e Oracle. O escopo da integração é definido com a equipe de TI do cliente em cada projeto.",
      "cont.label": "Fale conosco",
      "cont.title": "Fale com um especialista",
      "cont.subtitle": "Agende uma demonstração da Plataforma TGA e veja como organizar a base de ativos da sua empresa, do campo à decisão.",
      "cont.email_label": "E-mail",
      "cont.email_sub": "Resposta em até um dia útil",
      "cont.site_label": "Website",
      "cont.addr_label": "Endereço",
      "cont.map_btn": "Traçar rota",
      "cont.form_name": "Nome",
      "cont.ph_name": "Seu nome completo",
      "cont.form_company": "Empresa",
      "cont.ph_company": "Nome da concessionária ou empresa",
      "cont.form_email": "E-mail",
      "cont.form_phone": "Telefone",
      "cont.form_interest": "Área de interesse",
      "cont.opt_default": "Selecione a área de interesse",
      "cont.opt_demo": "Agendar demonstração",
      "cont.opt_1": "Plataforma TGA",
      "cont.opt_2": "Assessoria e consultoria",
      "cont.opt_3": "Laudo de BRR e fiscalização",
      "cont.opt_4": "Outro assunto",
      "cont.form_msg": "Mensagem",
      "cont.ph_msg": "Conte-nos sobre sua necessidade...",
      "cont.form_consent": "Concordo com o tratamento dos meus dados para retorno deste contato, conforme a <a href=\"politica-de-privacidade.html\" target=\"_blank\" rel=\"noopener\">Política de Privacidade</a>.",
      "cont.form_submit": "Enviar mensagem",
      "foot.inst": "Institucional",
      "foot.about": "Sobre",
      "foot.segments": "Segmentos",
      "foot.platform": "Plataforma TGA",
      "foot.services": "Serviços",
      "foot.support": "Suporte e Legal",
      "foot.faq": "Perguntas frequentes",
      "foot.contact": "Contato",
      "foot.compliance": "Conformidade",
      "foot.privacy": "Política de privacidade",
      "foot.copy": "© <span id=\"current-year\">2026</span> TEZ &amp; TEZ · Tecnologia em Gestão de Ativos. Todos os direitos reservados.",
      "wa.float": "Fale conosco",
      "cookie.text": "Utilizamos cookies necessários para o funcionamento da página e analíticos (LinkedIn Insight Tag) para mensurar acessos corporativos. Saiba mais em nossa <a href=\"politica-de-privacidade.html\">Política de Privacidade</a>.",
      "cookie.essential": "Apenas essenciais",
      "cookie.accept": "Aceitar todos"
    },
    "en": {
      "nav.platform": "TGA Platform",
      "nav.modules": "Modules",
      "nav.segments": "Sectors",
      "nav.services": "Services",
      "nav.compliance": "Compliance",
      "nav.contact": "Contact",
      "nav.cta": "Schedule a Demo",
      "nav.lang_mobile": "Language",
      "hero.badge": "<span class=\"dot\"></span> TEZ &amp; TEZ · Asset Management Technology",
      "hero.title": "Asset management with reliable data, <span class=\"highlight\">from field to decision</span>",
      "hero.desc": "The TGA Platform validates asset base information and tracks its lifecycle. The TEZ &amp; TEZ team supports deployment, analytics, and regulatory compliance.",
      "hero.cta_demo": "Schedule a Demo",
      "hero.cta_platform": "Explore the TGA Platform",
      "hero.hl1": "100% compliant with ANEEL regulations",
      "hero.hl2": "Physical-Accounting Reconciliation",
      "num.since": "Since",
      "num.years": "Years in the regulated sector",
      "num.modules": "Modules in the TGA Platform",
      "num.segments": "Regulated sectors",
      "num.aneel": "Accredited by ANEEL",
      "about.label": "About Us",
      "about.title": "Proprietary technology and a team with deep regulatory expertise",
      "about.p1": "TEZ &amp; TEZ is an asset management technology company. We develop the TGA Platform and provide advisory and consulting services to regulated infrastructure utilities: power distribution and transmission, piped gas, and water/sanitation. Since 1993, our team has delivered field-to-accounting inventory, reconciliation, regulatory asset bases, and tariff compliance.",
      "about.p2": "The foundation of our approach is <strong>Quadruple Reconciliation</strong>—aligning inventory, engineering design, physical verification, and accounting records: eliminating asset discrepancies and defending the asset base during regulatory audits and tariff reviews.",
      "about.tip_inv": "On-site surveying and tagging of all field assets according to MCPSE regulatory standards, with photographic records and integrated reports.",
      "about.tip_proj": "Validation of engineering project data, ensuring every asset is thoroughly documented and matches original construction specifications.",
      "about.tip_fis": "On-site physical inspection at substations, power plants, and transmission lines to confirm presence, location, and operational condition.",
      "about.tip_cont": "Reconciliation of fixed asset accounting ledgers, identifying surplus, missing, or misclassified items for complete regulatory compliance.",
      "about.quad_center": "Quadruple<br>Reconciliation",
      "about.node_inv": "Inventory",
      "about.node_proj": "Project",
      "about.node_fis": "Physical",
      "about.node_cont": "Accounting",
      "seg.label": "Priority Sectors",
      "seg.title": "Four sectors, one reliable asset base",
      "seg.subtitle": "Cloud technology and specialized technical consulting tailored to the specific rules of each regulatory body.",
      "seg.c1_title": "Distribution",
      "seg.c1_sub": "From construction to BDGD, with reconciled and validated data.",
      "seg.c1_desc": "TGA Platform modules for construction tracking, asset movements, physical-accounting reconciliation, BDGD validation, and RAB/BRR calculation, backed by TEZ &amp; TEZ experts.",
      "seg.c1_tag": "Electric Sector · ANEEL",
      "seg.c2_title": "Transmission",
      "seg.c2_sub": "Asset registry and BDIT validated for ONS regulatory reporting.",
      "seg.c2_desc": "AXON validates BDIT transmission databases and supports ONS submission. ELO reconciles technical asset registries with financial ledgers. Our team assists deployment and analysis.",
      "seg.c2_tag": "High Voltage · ONS / ANEEL",
      "seg.c3_title": "Piped Gas",
      "seg.c3_sub": "Gas distribution network asset base with reliable data and auditable history.",
      "seg.c3_desc": "Experienced team across energy, water, and gas utilities, backed by proprietary software to structure the asset base from physical tagging to accounting.",
      "seg.c3_tag": "Gas Utilities",
      "seg.c4_title": "Sanitation",
      "seg.c4_sub": "Water and wastewater assets with trusted data, from field to decision.",
      "seg.c4_desc": "Reconciled asset bases and full movement history for water and wastewater utilities, supporting sector-specific regulatory standards.",
      "seg.c4_tag": "Water & Wastewater",
      "plat.label": "TGA Platform",
      "plat.title": "Seven modules for the complete asset lifecycle",
      "plat.subtitle": "Cloud SaaS platform built on Oracle architecture, multi-user and multi-company. Each module addresses a specific phase of asset base management; TEZ &amp; TEZ provides implementation and analytics support.",
      "plat.m1_badge": "01 · Construction",
      "plat.m1_desc": "Construction management. Records work in progress from day one according to regulatory standards, ensuring seamless capital addition.",
      "plat.m1_t1": "Construction Management",
      "plat.m1_t2": "Regulatory Standard",
      "plat.m2_badge": "02 · Fixed Assets",
      "plat.m2_desc": "Fixed asset movements. Tracks additions, retirements, and transfers of operating assets with full traceability.",
      "plat.m2_t1": "Additions &amp; Retirements",
      "plat.m2_t2": "Assets in Service",
      "plat.m3_badge": "03 · Reconciliation",
      "plat.m3_desc": "Physical-accounting reconciliation. Harmonizes field data, asset records, and general ledgers with complete discrepancy audit trails.",
      "plat.m3_t1": "Physical × Accounting",
      "plat.m3_t2": "Reconciliation Reports",
      "plat.m4_badge": "04 · BDGD",
      "plat.m4_desc": "BDGD validation. Validates geographic distribution databases prior to ANEEL submission, verifying topological entities.",
      "plat.m4_t1": "BDGD Validation",
      "plat.m4_t2": "ANEEL Checking",
      "plat.m5_badge": "05 · BDIT / ONS",
      "plat.m5_desc": "ONS/BDIT Hub. Validates transmission asset databases and manages ONS data feeds with multi-format export capabilities.",
      "plat.m5_t1": "BDIT Validation",
      "plat.m5_t2": "ONS Data Hub",
      "plat.m6_badge": "06 · RAB / BRR",
      "plat.m6_desc": "Regulatory Asset Base (RAB/BRR) computation. Calculates rate base values with transparent auditable calculation logs for appraisal reports.",
      "plat.m6_t1": "Regulatory Asset Base",
      "plat.m6_t2": "Auditable Calculation Log",
      "plat.m6_t3": "RAB Appraisal Reports",
      "plat.m7_badge": "Cross-Functional Module · General Automation",
      "plat.m7_desc": "Workflow automation. Connects multi-stage operational processes with real-time task tracking and auditable evidence management.",
      "plat.m7_t1": "Workflow Automation",
      "plat.m7_t2": "Task Tracking",
      "plat.m7_t3": "Evidence Management",
      "plat.m7_t4": "Process Integration",
      "serv.label": "Advisory & Consulting",
      "serv.title": "Asset management advisory and consulting services",
      "serv.subtitle": "Professional services that structure asset bases and empower the platform: from physical field surveying to regulatory audit defense.",
      "serv.s1_title": "Physical inventory and field surveying",
      "serv.s1_desc": "Technical on-site surveys in substations, plants, and transmission lines, with MCPSE tagging, photographic records, and integrated reports. Guaranteed data accuracy.",
      "serv.s2_title": "Quadruple Reconciliation",
      "serv.s2_desc": "Comprehensive synchronization across inventory, engineering design, physical verification, and financial ledgers. Leaves asset databases audit-ready for tariff reviews.",
      "serv.s3_title": "ANEEL audit defense support (SFF)",
      "serv.s3_desc": "Technical defense during regulatory audits, focusing on Regulatory Asset Base (RAB/BRR) validation, evidence structuring, and inquiry responses.",
      "serv.s4_title": "Data and information governance",
      "serv.s4_desc": "Diagnostic audit of asset databases, establishing solid data governance and end-to-end information traceability.",
      "serv.banner": "Strategic regulatory consulting and advisory in RAB/BRR management, asset compliance, and operational registry, tailored to each utility's scope.",
      "comp.label": "Compliance",
      "comp.title": "Regulatory standards adhered to by our platform and services",
      "comp.subtitle": "The TGA Platform and TEZ &amp; TEZ services adhere strictly to ANEEL's Electric Sector Asset Control Manual (MCPSE) and all sector-specific regulations.",
      "comp.compliance_text": "Accredited by ANEEL for preparing Regulatory Asset Base (BRR) valuation reports and inspection defense (SFF), TEZ & TEZ guarantees total compliance with the Electric Sector Asset Control Manual (MCPSE), PRORET, ANEEL's PRODIST (BDGD - DDA), and ONS's BDIT (DDO) across all its processes and solutions.",
      "faq.label": "Frequently Asked Questions",
      "faq.title": "Frequently Asked Questions",
      "faq.subtitle": "Straightforward answers regarding methodology, software integration, and regulatory compliance.",
      "faq.q1": "What is Quadruple Reconciliation?",
      "faq.a1": "It is the rigorous synchronization between on-site physical inventory, engineering designs, verified field conditions, and accounting ledgers. It identifies surpluses, shortages, and variances, leaving the asset base fully prepared for audits and tariff reviews.",
      "faq.q2": "Which regulatory standards do the TGA Platform and services comply with?",
      "faq.a2": "The Electric Sector Asset Control Manual (MCPSE), PRODIST, PRORET, ANEEL requirements for the Regulatory Asset Base (RAB/BRR) and audit defense, as well as ONS procedures for transmission BDIT databases.",
      "faq.q3": "Does the TGA Platform integrate with our enterprise ERP (SAP, Oracle)?",
      "faq.a3": "Yes. The platform operates on a secure Oracle cloud architecture and connects with major ERPs such as SAP and Oracle EBS. Integration specifications are customized alongside the client's IT team.",
      "cont.label": "Contact Us",
      "cont.title": "Speak with a Specialist",
      "cont.subtitle": "Schedule a demonstration of the TGA Platform and discover how to organize your utility's asset base, from field to decision.",
      "cont.email_label": "Email",
      "cont.email_sub": "Response within one business day",
      "cont.site_label": "Website",
      "cont.addr_label": "Address",
      "cont.map_btn": "Get Directions",
      "cont.form_name": "Full Name",
      "cont.ph_name": "Your full name",
      "cont.form_company": "Company",
      "cont.ph_company": "Utility or company name",
      "cont.form_email": "Email",
      "cont.form_phone": "Phone",
      "cont.form_interest": "Area of Interest",
      "cont.opt_default": "Select your area of interest",
      "cont.opt_demo": "Schedule a Demo",
      "cont.opt_1": "TGA Platform",
      "cont.opt_2": "Advisory and consulting",
      "cont.opt_3": "RAB appraisal & audit support",
      "cont.opt_4": "Other topics",
      "cont.form_msg": "Message",
      "cont.ph_msg": "Tell us about your requirements...",
      "cont.form_consent": "I agree to the processing of my contact information in accordance with the <a href=\"politica-de-privacidade.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
      "cont.form_submit": "Send Message",
      "foot.inst": "Corporate",
      "foot.about": "About",
      "foot.segments": "Sectors",
      "foot.platform": "TGA Platform",
      "foot.services": "Services",
      "foot.support": "Support & Legal",
      "foot.faq": "FAQ",
      "foot.contact": "Contact",
      "foot.compliance": "Compliance",
      "foot.privacy": "Privacy policy",
      "foot.copy": "© <span id=\"current-year\">2026</span> TEZ &amp; TEZ · Technology in Asset Management. All rights reserved.",
      "wa.float": "Contact us",
      "cookie.text": "We use essential cookies to ensure proper operation and analytical cookies (LinkedIn Insight Tag) to measure business traffic. Learn more in our <a href=\"politica-de-privacidade.html\">Privacy Policy</a>.",
      "cookie.essential": "Essential only",
      "cookie.accept": "Accept all"
    },
    "it": {
      "nav.platform": "Piattaforma TGA",
      "nav.modules": "Moduli",
      "nav.segments": "Settori",
      "nav.services": "Servizi",
      "nav.compliance": "Conformità",
      "nav.contact": "Contatto",
      "nav.cta": "Prenota una Demo",
      "nav.lang_mobile": "Lingua",
      "hero.badge": "<span class=\"dot\"></span> TEZ &amp; TEZ · Tecnologia nella Gestione degli Asset",
      "hero.title": "Gestione degli asset con dati affidabili, <span class=\"highlight\">dal campo alla decisione</span>",
      "hero.desc": "La Piattaforma TGA valida i dati della base asset e ne traccia lo storico. Il team TEZ &amp; TEZ supporta implementazione, analisi e conformità normativa.",
      "hero.cta_demo": "Prenota una Demo",
      "hero.cta_platform": "Scopri la Piattaforma TGA",
      "hero.hl1": "100% conforme alle normative ANEEL",
      "hero.hl2": "Riconciliazione Fisico-Contabile",
      "num.since": "Dal",
      "num.years": "Anni nel settore regolamentato",
      "num.modules": "Moduli nella Piattaforma TGA",
      "num.segments": "Settori regolamentati",
      "num.aneel": "Accreditata da ANEEL",
      "about.label": "Chi Siamo",
      "about.title": "Tecnologia proprietaria e un team con profonda competenza normativa",
      "about.p1": "TEZ &amp; TEZ è un'azienda di tecnologia nella gestione degli asset. Sviluppa la Piattaforma TGA e fornisce consulenza a società di infrastrutture regolamentate: distribuzione e trasmissione di energia, gas canalizzato e servizi idrici. Dal 1993, il nostro team opera su inventario, riconciliazione, basi regolatorie e remunerazione del capitale, dal campo alla contabilità.",
      "about.p2": "Il fondamento del nostro approccio è la <strong>Riconciliazione Quadrupla</strong>—tra inventario, progetto, consistenza fisica e scritture contabili: identifica eccedenze, mancanze e incongruenze patrimoniali, difendendo la base asset durante audit e revisioni tariffarie.",
      "about.tip_inv": "Censimento e codifica di tutti gli asset sul campo secondo lo standard MCPSE, con rilievo fotografico e report integrati.",
      "about.tip_proj": "Validazione dei dati di progetto ingegneristico, assicurando che ogni asset sia documentato e conforme alle specifiche originali dell'opera.",
      "about.tip_fis": "Verifica fisica in loco presso sottostazioni, centrali e linee per confermare esistenza, geolocalizzazione e stato effettivo di ciascun asset.",
      "about.tip_cont": "Riconciliazione delle scritture contabili dei cespiti, identificando eccedenze, ammanchi e discrepanze per la piena conformità normativa.",
      "about.quad_center": "Riconciliazione<br>Quadrupla",
      "about.node_inv": "Inventario",
      "about.node_proj": "Progetto",
      "about.node_fis": "Fisico",
      "about.node_cont": "Contabile",
      "seg.label": "Settori Prioritari",
      "seg.title": "Quattro settori, una base asset affidabile",
      "seg.subtitle": "Tecnologia cloud e consulenza tecnica specializzata adattate alle regole specifiche di ciascun ente regolatore.",
      "seg.c1_title": "Distribuzione",
      "seg.c1_sub": "Dall'opera alla BDGD, con dati riconciliati e validati.",
      "seg.c1_desc": "Moduli della Piattaforma TGA per opere, movimentazione cespiti, riconciliazione fisico-contabile, validazione BDGD e calcolo BRR, supportati dal team TEZ &amp; TEZ.",
      "seg.c1_tag": "Settore Elettrico · ANEEL",
      "seg.c2_title": "Trasmissione",
      "seg.c2_sub": "Anagrafica e BDIT validate per la trasmissione all'ONS.",
      "seg.c2_desc": "AXON valida il database BDIT e supporta l'invio all'ONS. ELO riconcilia l'anagrafica tecnica con le scritture contabili. Il nostro team affianca implementazione e analisi.",
      "seg.c2_tag": "Alta Tensione · ONS / ANEEL",
      "seg.c3_title": "Gas Canalizzato",
      "seg.c3_sub": "Base asset della rete gas con dati affidabili e storico tracciabile.",
      "seg.c3_desc": "Team con consolidata esperienza in utilities di energia, acqua e gas, supportato da tecnologia proprietaria per strutturare la base asset, dal censimento alla contabilità.",
      "seg.c3_tag": "Utilities del Gas",
      "seg.c4_title": "Servizio Idrico",
      "seg.c4_sub": "Asset idrici e fognari con dati affidabili, dal campo alla decisione.",
      "seg.c4_desc": "Base asset riconciliata e storico delle movimentazioni per gestori idrici, a supporto dei requisiti normativi del settore.",
      "seg.c4_tag": "Acqua e Rifiuti",
      "plat.label": "Piattaforma TGA",
      "plat.title": "Sette moduli per il ciclo di vita dell'asset",
      "plat.subtitle": "Piattaforma SaaS in cloud con architettura Oracle, multiutente e multiaziendale. Ciascun modulo risponde a una fase della gestione della base asset; il team TEZ &amp; TEZ affianca implementazione e analisi.",
      "plat.m1_badge": "01 · Opere",
      "plat.m1_desc": "Gestione delle opere. Registra i cantieri fin dall'inizio nello standard normativo richiesto dalla base asset, con validazione regolatoria.",
      "plat.m1_t1": "Gestione Opere",
      "plat.m1_t2": "Standard Regolatorio",
      "plat.m2_badge": "02 · Cespiti",
      "plat.m2_desc": "Movimentazione cespiti. Traccia aggiunte, dismissioni e trasferimenti dei beni patrimoniali in esercizio.",
      "plat.m2_t1": "Aggiunte e Dismissioni",
      "plat.m2_t2": "Beni in Esercizio",
      "plat.m3_badge": "03 · Riconciliazione",
      "plat.m3_desc": "Riconciliazione fisico-contabile. Riconcilia campo, anagrafica e contabilità mantenendo lo storico delle incongruenze risolte con reportistica dedicata.",
      "plat.m3_t1": "Fisico × Contabile",
      "plat.m3_t2": "Report di Riconciliazione",
      "plat.m4_badge": "04 · BDGD",
      "plat.m4_desc": "Validazione BDGD. Valida la base geografica prima dell'invio ad ANEEL, con controllo di consistenza delle entità.",
      "plat.m4_t1": "Validazione BDGD",
      "plat.m4_t2": "Verifica ANEEL",
      "plat.m5_badge": "05 · BDIT / ONS",
      "plat.m5_desc": "Hub ONS/BDIT. Valida il database BDIT e gestisce l'invio all'ONS con funzionalità di esportazione multiformato.",
      "plat.m5_t1": "Validazione BDIT",
      "plat.m5_t2": "Hub ONS",
      "plat.m6_badge": "06 · BRR",
      "plat.m6_desc": "Calcolo della BRR. Calcola la base di remunerazione regolatoria con memoria di calcolo auditabile a supporto delle perizie di stima.",
      "plat.m6_t1": "Base di Remunerazione",
      "plat.m6_t2": "Memoria Auditabile",
      "plat.m6_t3": "Perizie BRR",
      "plat.m7_badge": "Modulo Trasversale · Automazione Generale",
      "plat.m7_desc": "Automazione dei flussi. Connette i processi operativi tra le varie fasi con tracciamento delle attività e gestione delle evidenze probatorie.",
      "plat.m7_t1": "Automazione Flussi",
      "plat.m7_t2": "Tracciamento Attività",
      "plat.m7_t3": "Gestione Evidenze",
      "plat.m7_t4": "Integrazione Fasi",
      "serv.label": "Consulenza e Supporto",
      "serv.title": "Consulenza strategica nella gestione degli asset",
      "serv.subtitle": "Servizi professionali che strutturano la base asset e potenziano la piattaforma: dai rilievi sul campo al supporto ispettivo.",
      "serv.s1_title": "Inventario fisico e rilievi sul campo",
      "serv.s1_desc": "Ispezioni tecniche in sottostazioni, impianti e linee con codifica MCPSE, rilievi fotografici e reportistica integrata. Accuratezza garantita per la regolarizzazione dei dati.",
      "serv.s2_title": "Riconciliazione Quadrupla",
      "serv.s2_desc": "Allineamento tra inventario, progetto, consistenza fisica e contabilità per identificare eccedenze e ammanchi. Base asset pronta per revisioni tariffarie e audit.",
      "serv.s3_title": "Supporto ispettivo ANEEL (SFF)",
      "serv.s3_desc": "Assistenza tecnica durante le ispezioni regolatorie, con focus sulla Base di Remunerazione (BRR), fascicolazione probatoria e riscontro ai rilievi.",
      "serv.s4_title": "Gestione e governance dei dati",
      "serv.s4_desc": "Diagnostica e audit delle banche dati patrimoniali, con introduzione di governance e tracciabilità integrale delle informazioni.",
      "serv.banner": "Consulenza regolatoria strategica e supporto nella gestione della BRR, conformità degli asset e anagrafica tecnica, calibrati sugli obiettivi specifici.",
      "comp.label": "Conformità",
      "comp.title": "Standard normativi a cui rispondono piattaforma e servizi",
      "comp.subtitle": "La Piattaforma TGA e i servizi TEZ &amp; TEZ rispettano rigorosamente il Manuale di Controllo Patrimoniale del Settore Elettrico (MCPSE) di ANEEL e le normative applicabili.",
      "comp.compliance_text": "Accreditata presso ANEEL per la redazione di perizie della Base di Remunerazione Regolatoria (BRR) e supporto ispettivo (SFF), TEZ & TEZ garantisce la piena conformità al Manuale di Controllo Patrimoniale del Settore Elettrico (MCPSE), a PRORET, a PRODIST (BDGD – DDA) di ANEEL e a BDIT (DDO) di ONS in tutti i suoi processi e soluzioni.",
      "faq.label": "Domande Frequenti",
      "faq.title": "Domande Frequenti",
      "faq.subtitle": "Risposte chiare su metodologia, integrazione software e adempimenti normativi.",
      "faq.q1": "Cos'è la Riconciliazione Quadrupla?",
      "faq.a1": "È l'allineamento rigoroso tra censimento fisico sul campo, specifiche di progetto, consistenza effettiva e scritture contabili. Rileva eccedenze, ammanchi e discrepanze, predisponendo la base asset per verifiche e revisioni tariffarie.",
      "faq.q2": "A quali standard normativi rispondono la Piattaforma TGA e i servizi?",
      "faq.a2": "Il Manuale di Controllo Patrimoniale del Settore Elettrico (MCPSE), il PRODIST, il PRORET, i requisiti ANEEL per la Base di Remunerazione Regolatoria (BRR) e per le ispezioni, nonché le procedure ONS per il BDIT.",
      "faq.q3": "La Piattaforma TGA si integra con il nostro ERP (SAP, Oracle)?",
      "faq.a3": "Sì. La piattaforma opera su cloud con architettura Oracle e si integra con i principali ERP, tra cui SAP e Oracle. L'architettura di integrazione viene concordata con il team IT del cliente in ogni progetto.",
      "cont.label": "Contattaci",
      "cont.title": "Parla con uno Specialista",
      "cont.subtitle": "Prenota una dimostrazione della Piattaforma TGA e scopri come organizzare la base asset della tua azienda, dal campo alla decisione.",
      "cont.email_label": "E-mail",
      "cont.email_sub": "Risposta entro un giorno lavorativo",
      "cont.site_label": "Sito Web",
      "cont.addr_label": "Indirizzo",
      "cont.map_btn": "Indicazioni Stradali",
      "cont.form_name": "Nome Completo",
      "cont.ph_name": "Il tuo nome completo",
      "cont.form_company": "Azienda",
      "cont.ph_company": "Nome della concessionaria o azienda",
      "cont.form_email": "E-mail",
      "cont.form_phone": "Telefono",
      "cont.form_interest": "Area di Interesse",
      "cont.opt_default": "Seleziona l'area di interesse",
      "cont.opt_demo": "Prenota una Demo",
      "cont.opt_1": "Piattaforma TGA",
      "cont.opt_2": "Consulenza e supporto",
      "cont.opt_3": "Perizia BRR e supporto ispezioni",
      "cont.opt_4": "Altro argomento",
      "cont.form_msg": "Messaggio",
      "cont.ph_msg": "Descrivi le tue esigenze...",
      "cont.form_consent": "Acconsento al trattamento dei miei dati personali per essere ricontattato, ai sensi della <a href=\"politica-de-privacidade.html\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
      "cont.form_submit": "Invia Messaggio",
      "foot.inst": "Istituzionale",
      "foot.about": "Chi Siamo",
      "foot.segments": "Settori",
      "foot.platform": "Piattaforma TGA",
      "foot.services": "Servizi",
      "foot.support": "Supporto e Legale",
      "foot.faq": "Domande Frequenti",
      "foot.contact": "Contatto",
      "foot.compliance": "Conformità",
      "foot.privacy": "Informativa sulla privacy",
      "foot.copy": "© <span id=\"current-year\">2026</span> TEZ &amp; TEZ · Tecnologia nella Gestione degli Asset. Tutti i diritti riservati.",
      "wa.float": "Contattaci",
      "cookie.text": "Utilizziamo cookie necessari per il funzionamento del sito e analitici (LinkedIn Insight Tag) per analizzare il traffico aziendale. Per saperne di più consulta la nostra <a href=\"politica-de-privacidade.html\">Informativa sulla Privacy</a>.",
      "cookie.essential": "Solo essenziali",
      "cookie.accept": "Accetta tutti"
    }
  };

  const langSwitch = document.getElementById('lang-switch');
  const langSwitchBtn = document.getElementById('lang-switch-btn');
  const langCurrentLabel = document.getElementById('lang-code-current');
  const langOptions = document.querySelectorAll('.lang-option');
  const langMobileBtns = document.querySelectorAll('.lang-mobile-btn');

  // Recupera idioma salvo no localStorage (padrão 'pt')
  let currentLang = 'pt';
  try {
    const saved = localStorage.getItem('tez_lang');
    if (saved && ['pt', 'en', 'it'].includes(saved)) {
      currentLang = saved;
    }
  } catch (e) { }

  function updateLangUI(lang) {
    if (langCurrentLabel) {
      langCurrentLabel.textContent = lang.toUpperCase();
    }
    langOptions.forEach(opt => {
      opt.classList.toggle('is-active', opt.getAttribute('data-lang') === lang);
    });
    langMobileBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });
  }

  function applyTranslations(lang) {
    if (!translations[lang]) return;

    // Atualiza textos marcados com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Atualiza placeholders de formulário
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang][key] !== undefined) {
        el.placeholder = translations[lang][key];
      }
    });

    // Atualiza atributo lang do elemento <html>
    document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : ((lang === 'en') ? 'en' : 'it');
  }

  // Inicializa estado e aplica idioma se já estiver salvo
  updateLangUI(currentLang);
  if (currentLang !== 'pt') {
    applyTranslations(currentLang);
  }

  // Toggle dropdown desktop
  if (langSwitch && langSwitchBtn) {
    langSwitchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langSwitch.classList.toggle('is-open');
      langSwitchBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!langSwitch.contains(e.target)) {
        langSwitch.classList.remove('is-open');
        langSwitchBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langSwitch.classList.contains('is-open')) {
        langSwitch.classList.remove('is-open');
        langSwitchBtn.setAttribute('aria-expanded', 'false');
        langSwitchBtn.focus();
      }
    });
  }

  function setLanguage(lang) {
    if (!['pt', 'en', 'it'].includes(lang)) return;

    currentLang = lang;
    try {
      localStorage.setItem('tez_lang', lang);
    } catch (e) { }

    updateLangUI(lang);
    applyTranslations(lang);

    if (langSwitch) {
      langSwitch.classList.remove('is-open');
      if (langSwitchBtn) langSwitchBtn.setAttribute('aria-expanded', 'false');
    }

    // Fecha menu mobile caso esteja aberto
    if (typeof closeMenu === 'function') {
      closeMenu();
    }
  }

  langOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  langMobileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // ============================================================
  // 14. BANNER DE CONSENTIMENTO DE COOKIES LGPD
  // ============================================================
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieBtnAccept = document.getElementById('cookie-btn-accept');
  const cookieBtnEssential = document.getElementById('cookie-btn-essential');

  if (cookieBanner) {
    let savedConsent = null;
    try {
      savedConsent = localStorage.getItem('tez_cookie_consent');
    } catch (e) { }

    if (!savedConsent) {
      cookieBanner.style.display = 'flex';
      setTimeout(() => {
        cookieBanner.classList.add('is-visible');
      }, 600);
    }

    function setCookieConsent(type) {
      try {
        localStorage.setItem('tez_cookie_consent', type);
      } catch (e) { }
      cookieBanner.classList.remove('is-visible');
      setTimeout(() => {
        cookieBanner.style.display = 'none';
      }, 400);

      // Se o usuário optou por apenas essenciais, suprime tags analíticas
      if (type === 'essential') {
        window['ga-disable-default'] = true;
      }
    }

    if (cookieBtnAccept) {
      cookieBtnAccept.addEventListener('click', () => setCookieConsent('all'));
    }
    if (cookieBtnEssential) {
      cookieBtnEssential.addEventListener('click', () => setCookieConsent('essential'));
    }
  }

});
