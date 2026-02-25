document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalQuiz')
  if (!modal) return

  const steps = document.querySelectorAll('.quiz-container__content')
  const finalStep = document.querySelector('.quiz-final')
  const btnBack = document.querySelector('.quiz-btn-back')
  const btnNext = document.querySelector('.quiz-btn-next')
  const btnFinalLink = document.querySelector('.quiz-link-final')
  const btnRestart = document.querySelector('.quiz-restart-btn')

  const progressText = document.querySelector('.modal-progress__content-text__item')
  const progressPercentValue = document.querySelector('.modal-progress__content-procent__value')
  const progressBarActive = document.querySelector('.progress-bar__active')

  let currentStep = 0
  const totalSteps = 4 // 4 вопроса + финал = 5 экранов

  // Максимальное количество выборов на каждом шаге
  const maxSelections = [1, 2, 1, 1] // шаг 0,1,2,3

  // ==================== АКТИВАЦИЯ ВАРИАНТОВ ====================
  function toggleOption(option) {
    const stepIndex = Array.from(steps).indexOf(option.closest('.quiz-container__content'))
    const selectedInStep = option.parentElement.querySelectorAll('.quiz-select.active').length

    if (option.classList.contains('active')) {
      // снимаем выбор
      option.classList.remove('active')
    } else {
      // можно выбрать?
      if (selectedInStep >= maxSelections[stepIndex]) {
        // если уже максимум — снимаем самый первый выбранный (для удобства)
        if (maxSelections[stepIndex] === 1) {
          option.parentElement.querySelectorAll('.quiz-select.active').forEach(el => el.classList.remove('active'))
        } else {
          return // для шага 2 (много) — просто не выбираем больше 2
        }
      }
      option.classList.add('active')
    }

    checkCanGoNext()
  }

  // ==================== ПРОВЕРКА, МОЖНО ЛИ НАЖАТЬ "ДАЛЕЕ" ====================
  function checkCanGoNext() {
    const currentContent = steps[currentStep]
    const selected = currentContent.querySelectorAll('.quiz-select.active').length

    const need = maxSelections[currentStep] === 1 ? 1 : 1 // минимум 1 всегда

    btnNext.disabled = selected < need
  }

  // ==================== ПОКАЗ ШАГА ====================
function showStep(step) {
  steps.forEach((s, i) => {
    s.style.display = i === step ? 'flex' : 'none';
  });

  // финал
  if (step === totalSteps) {
    finalStep.style.display = 'flex';
    modal.classList.add('quiz-final-visible');
  } else {
    finalStep.style.display = 'none';
    modal.classList.remove('quiz-final-visible');
  }

  const prevStep = currentStep;
  currentStep = Math.min(step, totalSteps);

  // ─── Прогресс ────────────────────────────────────────────────
  const targetPercent = Math.round((currentStep / totalSteps) * 100);

  // 1. Плавно меняем ширину прогресс-бара
  progressBarActive.style.width = targetPercent + '%';

  // 2. Анимируем счётчик процентов (набегающее число)
  animateCounter(
    Number(progressPercentValue.textContent),   // от какого числа
    targetPercent,                              // до какого
    700                                         // длительность, мс
  );

  // обновляем текст "Вопрос X из 5"
  progressText.textContent = currentStep + 1;

  // кнопка назад
  btnBack.disabled = currentStep === 0;

  checkCanGoNext();
}

// Плавная анимация счётчика процентов
function animateCounter(start, end, duration) {
  const range = end - start;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 → 1

    // easeOutQuad — красивая замедляющаяся анимация
    const eased = 1 - (1 - progress) ** 2;

    const currentValue = Math.round(start + range * eased);

    progressPercentValue.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // на всякий случай фиксируем точное конечное значение
      progressPercentValue.textContent = end;
    }
  }

  requestAnimationFrame(step);
}

  // ==================== ОБРАБОТЧИКИ КЛИКОВ ====================
  document.querySelectorAll('.quiz-select').forEach(option => {
    option.addEventListener('click', () => toggleOption(option))
  })

  btnNext.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      showStep(currentStep + 1)
    }
  })

  btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
      showStep(currentStep - 1)
    }
  })

  btnRestart.addEventListener('click', () => {
    // полный сброс
    document.querySelectorAll('.quiz-select.active').forEach(el => el.classList.remove('active'))
    showStep(0)
  })

  // ==================== ЗАКРЫТИЕ МОДАЛКИ ====================
  document.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', () => modal.style.display = 'none')
  })

  // ==================== ИНИЦИАЛИЗАЦИЯ ====================
  showStep(0) // стартуем с первого вопроса
})