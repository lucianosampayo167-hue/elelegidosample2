/* El Elegido Gym — comportamiento compartido (menú lateral, año del pie) */
(function () {
  'use strict';
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  var overlay = document.querySelector('.menu-overlay');
  var closeBtn = document.querySelector('.menu-close');
  if (btn && menu) initMenu();

  function initMenu() {

  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    overlay.hidden = !open;
    document.body.classList.toggle('no-scroll', open);
    (open ? closeBtn : btn).focus();
  }

  btn.addEventListener('click', function () { setMenu(true); });
  closeBtn.addEventListener('click', function () { setMenu(false); });
  overlay.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
  });

  }

  // Año automático en el pie
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Catálogo deslizable (flechas en escritorio; en celular se desliza con el dedo)
  var track = document.querySelector('.catalog-track');
  if (track) {
    var prev = document.querySelector('.cat-prev');
    var next = document.querySelector('.cat-next');
    var step = function () {
      var card = track.querySelector('.product');
      return card ? card.offsetWidth + 16 : 300;
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    };
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
