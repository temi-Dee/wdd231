// Simple, accessible hamburger menu
const menuBtn = document.getElementById("menuToggle");
const nav = document.getElementById("primaryNav");

function toggleMenu() {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuBtn.textContent = isOpen ? "✕" : "☰";
}

menuBtn.addEventListener("click", toggleMenu);

// Close menu after selecting a link on small screens
nav.addEventListener("click", (evt) => {
  if (
    evt.target.matches("a") &&
    window.matchMedia("(max-width: 639px)").matches
  ) {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    menuBtn.textContent = "☰";
  }
});
