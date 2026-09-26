const filterButtons = document.querySelectorAll('.portfolio__filter');
const portfolioItems = document.querySelectorAll('.portfolio__item');
const lightbox = document.querySelector('[data-lightbox-modal]');
const lightboxImage = document.querySelector('.portfolio-lightbox__image');
const lightboxClose = document.querySelector('.portfolio-lightbox__close');

if (filterButtons.length && portfolioItems.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(item => item.classList.remove('is-active'));
      button.classList.add('is-active');

      portfolioItems.forEach(item => {
        const matches = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !matches);
      });
    });
  });
}

function openLightbox(image) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('scroll-locked');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.removeAttribute('src');
  document.body.classList.remove('scroll-locked');
}

document.querySelectorAll('[data-lightbox]').forEach(card => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');
    if (image) openLightbox(image);
  });
});

lightboxClose?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) {
    closeLightbox();
  }
});
