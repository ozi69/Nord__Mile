document.addEventListener('DOMContentLoaded', function() {
  
  const video = document.querySelector('.container-video__item');
  const playButton = document.querySelector('.container-video__play');
  const playIcon = document.querySelector('.play-icon');
  const pauseIcon = document.querySelector('.pause-icon');
  const content = document.querySelector('.container-video__content');
  
  if (!video || !playButton || !playIcon || !pauseIcon || !content) return;
  
  // Функция для обновления UI
  function updateUI() {
    if (video.paused) {
      // Видео на паузе
      video.classList.remove('playing');
      
      // Убираем атрибут controls (скрываем стандартные контролы)
      video.removeAttribute('controls');
      
      // Показываем play иконку
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      
      // Показываем кастомную кнопку и текст
      playButton.classList.add('show');
      content.classList.remove('hide');
    } else {
      // Видео играет
      video.classList.add('playing');
      
      // Добавляем атрибут controls (показываем стандартные контролы)
      video.setAttribute('controls', 'controls');
      
      // Показываем pause иконку
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      
      // Скрываем кастомную кнопку и текст
      playButton.classList.remove('show');
      content.classList.add('hide');
    }
  }
  
  // Функция для воспроизведения/паузы
  function toggleVideo() {
    if (video.paused) {
      video.play().then(() => {
        updateUI();
      }).catch(error => {
        console.log('Ошибка воспроизведения:', error);
      });
    } else {
      video.pause();
      updateUI();
    }
  }
  
  // Клик по видео
  video.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleVideo();
  });
  
  // Клик по кастомной кнопке
  playButton.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleVideo();
  });
  
  // События видео
  video.addEventListener('play', function() {
    updateUI();
  });
  
  video.addEventListener('pause', function() {
    updateUI();
  });
  
  video.addEventListener('ended', function() {
    updateUI();
  });
  
  // При наведении на видео когда оно играет
  video.addEventListener('mouseenter', function() {
    if (!video.paused) {
      // Показываем кастомную кнопку с иконкой pause
      playButton.classList.add('show');
    }
  });
  
  video.addEventListener('mouseleave', function() {
    if (!video.paused) {
      // Скрываем кастомную кнопку когда видео играет
      playButton.classList.remove('show');
    }
  });
  
  // Инициализация
  updateUI();
  
});