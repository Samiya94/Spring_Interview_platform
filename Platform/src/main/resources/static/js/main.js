/* ── NAVBAR scroll effect ── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile menu ── */
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('nav') && !e.target.closest('.mobile-menu')) closeMobile();
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Intersection observer for fade-up ── */
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

/* ── Institute filter ── */
function filterInstitutes() {
  const q = document.getElementById('instSearch').value.toLowerCase();
  const dept = document.getElementById('instDeptFilter').value.toLowerCase();
  document.querySelectorAll('#institutesGrid .inst-card').forEach(card => {
    const name = card.getAttribute('data-name') || '';
    const d = card.getAttribute('data-dept') || '';
    const show = name.includes(q) && (!dept || d.includes(dept));
    card.style.display = show ? '' : 'none';
  });
}
