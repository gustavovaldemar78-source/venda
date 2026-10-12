/**
 * ==============================================================================
 * CONSULTÓRIO ODONTOLÓGICO DRA. JOYCE - SÃO JOSÉ DOS PINHAIS - PR
 * Script Principal (JavaScript Puro, Vanilla, Sem dependências)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initTreatmentsSync();
  initTestimonialsSlider();
  initFaqAccordion();
  initBusinessStatus();
  initScrollReveal();
  initClinicLightbox();
  initSmoothScroll();
});

/* ==============================================================================
   1. MENU MOBILE (HAMBÚRGUER E ACESSIBILIDADE)
   ============================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link, .mobile-nav__cta');

  if (!hamburger || !mobileNav) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !mobileNav.classList.contains('is-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileNav.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isExpanded);
  });

  // Fechar ao clicar em qualquer link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Fechar com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });
}

/* ==============================================================================
   2. HEADER SCROLL & SOMBRA DINÂMICA
   ============================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==============================================================================
   3. BASE DE DADOS DOS TRATAMENTOS
   -> COMO EDITAR: Para adicionar, alterar ou remover especialidades, edite o array abaixo:
   ============================================================================== */
const TREATMENTS_DATA = [
  {
    id: "checkup-prevencao",
    badge: "Saúde & Prevenção",
    title: "Check-up & Prevenção",
    description: "Avaliação minuciosa da saúde bucal, diagnóstico precoce e orientações personalizadas para manter seu sorriso sempre saudável e livre de dores.",
    icon: "shield-check"
  },
  {
    id: "limpeza-profilaxia",
    badge: "Cuidado Essencial",
    title: "Limpeza & Profilaxia",
    description: "Remoção cuidadosa de tártaro e placa bacteriana com técnicas delicadas que respeitam a sensibilidade da sua gengiva e renovam o frescor.",
    icon: "sparkles"
  },
  {
    id: "restauracoes-esteticas",
    badge: "Estética & Função",
    title: "Restaurações Estéticas",
    description: "Recuperação funcional e estética com resinas modernas de alta precisão que mimetizam a cor natural dos seus dentes de forma imperceptível.",
    icon: "tooth"
  },
  {
    id: "clareamento-dental",
    badge: "Luminosidade",
    title: "Clareamento Dental",
    description: "Protocolos seguros supervisionados para iluminar o sorriso com suavidade, preservando o esmalte e minimizando qualquer sensibilidade.",
    icon: "sun"
  },
  {
    id: "endodontia-canal",
    badge: "Alívio & Cuidado",
    title: "Tratamento de Canal",
    description: "Técnicas modernas com anestesia eficaz para alívio da dor e preservação do dente natural em um ambiente tranquilo e seguro.",
    icon: "heart-pulse"
  },
  {
    id: "extracoes-cuidadosas",
    badge: "Apoio Completo",
    title: "Extrações Cuidadosas",
    description: "Procedimentos cirúrgicos realizados com extremo zelo, suporte emocional constante e acompanhamento próximo de todo o pós-operatório.",
    icon: "hand-heart"
  },
  {
    id: "odontopediatria",
    badge: "Para os Pequenos",
    title: "Odontopediatria Acolhedora",
    description: "Atendimento infantil paciente e lúdico, respeitando o tempo da criança para construir uma relação leve e positiva com o consultório.",
    icon: "smile"
  },
  {
    id: "estetica-harmonia",
    badge: "Harmonia",
    title: "Estética & Harmonia Dental",
    description: "Pequenos ajustes de forma, anatomia e harmonia do sorriso com planejamento individualizado e total respeito aos seus traços naturais.",
    icon: "gem"
  }
];

