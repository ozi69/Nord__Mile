document.addEventListener('DOMContentLoaded', function () {

  // ── HERO SWIPER ──────────────────────────────────
  new Swiper('.hero-swiper', {
    direction: 'horizontal',
    loop: true,
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 0,
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
      delay: 6000,
      disableOnInteraction: false,
    },
  });

  // ── BANNER SWIPER ─────────────────────────────────
  new Swiper('.banner-swiper', {
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 0,
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
  });

  // ── STOCK SWIPER ──────────────────────────────────
  new Swiper('.stock-swiper', {
    slidesPerView: 4,
    spaceBetween: 32,
    navigation: {
      nextEl: '.head-btn__stock-right',
      prevEl: '.head-btn__stock-left',
    },
    breakpoints: {
      0: {
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

  // ── BLOG SWIPER ───────────────────────────────────
  new Swiper('.blog-swiper', {
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

  // ── CATALOG SWIPER ────────────────────────────────
new Swiper('.catalog-swiper', {
  slidesPerView: 4,
  spaceBetween: 32,
  navigation: {
    nextEl: '.head-btn__catalog-right',
    prevEl: '.head-btn__catalog-left',
  },
  noSwipingSelector: '.card-image-swiper', // ← вот это
  breakpoints: {
    320: { slidesPerView: 1.15, spaceBetween: 16 },
    768: { slidesPerView: 4.1, spaceBetween: 20 },
  },
  speed: 400,
  loop: false,
  grabCursor: true,
});

  // ── CARD IMAGE SWIPERS (внутри карточек) ──────────
 document.querySelectorAll('.card-image-swiper').forEach((swiperEl) => {
  const card = swiperEl.closest('.card-catalog');
  if (!card) return;

  // Останавливаем всплытие touch/mouse событий с мини-слайдера
  ['touchstart', 'touchmove', 'touchend', 'mousedown'].forEach(eventName => {
    swiperEl.addEventListener(eventName, e => e.stopPropagation());
  });

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
    autoplay: false,
  });

  card.addEventListener('mouseenter', () => {
    imageSwiper.params.autoplay = {
      delay: 4500,
      disableOnInteraction: false,
    };
    imageSwiper.autoplay.start();
  });

  card.addEventListener('mouseleave', () => {
    imageSwiper.autoplay.stop();
    imageSwiper.params.autoplay = false;
  });
});

});