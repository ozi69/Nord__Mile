document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.hero-swiper', {
      direction: 'horizontal',
      loop: true,
      speed: 800,
      slidesPerView: 1,
      spaceBetween: 0,

      // Кастомные кнопки
      navigation: {
        nextEl: '.swipper-hero__btn-right',
        prevEl: '.swipper-hero__btn-left',
      },

      pagination: {
        el: '.hero-swiper-pagination',
        clickable: true,
        bulletClass: 'hero-pagination-bullet',        
        bulletActiveClass: 'hero-pagination-bullet-active',
      },

      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },

      effect: 'slide',   // или 'fade'
      // fadeEffect: { crossFade: true },
    });
  });