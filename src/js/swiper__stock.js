document.addEventListener('DOMContentLoaded', function() {
  const stockSwiper = new Swiper('.stock-swiper', {
    slidesPerView: 4,
    spaceBetween: 32,
    
    navigation: {
      nextEl: '.head-btn__catalog-right',
      prevEl: '.head-btn__catalog-left',
    },
    
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    
    speed: 400,
    loop: false,
    grabCursor: true,
  });
});