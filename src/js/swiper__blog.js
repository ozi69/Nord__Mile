document.addEventListener('DOMContentLoaded', function() {
  const stockSwiper = new Swiper('.blog-swiper', {
    slidesPerView: 4,
    spaceBetween: 32,
    
    navigation: {
      nextEl: '.blog-btn__catalog-right',
      prevEl: '.blog-btn__catalog-left',
    },
    
    breakpoints: {
      320: {
        slidesPerView: 1.1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    
    speed: 400,
    loop: false,
    grabCursor: true,
  });
});