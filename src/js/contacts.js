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
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
  input.addEventListener('focus', function () {
    const container = this.closest('.input-container');
    if (container && container.classList.contains('has-error')) {
      container.classList.remove('has-error');
    }
  });
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  nameContainer.classList.remove('has-error');
  phoneContainer.classList.remove('has-error');

  const rawPhone = phoneInput.value.trim();
  const cleanPhone = rawPhone.replace(/\D/g, '');

  const payload = {
    name: nameInput.value.trim(),
    phone: cleanPhone,
    message: messageInput.value.trim(),
  };

  let isValid = true;

  if (!payload.name) {
    nameContainer.classList.add('has-error');
    isValid = false;
  }

  const phoneRegex = /^[0-9]{12}$/;

  if (!payload.phone || !phoneRegex.test(payload.phone)) {
    phoneContainer.classList.add('has-error');
    isValid = false;
  }

  if (!isValid) {
    iziToast.warning({
      title: 'Warning',
      message:
        'Please enter a valid 12-digit phone number (e.g. 380XXXXXXXXX) and fill all required fields.',
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
      throw new Error('Server error. Please try again later.');
    }

    form.reset();
    modalOpen();
  } catch (error) {
    console.error('Помилка POST-запиту:', error);

    iziToast.error({
      title: 'Error',
      message:
        'Something went wrong during submission. Please check your connection and try again.',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    hideLoader();
    submitBtn.disabled = false;
  }
});
