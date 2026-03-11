document.addEventListener('DOMContentLoaded', function() {
  
  // Находим все элементы
  const tabItems = document.querySelectorAll('.aside-account__tabs-item');
  const tabContents = {
    personal: document.querySelector('.account__personal'),
    orders: document.querySelector('.account__orders'),
    bonus: document.querySelector('.account__bonus')
  };
  
  // Функция для скрытия всех контентов
  function hideAllContents() {
    Object.values(tabContents).forEach(content => {
      if (content) {
        content.style.display = 'none';
      }
    });
  }
  
  // Функция для удаления активного класса у всех табов
  function removeActiveClass() {
    tabItems.forEach(item => {
      item.classList.remove('active');
    });
  }
  
  // Функция для отображения нужного контента
  function showContent(tabType) {
    hideAllContents();
    
    switch(tabType) {
      case 'person':
        if (tabContents.personal) {
          tabContents.personal.style.display = 'block';
        }
        break;
      case 'orders':
        if (tabContents.orders) {
          tabContents.orders.style.display = 'block';
        }
        break;
      case 'bonus':
        if (tabContents.bonus) {
          tabContents.bonus.style.display = 'block';
        }
        break;
    }
  }
  
  // Добавляем обработчики на табы
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      // Удаляем активный класс у всех
      removeActiveClass();
      
      // Добавляем активный класс текущему табу
      this.classList.add('active');
      
      // Определяем какой таб был нажат и показываем соответствующий контент
      if (this.classList.contains('aside-account__tabs-item__person')) {
        showContent('person');
      } else if (this.classList.contains('aside-account__tabs-item__orders')) {
        showContent('orders');
      } else if (this.classList.contains('aside-account__tabs-item__bonus')) {
        showContent('bonus');
      }
    });
  });
  
  // Показываем первый таб по умолчанию (личные данные)
  const defaultTab = document.querySelector('.aside-account__tabs-item__person');
  if (defaultTab) {
    defaultTab.classList.add('active');
    showContent('person');
  }
  
  // Обработчик для кнопки "Выход"
  const exitButton = document.querySelector('.aside-account__exit');
  if (exitButton) {
    exitButton.addEventListener('click', function() {
      // Здесь логика выхода
      console.log('Выход из аккаунта');
      // window.location.href = '/logout';
    });
  }
  
});


document.querySelector('.account__personal-head-hgroup__btn').addEventListener('click', function () {
  document.querySelectorAll('span.label-def-text.input-def').forEach(function (span) {
    const input = document.createElement('input');
    // Копируем классы
    input.className = span.className;
    // Берём текст как значение поля
    input.value = span.textContent.trim();
    span.parentNode.replaceChild(input, span);
  });
});