import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';

const feedbacksList = document.querySelector('.feedbacks-list');
const prevButton = document.querySelector('.feedbacks-button-prev');
const nextButton = document.querySelector('.feedbacks-button-next');

const API_URL =
  'https://wedding-photographer.b.goit.study/api/feedbacks';

async function getFeedbacks() {
  try {
    const { data } = await axios.get(API_URL);

    const feedbacks = Array.isArray(data)
      ? data
      : data.feedbacks ?? data.items ?? [];

    renderFeedbacks(feedbacks);
    initSwiper();
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
  }
}

function renderFeedbacks(feedbacks) {
  feedbacksList.innerHTML = feedbacks
    .map(
      feedback => `
        <li class="feedbacks-item swiper-slide">
          <article class="feedbacks-card">
            <p class="feedbacks-text">
              ${feedback.descr}
            </p>

            <p class="feedbacks-author">
              ${feedback.name}
            </p>
          </article>
        </li>
      `
    )
    .join('');
}

function initSwiper() {
  new Swiper('.feedbacks-slider', {
    modules: [Navigation, Keyboard],

    slidesPerView: 1,

    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
  });
}

getFeedbacks();