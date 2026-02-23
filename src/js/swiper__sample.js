document.addEventListener('DOMContentLoaded', function() {
  
document.querySelectorAll('.card-image-swiper').forEach((swiperEl) => {
  // Находим родительскую карточку
  const card = swiperEl.closest('.card-catalog');
  if (!card) return;

  // Создаем мини-слайдер
  const imageSwiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 500,
    
    pagination: {
      el: swiperEl.querySelector('.swiper-pagination'),
      clickable: true,
    },
    
    touchRatio: 1,
    simulateTouch: true,
    loop: true,
    
    // Автоплей по умолчанию выключен
    autoplay: false,
  });

  // При наведении на карточку - включаем автоплей
  card.addEventListener('mouseenter', () => {
    imageSwiper.params.autoplay = {
      delay: 5000,        // 5 секунд
      disableOnInteraction: false, // не отключается после взаимодействия
    };
    imageSwiper.autoplay.start();
  });

  // При уходе с карточки - выключаем автоплей
  card.addEventListener('mouseleave', () => {
    imageSwiper.autoplay.stop();
    imageSwiper.params.autoplay = false;
  });
});
  
  // Инициализация основного слайдера
  const catalogSwiper = new Swiper('.catalog-swiper', {
    slidesPerView: 4,
    spaceBetween: 32,
    
    navigation: {
      nextEl: '.head-btn__catalog-right',
      prevEl: '.head-btn__catalog-left',
    },
    
    breakpoints: {
      320: {
        slidesPerView: 1.15,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 4.1,
        spaceBetween: 20,
      },
    },
    
    speed: 400,
    loop: false,
    grabCursor: true,
  
  });
});