// Ícones SVG para os tratamentos
const ICONS_SVG = {
  "shield-check": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="treatment-card__icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  "sparkles": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="treatment-card__icon"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>`,
  "tooth": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="treatment-card__icon"><path d="M7 3C4.24 3 2 5.24 2 8c0 3.3 1.5 5.5 3 8 1.2 2 1.5 5 3.5 5 1.5 0 2-2 3.5-2s2 2 3.5 2c2 0 2.3-3 3.5-5 1.5-2.5 3-4.7 3-8 0-2.76-2.24-5-5-5-1.8 0-3 1-4.5 1S8.8 3 7 3z"/></svg>`,
  "sun": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="treatment-card__icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  "heart-pulse": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="treatment-card__icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l1.5-3 2 6 1.5-3h4.78"/></svg>`,
  "hand-heart": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="treatment-card__icon"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.8a2 2 0 0 0-2.8-2.8l-3.6 3.8"/><circle cx="12" cy="5" r="3"/></svg>`,
  "smile": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="treatment-card__icon"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
  "gem": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="treatment-card__icon"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></svg>`
};

function initTreatmentsSync() {
  const container = document.getElementById('treatments-grid');
  if (!container) return;

  // Se o container estiver vazio ou precisar ser regerado pelo array:
  if (container.children.length === 0 || container.querySelector('noscript')) {
    const whatsappBaseUrl = "https://wa.me/5541991331607?text=";

    container.innerHTML = TREATMENTS_DATA.map(item => {
      const message = encodeURIComponent(`Olá, Dra. Joyce! Gostaria de informações e agendamento sobre ${item.title}.`);
      const waLink = `${whatsappBaseUrl}${message}`;
      const iconSvg = ICONS_SVG[item.icon] || ICONS_SVG["sparkles"];

      return `
        <article class="treatment-card reveal-on-scroll" data-treatment-id="${item.id}">
          <span class="treatment-card__badge">${item.badge}</span>
          <div class="treatment-card__icon-box">
            ${iconSvg}
          </div>
          <h3 class="treatment-card__title">${item.title}</h3>
          <p class="treatment-card__desc">${item.description}</p>
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="treatment-card__cta" aria-label="Tirar dúvidas sobre ${item.title} pelo WhatsApp">
            Consultar no WhatsApp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </article>
      `;
    }).join('');
  }
}

/* ==============================================================================
   4. DEPOIMENTOS REAIS (SLIDER COM SUPORTE A TOUCH SWIPE E TECLADO)
   ============================================================================== */
const TESTIMONIALS_DATA = [
  {
    author: "Janete Camargo",
    initial: "J",
    rating: 5,
    tag: "Apoio a pacientes com medo",
    quote: "Fui muito bem atendida, eu tinha trauma de dentista após uma péssima experiência, mas com a dra Joyce e sua auxiliar tive apoio até emocional para um atendimento bem sucedido, sou grata."
  },
  {
    author: "Anna Laura Thomsen Correa",
    initial: "A",
    rating: 5,
    tag: "Paciência & Explicações claras",
    quote: "A Dra Joyce é uma excelente profissional, uma educação e simpatia em pessoa. Passei em consulta e fui muito bem atendida, ela me explicou tudo com muita paciência."
  },
  {
    author: "Zeni Souza",
    initial: "Z",
    rating: 5,
    tag: "Acolhimento com crianças",
    quote: "O atendimento da Dra. Joyce é excelente. Tira todas as dúvidas com relação aos procedimentos realizados. E tem uma paciência com a minha filha. Só tenho a agradecer!"
  },
  {
    author: "Mayara 8019",
    initial: "M",
    rating: 5,
    tag: "Atendimento acolhedor e atencioso",
    quote: "Fui ao consultório e fui super atendida, dentista super profissional e muito querida! Não me senti constrangida e sim acolhida. Me deu dicas de cuidado bucal! E a recepcionista super fofa teve paciência enquanto tive problema com meu plano, me ajudou a resolver o problema."
  },
  {
    author: "Débora Evelyn",
    initial: "D",
    rating: 5,
    tag: "Atendimento consistente e cuidadoso",
    quote: "Tive algumas vezes no consultório e fui muito bem atendida."
  }
];

function initTestimonialsSlider() {
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('testimonials-dots');
  const prevBtn = document.getElementById('testimonials-prev');
  const nextBtn = document.getElementById('testimonials-next');

  if (!track || !dotsContainer) return;

  // Se o track estiver vazio, renderiza do array
  if (track.children.length === 0) {
    track.innerHTML = TESTIMONIALS_DATA.map((item, index) => `
      <div class="slide ${index === 0 ? 'is-active' : ''}" role="group" aria-roledescription="slide" aria-label="Depoimento ${index + 1} de ${TESTIMONIALS_DATA.length}">
        <div class="testimonial-card">
          <div class="testimonial-card__stars" aria-label="Avaliação 5 de 5 estrelas">
            ${'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'.repeat(item.rating)}
          </div>
          <blockquote class="testimonial-card__quote">
            "${item.quote}"
          </blockquote>
          <div class="testimonial-card__author">
            <div class="testimonial-card__name-box">
              <div class="testimonial-card__avatar">${item.initial}</div>
              <div class="testimonial-card__author-info">
                <strong>${item.author}</strong>
                <span>Avaliação verificada no Google</span>
              </div>
            </div>
            <span class="testimonial-card__theme-tag">${item.tag}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  const slides = track.querySelectorAll('.slide');
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  // Renderizar pontinhos (dots)
  dotsContainer.innerHTML = Array.from({ length: totalSlides }).map((_, index) => `
    <button class="slider__dot ${index === 0 ? 'is-active' : ''}" aria-label="Ir para depoimento ${index + 1}" data-index="${index}"></button>
  `).join('');

  let currentIndex = 0;
  const dots = dotsContainer.querySelectorAll('.slider__dot');

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.getAttribute('data-index'), 10));
    });
  });

  // Suporte a swipe em telas touch (mobile)
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  }, { passive: true });

  function handleGesture() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(currentIndex + 1);
      }
    }
  }

  // Teclado quando o slider estiver focado
  const sliderBox = document.querySelector('.slider');
  if (sliderBox) {
    sliderBox.setAttribute('tabindex', '0');
    sliderBox.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });
  }
}

