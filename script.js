/**
 * ============================================================================
 * SLOK CHAULAGAIN PORTFOLIO SCRIPTS
 * ============================================================================
 * 
 * - 11 Commercial Reels: type: "reel" (Tall phone / TikTok style)
 * - 3 Wedding & Highlights: type: "video" (Widescreen YouTube style)
 */

function generateCinematicSvg(label, colorScheme) {
  const [bg1, bg2, accent] = colorScheme;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#g)"/>
    <circle cx="300" cy="225" r="90" fill="${accent}" opacity="0.15"/>
    <text x="50%" y="82%" font-family="sans-serif" font-size="16" fill="#ffffff" opacity="0.6" text-anchor="middle" letter-spacing="2">${label.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const PROJECTS = [
  // --- 11 TIKTOK / REEL COMMERCIALS ---
  {
    id: 1,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel", // <-- TikTok / Reel
    duration: "00:16",
    thumbnail: "assets/eve.jpg",
    videoUrl: "https://youtube.com/shorts/Hb7BhRkU7KY?feature=share"
  },
  {
    id: 2,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel",
    duration: "00:20",
    thumbnail: "assets/eve.jpg",
    videoUrl: "https://youtube.com/shorts/e0Pv1eMttXs?feature=share"
  },
  {
    id: 3,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel",
    duration: "00:16",
    thumbnail: "assets/eve.jpg",
    videoUrl: "https://youtube.com/shorts/iM1bJIAfbas?feature=share"
  },
  {
    id: 4,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel",
    duration: "00:21",
    thumbnail: "assets/eve.jpg",
    videoUrl: "https://youtube.com/shorts/LTFedB07um0?feature=share"
  },
  {
    id: 5,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel",
    duration: "00:20",
    thumbnail: "assets/eve.jpg",
    videoUrl: "https://youtube.com/shorts/9zSaQmD1OT8?feature=share"
  },
  {
    id: 6,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel",
    duration: "00:17",
    thumbnail: "assets/evan.jpg",
    videoUrl: "https://youtube.com/shorts/gEUOF_3hnh4?feature=share"
  },
  {
    id: 7,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel",
    duration: "00:17",
    thumbnail: "assets/eve.jpg",
    videoUrl: "https://youtube.com/shorts/WkpkfRw9wd8?feature=share"
  },
  {
    id: 8,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel",
    duration: "00:14",
    thumbnail: "assets/eve.jpg",
    videoUrl: "https://youtube.com/shorts/Ooj0bSjLapM?feature=share"
  },
  {
    id: 9,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel",
    duration: "00:16",
    thumbnail: "assets/evan.jpg",
    videoUrl: "https://youtube.com/shorts/SNs0vwYKrg0?feature=share"
  },
  {
    id: 10,
    title: "Commercial Ad",
    category: "commercial",
    type: "reel",
    duration: "00:16",
    thumbnail: "assets/evan.jpg",
    videoUrl: "https://youtube.com/shorts/3WveRawaSDU?feature=share"
  },
  {
    id: 11,
    title: "National Path Lab",
    category: "commercial",
    type: "reel",
    duration: "00:56",
    thumbnail: "assets/Pathlab.jpg",
    videoUrl: "https://youtube.com/shorts/TBxn2FQOXBI?feature=share"
  },

  // --- 3 YOUTUBE / WIDESCREEN VIDEOS ---
  {
    id: 12,
    title: "Haldi",
    category: "wedding",
    type: "video", // <-- YouTube Widescreen
    duration: "02:36",
    thumbnail: "assets/haldi.jpg",
    videoUrl: "https://www.youtube.com/embed/SpF6DE5m-Tc"
  },
  {
    id: 13,
    title: "Reception",
    category: "wedding",
    type: "video",
    duration: "27:44",
    thumbnail: "assets/reception.jpg",
    videoUrl: "https://youtu.be/1qQ41lPEh20"
  },
  {
    id: 14,
    title: "Rotaract",
    category: "highlights",
    type: "video",
    duration: "04:27",
    thumbnail: "assets/rotaract.jpg",
    videoUrl: "https://youtu.be/pcVcz5okOpQ"
  }
];

// App State
let activeFilter = 'all';
let isExpanded = false;
let lastFocusedElement = null;
let isManualNavClick = false;
let navClickTimeout = null;

// DOM Elements
const portfolioGrid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter-pill');
const viewToggleBtn = document.getElementById('viewToggleBtn');
const viewToggleText = viewToggleBtn.querySelector('.btn-text');
const mobileToggle = document.getElementById('mobileToggle');
const primaryNav = document.getElementById('primaryNav');
const navLinks = document.querySelectorAll('.nav-link');
const videoModal = document.getElementById('videoModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalPlayerContent = document.getElementById('modalPlayerContent');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const header = document.getElementById('header');

// ============================================================================
// Portfolio Rendering & Filtering
// ============================================================================
function renderProjects() {
  const filtered = activeFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(item => item.category === activeFilter);

  const visibleItems = isExpanded ? filtered : filtered.slice(0, 4);
  portfolioGrid.innerHTML = '';

  if (visibleItems.length === 0) {
    portfolioGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted); padding: 40px 0;">No projects in this category.</p>`;
    return;
  }

  visibleItems.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'video-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Play video: ${project.title}, duration: ${project.duration}`);
    card.dataset.id = project.id;

    card.innerHTML = `
      <img src="${project.thumbnail}" alt="${project.title} Preview" class="card-media" loading="lazy">
      <div class="card-overlay">
        <div></div>
        <div class="center-play-wrapper">
          <div class="play-circle" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="card-bottom-info">
          <span class="card-title">${project.title}</span>
          <span class="card-duration">${project.duration}</span>
        </div>
      </div>
    `;

    setup3DTilt(card);

    card.addEventListener('click', () => openVideoModal(project, card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideoModal(project, card);
      }
    });

    portfolioGrid.appendChild(card);
  });

  if (filtered.length <= 4) {
    viewToggleBtn.style.display = 'none';
  } else {
    viewToggleBtn.style.display = 'inline-flex';
    viewToggleText.textContent = isExpanded ? 'Show Less' : 'View All Projects';
    viewToggleBtn.setAttribute('aria-expanded', String(isExpanded));
    viewToggleBtn.classList.toggle('expanded', isExpanded);
  }
}

