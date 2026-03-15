(function () {
  // Функция для применения настроек видео после загрузки метаданных
  function setupVideoOnLoad(videoElement, isAboutVideo = false) {
    if (!videoElement) return;

    // Устанавливаем начальные атрибуты
    videoElement.muted = true;
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('webkit-playsinline', '');
    videoElement.setAttribute('x-webkit-airplay', 'allow');
    
    // Для iOS добавляем дополнительные атрибуты
    videoElement.preload = 'auto';
    
    // Сохраняем состояние unmute для этого видео
    let userUnmuted = false;
    
    videoElement.addEventListener('volumechange', () => {
      userUnmuted = !videoElement.muted;
    });

    // Функция попытки воспроизведения
    const attemptPlay = () => {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Автозапуск заблокирован браузером - ждем взаимодействия
          console.log('Autoplay prevented:', error);
        });
      }
    };

    // Пробуем запустить после загрузки метаданных
    if (videoElement.readyState >= 2) {
      attemptPlay();
    } else {
      videoElement.addEventListener('loadedmetadata', attemptPlay, { once: true });
    }

    // Intersection Observer
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            // Видео в зоне видимости
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
            if (!userUnmuted) videoElement.muted = false;
          } else {
            // Видео вне зоны видимости
            videoElement.pause();
            if (!userUnmuted) videoElement.muted = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    videoObserver.observe(videoElement);
    
    return { userUnmuted };
  }

  document.addEventListener('DOMContentLoaded', function () {
    
    // ─── About-video ──────────────────────────────────────────────
    const aboutVideo = document.querySelector('.container__about-video__item');
    const aboutContainer = document.querySelector('.container__about-video');
    const aboutPlayButton = aboutContainer?.querySelector('.container-video__play');
    const aboutPlayIcon = aboutContainer?.querySelector('.play-icon');

    if (aboutVideo) {
      const aboutState = setupVideoOnLoad(aboutVideo, true);

      // Восстанавливаем состояние после загрузки страницы
      if (sessionStorage.getItem('aboutVideoPlaying') === 'true') {
        aboutVideo.muted = false;
        aboutVideo.play().catch(() => {});
      }

      // Кнопка play для about-video
      if (aboutPlayButton && aboutPlayIcon) {
        function updateAboutUI() {
          if (aboutVideo.paused) {
            aboutVideo.classList.remove('playing');
            aboutVideo.removeAttribute('controls');
            aboutPlayIcon.style.display = 'block';
            aboutPlayButton.classList.add('show');
            sessionStorage.setItem('aboutVideoPlaying', 'false');
          } else {
            aboutVideo.classList.add('playing');
            aboutVideo.setAttribute('controls', 'controls');
            aboutPlayIcon.style.display = 'none';
            aboutPlayButton.classList.remove('show');
            sessionStorage.setItem('aboutVideoPlaying', 'true');
          }
        }

        function toggleAboutVideo(event) {
          event.preventDefault();
          event.stopPropagation();
          
          if (aboutVideo.paused) {
            aboutVideo.muted = false; // Разрешаем звук при ручном запуске
            aboutVideo.play()
              .then(updateAboutUI)
              .catch(error => console.log('Play error:', error));
          } else {
            aboutVideo.pause();
            updateAboutUI();
          }
        }

        // Обработчики событий
        aboutVideo.addEventListener('click', toggleAboutVideo);
        aboutPlayButton.addEventListener('click', toggleAboutVideo);

        // Добавляем touch-события для мобильных устройств
        aboutVideo.addEventListener('touchstart', (e) => {
          e.preventDefault();
          toggleAboutVideo(e);
        }, { passive: false });

        aboutPlayButton.addEventListener('touchstart', (e) => {
          e.preventDefault();
          toggleAboutVideo(e);
        }, { passive: false });

        aboutVideo.addEventListener('play', updateAboutUI);
        aboutVideo.addEventListener('pause', updateAboutUI);
        aboutVideo.addEventListener('ended', updateAboutUI);
        aboutVideo.addEventListener('waiting', updateAboutUI);

        // Hover эффекты
        aboutVideo.addEventListener('mouseenter', () => { 
          if (!aboutVideo.paused) aboutPlayButton.classList.add('show');    
        });
        
        aboutVideo.addEventListener('mouseleave', () => { 
          if (!aboutVideo.paused) aboutPlayButton.classList.remove('show'); 
        });

        // Для touch устройств
        aboutVideo.addEventListener('touchend', (e) => {
          e.preventDefault();
          if (!aboutVideo.paused) {
            setTimeout(() => aboutPlayButton.classList.add('show'), 100);
            setTimeout(() => aboutPlayButton.classList.remove('show'), 2000);
          }
        });

        updateAboutUI();
      }
    }

    // ─── Container-video ──────────────────────────────────────────
    const video = document.querySelector('.container-video__item');
    const playButton = document.querySelector('.container-video__play');
    const playIcon = document.querySelector('.play-icon');
    const content = document.querySelector('.container-video__content');

    if (video && playButton && playIcon && content) {
      const videoState = setupVideoOnLoad(video);

      // Восстанавливаем состояние после загрузки страницы
      if (sessionStorage.getItem('mainVideoPlaying') === 'true') {
        video.muted = false;
        video.play().catch(() => {});
      }

      function updateUI() {
        if (video.paused) {
          video.classList.remove('playing');
          video.removeAttribute('controls');
          playButton.classList.add('show');
          playButton.classList.add('clickable');
          content.classList.remove('hide');
          playButton.style.zIndex = '30';
          sessionStorage.setItem('mainVideoPlaying', 'false');
        } else {
          video.classList.add('playing');
          video.setAttribute('controls', 'controls');
          playButton.classList.remove('show');
          playButton.classList.remove('clickable');
          playButton.style.zIndex = '-1';
          content.classList.add('hide');
          sessionStorage.setItem('mainVideoPlaying', 'true');
        }
      }

      function toggleVideo(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (video.paused) {
          video.muted = false; // Разрешаем звук при ручном запуске
          video.play()
            .then(updateUI)
            .catch(error => console.log('Play error:', error));
        } else {
          video.pause();
          updateUI();
        }
      }

      // Обработчики событий
      video.addEventListener('click', toggleVideo);
      playButton.addEventListener('click', toggleVideo);

      // Touch события для мобильных
      video.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleVideo(e);
      }, { passive: false });

      playButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleVideo(e);
      }, { passive: false });

      video.addEventListener('play', updateUI);
      video.addEventListener('pause', updateUI);
      video.addEventListener('ended', updateUI);
      video.addEventListener('waiting', updateUI);

      // Hover эффекты
      video.addEventListener('mouseenter', () => { 
        if (!video.paused) playButton.classList.add('show');    
      });
      
      video.addEventListener('mouseleave', () => { 
        if (!video.paused) playButton.classList.remove('show'); 
      });

      // Для touch устройств
      video.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (!video.paused) {
          setTimeout(() => playButton.classList.add('show'), 100);
          setTimeout(() => playButton.classList.remove('show'), 2000);
        }
      });

      updateUI();
    }

    // Очищаем sessionStorage при закрытии страницы
    window.addEventListener('beforeunload', function() {
      sessionStorage.removeItem('mainVideoPlaying');
      sessionStorage.removeItem('aboutVideoPlaying');
    });

  });
})();