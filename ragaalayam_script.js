/* ===========================
   RAGAALAYAM MUSIC ACADEMY
   script.js
   =========================== */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile menu ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.course-card, .why-card, .about-tags span, .contact-item').forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#e8b84b';
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => navObserver.observe(s));

/* ── Enroll Form ── */
const enrollForm = document.getElementById('enrollForm');
const enrollBtn  = document.getElementById('enrollBtn');

enrollForm.addEventListener('submit', e => {
  e.preventDefault();

  // Button feedback
  enrollBtn.textContent = '✓ Request Sent! We\'ll call you soon.';
  enrollBtn.style.background = '#2ecc71';
  enrollBtn.style.boxShadow  = '0 0 30px rgba(46,204,113,0.4)';
  enrollBtn.disabled = true;

  showToast('🎵 Enrollment request sent! Ragaalayam will contact you shortly.');

  setTimeout(() => {
    enrollBtn.textContent  = 'Book Free Trial Class 🎵';
    enrollBtn.style.background = '';
    enrollBtn.style.boxShadow  = '';
    enrollBtn.disabled = false;
    enrollForm.reset();
  }, 4000);
});

/* ── Toast ── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ── Counter animation for hero stats ── */
function animateCount(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }
  }, 16);
}

// Trigger counter when hero is visible
const heroStats = document.querySelectorAll('.hstat span');
const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(heroStats[0], 500, 1800);
      animateCount(heroStats[1], 6, 1000);
      animateCount(heroStats[2], 10, 1200);
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

if (heroStats.length) heroObserver.observe(heroStats[0].closest('.hero-stats'));
