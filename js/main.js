/* Maison Phở · main.js */

// --- Sticky Navigation ---
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 60);
});

// --- Mobile Nav Toggle ---
const toggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
toggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? '✕' : '☰';
});

// Close menu on link click
navMenu?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    toggle?.setAttribute('aria-expanded', false);
    if (toggle) toggle.textContent = '☰';
  });
});

// --- Active Nav Link ---
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// --- Fade-In on Scroll ---
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// --- Menu Tabs (Speisekarte) ---
const tabs = document.querySelectorAll('.menu-tab');
const sections = document.querySelectorAll('.menu-section[data-category]');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if (cat === 'alle') {
      sections.forEach(s => s.style.display = '');
    } else {
      sections.forEach(s => {
        s.style.display = s.dataset.category === cat ? '' : 'none';
      });
    }
  });
});

// --- Gallery Filters ---
const filters = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item[data-category]');
filters.forEach(filter => {
  filter.addEventListener('click', () => {
    const cat = filter.dataset.filter;
    filters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    galleryItems.forEach(item => {
      item.style.display = (cat === 'alle' || item.dataset.category === cat) ? '' : 'none';
    });
  });
});

// --- Reservation Form ---
const resForm = document.getElementById('reservation-form');
resForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = resForm.querySelector('.form-submit');
  btn.textContent = 'Anfrage gesendet ✓';
  btn.classList.remove('btn--gold');
  btn.style.background = '#3D6644';
  btn.style.color = '#F5EFE6';
  btn.disabled = true;
});

// --- Reviews Marquee (infinite right-scroll) ---
const reviewsTrack = document.querySelector('.reviews-track');
if (reviewsTrack) {
  [...reviewsTrack.children].forEach(card => {
    reviewsTrack.appendChild(card.cloneNode(true));
  });
}

// --- Contact Form ---
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('[type="submit"]');
  btn.textContent = 'Nachricht gesendet ✓';
  btn.classList.remove('btn--gold');
  btn.style.background = '#3D6644';
  btn.disabled = true;
});
