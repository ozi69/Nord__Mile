document.addEventListener('DOMContentLoaded', function () {

  // ────────────────────────────────────────────────
  // 1. Класс только для модальных окон (включая quiz)
  // ────────────────────────────────────────────────
  class ModalManager {
    constructor(options = {}) {
      this.modalSelector   = options.modalSelector   || '.modal';
      this.openSelector    = options.openSelector    || '[data-modal-open]';
      this.closeSelector   = options.closeSelector   || '[data-modal-close]';
      this.activeClass     = options.activeClass     || 'modal-active';
      this.onOpen          = options.onOpen          || null;
      this.onClose         = options.onClose         || null;

      this.activeModals = new Set();
    }

    init() {
      this.initModals();
    }

    lockScroll() {
      document.body.style.overflow = 'hidden';
      if (window.innerWidth > 767) {
        document.body.style.paddingRight = '15px';
      }
    }

    unlockScroll() {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }

    openModal(modal) {
      if (this.activeModals.has(modal)) return;

      modal.style.display = 'flex';
      modal.classList.add('modal-enter-from');

      this.lockScroll();
      this.activeModals.add(modal);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          modal.classList.remove('modal-enter-from');
        });
      });

      if (this.onOpen) this.onOpen(modal);
    }

    closeModal(modal) {
      if (!this.activeModals.has(modal)) return;

      modal.classList.add('modal-leave-to');

      const onTransitionEnd = () => {
        modal.style.display = 'none';
        modal.classList.remove('modal-leave-to');

        this.unlockScroll();
        this.activeModals.delete(modal);

        if (this.onClose) this.onClose(modal);
        modal.removeEventListener('transitionend', onTransitionEnd);
      };

      modal.addEventListener('transitionend', onTransitionEnd);
      setTimeout(onTransitionEnd, 400); // запасной выход
    }

    initModals() {
      const modals = document.querySelectorAll(this.modalSelector);
      const openButtons = document.querySelectorAll(this.openSelector);
      const closeButtons = document.querySelectorAll(this.closeSelector);

      openButtons.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          const modalId = btn.getAttribute('data-modal-open');
          const modal = document.querySelector(modalId);
          if (modal) this.openModal(modal);
        });
      });

closeButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const modal = btn.closest(this.modalSelector);
    if (modal) this.closeModal(modal); // просто вызываем уже готовый метод
  });
});

      modals.forEach(modal => {
        modal.addEventListener('click', e => {
          if (e.target === modal) this.closeModal(modal);
        });
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          this.activeModals.forEach(modal => this.closeModal(modal));
        }
      });
    }
  }

  // ────────────────────────────────────────────────
  // 2. Отдельная функция для бургер-меню (анимация работает как раньше)
  // ────────────────────────────────────────────────
  function initBurgerMenu() {
    const burgers    = document.querySelectorAll('.burger');
    const burgerMenu = document.querySelector('.burger-menu');
    const menuClose  = document.querySelector('.menu-close');

    if (!burgerMenu) return;

    const open = () => {
      burgerMenu.classList.add('menu-active');
      document.body.style.overflow = 'hidden';
      if (window.innerWidth > 767) {
        document.body.style.paddingRight = '15px';
      }
    };

    const close = () => {
      burgerMenu.classList.remove('menu-active');
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };

    burgers.forEach(burger => burger.addEventListener('click', open));
    if (menuClose) menuClose.addEventListener('click', close);

    document.addEventListener('click', e => {
      if (
        burgerMenu.classList.contains('menu-active') &&
        !burgerMenu.contains(e.target) &&
        !Array.from(burgers).some(b => b.contains(e.target))
      ) {
        close();
      }
    });
  }

  // ────────────────────────────────────────────────
  // Инициализация всего
  // ────────────────────────────────────────────────
  const modalManager = new ModalManager({
    modalSelector: '.modal',
    openSelector: '[data-modal-open]',
    closeSelector: '[data-modal-close]',
    activeClass: 'modal-active'
  });

  modalManager.init();
  initBurgerMenu();

});



