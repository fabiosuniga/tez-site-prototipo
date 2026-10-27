/* ============================================================
   TEZ & TEZ — Política de Privacidade (i18n Engine)
   Suporte a Português (PT), Inglês (EN) e Italiano (IT)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const legalTranslations = {
    "pt": {
      "legal.back": "Voltar ao site",
      "legal.badge": "LGPD",
      "legal.title": "Política de Privacidade",
      "legal.updated": "Última atualização: <time datetime=\"2026-10-07\">07 de outubro de 2026</time>",
      "legal.disclaimer": "",
      "legal.intro": "A <strong>TEZ &amp; TEZ · Tecnologia em Gestão de Ativos</strong> (Tez &amp; Tez Ltda., \"TEZ &amp; TEZ\", \"nós\") respeita a sua privacidade. Esta Política explica, de forma clara, quais dados pessoais coletamos por meio do site <a href=\"https://te2.com.br\">te2.com.br</a>, para quais finalidades, com quem eles podem ser compartilhados e quais são os seus direitos, em conformidade com a Lei Geral de Proteção de Dados Pessoais (<strong>LGPD — Lei nº 13.709/2018</strong>).",
      "legal.s1_title": "1. Quem é o controlador dos dados",
      "legal.s1_body": "<li><strong>Razão social:</strong> Tez &amp; Tez Ltda.</li><li><strong>CNPJ:</strong> 14.101.732/0001-82</li><li><strong>Endereço:</strong> Av. Marcelo Stefani, 15, Módulo 139 sala 103 · Jardim Nova Bragança, Bragança Paulista - SP</li><li><strong>E-mail de contato:</strong> <a href=\"mailto:contato@te2.com.br\">contato@te2.com.br</a></li>",
      "legal.s2_title": "2. Quais dados coletamos",
      "legal.s2_p1": "Coletamos apenas os dados que você nos fornece voluntariamente pelo formulário de contato:",
      "legal.s2_list": "<li><strong>Nome</strong> (obrigatório);</li><li><strong>E-mail</strong> (obrigatório);</li><li><strong>Empresa</strong> e <strong>telefone</strong> (opcionais);</li><li><strong>Mensagem</strong> (opcional): o conteúdo que você escrever.</li>",
      "legal.s2_p2": "Também registramos o seu aceite desta Política no momento do envio. Pedimos que <strong>não inclua dados pessoais sensíveis</strong> (como informações de saúde, religião ou biometria) no campo de mensagem.",
      "legal.s2_p3": "Ao clicar nos links de WhatsApp ou e-mail, a conversa ocorre diretamente nessas plataformas, que possuem suas próprias políticas de privacidade.",
      "legal.s3_title": "3. Para que usamos os seus dados",
      "legal.s3_list": "<li>Responder à sua solicitação de contato, dúvida ou pedido de demonstração;</li><li>Enviar informações e propostas comerciais relacionadas ao que você solicitou;</li><li>Manter o histórico do relacionamento comercial.</li>",
      "legal.s3_p2": "Não vendemos seus dados e não os usamos para finalidades diferentes das descritas aqui.",
      "legal.s4_title": "4. Bases legais",
      "legal.s4_p1": "Tratamos seus dados com fundamento nas seguintes hipóteses do art. 7º da LGPD:",
      "legal.s4_list": "<li><strong>Consentimento</strong> (art. 7º, I), manifestado ao marcar a caixa de aceite no formulário;</li><li><strong>Procedimentos preliminares relacionados a contrato</strong> (art. 7º, V), quando você solicita uma proposta ou demonstração.</li>",
      "legal.s5_title": "5. Com quem compartilhamos",
      "legal.s5_p1": "Seus dados podem ser tratados pelos seguintes operadores, exclusivamente para viabilizar o funcionamento do site e o retorno do contato:",
      "legal.s5_list": "<li><strong>Infraestrutura Oracle (Oracle APEX / ORDS)</strong>: ambiente corporativo seguro da TEZ &amp; TEZ onde as mensagens do formulário são recebidas e armazenadas diretamente em banco de dados;</li><li><strong>Provedores de E-mail e Hospedagem</strong>: serviços corporativos e infraestrutura em nuvem utilizados para manter o site no ar e receber suas mensagens;</li><li><strong>LinkedIn Insight Tag</strong>: tecnologia analítica da LinkedIn Corporation para mensuração de tráfego corporativo e conversão de contatos profissionais;</li><li><strong>Google Fonts</strong>: fornece as fontes do site e pode registrar o endereço IP do visitante durante o carregamento da página.</li>",
      "legal.s5_p2": "Alguns desses serviços podem armazenar dados em servidores fora do Brasil. Nesses casos, a transferência internacional ocorre nos termos do art. 33 da LGPD.",
      "legal.s5_p3": "Também poderemos compartilhar dados quando exigido por lei ou por ordem de autoridade competente.",
      "legal.s6_title": "6. Por quanto tempo guardamos",
      "legal.s6_body": "Mantemos seus dados pelo tempo necessário para atender à sua solicitação e manter o relacionamento comercial, por no máximo <strong>24 meses</strong> após o último contato, salvo obrigação legal que exija prazo maior. Depois disso, os dados são excluídos ou anonimizados.",
      "legal.s7_title": "7. Seus direitos",
      "legal.s7_p1": "Conforme o art. 18 da LGPD, você pode, a qualquer momento e gratuitamente, solicitar:",
      "legal.s7_list": "<li>Confirmação de que tratamos seus dados e acesso a eles;</li><li>Correção de dados incompletos, inexatos ou desatualizados;</li><li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li><li>Portabilidade dos dados a outro fornecedor;</li><li>Informação sobre com quem compartilhamos seus dados;</li><li><strong>Revogação do consentimento</strong> e eliminação dos dados tratados com base nele.</li>",
      "legal.s7_p2": "Para exercer qualquer desses direitos, escreva para o e-mail do Encarregado (item 9). Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (<a href=\"https://www.gov.br/anpd\" target=\"_blank\" rel=\"noopener noreferrer\">ANPD</a>).",
      "legal.s8_title": "8. Segurança",
      "legal.s8_body": "Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados, perda ou alteração, incluindo conexão criptografada (HTTPS) e acesso restrito às pessoas que precisam dessas informações para atender você.",
      "legal.s9_title": "9. Encarregado pelo tratamento de dados (DPO)",
      "legal.s9_body": "<li><strong>Nome:</strong> Encarregado de Proteção de Dados da TEZ &amp; TEZ</li><li><strong>E-mail:</strong> <a href=\"mailto:contato@te2.com.br\">contato@te2.com.br</a></li>",
      "legal.s10_title": "10. Cookies",
      "legal.s10_body": "Este site utiliza cookies estritamente necessários para seu funcionamento e cookies analíticos da <strong>Tag de Insight do LinkedIn</strong> para mensuração de audiência corporativa e eficácia de comunicação profissional. Esses cookies não armazenam dados confidenciais diretamente identificáveis e você pode gerenciar ou desativar o armazenamento de cookies nas configurações do seu navegador a qualquer momento.",
      "legal.s11_title": "11. Alterações desta Política",
      "legal.s11_body": "Podemos atualizar esta Política periodicamente. A data da última atualização aparece no topo da página. Recomendamos consultá-la sempre que enviar seus dados.",
      "legal.foot_copy": "© <span id=\"current-year\">2026</span> TEZ &amp; TEZ · Tecnologia em Gestão de Ativos. Todos os direitos reservados.",
      "legal.foot_home": "Página inicial",
      "legal.foot_contact": "Contato",
      "cookie.text": "Utilizamos cookies necessários para o funcionamento da página e analíticos (LinkedIn Insight Tag) para mensurar acessos corporativos. Saiba mais em nossa <a href=\"politica-de-privacidade.html\">Política de Privacidade</a>.",
      "cookie.essential": "Apenas essenciais",
      "cookie.accept": "Aceitar todos"
    },
    "en": {
      "legal.back": "Back to website",
      "legal.badge": "LGPD · Privacy",
      "legal.title": "Privacy Policy",
      "legal.updated": "Last updated: <time datetime=\"2026-10-07\">October 7, 2026</time>",
      "legal.disclaimer": "<div class=\"legal-disclaimer\"><strong>Note:</strong> Convenience translation. The original Portuguese version governed by the Brazilian General Data Protection Law (LGPD — Law No. 13,709/2018) is the legally binding document in Brazil.</div>",
      "legal.intro": "<strong>TEZ &amp; TEZ · Asset Management Technology</strong> (Tez &amp; Tez Ltda., \"TEZ &amp; TEZ\", \"we\") values and respects your privacy. This Policy explains clearly what personal data we collect through the website <a href=\"https://te2.com.br\">te2.com.br</a>, for what purposes, with whom it may be shared, and what your rights are under the Brazilian General Data Protection Law (<strong>LGPD — Law No. 13,709/2018</strong>).",
      "legal.s1_title": "1. Data Controller",
      "legal.s1_body": "<li><strong>Legal corporate name:</strong> Tez &amp; Tez Ltda.</li><li><strong>Tax ID (CNPJ):</strong> 14.101.732/0001-82</li><li><strong>Address:</strong> Av. Marcelo Stefani, 15, Module 139 Room 103 · Jardim Nova Bragança, Bragança Paulista - SP, Brazil</li><li><strong>Contact email:</strong> <a href=\"mailto:contato@te2.com.br\">contato@te2.com.br</a></li>",
      "legal.s2_title": "2. Data We Collect",
      "legal.s2_p1": "We collect only the personal information you voluntarily provide through our contact form:",
      "legal.s2_list": "<li><strong>Name</strong> (required);</li><li><strong>Email address</strong> (required);</li><li><strong>Company</strong> and <strong>phone number</strong> (optional);</li><li><strong>Message</strong> (optional): any content you choose to submit.</li>",
      "legal.s2_p2": "We also record your acceptance of this Policy at the time of submission. Please <strong>do not include sensitive personal data</strong> (such as health, philosophical, religious, or biometric data) in the message field.",
      "legal.s2_p3": "When clicking external WhatsApp or email links, the interaction occurs directly on those platforms, which maintain their own independent privacy policies.",
      "legal.s3_title": "3. Purposes of Processing",
      "legal.s3_list": "<li>Responding to your contact inquiries, questions, or product demonstration requests;</li><li>Sending informational and commercial proposals related to your request;</li><li>Maintaining the history of our commercial relationship.</li>",
      "legal.s3_p2": "We do not sell your personal data and do not use it for purposes other than those described herein.",
      "legal.s4_title": "4. Legal Bases",
      "legal.s4_p1": "We process your personal data based on the following grounds under Article 7 of the LGPD:",
      "legal.s4_list": "<li><strong>Consent</strong> (Art. 7, I), provided when checking the consent box in the form;</li><li><strong>Preliminary procedures related to contracts</strong> (Art. 7, V), upon your request for a proposal or demonstration.</li>",
      "legal.s5_title": "5. Data Sharing & Third Parties",
      "legal.s5_p1": "Your data may be processed by the following service providers, strictly to enable the website functionality and facilitate our response:",
      "legal.s5_list": "<li><strong>Oracle Infrastructure (Oracle APEX / ORDS)</strong>: secure enterprise environment of TEZ &amp; TEZ where form submissions are received and stored directly in database;</li><li><strong>Email & Cloud Hosting Providers</strong>: corporate infrastructure and cloud hosting providers maintaining the website and message delivery;</li><li><strong>LinkedIn Insight Tag</strong>: analytics technology provided by LinkedIn Corporation to evaluate corporate traffic and professional inquiry conversions;</li><li><strong>Google Fonts</strong>: serves web fonts and may log the visitor IP address during font loading.</li>",
      "legal.s5_p2": "Certain providers may store data on servers located outside Brazil. In such instances, international data transfers comply with Article 33 of the LGPD.",
      "legal.s5_p3": "We may also share data when required by applicable law or by order of a competent governmental authority.",
      "legal.s6_title": "6. Data Retention",
      "legal.s6_body": "We retain your personal data only as long as necessary to fulfill your request and maintain our business relationship, for a maximum period of <strong>24 months</strong> following the last contact, unless a longer retention period is mandated by law. Thereafter, data is permanently erased or anonymized.",
      "legal.s7_title": "7. Your Rights",
      "legal.s7_p1": "Pursuant to Article 18 of the LGPD, you are entitled at any time and free of charge to request:",
      "legal.s7_list": "<li>Confirmation of the existence of processing and access to your data;</li><li>Correction of incomplete, inaccurate, or outdated data;</li><li>Anonymization, blocking, or deletion of unnecessary or excessive data;</li><li>Data portability to another service provider;</li><li>Information about third parties with whom data has been shared;</li><li><strong>Revocation of consent</strong> and deletion of data processed on that legal basis.</li>",
      "legal.s7_p2": "To exercise any of these rights, please contact our Data Protection Officer (Section 9). You may also lodge a complaint with the Brazilian National Data Protection Authority (<a href=\"https://www.gov.br/anpd\" target=\"_blank\" rel=\"noopener noreferrer\">ANPD</a>).",
      "legal.s8_title": "8. Security",
      "legal.s8_body": "We implement technical and organizational measures to safeguard your personal data against unauthorized access, loss, or alteration, including encrypted connections (HTTPS) and role-based access limited to personnel who require it to assist you.",
      "legal.s9_title": "9. Data Protection Officer (DPO)",
      "legal.s9_body": "<li><strong>Designation:</strong> Data Protection Officer — TEZ &amp; TEZ</li><li><strong>Contact email:</strong> <a href=\"mailto:contato@te2.com.br\">contato@te2.com.br</a></li>",
      "legal.s10_title": "10. Cookies",
      "legal.s10_body": "This website uses strictly necessary cookies to ensure proper operation and analytical cookies from the <strong>LinkedIn Insight Tag</strong> to measure business audience reach and the effectiveness of professional communications. These cookies do not store directly identifiable confidential data, and you may manage or disable cookies in your browser settings at any time.",
      "legal.s11_title": "11. Policy Changes",
      "legal.s11_body": "We may update this Policy periodically. The date of the most recent revision appears at the top. We encourage reviewing it periodically.",
      "legal.foot_copy": "© <span id=\"current-year\">2026</span> TEZ &amp; TEZ · Asset Management Technology. All rights reserved.",
      "legal.foot_home": "Home",
      "legal.foot_contact": "Contact",
      "cookie.text": "We use essential cookies to ensure proper operation and analytical cookies (LinkedIn Insight Tag) to measure business traffic. Learn more in our <a href=\"politica-de-privacidade.html\">Privacy Policy</a>.",
      "cookie.essential": "Essential only",
      "cookie.accept": "Accept all"
    },
    "it": {
      "legal.back": "Torna al sito",
      "legal.badge": "LGPD · Privacy",
      "legal.title": "Informativa sulla Privacy",
      "legal.updated": "Ultimo aggiornamento: <time datetime=\"2026-10-07\">7 ottobre 2026</time>",
      "legal.disclaimer": "<div class=\"legal-disclaimer\"><strong>Nota:</strong> Traduzione di cortesia. La versione originale in lingua portoghese, disciplinata dalla Legge Generale Brasiliana sulla Protezione dei Dati (LGPD — Legge n. 13.709/2018), è l'unico documento giuridicamente vincolante in Brasile.</div>",
      "legal.intro": "<strong>TEZ &amp; TEZ · Tecnologia nella Gestione degli Asset</strong> (Tez &amp; Tez Ltda., \"TEZ &amp; TEZ\", \"noi\") rispetta la vostra privacy. La presente Informativa illustra chiaramente quali dati personali raccogliamo tramite il sito web <a href=\"https://te2.com.br\">te2.com.br</a>, per quali finalità, con chi possono essere condivisi e quali sono i vostri diritti in conformità con la Legge Generale Brasiliana sulla Protezione dei Dati (<strong>LGPD — Legge n. 13.709/2018</strong>).",
      "legal.s1_title": "1. Titolare del trattamento dei dati",
      "legal.s1_body": "<li><strong>Ragione sociale:</strong> Tez &amp; Tez Ltda.</li><li><strong>Codice fiscale/P.IVA (CNPJ):</strong> 14.101.732/0001-82</li><li><strong>Sede:</strong> Av. Marcelo Stefani, 15, Modulo 139 stanza 103 · Jardim Nova Bragança, Bragança Paulista - SP, Brasile</li><li><strong>Email di contatto:</strong> <a href=\"mailto:contato@te2.com.br\">contato@te2.com.br</a></li>",
      "legal.s2_title": "2. Quali dati raccogliamo",
      "legal.s2_p1": "Raccogliamo esclusivamente i dati forniti volontariamente tramite il nostro modulo di contatto:",
      "legal.s2_list": "<li><strong>Nome</strong> (obbligatorio);</li><li><strong>Email</strong> (obbligatoria);</li><li><strong>Azienda</strong> e <strong>telefono</strong> (facoltativi);</li><li><strong>Messaggio</strong> (facoltativo): il contenuto scritto dall'utente.</li>",
      "legal.s2_p2": "Registriamo inoltre l'accettazione della presente Informativa all'atto dell'invio. Si prega di <strong>non includere dati personali sensibili</strong> (quali informazioni sanitarie, convinzioni religiose o dati biometrici) nel corpo del messaggio.",
      "legal.s2_p3": "Cliccando sui collegamenti WhatsApp o email, la conversazione si svolge direttamente su tali piattaforme, che dispongono di proprie informative sulla privacy indipendenti.",
      "legal.s3_title": "3. Finalità del trattamento",
      "legal.s3_list": "<li>Rispondere alle richieste di contatto, quesiti o richieste di dimostrazione;</li><li>Inviare informazioni e proposte commerciali attinenti alla richiesta pervenuta;</li><li>Gestire lo storico delle relazioni commerciali.</li>",
      "legal.s3_p2": "Non vendiamo i dati personali e non li utilizziamo per scopi diversi da quelli qui specificati.",
      "legal.s4_title": "4. Basi giuridiche",
      "legal.s4_p1": "Il trattamento dei dati si fonda sulle seguenti ipotesi previste dall'art. 7 della LGPD:",
      "legal.s4_list": "<li><strong>Consenso</strong> (art. 7, I), espresso contrassegnando la casella di accettazione nel modulo;</li><li><strong>Misure precontrattuali su richiesta dell'interessato</strong> (art. 7, V), all'atto della richiesta di proposta o dimostrazione.</li>",
      "legal.s5_title": "5. Con chi condividiamo i dati",
      "legal.s5_p1": "I dati possono essere trattati dai seguenti responsabili del trattamento, unicamente al fine di garantire l'operatività del sito e il riscontro alle comunicazioni:",
      "legal.s5_list": "<li><strong>Infrastruttura Oracle (Oracle APEX / ORDS)</strong>: ambiente aziendale sicuro di TEZ &amp; TEZ in cui i messaggi del modulo vengono ricevuti e archiviati direttamente nel database;</li><li><strong>Fornitori di Hosting e Posta Elettronica</strong>: infrastrutture cloud aziendali impiegate per il mantenimento del sito e la gestione dei messaggi;</li><li><strong>LinkedIn Insight Tag</strong>: tecnologia analitica di LinkedIn Corporation per la misurazione del traffico aziendale e della conversione delle richieste professionali;</li><li><strong>Google Fonts</strong>: fornisce i font tipografici e può registrare l'indirizzo IP del visitatore durante il caricamento.</li>",
      "legal.s5_p2": "Alcuni di tali servizi possono conservare i dati su server situati al di fuori del Brasile. In tali casi, il trasferimento internazionale avviene ai sensi dell'art. 33 della LGPD.",
      "legal.s5_p3": "I dati potranno inoltre essere comunicati ove richiesto dalla legge o da ordini delle competenti autorità.",
      "legal.s6_title": "6. Periodo di conservazione",
      "legal.s6_body": "I dati vengono conservati per il tempo strettamente necessario a gestire la richiesta e la relazione commerciale, per un periodo massimo di <strong>24 mesi</strong> dall'ultimo contatto, fatti salvi obblighi di legge che ne impongano una conservazione più estesa. Successivamente, i dati vengono cancellati o anonimizzati in modo irreversibile.",
      "legal.s7_title": "7. Diritti dell'interessato",
      "legal.s7_p1": "Ai sensi dell'art. 18 della LGPD, l'interessato può richiedere in ogni momento e a titolo gratuito:",
      "legal.s7_list": "<li>Conferma dell'esistenza del trattamento e accesso ai dati;</li><li>Rettifica di dati incompleti, inesatti o non aggiornati;</li><li>Anonimizzazione, blocco o cancellazione di dati non necessari o eccedenti;</li><li>Portabilità dei dati verso altro fornitore;</li><li>Informazioni sui soggetti terzi con cui i dati sono stati condivisi;</li><li><strong>Revoca del consenso</strong> e cancellazione dei dati trattati sulla base dello stesso.</li>",
      "legal.s7_p2": "Per esercitare tali diritti, scrivere all'indirizzo del Responsabile della protezione dei dati (punto 9). È inoltre facoltà dell'interessato proporre reclamo all'Autorità Nazionale Brasiliana per la Protezione dei Dati (<a href=\"https://www.gov.br/anpd\" target=\"_blank\" rel=\"noopener noreferrer\">ANPD</a>).",
      "legal.s8_title": "8. Sicurezza",
      "legal.s8_body": "Adottiamo misure tecniche e organizzative volte a proteggere i dati da accessi non autorizzati, distruzione o alterazione, incluse connessioni crittografate (HTTPS) e accessi riservati esclusivamente al personale incaricato.",
      "legal.s9_title": "9. Responsabile della protezione dei dati (DPO)",
      "legal.s9_body": "<li><strong>Referente:</strong> Responsabile della Protezione dei Dati — TEZ &amp; TEZ</li><li><strong>Email di contatto:</strong> <a href=\"mailto:contato@te2.com.br\">contato@te2.com.br</a></li>",
      "legal.s10_title": "10. Cookie",
      "legal.s10_body": "Questo sito utilizza cookie strettamente necessari al suo funzionamento e cookie analitici del <strong>LinkedIn Insight Tag</strong> per la misurazione dell'audience aziendale e dell'efficacia delle comunicazioni professionali. Tali cookie non memorizzano dati riservati direttamente identificabili ed è possibile gestire o disabilitare i cookie nelle impostazioni del proprio browser in qualsiasi momento.",
      "legal.s11_title": "11. Modifiche alla presente Informativa",
      "legal.s11_body": "Ci riserviamo il diritto di aggiornare periodicamente la presente Informativa. La data di revisione è indicata in intestazione. Si raccomanda di consultarla ad ogni invio di dati.",
      "legal.foot_copy": "© <span id=\"current-year\">2026</span> TEZ &amp; TEZ · Tecnologia nella Gestione degli Asset. Tutti i diritti riservati.",
      "legal.foot_home": "Home",
      "legal.foot_contact": "Contatto",
      "cookie.text": "Utilizziamo cookie necessari per il funzionamento del sito e analitici (LinkedIn Insight Tag) per analizzare il traffico aziendale. Per saperne di più consulta la nostra <a href=\"politica-de-privacidade.html\">Informativa sulla Privacy</a>.",
      "cookie.essential": "Solo essenziali",
      "cookie.accept": "Accetta tutti"
    }
  };

  // Elementos do seletor de idioma
  const langSwitch = document.getElementById('lang-switch');
  const langSwitchBtn = document.getElementById('lang-switch-btn');
  const langCurrentLabel = document.getElementById('lang-code-current');
  const langOptions = document.querySelectorAll('.lang-option');

  // Recupera idioma salvo no localStorage (padrão 'pt')
  let currentLang = 'pt';
  try {
    const saved = localStorage.getItem('tez_lang');
    if (saved && ['pt', 'en', 'it'].includes(saved)) {
      currentLang = saved;
    }
  } catch (e) {}

  function updateLangUI(lang) {
    if (langCurrentLabel) {
      langCurrentLabel.textContent = lang.toUpperCase();
    }
    langOptions.forEach(opt => {
      opt.classList.toggle('is-active', opt.getAttribute('data-lang') === lang);
    });
  }

  function applyTranslations(lang) {
    if (!legalTranslations[lang]) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (legalTranslations[lang][key] !== undefined) {
        el.innerHTML = legalTranslations[lang][key];
      }
    });

    document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : ((lang === 'en') ? 'en' : 'it');
  }

  function setLanguage(lang) {
    if (!['pt', 'en', 'it'].includes(lang)) return;

    currentLang = lang;
    try {
      localStorage.setItem('tez_lang', lang);
    } catch (e) {}

    updateLangUI(lang);
    applyTranslations(lang);

    if (langSwitch) {
      langSwitch.classList.remove('is-open');
      if (langSwitchBtn) langSwitchBtn.setAttribute('aria-expanded', 'false');
    }
  }

  // Toggle do dropdown
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

  langOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Atualiza ano no rodapé
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Inicializa com o idioma salvo
  updateLangUI(currentLang);
  if (currentLang !== 'pt') {
    applyTranslations(currentLang);
  }

  // Banner de Consentimento de Cookies LGPD
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieBtnAccept = document.getElementById('cookie-btn-accept');
  const cookieBtnEssential = document.getElementById('cookie-btn-essential');

  if (cookieBanner) {
    let savedConsent = null;
    try {
      savedConsent = localStorage.getItem('tez_cookie_consent');
    } catch (e) {}

    if (!savedConsent) {
      cookieBanner.style.display = 'flex';
      setTimeout(() => {
        cookieBanner.classList.add('is-visible');
      }, 600);
    }

    function setCookieConsent(type) {
      try {
        localStorage.setItem('tez_cookie_consent', type);
      } catch (e) {}
      cookieBanner.classList.remove('is-visible');
      setTimeout(() => {
        cookieBanner.style.display = 'none';
      }, 400);
    }

    if (cookieBtnAccept) {
      cookieBtnAccept.addEventListener('click', () => setCookieConsent('all'));
    }
    if (cookieBtnEssential) {
      cookieBtnEssential.addEventListener('click', () => setCookieConsent('essential'));
    }
  }
});

