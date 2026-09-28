import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { showLoader, hideLoader } from './loader.js';

const BASE_URL = 'https://wedding-photographer.b.goit.study/api';

const gallery = document.querySelector('.portfolio__gallery');
const filtersContainer = document.querySelector('.portfolio__filters');
const loadMoreBtn = document.querySelector('.portfolio__more');

const state = {
  category: 'all',
  page: 1,
  limit: 9,
};

async function initCategories() {
  try {
    const { data } = await axios.get(`${BASE_URL}/categories`);
    console.log(data);
    renderFilters(data);
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load filter categories.',
      position: 'topRight',
    });
  }
}

function renderFilters(categories) {
  filtersContainer.innerHTML = '';

  let markup = `<button class="portfolio__filter is-active" type="button" data-filter="all">All Photos</button>`;

  markup += categories
    .map(cat => {
      return `<button class="portfolio__filter" type="button" data-filter="${cat._id}">${cat.category}</button>`;
    })
    .join('');

  filtersContainer.insertAdjacentHTML('beforeend', markup);
}

async function fetchPhotos(isAppend = false) {
  showLoader();

  try {
    const requestParams = {
      page: state.page,
      limit: state.limit,
    };

    if (state.category !== 'all') {
      requestParams.categoryId = state.category;
    }

    const { data } = await axios.get(`${BASE_URL}/wedding-photos`, {
      params: requestParams,
    });

    const photos = data.weddingPhotos;
    const totalItems = data.totalItems;

    if (photos.length === 0 && !isAppend) {
      gallery.innerHTML = '';
      loadMoreBtn.disabled = true;
      iziToast.info({
        title: 'Notice',
        message: 'There are no photos in this category yet.',
        position: 'topRight',
      });
      return;
    }

    if (!isAppend) {
      gallery.innerHTML = '';
    }

    renderGallery(photos);

    if (isAppend) {
      setTimeout(() => {
        if (gallery.firstElementChild) {
          const { height: cardHeight } =
            gallery.firstElementChild.getBoundingClientRect();
          let scrollMultiplier =
            window.innerWidth < 768 ? 0.8 : window.innerWidth < 1440 ? 1 : 1.2;
          window.scrollBy({
            top: cardHeight * scrollMultiplier,
            behavior: 'smooth',
          });
        }
      }, 100);
    }

    const isListEnded =
      state.page * state.limit >= totalItems || photos.length < state.limit;

    if (isListEnded) {
      loadMoreBtn.disabled = true;

      if (isAppend) {
        iziToast.info({
          title: 'End of list',
          message: 'You have viewed all photos in this category.',
          position: 'bottomCenter',
        });
      }
    } else {
      loadMoreBtn.disabled = false;
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load photos. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function renderGallery(photos) {
  const markup = photos
    .map(
      photo => `
    <li class="portfolio__item">
      <img class="portfolio__image" src="${photo.img}" alt="${photo.title || 'Wedding photo'}" loading="lazy" />
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

filtersContainer.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;

  const currentActive = filtersContainer.querySelector('.is-active');
  if (currentActive) currentActive.classList.remove('is-active');
  e.target.classList.add('is-active');

  state.category = e.target.dataset.filter;
  state.page = 1;
  state.limit = 9;

  fetchPhotos(false);
});

loadMoreBtn.addEventListener('click', () => {
  if (state.limit === 9) {
    state.limit = 3;
    state.page = 4;
  } else {
    state.page += 1;
  }

  fetchPhotos(true);
});

initCategories();
fetchPhotos();
