document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.banner-swiper', {
      direction: 'horizontal',
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      spaceBetween: 0,

      // Кастомные кнопки
      navigation: {
        nextEl: '.swipper-banner__btn-right',
        prevEl: '.swipper-banner__btn-left',
      },

      pagination: {
        el: '.banner-swiper-pagination',
        clickable: true,
        bulletClass: 'hero-pagination-bullet banner-pagination-bullet',   
        bulletActiveClass: 'hero-pagination-bullet-active banner-pagination-bullet-active',
      },

      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },

      effect: 'slide',   // или 'fade'
      // fadeEffect: { crossFade: true },
    });
  });