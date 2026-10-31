/* ==========================================================================
   ALX Estudio Web · Galerías de proyectos y botón de volver arriba
   Sin JavaScript, cada galería se desliza con el dedo o la barra de
   desplazamiento y cada imagen abre su archivo. Este script añade los
   botones, el contador y la vista ampliada de imágenes y vídeos.
   ========================================================================== */

const galleries = document.querySelectorAll('.gallery');
const lightbox = galleries.length ? createLightbox() : null;

galleries.forEach(setupGallery);

// Volver arriba: se muestra cuando ya se ha bajado más de una pantalla
const toTop = document.querySelector('.to-top');

if (toTop) {
  const toggleToTop = () => {
    toTop.classList.toggle('to-top--visible', window.scrollY > window.innerHeight);
  };
  window.addEventListener('scroll', toggleToTop, { passive: true });
  toggleToTop();
}

function setupGallery(gallery) {
  const track = gallery.querySelector('.gallery__track');
  const slides = [...track.children];
  const items = [...track.querySelectorAll('a, video')];

  items.forEach((item, index) => {
    if (item.tagName === 'VIDEO') {
      const expand = createExpandButton();
      expand.addEventListener('click', () => lightbox.open(items, index));
      item.after(expand);
      return;
    }

    item.addEventListener('click', (event) => {
      event.preventDefault();
      lightbox.open(items, index);
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

function createExpandButton() {
  const button = document.createElement('button');
  button.className = 'gallery__btn gallery__expand';
  button.type = 'button';
  button.setAttribute('aria-label', 'Ampliar vídeo');
  button.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>`;
  return button;
}

function createLightbox() {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Vista ampliada');
  dialog.innerHTML = `
    <figure class="lightbox__figure">
      <img alt="">
      <video controls muted playsinline hidden></video>
      <figcaption class="lightbox__caption"></figcaption>
    </figure>`;
  document.body.append(dialog);

  const image = dialog.querySelector('img');
  const video = dialog.querySelector('video');
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

  function stopVideo() {
    video.pause();
    video.removeAttribute('src');
    video.load();
  }

  function showVideo(source) {
    video.src = source.currentSrc || source.src;
    video.poster = source.poster;
    video.setAttribute('aria-label', source.getAttribute('aria-label'));
    video.currentTime = source.currentTime;
    if (!source.paused) video.play();
    source.pause();
  }

  function showImage(link) {
    stopVideo();
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
  }

  function show(index) {
    current = index;
    const item = items[index];
    const isVideo = item.tagName === 'VIDEO';
    const figcaption = item.closest('figure').querySelector('figcaption');
    image.hidden = isVideo;
    video.hidden = !isVideo;
    if (isVideo) showVideo(item);
    else showImage(item);
    caption.textContent = figcaption ? figcaption.textContent : '';
    bar.count.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
    bar.prev.hidden = bar.next.hidden = items.length < 2;
    bar.prev.disabled = index === 0;
    bar.next.disabled = index === items.length - 1;
  }

  bar.prev.addEventListener('click', () => show(current - 1));
  bar.next.addEventListener('click', () => show(current + 1));
  close.addEventListener('click', () => dialog.close());

  dialog.addEventListener('close', stopVideo);

  // Con el foco en el vídeo, las flechas avanzan y retroceden dentro de él
  dialog.addEventListener('keydown', (event) => {
    if (event.target === video) return;
    if (event.key === 'ArrowLeft' && current > 0) show(current - 1);
    if (event.key === 'ArrowRight' && current < items.length - 1) show(current + 1);
  });

  // Un clic fuera del contenido cierra la vista ampliada
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  return {
    open(galleryItems, index) {
      items = galleryItems;
      show(index);
      dialog.showModal();
    },
  };
}
