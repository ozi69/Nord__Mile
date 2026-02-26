document.querySelectorAll('.catalog-filter_list').forEach(filter => {
  const head = filter.querySelector('.catalog-filter_list-head');
  const downList = filter.querySelector('.catalog-filter__down-list');
  const arrow = filter.querySelector('.catalog-filter_list-arrow');
  const text = filter.querySelector('.catalog-filter_list-hgroup__text');

  // Открыть/закрыть по клику на хед
  head.addEventListener('click', () => {
    const isOpen = downList.classList.contains('is-open');

    // Закрываем все
    document.querySelectorAll('.catalog-filter__down-list').forEach(d => d.classList.remove('is-open'));
    document.querySelectorAll('.catalog-filter_list-arrow').forEach(a => a.classList.remove('is-rotated'));
    document.querySelectorAll('.catalog-filter_list').forEach(f => f.classList.remove('is-open')); // ← добавь

    if (!isOpen) {
      downList.classList.add('is-open');
      arrow.classList.add('is-rotated');
      filter.classList.add('is-open'); // ← и это
    }
  });


  // Выбор пункта
  downList.querySelectorAll('.catalog-filter__down-list__item').forEach(item => {
    item.addEventListener('click', () => {
      text.textContent = item.textContent;
      downList.classList.remove('is-open');
      arrow.classList.remove('is-rotated');
    });
  });
});

// Клик вне фильтра — закрыть всё
document.addEventListener('click', e => {
  if (!e.target.closest('.catalog-filter_list')) {
    document.querySelectorAll('.catalog-filter__down-list').forEach(d => d.classList.remove('is-open'));
    document.querySelectorAll('.catalog-filter_list-arrow').forEach(a => a.classList.remove('is-rotated'));
  }
});