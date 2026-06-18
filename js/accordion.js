document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (trigger && answer && icon) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Toggle active status
        if (isOpen) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
          icon.textContent = '+';
        } else {
          item.classList.add('active');
          // Set max-height to scrollHeight to animate expanding smoothly
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.textContent = '−';
        }
      });
    }
  });

  // Re-adjust max-height if the window is resized while accordions are open
  window.addEventListener('resize', () => {
    faqItems.forEach(item => {
      if (item.classList.contains('active')) {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });
});
