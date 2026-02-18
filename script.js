/* ── Mobile Menu ─────────────────────────────────────── */
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        mobileMenuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ── Theme Toggle ────────────────────────────────────── */
const themeToggleBtn = document.querySelector('#theme-toggle');
if (themeToggleBtn) {
    const key = 'preferred-theme';
    const savedTheme = localStorage.getItem(key);
    // Default is dark; only switch to light if explicitly saved
    if (savedTheme === 'light') {
        document.body.classList.remove('dark');
        themeToggleBtn.textContent = '🌙';
        themeToggleBtn.setAttribute('aria-label', 'Zum dunklen Modus wechseln');
    } else {
        document.body.classList.add('dark');
        themeToggleBtn.textContent = '☀️';
        themeToggleBtn.setAttribute('aria-label', 'Zum hellen Modus wechseln');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
        themeToggleBtn.setAttribute('aria-label', isDark ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln');
        localStorage.setItem(key, isDark ? 'dark' : 'light');
    });
}

/* ── Scroll-driven reveal (cards + stagger + section titles) ─ */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
);

document.querySelectorAll('.reveal, .stagger-children').forEach((el) => revealObserver.observe(el));

/* ── Scroll progress bar ─────────────────────────────── */
const scrollProgressBar = document.querySelector('#scroll-progress');
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgressBar) scrollProgressBar.style.width = pct + '%';
}

/* ── Active nav highlight ────────────────────────────── */
const sections = ['hero', 'about', 'projects', 'contact'];
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
function updateActiveNav() {
    const scrollMid = window.scrollY + window.innerHeight * 0.45;
    let current = 'hero';
    for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) current = id;
    }
    navAnchors.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

/* ── Back to top ─────────────────────────────────────── */
const backToTopBtn = document.querySelector('#back-to-top');
function onScroll() {
    if (backToTopBtn) backToTopBtn.classList.toggle('visible', window.scrollY > 260);
    updateScrollProgress();
    updateActiveNav();
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ── 3D card tilt on mouse move ──────────────────────── */
document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
        // Disable transition during movement so it tracks the cursor instantly
        card.style.transition = 'box-shadow 0.3s ease';
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -7;
        const rotY = ((x - cx) / cx) *  7;
        card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.025)`;
    });

    card.addEventListener('mouseleave', () => {
        // Re-enable transition only for the smooth snap-back
        card.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease';
        card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
        setTimeout(() => { card.style.transition = ''; card.style.transform = ''; }, 550);
    });
});

/* ── Subtle parallax on hero visual ─────────────────── */
const heroVisual = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
    if (!heroVisual) return;
    const y = window.scrollY;
    heroVisual.style.transform = `translateY(${y * 0.08}px)`;
}, { passive: true });

/* ── Year in footer ──────────────────────────────────── */
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