/* ==============================================================================
   5. ACORDEÃO DE FAQ (PERGUNTAS FREQUENTES ACESSÍVEL)
   ============================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    const answer = item.querySelector('.faq-answer');

    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Fecha outros itens para navegação limpa
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherBtn = otherItem.querySelector('.faq-button');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Alterna o item atual
      if (isOpen) {
        item.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    });
  });
}

/* ==============================================================================
   6. STATUS DO CONSULTÓRIO (CALCULADO NO HORÁRIO DE BRASÍLIA / SÃO PAULO)
   ============================================================================== */
function initBusinessStatus() {
  const statusContainer = document.getElementById('clinic-status-badge');
  if (!statusContainer) return;

  function updateStatus() {
    const now = new Date();
    
    // Obter partes da data no horário oficial de Brasília (America/Sao_Paulo)
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });

    const parts = formatter.formatToParts(now);
    let hour = 0;
    let minute = 0;
    
    parts.forEach(p => {
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
    });

    const brazilDateString = now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
    const brazilDate = new Date(brazilDateString);
    const dayOfWeek = brazilDate.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

    const timeInMinutes = hour * 60 + minute;
    const openTime = 9 * 60;   // 09:00
    const closeTime = 18 * 60; // 18:00

    let isOpen = false;
    let statusText = "";

    // Segunda a Sexta
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      if (timeInMinutes >= openTime && timeInMinutes < closeTime) {
        isOpen = true;
        statusText = "Aberto agora · Atendimento até às 18:00";
      } else if (timeInMinutes < openTime) {
        isOpen = false;
        statusText = "Fechado agora · Abre hoje às 09:00";
      } else {
        isOpen = false;
        if (dayOfWeek === 5) {
          statusText = "Fechado agora · Abre segunda-feira às 09:00";
        } else {
          statusText = "Fechado agora · Abre amanhã às 09:00";
        }
      }
    } else if (dayOfWeek === 6) {
      // Sábado
      isOpen = false;
      statusText = "Fechado hoje · Abre segunda-feira às 09:00";
    } else {
      // Domingo
      isOpen = false;
      statusText = "Fechado hoje · Abre amanhã às 09:00";
    }

    statusContainer.className = `status-pill ${isOpen ? 'status-pill--open' : 'status-pill--closed'}`;
    statusContainer.innerHTML = `
      <span class="status-pill__dot"></span>
      <span>${statusText}</span>
    `;
  }

  updateStatus();
  setInterval(updateStatus, 60000);
}

/* ==============================================================================
   7. ANIMAÇÕES SUTIS AO ROLAR (INTERSECTION OBSERVER)
   ============================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==============================================================================
   8. LIGHTBOX PARA FOTO DO CONSULTÓRIO
   ============================================================================== */
function initClinicLightbox() {
  const trigger = document.getElementById('clinic-lightbox-trigger');
  const modal = document.getElementById('clinic-lightbox-modal');
  const closeBtn = document.getElementById('clinic-lightbox-close');

  if (!trigger || !modal) return;

  function openModal() {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    trigger.focus();
  }

  trigger.addEventListener('click', openModal);
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* ==============================================================================
   9. ROLAGEM SUAVE COM COMPENSAÇÃO DE HEADER
   ============================================================================== */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 76;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
