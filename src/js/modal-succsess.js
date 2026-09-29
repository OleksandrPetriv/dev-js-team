const modalSuccsess = document.querySelector('#modal-succsess');
const modalCloseBtn = document.querySelector('.modal-close-btn');

modalCloseBtn.addEventListener('click', modalClose);
modalSuccsess.addEventListener('click', backdropClick);
document.addEventListener('keydown', modalKeyDown);

export function modalOpen() {
  modalSuccsess.classList.add('is-open');
  document.body.classList.add('scroll-locked');
}

function modalClose() {
  modalSuccsess.classList.remove('is-open');
  document.body.classList.remove('scroll-locked');
}

function modalKeyDown(event) {
  if (event.key === 'Escape') {
    modalClose();
  }
}

function backdropClick(event) {
  if (event.target === event.currentTarget) {
    modalClose();
  }
}
