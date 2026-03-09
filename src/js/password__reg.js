function initPasswordStrength() {
  const input       = document.querySelector('.input-password-custom');
  const barBlock    = document.querySelector('.progress-bar-block');
  const barActive   = document.querySelector('.progress-bar__password-active');
  const barText     = document.querySelector('.progress-bar__tex');

  if (!input || !barBlock || !barActive || !barText) return;

  // Скрываем блок по умолчанию
  barBlock.style.display = 'none';

  input.addEventListener('input', () => {
    const val = input.value;

    // Ничего не введено — скрываем
    if (val.length === 0) {
      barBlock.style.display = 'none';
      return;
    }

    // Показываем блок
    barBlock.style.display = 'flex';

    const hasDigit  = /\d/.test(val);
    const hasSymbol = /[^a-zA-Zа-яА-ЯёЁ0-9]/.test(val);
    const isLong    = val.length >= 8;

    let width, color, text;

    if (!isLong || (!hasDigit && !hasSymbol)) {
      // Слабый — только буквы или меньше 8 символов
      width = '30%';
      color = '#E4083C';
      text  = 'Слабый';
    } else if (isLong && (hasDigit || hasSymbol) && !(hasDigit && hasSymbol)) {
      // Средний — 8+ символов и есть цифра ИЛИ символ
      width = '70%';
      color = '#E56F39';
      text  = 'Средний';
    } else if (isLong && hasDigit && hasSymbol) {
      // Надёжный — 8+ символов и есть цифра И символ
      width = '100%';
      color = '#00A63E';
      text  = 'Надёжный';
    }

    barActive.style.width           = width;
    barActive.style.backgroundColor = color;
    barActive.style.transition      = 'width 0.4s ease, background-color 0.4s ease';
    barText.style.color             = color;
    barText.textContent             = text;
  });
}

initPasswordStrength();