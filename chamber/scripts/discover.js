import { places } from '../data/places.mjs';

// ── Build place cards ─────────────────────────────────────────────────────────
const grid = document.getElementById('places-grid');

places.forEach((place, i) => {
    const card = document.createElement('div');
    card.className = `place-card place-card--${i + 1}`;

    card.innerHTML = `
        <figure>
            <img src="${place.image}" alt="${place.alt}" loading="lazy" width="300" height="200">
        </figure>
        <div class="place-info">
            <h3>${place.name}</h3>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button" class="learn-more-btn">Learn More</button>
        </div>
    `;
    grid.appendChild(card);
});

// ── Visitor message via localStorage ─────────────────────────────────────────
const msgEl = document.getElementById('visitor-msg');
const lastVisit = localStorage.getItem('discoverLastVisit');
const now = Date.now();

if (!lastVisit) {
    msgEl.textContent = 'Welcome! Let us know if you have any questions.';
} else {
    const diffMs = now - Number(lastVisit);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        msgEl.textContent = 'Back so soon! Awesome!';
    } else {
        const dayWord = diffDays === 1 ? 'day' : 'days';
        msgEl.textContent = `You last visited ${diffDays} ${dayWord} ago.`;
    }
}

localStorage.setItem('discoverLastVisit', now);
