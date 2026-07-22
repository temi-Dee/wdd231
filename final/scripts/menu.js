import './main.js';

let allDishes = [];

// ── Fetch all dishes ──────────────────────────────────────────────────────────
async function loadMenu() {
    try {
        const res = await fetch('data/dishes.json');
        if (!res.ok) throw new Error('Failed to load menu');
        allDishes = await res.json();
        renderDishes(allDishes);
        buildFilters();
    } catch (err) {
        document.getElementById('menu-grid').innerHTML =
            '<p class="error">Unable to load menu. Please try again later.</p>';
        console.error(err);
    }
}

// ── Render dishes ─────────────────────────────────────────────────────────────
function renderDishes(dishes) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = dishes.map(dish => `
        <div class="dish-card" data-id="${dish.id}">
            <figure>
                <img src="${dish.image}" alt="${dish.name}" loading="lazy" width="300" height="200">
            </figure>
            <div class="dish-info">
                <h3>${dish.name}</h3>
                <span class="dish-category">${dish.category}</span>
                <p class="dish-desc">${dish.description}</p>
                <div class="dish-meta">
                    <span>⭐ ${dish.rating}</span>
                    <span>⏱ ${dish.prepTime}</span>
                    <span class="dish-price">₦${dish.price.toLocaleString()}</span>
                </div>
                <div class="card-actions">
                    <button class="order-btn" data-id="${dish.id}" data-name="${dish.name}" data-price="${dish.price}">Order</button>
                    <button class="detail-btn" data-id="${dish.id}">Details</button>
                </div>
            </div>
        </div>
    `).join('');

    attachMenuEvents();
}

// ── Build category filter buttons ─────────────────────────────────────────────
function buildFilters() {
    const categories = ['All', ...new Set(allDishes.map(d => d.category))];
    const filterBar = document.getElementById('filter-bar');

    filterBar.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-cat="${cat}">${cat}</button>
    `).join('');

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filtered = btn.dataset.cat === 'All'
                ? allDishes
                : allDishes.filter(d => d.category === btn.dataset.cat);
            renderDishes(filtered);
        });
    });
}

// ── Modal ─────────────────────────────────────────────────────────────────────
const modal = document.getElementById('dish-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function openModal(dish) {
    modalBody.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" width="300" height="200">
        <h3>${dish.name}</h3>
        <p class="dish-category">${dish.category} &bull; ${dish.prepTime}</p>
        <p>${dish.description}</p>
        <ul class="modal-details">
            <li><strong>Price:</strong> ₦${dish.price.toLocaleString()}</li>
            <li><strong>Rating:</strong> ⭐ ${dish.rating}</li>
            <li><strong>Calories:</strong> ${dish.calories} kcal</li>
            <li><strong>Prep Time:</strong> ${dish.prepTime}</li>
        </ul>
        <a href="contact.html?dish=${encodeURIComponent(dish.name)}" class="btn-gold">Order This Dish</a>
    `;
    modal.showModal();
}

if (modalClose) modalClose.addEventListener('click', () => modal.close());
if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

// ── Card events ───────────────────────────────────────────────────────────────
function attachMenuEvents() {
    document.querySelectorAll('.detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dish = allDishes.find(d => d.id === Number(btn.dataset.id));
            openModal(dish);
        });
    });

    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('naijaeats-cart') || '[]');
            cart.push({ id: btn.dataset.id, name: btn.dataset.name, price: btn.dataset.price });
            localStorage.setItem('naijaeats-cart', JSON.stringify(cart));
            btn.textContent = '✅';
            setTimeout(() => btn.textContent = 'Order', 1500);
        });
    });
}

loadMenu();
