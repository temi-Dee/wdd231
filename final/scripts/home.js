import './main.js';

const modal = document.getElementById('dish-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

// ── Fetch & render featured dishes ───────────────────────────────────────────
async function loadFeatured() {
    try {
        const res = await fetch('data/dishes.json');
        if (!res.ok) throw new Error('Failed to load dishes');
        const dishes = await res.json();

        const featured = dishes.filter(d => d.featured);
        const container = document.getElementById('featured-grid');

        container.innerHTML = featured.map(dish => `
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
                    <button class="btn-order" data-id="${dish.id}" data-name="${dish.name}" data-price="${dish.price}">Order Now</button>
                    <button class="btn-details" data-id="${dish.id}">View Details</button>
                </div>
            </div>
        `).join('');

        // Store all dishes for modal lookup
        window._dishes = dishes;

        attachCardEvents();
    } catch (err) {
        document.getElementById('featured-grid').innerHTML =
            '<p class="error">Unable to load dishes. Please try again later.</p>';
        console.error(err);
    }
}

// ── Card events ───────────────────────────────────────────────────────────────
function attachCardEvents() {
    // View Details → open modal
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const dish = window._dishes.find(d => d.id === Number(btn.dataset.id));
            openModal(dish);
        });
    });

    // Order Now → update cart count in localStorage
    document.querySelectorAll('.btn-order').forEach(btn => {
        btn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('naijaeats-cart') || '[]');
            cart.push({ id: btn.dataset.id, name: btn.dataset.name, price: btn.dataset.price });
            localStorage.setItem('naijaeats-cart', JSON.stringify(cart));
            updateCartCount();
            btn.textContent = '✅ Added!';
            setTimeout(() => btn.textContent = 'Order Now', 1500);
        });
    });
}

// ── Modal ─────────────────────────────────────────────────────────────────────
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
        <a href="contact.html?dish=${encodeURIComponent(dish.name)}" class="btn-primary">Order This Dish</a>
    `;
    modal.showModal();
}

if (modalClose) modalClose.addEventListener('click', () => modal.close());
if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

// ── Cart count ────────────────────────────────────────────────────────────────
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('naijaeats-cart') || '[]');
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = cart.length;
}

updateCartCount();
loadFeatured();
