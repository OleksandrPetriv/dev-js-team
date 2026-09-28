import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { showLoader, hideLoader } from './loader.js';
import { modalOpen } from './modal-succsess.js';

const form = document.querySelector('.form-container form');
const submitBtn = document.querySelector('.submit-button');
const nameInput = form.elements.name;
const phoneInput = form.elements.phone;
const messageInput = form.elements.message;
const nameContainer = nameInput.closest('.input-container');
const phoneContainer = phoneInput.closest('.input-container');

form.addEventListener('submit', async event => {
  event.preventDefault();
  nameContainer.classList.remove('has-error');
  phoneContainer.classList.remove('has-error');

  const payload = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    message: messageInput.value.trim(),
  };
  let isValid = true;

  if (!payload.name) {
    nameContainer.classList.add('has-error');
    isValid = false;
  }
  if (!payload.phone) {
    phoneContainer.classList.add('has-error');
    isValid = false;
  }

  if (!isValid) {
    iziToast.warning({
      title: 'Увага',
      message: "Будь ласка, заповніть всі обов'язкові поля правильно.",
      position: 'topRight',
    });
    return;
  }

  submitBtn.disabled = true;
  showLoader();

  try {
    const response = await fetch(
      'https://wedding-photographer.b.goit.study/api/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error('Помилка сервера. Спробуйте пізніше.');
    }

    form.reset();
    modalOpen();

  } catch (error) {
    console.error('Помилка POST-запиту:', error);

    iziToast.error({
      title: 'Помилка',
      message:
        "Щось пішло не так під час відправки. Перевірте з'єднання та спробуйте ще раз.",
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    hideLoader();
    submitBtn.disabled = false;
  }
});

