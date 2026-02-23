document.addEventListener('DOMContentLoaded', function () {
  let originalParent = null;       // где был header изначально
  let originalNextSibling = null;  // элемент, после которого он стоял

  const wrapper = document.querySelector('.wrapper');
  if (!wrapper) {
    console.warn('.wrapper не найден');
    return;
  }

  function moveHeaderToWrapper() {
    const slides = document.querySelectorAll('.hero-swiper .swiper-slide');
    if (slides.length === 0) return;

    const firstSlide = slides[0];
    const header = firstSlide.querySelector('header');

    if (!header) {
      console.warn('Header не найден в первом слайде');
      return;
    }

    // Запоминаем исходное положение ТОЛЬКО один раз
    if (!originalParent) {
      originalParent = header.parentElement;
      originalNextSibling = header.nextElementSibling;
    }

    // Удаляем header из остальных слайдов (если они есть)
    for (let i = 1; i < slides.length; i++) {
      const otherHeader = slides[i].querySelector('header');
      if (otherHeader) otherHeader.remove();
    }

    // Перемещаем header в wrapper
    wrapper.prepend(header);

    // Обновляем Swiper
    updateSwiper();
  }

  function restoreHeaderToFirstSlide() {
    const header = wrapper.querySelector('header');
    if (!header || !originalParent) return;

    // Возвращаем header обратно в первый слайд
    if (originalNextSibling) {
      originalParent.insertBefore(header, originalNextSibling);
    } else {
      originalParent.appendChild(header);
    }

    // Обновляем Swiper после возврата
    updateSwiper();
  }

  function updateSwiper() {
    if (window.swiper && typeof window.swiper.update === 'function') {
      setTimeout(() => {
        window.swiper.update();
        window.swiper.updateSize();
        window.swiper.updateProgress();
      }, 50);
    }
  }

  function handleResize() {
    const isMobile = window.innerWidth <= 767;

    if (isMobile) {
      moveHeaderToWrapper();
    } else {
      restoreHeaderToFirstSlide();
    }
  }

  // Запускаем при загрузке
  handleResize();

  // Слушаем изменение размера окна
  window.addEventListener('resize', handleResize);
});