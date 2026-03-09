class CodeInput {
  constructor() {
    this.fields = document.querySelectorAll('.code-field');
    this.code = '';
    this.init();
  }
  
  init() {
    this.fields.forEach((field, index) => {
      // При вводе цифры
      field.addEventListener('input', (e) => {
        const value = e.target.value;
        
        // Оставляем только цифры
        if (value && !/^\d+$/.test(value)) {
          field.value = '';
          return;
        }
        
        // Если ввели цифру - переходим к следующему полю
        if (value.length === 1 && index < this.fields.length - 1) {
          this.fields[index + 1].focus();
        }
        
        this.updateCode();
      });
      
      // При нажатии на backspace
      field.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !field.value && index > 0) {
          this.fields[index - 1].focus();
        }
      });
      
      // При вставке кода целиком
      field.addEventListener('paste', (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        const digits = paste.replace(/\D/g, '').split('');
        
        digits.forEach((digit, i) => {
          if (this.fields[i]) {
            this.fields[i].value = digit;
          }
        });
        
        // Фокус на следующее пустое поле
        const nextEmpty = Array.from(this.fields).find(f => !f.value);
        if (nextEmpty) {
          nextEmpty.focus();
        } else {
          this.fields[this.fields.length - 1].focus();
        }
        
        this.updateCode();
      });
    });
  }
  
  updateCode() {
    this.code = Array.from(this.fields).map(f => f.value).join('');
    console.log('Введенный код:', this.code);
    
    // Если все поля заполнены - автоматическая отправка
    if (this.code.length === this.fields.length) {
      this.submitCode();
    }
  }
  
  submitCode() {
    console.log('Отправка кода:', this.code);
    // Здесь логика отправки
  }
  
  clear() {
    this.fields.forEach(field => field.value = '');
    this.fields[0].focus();
  }
}

// Таймер для повторной отправки
class ResendTimer {
  constructor(buttonSelector, seconds = 60) {
    this.button = document.querySelector(buttonSelector);
    this.seconds = seconds;
    this.remaining = seconds;
    this.timer = null;
    
    this.init();
  }
  
  init() {
    this.startTimer();
    this.button.addEventListener('click', () => this.resendCode());
  }
  
  startTimer() {
    this.button.disabled = true;
    this.timer = setInterval(() => {
      this.remaining--;
      this.button.textContent = `Отправить код повторно через ${this.remaining}с`;
      
      if (this.remaining <= 0) {
        this.resetTimer();
      }
    }, 1000);
  }
  
  resetTimer() {
    clearInterval(this.timer);
    this.button.disabled = false;
    this.button.textContent = 'Отправить код повторно';
    this.remaining = this.seconds;
  }
  
  resendCode() {
    console.log('Код отправлен повторно');
    this.startTimer();
    // Здесь логика повторной отправки
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  const codeInput = new CodeInput();
  const resendTimer = new ResendTimer('#resendCode', 60);
});