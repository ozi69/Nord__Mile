// --- Обычные дропдауны (без ценового) ---
const filterDefaults = new Map();

document.querySelectorAll('.catalog-filter_list:not(:has(.catalog-filter__popup))').forEach(filter => {
  const head = filter.querySelector('.catalog-filter_list-head');
  const downList = filter.querySelector('.catalog-filter__down-list');
  const arrow = filter.querySelector('.catalog-filter_list-arrow');
  const text = filter.querySelector('.catalog-filter_list-hgroup__text');

  // Запоминаем дефолтный текст при инициализации
  filterDefaults.set(filter, text.textContent.trim());

  head.addEventListener('click', () => {
    const isOpen = downList.classList.contains('is-open');
    closeAll();
    if (!isOpen) {
      downList.classList.add('is-open');
      arrow.classList.add('is-rotated');
      filter.classList.add('is-open');
    }
  });

  downList.querySelectorAll('.catalog-filter__down-list__item').forEach(item => {
    item.addEventListener('click', () => {
      text.textContent = item.textContent.trim();
      downList.classList.remove('is-open');
      arrow.classList.remove('is-rotated');
      filter.classList.remove('is-open');
    });
  });
});

// --- Закрыть всё ---
const closeAll = () => {
  document.querySelectorAll('.catalog-filter__down-list').forEach(d => d.classList.remove('is-open'));
  document.querySelectorAll('.catalog-filter__popup').forEach(p => p.classList.remove('is-open'));
  document.querySelectorAll('.catalog-filter_list-arrow').forEach(a => a.classList.remove('is-rotated'));
  document.querySelectorAll('.catalog-filter_list').forEach(f => f.classList.remove('is-open'));
};

// --- Клик вне — закрыть всё ---
document.addEventListener('click', e => {
  if (!e.target.closest('.catalog-filter_list')) closeAll();
});

// --- Ценовой фильтр ---
const priceFilter = document.querySelector('.catalog-filter_list:has(.catalog-filter__popup)');

if (priceFilter) {
  const head = priceFilter.querySelector('.catalog-filter_list-head');
  const popup = priceFilter.querySelector('.catalog-filter__popup');
  const arrow = priceFilter.querySelector('.catalog-filter_list-arrow');

  const minPriceEl = priceFilter.querySelector('.popup-content__hgroup-text__item');
  const maxPriceEl = priceFilter.querySelector('.popup-content__hgroup-span__item');

  const progressBar = priceFilter.querySelector('.popup-progress');
  const activeBar = priceFilter.querySelector('.popup-progress__active');
  const toddler = priceFilter.querySelector('.popup-progress__active-toddler');

  const MIN = 520;
  const MAX = 8920;

  // Открыть/закрыть
  head.addEventListener('click', () => {
    const isOpen = popup.classList.contains('is-open');
    closeAll();
    if (!isOpen) {
      popup.classList.add('is-open');
      arrow.classList.add('is-rotated');
      priceFilter.classList.add('is-open');
    }
  });

  // Обновить ползунок — пишем в "от"
  const updateSlider = (value) => {
    const percent = ((value - MIN) / (MAX - MIN)) * 100;
    activeBar.style.width = percent + '%';
    minPriceEl.textContent = value + '₽';
  };

  // Инициализация — ползунок на минимуме
  updateSlider(MIN);


  // Закрытие по крестику
const closeBtn = priceFilter.querySelector('.close-popup__mobile');
closeBtn.addEventListener('click', () => {
  closeAll();
});

// Закрытие по клику на фон (сам .catalog-filter__popup)
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    closeAll();
  }
});

  // Перетаскивание
  let isDragging = false;

  const getValueFromEvent = (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    return Math.round(MIN + percent * (MAX - MIN));
  };

  toddler.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
  toddler.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });

  document.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(getValueFromEvent(e)); });
  document.addEventListener('touchmove', (e) => { if (isDragging) updateSlider(getValueFromEvent(e)); }, { passive: true });

  document.addEventListener('mouseup', () => { isDragging = false; });
  document.addEventListener('touchend', () => { isDragging = false; });

  progressBar.addEventListener('click', (e) => {
    if (e.target !== toddler) updateSlider(getValueFromEvent(e));
  });

  // Редактируемый минимум "от"
  minPriceEl.setAttribute('contenteditable', 'true');

  minPriceEl.addEventListener('keydown', (e) => {
    if (!/[\d]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === 'Enter') { e.preventDefault(); minPriceEl.blur(); }
  });

  minPriceEl.addEventListener('blur', () => {
    let val = parseInt(minPriceEl.textContent.replace(/\D/g, ''));
    if (isNaN(val) || val < MIN) val = MIN;
    const staticMax = parseInt(maxPriceEl.textContent.replace(/\D/g, ''));
    if (val > staticMax) val = staticMax;
    minPriceEl.textContent = val + '₽';
    const percent = ((val - MIN) / (MAX - MIN)) * 100;
    activeBar.style.width = percent + '%';
  });

  // --- Сброс всех фильтров ---
  const resetBtn = document.querySelector('.container-catalog__core-btn__item');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Возвращаем каждому фильтру его оригинальный заголовок
      document.querySelectorAll('.catalog-filter_list:not(:has(.catalog-filter__popup))').forEach(filter => {
        const text = filter.querySelector('.catalog-filter_list-hgroup__text');
        if (text) text.textContent = filterDefaults.get(filter);
      });

      // Сбрасываем ползунок на минимум
      updateSlider(MIN);

      closeAll();
    });
  }
}