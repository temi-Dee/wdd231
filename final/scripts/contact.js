import './main.js';

// Inject timestamp
const tsField = document.getElementById('timestamp');
if (tsField) tsField.value = new Date().toLocaleString();

// Pre-fill dish from URL param if coming from menu/home
const params = new URLSearchParams(window.location.search);
const dishParam = params.get('dish');
const dishSelect = document.getElementById('dish');
if (dishSelect && dishParam) {
    [...dishSelect.options].forEach(opt => {
        if (opt.value === dishParam) opt.selected = true;
    });
}
