document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.card-progress-bar');
  const activeBar = document.querySelector('.card-progress-bar__active');
  const toddler = document.querySelector('.card-progress-bar__toddler');

  const fromEl = document.querySelector('.card-progress-bar__quantity-from');
  const writeOffEl = document.querySelector('.card-progress-bar-text_item');
  const toEl = document.querySelector('.card-progress-bar__quantity-to__item');

  // Максимум бонусов
  const MAX = parseInt(toEl.textContent.replace(/\D/g,'')) || 0;
  let isDragging = false;

  // Обновление прогресс-бара
  function updateSlider(value) {
    value = Math.min(Math.max(0, value), MAX);
    const percent = (value / MAX) * 100;

    // ширина активной линии
    activeBar.style.width = percent + '%';


    // обновляем значения
    fromEl.textContent = value + '₽';
    writeOffEl.textContent = value;
  }

  // Вычисление значения по позиции мыши/тача
  function getValueFromEvent(e) {
    const rect = progressBar.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    return Math.round(percent * MAX);
  }

  // --- Drag ---
  toddler.addEventListener('mousedown', e => { isDragging = true; e.preventDefault(); });
  toddler.addEventListener('touchstart', e => { isDragging = true; }, { passive: true });

  document.addEventListener('mousemove', e => { if (isDragging) updateSlider(getValueFromEvent(e)); });
  document.addEventListener('touchmove', e => { if (isDragging) updateSlider(getValueFromEvent(e)); }, { passive: true });

  document.addEventListener('mouseup', () => { isDragging = false; });
  document.addEventListener('touchend', () => { isDragging = false; });

  // --- Click по прогрессбару ---
  progressBar.addEventListener('click', e => {
    if (e.target !== toddler) updateSlider(getValueFromEvent(e));
  });

  // --- Редактируемый input "от" ---
  fromEl.setAttribute('contenteditable', 'true');

  fromEl.addEventListener('keydown', e => {
    if (!/[\d]/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Enter'].includes(e.key)) e.preventDefault();
    if (e.key === 'Enter') { e.preventDefault(); fromEl.blur(); }
  });

  fromEl.addEventListener('blur', () => {
    let val = parseInt(fromEl.textContent.replace(/\D/g,'')) || 0;
    val = Math.min(Math.max(0, val), MAX);
    updateSlider(val);
    fromEl.textContent = val + '₽';
  });

  // --- Инициализация стартового положения ---
  updateSlider(0);
});