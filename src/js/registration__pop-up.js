// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Получаем все модальные окна
  const modals = document.querySelectorAll('.modal__alt');
  
  // Функция для скрытия всех модальных окон
  function hideAllModals() {
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
  }
  
  // Функция для показа конкретного модального окна
  function showModal(modalId) {
    hideAllModals();
    const modalToShow = document.getElementById(modalId);
    if (modalToShow) {
      modalToShow.style.display = 'flex';
    }
  }
  
  // Изначально показываем только CreateAccount
  showModal('CreateAccount');
  
  // Обработчик для кнопок "Далее" (data-next-modal)
  document.querySelectorAll('[data-next-modal]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const nextModalId = this.getAttribute('data-next-modal');
      showModal(nextModalId);
    });
  });
  
  // Обработчик для кнопок "Назад" (data-prev-modal)
  document.querySelectorAll('[data-prev-modal]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const prevModalId = this.getAttribute('data-prev-modal');
      showModal(prevModalId);
    });
  });
  
  // Для демонстрации - автоматический переход по кнопке "Получить код"
  // (можно удалить, если не нужно)
  const getCodeButton = document.querySelector('.btn-primary__alt[data-next-modal="phoneСonfirmation"]');
  if (getCodeButton) {
    getCodeButton.addEventListener('click', function(e) {
      e.preventDefault();
      showModal('phoneСonfirmation');
    });
  }
  
  // Дополнительно: обработка ввода кода подтверждения
  const codeFields = document.querySelectorAll('.code-field');
  codeFields.forEach((field, index) => {
    field.addEventListener('input', function() {
      // Автоматический переход к следующему полю
      if (this.value.length === 1 && index < codeFields.length - 1) {
        codeFields[index + 1].focus();
      }
      
      // Если все поля заполнены, показываем следующее окно
      let allFilled = true;
      codeFields.forEach(f => {
        if (f.value.length === 0) allFilled = false;
      });
      
      if (allFilled) {
        // Через небольшую задержку показываем окно завершения
        setTimeout(() => {
          showModal('registrationСompleted');
        }, 500);
      }
    });
    
    // Обработка backspace
    field.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
        codeFields[index - 1].focus();
      }
    });
  });
  
  // Добавляем стили для скрытия/показа модальных окон
  const style = document.createElement('style');
  style.textContent = `
    .modal__alt {
      display: none;
    }
    .modal__alt:first-of-type {
      display: flex; /* Показываем первое окно по умолчанию */
    }
  `;
  document.head.appendChild(style);
});




function initPasswordFields() {
  document.querySelectorAll('.label-passwrod').forEach(label => {
    const input    = label.querySelector('.input-password-custom');
    const eyeOpen  = label.querySelector('.look__password');
    const eyeClose = label.querySelector('.not-visible__password');

    if (!input || !eyeOpen || !eyeClose) return;

    // Начальное состояние — сразу применяем стили точек
    input.style.fontFamily         = 'text-security-disc';
    input.style.fontSize           = '3rem';
    input.style.letterSpacing      = '0.3rem';
    input.style.webkitTextSecurity = 'disc';
    eyeOpen.style.display          = 'block';
    eyeClose.style.display         = 'none';

    // Показать пароль
    eyeOpen.addEventListener('click', () => {
      input.style.fontFamily         = 'Jost';
      input.style.fontSize           = '2rem';
      input.style.letterSpacing      = '0';
      input.style.webkitTextSecurity = 'none';
      eyeOpen.style.display          = 'none';
      eyeClose.style.display         = 'block';
    });

    // Скрыть пароль
    eyeClose.addEventListener('click', () => {
      input.style.fontFamily         = 'text-security-disc';
      input.style.fontSize           = '3rem';
      input.style.letterSpacing      = '0.3rem';
      input.style.webkitTextSecurity = 'disc';
      eyeOpen.style.display          = 'block';
      eyeClose.style.display         = 'none';
    });
  });
}

initPasswordFields();