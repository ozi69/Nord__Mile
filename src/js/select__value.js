// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  
  // Функция для инициализации группы выбора
  function initSelectGroup(containerSelector, itemSelector, activeClass = 'active') {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const items = container.querySelectorAll(itemSelector);
    
    items.forEach(item => {
      item.addEventListener('click', function() {
        // Убираем активный класс у всех элементов в этой группе
        items.forEach(el => el.classList.remove(activeClass));
        
        // Добавляем активный класс текущему элементу
        this.classList.add(activeClass);
      });
    });
  }
  
  // Инициализируем первую группу (способы доставки)
  initSelectGroup('.aside-basket__two-block', '.aside-basket__two-item');
  
  // Инициализируем вторую группу (способы оплаты)
  initSelectGroup('.aside-basket__three-block', '.aside-basket__two-item');
  
});