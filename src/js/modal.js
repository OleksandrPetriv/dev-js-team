import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { showLoader, hideLoader } from './loader.js';

axios.defaults.baseURL = 'https://wedding-photographer.b.goit.study/api'

const successModal = document.querySelector("#modal-succsess");
const modalCloseBtn = document.querySelector(".modal-close-btn")
const form = document.querySelector('.form');

modalCloseBtn.addEventListener('click', modalClose);
successModal.addEventListener('click', backdropClick);
document.addEventListener('keydown', modalKeyDown) 
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    showLoader();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    axios.post('/orders', data)
        .then(() => {
            hideLoader();
            modalOpen();
            form.reset();
        })
        .catch(() => {
            hideLoader();
            iziToast.error({
                message: 'Something went wrong. Please try again.',
            });
        });
}

function modalOpen() {
    successModal.classList.add('is-open');
    document.body.classList.add('scroll-locked');
}
function modalClose() {
    successModal.classList.remove('is-open');
    document.body.classList.remove('scroll-locked');
}

function modalKeyDown(event) {
    if (event.key === 'Escape') {
        modalClose()
    }
}

function backdropClick(event) {
      if (event.target === event.currentTarget) {
        modalClose()
    }
}
