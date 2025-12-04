
const menuBtn = document.getElementById('menu-btn');
const menuMobile = document.getElementById('menu-mobile');


menuBtn.addEventListener('click', () => {
  menuMobile.classList.toggle('hidden');
});
