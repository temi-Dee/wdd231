// ── Navigation ────────────────────────────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuBtn.textContent = isOpen ? '✕' : '☰';
        menuBtn.setAttribute('aria-expanded', isOpen);
    });
}

// ── Footer ────────────────────────────────────────────────────────────────────
const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;

// ── Wayfinding ────────────────────────────────────────────────────────────────
document.querySelectorAll('#navMenu a').forEach(link => {
    if (link.href === window.location.href) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active');
    }
});

// ── Theme preference (localStorage) ──────────────────────────────────────────
export function applyTheme() {
    const theme = localStorage.getItem('naijaeats-theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

export function toggleTheme() {
    const current = localStorage.getItem('naijaeats-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('naijaeats-theme', next);
    applyTheme();
}

applyTheme();

const themeBtn = document.getElementById('themeToggle');
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
