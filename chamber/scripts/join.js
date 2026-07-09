// Inject current timestamp into hidden field when page loads
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toLocaleString();
}

// Modal logic
const modals = document.querySelectorAll('dialog');
const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
const closeButtons = document.querySelectorAll('.modal-close');

learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('dialog').close();
    });
});

// Close modal when clicking outside (on backdrop)
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
});
