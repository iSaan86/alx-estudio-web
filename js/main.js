/**
 * ALX Estudio Web · Deslizadores de proyectos
 *
 * Marcado esperado:
 *   .slider[data-per-desktop][data-gap]
 *     .slider__track > .slider__slide
 *     .slider__dots (vacío, se rellena aquí)
 *     .slider__arrow--prev / .slider__arrow--next
 *
 * data-per-desktop: imágenes visibles a la vez desde 900 px.
 * data-gap: separación en px entre imágenes (la misma que en el CSS).
 */
(function () {
  'use strict';

  var desktop = window.matchMedia('(min-width: 900px)');
  var SWIPE_MIN = 40;

  function initSlider(root) {
    var track = root.querySelector('.slider__track');
    var slides = Array.prototype.slice.call(track.children);
    var dotsBox = root.querySelector('.slider__dots');
    var prevBtn = root.querySelector('.slider__arrow--prev');
    var nextBtn = root.querySelector('.slider__arrow--next');
    var gap = parseInt(root.dataset.gap, 10) || 0;
    var perDesktop = parseInt(root.dataset.perDesktop, 10) || 1;
    var index = 0;

    function perView() {
      return desktop.matches ? perDesktop : 1;
    }

    function pageCount() {
      return Math.max(1, slides.length - perView() + 1);
    }

    function buildDots() {
      if (!dotsBox) return;
      dotsBox.innerHTML = '';

      for (var i = 0; i < pageCount(); i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider__dot';
        dot.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1) + ' de ' + slides.length);
        dot.addEventListener('click', goTo.bind(null, i));
        dotsBox.appendChild(dot);
      }
    }

    function render() {
      var per = perView();
      var pages = pageCount();
      index = Math.min(index, pages - 1);

      // Desplaza el carril el ancho de una imagen más su separación por cada paso
      track.style.transform =
        'translateX(calc(' + index + ' * (-100% - ' + gap + 'px) / ' + per + '))';

      slides.forEach(function (slide, i) {
        slide.setAttribute('aria-hidden', i >= index && i < index + per ? 'false' : 'true');
      });

      if (dotsBox) {
        Array.prototype.forEach.call(dotsBox.children, function (dot, i) {
          var active = i === index;
          dot.classList.toggle('is-active', active);
          dot.setAttribute('aria-current', active ? 'true' : 'false');
        });
      }

      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index >= pages - 1;
      root.classList.toggle('is-single', pages < 2);
    }

    function goTo(i) {
      index = Math.max(0, Math.min(pageCount() - 1, i));
      render();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); });

    // Teclado: flechas izquierda y derecha con el foco dentro del deslizador
    root.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        goTo(index - 1);
        event.preventDefault();
      } else if (event.key === 'ArrowRight') {
        goTo(index + 1);
        event.preventDefault();
      }
    });

    // Gesto de deslizar en pantallas táctiles (ignora el desplazamiento vertical)
    var startX = 0;
    var startY = 0;

    root.addEventListener('touchstart', function (event) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });

    root.addEventListener('touchend', function (event) {
      var dx = event.changedTouches[0].clientX - startX;
      var dy = event.changedTouches[0].clientY - startY;

      if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
        goTo(dx < 0 ? index + 1 : index - 1);
      }
    }, { passive: true });

    function refresh() {
      buildDots();
      render();
    }

    desktop.addEventListener('change', refresh);
    refresh();
  }

  document.querySelectorAll('.slider').forEach(initSlider);
})();
