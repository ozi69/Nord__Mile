document.addEventListener('DOMContentLoaded', () => {
  const core = document.querySelector('.catalog-shop-core');
  const cards = core.querySelectorAll('.card-catalog');
  const btn = document.querySelector('.container-catalog__block-btn');
  const btnText = btn.querySelector('p');

  const isMobile = () => window.innerWidth <= 767;
  const getStep = () => isMobile() ? 4 : 8;

  let shown = getStep();

  function updateCards() {
    cards.forEach((card, i) => {
      card.style.display = i < shown ? '' : 'none';
    });

    btnText.textContent = shown >= cards.length ? 'Скрыть все' : 'Показать ещё';
  }

  btn.addEventListener('click', () => {
    if (shown >= cards.length) {
      shown = getStep();
    } else {
      shown = Math.min(shown + getStep(), cards.length);
    }
    updateCards();
  });

  updateCards();
});