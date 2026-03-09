const tabBtns = document.querySelectorAll('.card-date__tabs-item');
const tabContents = document.querySelectorAll('.card-date__tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    // Снимаем класс active со всех кнопок
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); // подсветка текущей кнопки

    // Скрываем все табы
    tabContents.forEach(tab => {
      tab.classList.remove('is-visible', 'is-active');
    });

    // Показываем выбранный таб
    const el = document.getElementById('tab-' + target);
    if (!el) return;

    el.classList.add('is-active'); // активируем таб
    el.getBoundingClientRect();    // принудительный reflow для анимации
    el.classList.add('is-visible'); // плавное проявление
  });
});

// Инициализация: показать только первый таб
window.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.card-date__tab-content.is-active');
  const firstBtn = document.querySelector('.card-date__tabs-item.is-active');

  if (first) first.classList.add('is-visible');
  if (firstBtn) {
    firstBtn.classList.add('active'); // подсветка первой кнопки
  }
});