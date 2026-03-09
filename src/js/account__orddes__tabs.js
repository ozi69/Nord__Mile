document.addEventListener('DOMContentLoaded', function() {
  
  // Находим все кнопки "Подробнее"
  const detailButtons = document.querySelectorAll('.order-detail-btn');
  
  // Находим блоки
  const ordersBlock = document.querySelector('.core__account__orders-order');
  const showMoreBtn = document.querySelector('.account-oredrs__btn');
  const specificProduct = document.querySelector('.container__specific-product');
  const backButton = document.querySelector('.back-to-orders');
  
  // Клик по кнопке "Подробнее"
  detailButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Скрываем список заказов и кнопку "Показать еще"
      if (ordersBlock) ordersBlock.classList.add('hide');
      if (showMoreBtn) showMoreBtn.classList.add('hide');
      
      // Показываем детали заказа
      if (specificProduct) specificProduct.classList.add('show');
    });
  });
  
  // Клик по кнопке "Назад к заказам"
  if (backButton) {
    backButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Показываем список заказов и кнопку "Показать еще"
      if (ordersBlock) ordersBlock.classList.remove('hide');
      if (showMoreBtn) showMoreBtn.classList.remove('hide');
      
      // Скрываем детали заказа
      if (specificProduct) specificProduct.classList.remove('show');
    });
  }
  
});