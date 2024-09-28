const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('header nav:first-of-type');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open'); // Alterna la clase 'open' en el nav
    hamburger.textContent = nav.classList.contains('open') ? '✖' : '☰'; // Cambiar icono
});
