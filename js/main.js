// Seleciona os elementos
const menuBtn = document.getElementById('menu-btn');
const menuMobile = document.getElementById('menu-mobile');

// Evento de clique
menuBtn.addEventListener('click', () => {
  menuMobile.classList.toggle('hidden');
});
