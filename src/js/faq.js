const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.closest('.faq-item');
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const faqIcon = question.querySelector('.faq-icon use');

    const isOpen = faqAnswer.style.display === 'block';

    faqAnswer.style.display = isOpen ? 'none' : 'block';
    faqIcon.setAttribute(
      'href',
      isOpen ? './img/sprite.svg#icon-plus' : './img/sprite.svg#icon-close'
    );
    question.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });
});