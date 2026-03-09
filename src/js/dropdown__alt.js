document.addEventListener('DOMContentLoaded', function() {
  
  class CustomDropdown {
    constructor(container) {
      this.container = container;
      this.input = container.querySelector('.dropdown-input');
      this.list = container.querySelector('.dropdown-list');
      this.items = container.querySelectorAll('.dropdown-def__item');
      this.svg = container.querySelector('.dropdown__svg'); // Добавили ссылку на svg
      this.selectedValue = '';
      
      this.init();
    }
    
    init() {
      // Показываем/скрываем список при клике на input
      this.input.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown();
      });
      
      // Фильтрация при вводе
      this.input.addEventListener('input', () => {
        this.filterItems();
        this.showDropdown();
      });
      
      // Обработка клавиш
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideDropdown();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const visibleItems = this.getVisibleItems();
          if (visibleItems.length === 1) {
            this.selectItem(visibleItems[0]);
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.navigateItems('down');
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.navigateItems('up');
        }
      });
      
      // Клик по элементу списка
      this.items.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectItem(item);
        });
      });
      
      // Закрытие при клике вне
      document.addEventListener('click', (e) => {
        if (!this.container.contains(e.target)) {
          this.hideDropdown();
        }
      });
      
      // При потере фокуса input
      this.input.addEventListener('blur', () => {
        setTimeout(() => {
          this.hideDropdown();
        }, 200);
      });
    }
    
    toggleDropdown() {
      if (this.list.classList.contains('show')) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    }
    
    showDropdown() {
      this.list.classList.add('show');
      // Добавляем класс rotate к svg
      if (this.svg) {
        this.svg.classList.add('rotate');
      }
    }
    
    hideDropdown() {
      this.list.classList.remove('show');
      // Убираем класс rotate с svg
      if (this.svg) {
        this.svg.classList.remove('rotate');
      }
      this.removeHighlight();
    }
    
    filterItems() {
      const searchText = this.input.value.toLowerCase().trim();
      
      this.items.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        if (searchText === '' || itemText.includes(searchText)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
    
    selectItem(item) {
      const value = item.getAttribute('data-value') || item.textContent;
      this.input.value = value;
      this.selectedValue = value;
      
      // Убираем выделение со всех
      this.items.forEach(i => i.classList.remove('selected'));
      
      // Выделяем выбранный
      item.classList.add('selected');
      
      // Скрываем список (автоматически уберет класс rotate)
      this.hideDropdown();
      
      // Триггерим событие change
      this.input.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Добавляем подсветку валидации
      this.input.style.borderColor = 'var(--primary)';
    }
    
    getVisibleItems() {
      return Array.from(this.items).filter(item => 
        item.style.display !== 'none'
      );
    }
    
    navigateItems(direction) {
      const visibleItems = this.getVisibleItems();
      if (visibleItems.length === 0) return;
      
      let currentIndex = -1;
      
      // Находим текущий выделенный элемент
      visibleItems.forEach((item, index) => {
        if (item.classList.contains('highlighted')) {
          currentIndex = index;
        }
      });
      
      // Убираем текущее выделение
      this.removeHighlight();
      
      // Вычисляем новый индекс
      if (currentIndex === -1) {
        currentIndex = direction === 'down' ? 0 : visibleItems.length - 1;
      } else {
        if (direction === 'down') {
          currentIndex = (currentIndex + 1) % visibleItems.length;
        } else {
          currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        }
      }
      
      // Выделяем новый элемент
      visibleItems[currentIndex].classList.add('highlighted');
      
      // Прокручиваем к выделенному элементу
      visibleItems[currentIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
    
    removeHighlight() {
      this.items.forEach(item => {
        item.classList.remove('highlighted');
      });
    }
    
    // Получить выбранное значение
    getValue() {
      return this.selectedValue || this.input.value;
    }
    
    // Установить значение программно
    setValue(value) {
      this.input.value = value;
      this.selectedValue = value;
      
      // Выделяем соответствующий элемент
      this.items.forEach(item => {
        const itemValue = item.getAttribute('data-value') || item.textContent;
        if (itemValue === value) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      
      this.input.style.borderColor = 'var(--primary)';
      
      // Скрываем список и убираем rotate
      this.hideDropdown();
    }
  }
  
  // Инициализация всех дропдаунов
  const dropdownContainers = document.querySelectorAll('.dropdown-container');
  const dropdowns = [];
  
  dropdownContainers.forEach(container => {
    dropdowns.push(new CustomDropdown(container));
  });
  
});