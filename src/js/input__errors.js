function initFormValidation() {
  document.querySelectorAll('.label-def').forEach(label => {
    const input = label.querySelector('input');
    if (!input) return;

    const labelText = label.querySelector('.label-def__text');
    if (!labelText) return;

    const text = labelText.textContent.trim().toLowerCase();

    // Определяем тип поля
    let type = null;
    if (text.includes('имя') || text.includes('фио') || text.includes('фамилия')) {
    type = 'name';
}
    if (text.includes('телефон'))                      type = 'phone';
    if (text.includes('email'))                        type = 'email';

    if (!type) return;

    // Создаём span для ошибки если его нет
    let errorSpan = label.querySelector('.input-error');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'input-error body__small';
      input.after(errorSpan);
    }

    const validate = () => {
      const val = input.value.trim();
      let error = '';

      if (type === 'name') {
        if (val.length === 0) {
          error = '';
        } else if (/[^a-zA-Zа-яА-ЯёЁ\s\-]/.test(val)) {
          error = 'В поле можно использовать только буквы';
        }
      }

      if (type === 'phone') {
        const digits = val.replace(/\D/g, '');
        if (val.length === 0) {
          error = '';
        } else if (digits.length < 11) {
          error = 'Проверьте номер телефона';
        }
      }

      if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val.length === 0) {
          error = '';
        } else if (!emailRegex.test(val)) {
          error = 'Email должен быть в формате name@example.com';
        }
      }

      if (error) {
        errorSpan.textContent = error;
        input.classList.add('input-error-active');
      } else {
        errorSpan.textContent = '';
        input.classList.remove('input-error-active');
      }
    };

    input.addEventListener('input', validate);
    input.addEventListener('blur', validate);
  });
}

initFormValidation();