// ============================================================================
// Interactive 3D Card Tilt Effect
// ============================================================================
function setup3DTilt(element) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  });
}
document.querySelectorAll('[data-tilt-item]').forEach(el => setup3DTilt(el));

// ============================================================================
// Safe Link Formatter (Converts any YouTube/Shorts/Vimeo link to embed)
// ============================================================================
function getSafeEmbedUrl(url) {
  if (!url) return "";
  url = url.trim();

  // If already an embed link
  if (url.includes('/embed/')) {
    return `${url}${url.includes('?') ? '&' : '?'}autoplay=1`;
  }

  // Standard YouTube or YouTube Shorts
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  return url;
}

// ============================================================================
// Video Modal Player Handling (Adapts to TikTok/Reel vs YouTube)
// ============================================================================
function openVideoModal(project, triggerElement) {
  lastFocusedElement = triggerElement;
  modalTitle.textContent = project.title;
  modalMeta.textContent = `${project.category} · ${project.duration}`;

  const modalDialog = videoModal.querySelector('.modal-dialog');
  const rawUrl = project.videoUrl ? project.videoUrl.trim() : "";

  // Switch modal to phone frame if marked as "reel"
  if (project.type === "reel") {
    modalDialog.classList.add('is-reel');
  } else {
    modalDialog.classList.remove('is-reel');
  }

  if (!rawUrl) {
    modalPlayerContent.innerHTML = `
      <div class="placeholder-notice">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
        </svg>
        <h4>Video Coming Soon</h4>
        <p>This project is currently being prepared for streaming.</p>
      </div>`;
  } else if (rawUrl.endsWith('.mp4') || rawUrl.endsWith('.webm') || rawUrl.endsWith('.mov')) {
    modalPlayerContent.innerHTML = `
      <video src="${rawUrl}" controls autoplay playsinline style="width:100%; height:100%; object-fit:contain; background:#000;">
        Your browser does not support video tag.
      </video>`;
  } else {
    const embedUrl = getSafeEmbedUrl(rawUrl);
    modalPlayerContent.innerHTML = `
      <iframe 
        src="${embedUrl}" 
        title="${project.title}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>`;
  }

  videoModal.removeAttribute('hidden');
  videoModal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
  modalCloseBtn.focus();

  document.addEventListener('keydown', handleModalKeydown);
}

function closeVideoModal() {
  videoModal.classList.remove('is-active');
  videoModal.setAttribute('hidden', '');
  modalPlayerContent.innerHTML = '';

  const modalDialog = videoModal.querySelector('.modal-dialog');
  if (modalDialog) modalDialog.classList.remove('is-reel');

  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleModalKeydown);

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function handleModalKeydown(e) {
  if (e.key === 'Escape') {
    closeVideoModal();
  }
  if (e.key === 'Tab') {
    const focusables = videoModal.querySelectorAll('button, iframe, [tabindex="0"]');
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    closeVideoModal();
  }
});
modalCloseBtn.addEventListener('click', closeVideoModal);

// ============================================================================
// Filters & Toggle Buttons
// ============================================================================
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    activeFilter = btn.dataset.filter;
    isExpanded = false;
    renderProjects();
  });
});

viewToggleBtn.addEventListener('click', () => {
  isExpanded = !isExpanded;
  renderProjects();
});

// ============================================================================
// Mobile Navigation Drawer Toggle
// ============================================================================
mobileToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('nav-open');
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
});

// ============================================================================
// Bulletproof Scrollspy & Underline Movement
// ============================================================================
function setActiveNavLink(targetHash) {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === targetHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const targetHash = link.getAttribute('href');
    setActiveNavLink(targetHash);

    isManualNavClick = true;
    clearTimeout(navClickTimeout);
    navClickTimeout = setTimeout(() => {
      isManualNavClick = false;
    }, 900);

    primaryNav.classList.remove('nav-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  });
});

function initScrollspy() {
  const sections = [
    { id: '#home', el: document.getElementById('home') },
    { id: '#portfolio', el: document.getElementById('portfolio') },
    { id: '#about', el: document.getElementById('about') },
    { id: '#contact', el: document.getElementById('contact') }
  ];

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (isManualNavClick) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (windowHeight + scrollY >= documentHeight - 80) {
      setActiveNavLink('#contact');
      return;
    }

    let currentSection = '#home';
    sections.forEach(({ id, el }) => {
      if (el) {
        const top = el.offsetTop - 180;
        if (scrollY >= top) {
          currentSection = id;
        }
      }
    });

    setActiveNavLink(currentSection);
  }, { passive: true });
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initScrollspy();
});