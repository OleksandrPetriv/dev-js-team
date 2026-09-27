import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';

const feedbacks = [
  {
    text: 'Your feedback text goes here.',
    author: 'Alex and Maria',
  },
  {
    text: 'Another couple’s review goes here.',
    author: 'James and Olivia',
  },
  {
    text: 'A third review goes here.',
    author: 'Noah and Emma',
  },
];

const list = document.querySelector('.feedbacks-list');
const dots = document.querySelector('.feedbacks-dots');
const prevButton = document.querySelector('.feedbacks-button-prev');
const nextButton = document.querySelector('.feedbacks-button-next');

if (list && dots && prevButton && nextButton) {
  list.innerHTML = feedbacks
    .map(
      ({ text, author }) => `
        <li class="feedbacks-item">
          <article class="feedbacks-card">
            <p class="feedbacks-text">${text}</p>
            <p class="feedbacks-author">${author}</p>
          </article>
        </li>
      `
    )
    .join('');

  const swiper = new Swiper('.feedbacks-slider', {
    modules: [Navigation, Pagination, Keyboard],

    wrapperClass: 'feedbacks-list',
    slideClass: 'feedbacks-item',

    slidesPerView: 1,
    spaceBetween: 0,
    speed: 250,

    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },

    grabCursor: true,
    allowTouchMove: true,

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },

    pagination: {
      el: dots,
      clickable: true,
      bulletClass: 'feedbacks-dot',
      bulletActiveClass: 'is-active',
      renderBullet(index, className) {
        return `
          <button
            class="${className}"
            type="button"
            aria-label="Go to feedback ${index + 1}"
          ></button>
        `;
      },
    },

    watchOverflow: true,
    on: {
      init() {
        updateButtons(this);
      },
      slideChange() {
        updateButtons(this);
      },
      lock() {
        updateButtons(this);
      },
      unlock() {
        updateButtons(this);
      },
    },
  });

  function updateButtons(swiperInstance) {
    prevButton.disabled =
      swiperInstance.isBeginning || swiperInstance.isLocked;

    nextButton.disabled = swiperInstance.isEnd || swiperInstance.isLocked;
  }
}