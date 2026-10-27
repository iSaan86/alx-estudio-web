/* ==========================================================================
   ALX Estudio Web · Galerías de proyectos
   Sin JavaScript, cada galería se desliza con el dedo o la barra de
   desplazamiento y cada imagen abre su archivo. Este script añade los
   botones, el contador y la vista ampliada.
   ========================================================================== */

const lightbox = createLightbox();

document.querySelectorAll('.gallery').forEach(setupGallery);

function setupGallery(gallery) {
  const track = gallery.querySelector('.gallery__track');
  const slides = [...track.children];
  const links = [...track.querySelectorAll('a')];

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      lightbox.open(links, index);
    });
  });

  if (slides.length < 2) return;

  const bar = createBar();
  const { count, prev, next } = bar;
  gallery.append(bar.element);
  gallery.classList.add('gallery--ready');

  let current = 0;

  function update() {
    current = Math.round(track.scrollLeft / track.clientWidth);
    count.textContent = `${current + 1} / ${slides.length}`;
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;

    // Un vídeo que queda fuera de la vista no sigue sonando ni consumiendo
    slides.forEach((slide, index) => {
      const video = slide.querySelector('video');
      if (video && index !== current) video.pause();
    });
  }

  function goTo(index) {
    track.scrollTo({ left: index * track.clientWidth });
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function createBar() {
  const element = document.createElement('div');
  element.className = 'gallery__bar';
  element.innerHTML = `
    <p class="gallery__count" aria-live="polite"></p>
    <button class="gallery__btn" type="button" aria-label="Anterior">←</button>
    <button class="gallery__btn" type="button" aria-label="Siguiente">→</button>`;
  const [count, prev, next] = element.children;
  return { element, count, prev, next };
}

function createLightbox() {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Imagen ampliada');
  dialog.innerHTML = `
    <figure class="lightbox__figure">
      <img alt="">
      <figcaption class="lightbox__caption"></figcaption>
    </figure>`;
  document.body.append(dialog);

  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  const bar = createBar();
  const close = document.createElement('button');
  close.className = 'gallery__btn';
  close.type = 'button';
  close.setAttribute('aria-label', 'Cerrar');
  close.textContent = '×';
  bar.element.append(close);
  dialog.append(bar.element);

  let items = [];
  let current = 0;

  function show(index) {
    current = index;
    const link = items[index];
    const figcaption = link.closest('figure').querySelector('figcaption');
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = figcaption ? figcaption.textContent : '';
    bar.count.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
    bar.prev.hidden = bar.next.hidden = items.length < 2;
    bar.prev.disabled = index === 0;
    bar.next.disabled = index === items.length - 1;
  }

  bar.prev.addEventListener('click', () => show(current - 1));
  bar.next.addEventListener('click', () => show(current + 1));
  close.addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && current > 0) show(current - 1);
    if (event.key === 'ArrowRight' && current < items.length - 1) show(current + 1);
  });

  // Un clic fuera de la imagen cierra la vista ampliada
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  return {
    open(links, index) {
      items = links;
      show(index);
      dialog.showModal();
    },
  };
}
