document.addEventListener('DOMContentLoaded', function () {
  const burgers = document.querySelectorAll('.burger');
  const burgerMenu = document.querySelector('.burger-menu');
  const menuClose = document.querySelector('.menu-close');

  function isMobile() {
    return window.innerWidth <= 767;
  }

  // Открытие по клику на любой бургер
  burgers.forEach(burger => {
    burger.addEventListener('click', function () {
      burgerMenu.classList.add('menu-active');
      document.body.style.overflow = 'hidden';

      if (!isMobile()) {
        document.body.style.paddingRight = '15px';
      }
    });
  });

  // Закрытие по крестику
  if (menuClose) {
    menuClose.addEventListener('click', function () {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
      burgerMenu.classList.remove('menu-active');
    });
  }

  // Закрытие по клику вне меню
  document.addEventListener('click', function (e) {
    if (
      burgerMenu &&
      !burgerMenu.contains(e.target) &&
      !Array.from(burgers).some(burger => burger.contains(e.target))
    ) {
      burgerMenu.classList.remove('menu-active');
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }
  });
});