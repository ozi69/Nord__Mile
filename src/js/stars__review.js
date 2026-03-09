class RatingSystem {
  constructor() {
    this.rating = 0;
    this.stars = document.querySelectorAll('.modal__review-block__grade-star');
    
    this.init();
  }
  
  init() {
    // Добавляем data-rating атрибуты если их нет
    this.stars.forEach((star, index) => {
      if (!star.dataset.rating) {
        star.dataset.rating = index + 1;
      }
    });
    
    // Вешаем обработчики
    this.stars.forEach(star => {
      star.addEventListener('click', (e) => this.setRating(e));
      star.addEventListener('mouseenter', (e) => this.hoverRating(e));
      star.addEventListener('mouseleave', () => this.resetHover());
    });
  }
  
  setRating(event) {
    const newRating = parseInt(event.currentTarget.dataset.rating);
    this.rating = newRating;
    this.updateStars();
  }
  
  updateStars() {
    this.stars.forEach(star => {
      const starRating = parseInt(star.dataset.rating);
      
      if (starRating <= this.rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }
  
  hoverRating(event) {
    const hoverRating = parseInt(event.currentTarget.dataset.rating);
    
    this.stars.forEach(star => {
      const starRating = parseInt(star.dataset.rating);
      
      // Временно убираем активный класс
      star.classList.remove('active');
      
      // Добавляем hover класс для звезд до текущей (включительно)
      if (starRating <= hoverRating) {
        star.classList.add('hover');
      } else {
        star.classList.remove('hover');
      }
    });
  }
  
  resetHover() {
    this.stars.forEach(star => {
      star.classList.remove('hover');
    });
    
    // Возвращаем активные звезды
    this.updateStars();
  }
}

// Инициализация
const rating = new RatingSystem();


// 



class TextareaCounter {
  constructor() {
    this.textarea = document.getElementById('text-amount');
    this.counterSpan = document.querySelector('.label-def__block-counter');
    this.minSymbols = 20;
    
    this.init();
  }
  
  init() {
    if (!this.textarea || !this.counterSpan) return;
    
    // Слушаем события ввода
    this.textarea.addEventListener('input', () => this.updateCounter());
    this.textarea.addEventListener('keyup', () => this.updateCounter());
    
    // Первоначальный подсчет
    this.updateCounter();
  }
  
  updateCounter() {
    const textLength = this.textarea.value.length;
    this.counterSpan.textContent = textLength;
    
    // Добавляем классы для визуального отображения
    if (textLength >= this.minSymbols) {
      this.counterSpan.classList.add('valid');
      this.textarea.classList.add('valid');
    } else {
      this.counterSpan.classList.remove('valid');
      this.textarea.classList.remove('valid');
    }
    
    // Если текст превышает лимит (опционально)
    // if (textLength > 500) {
    //   this.counterSpan.classList.add('too-much');
    // }
  }
}

// Инициализация
const textCounter = new TextareaCounter();



class HorizontalScroll {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    
    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;
    
    this.init();
  }
  
  init() {
    // События мыши для перетаскивания
    this.container.addEventListener('mousedown', (e) => this.startDrag(e));
    this.container.addEventListener('mouseleave', () => this.stopDrag());
    this.container.addEventListener('mouseup', () => this.stopDrag());
    this.container.addEventListener('mousemove', (e) => this.drag(e));
    
    // Предотвращаем стандартное поведение при перетаскивании
    this.container.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Скролл колесиком мыши (горизонтальный)
    this.container.addEventListener('wheel', (e) => this.wheelScroll(e));
  }
  
  startDrag(e) {
    this.isDown = true;
    this.container.classList.add('dragging');
    this.startX = e.pageX - this.container.offsetLeft;
    this.scrollLeft = this.container.scrollLeft;
  }
  
  stopDrag() {
    this.isDown = false;
    this.container.classList.remove('dragging');
  }
  
  drag(e) {
    if (!this.isDown) return;
    e.preventDefault();
    
    const x = e.pageX - this.container.offsetLeft;
    const walk = (x - this.startX) * 2; // Скорость скролла
    this.container.scrollLeft = this.scrollLeft - walk;
  }
  
  wheelScroll(e) {
    e.preventDefault();
    
    // Скролл горизонтальный колесиком (Shift + колесико или обычное колесико)
    if (e.shiftKey) {
      // Если зажат Shift - уже горизонтальный скролл
      this.container.scrollLeft += e.deltaY;
    } else {
      // Обычное колесико - скроллим горизонтально
      this.container.scrollLeft += e.deltaY;
    }
    
    // Плавный скролл
    this.container.style.scrollBehavior = 'smooth';
    setTimeout(() => {
      this.container.style.scrollBehavior = 'auto';
    }, 100);
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  new HorizontalScroll('.modal__review-block_add');
});