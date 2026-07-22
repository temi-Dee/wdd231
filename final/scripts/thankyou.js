import './main.js';

const params = new URLSearchParams(window.location.search);
const fields = ['firstName', 'lastName', 'email', 'phone', 'dish', 'address', 'timestamp'];

fields.forEach(field => {
    const el = document.getElementById(`display-${field}`);
    if (el) el.textContent = params.get(field) || 'Not provided';
});
