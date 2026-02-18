const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
}

const themeToggleBtn = document.querySelector('#theme-toggle');
if (themeToggleBtn) {
    const key = 'preferred-theme';
    const savedTheme = localStorage.getItem(key);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem(key, isDark ? 'dark' : 'light');
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const yearEl = document.querySelector('#year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const backToTopBtn = document.querySelector('#back-to-top');
if (backToTopBtn) {
    const onScroll = () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 260);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
