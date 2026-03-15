(function () {

  // ─── Вспомогательная функция: запустить видео как только оно готово ──────────
  function autoPlayWhenReady(v) {
    v.muted       = true;
    v.currentTime = 0;
    v.removeAttribute('controls');

    function tryPlay() {
      v.play().catch(() => {});
    }

    if (v.readyState >= 3) {
      // Видео уже достаточно загружено — играем сразу
      tryPlay();
    } else {
      // Ждём достаточной буферизации
      v.addEventListener('canplay', tryPlay, { once: true });
    }
  }

  // ─── Запуск авто-воспроизведения при любой загрузке страницы ─────────────────
  // pageshow ловит: первую загрузку, F5, Ctrl+Shift+R, bfcache-восстановление
  window.addEventListener('pageshow', function () {
    // about-video — всегда автоплей
    const aboutVideo = document.querySelector('.container__about-video__item');
    if (aboutVideo) {
      autoPlayWhenReady(aboutVideo);
    }

    // container-video — автоплей только если виден в viewport (>= 50%)
    const video = document.querySelector('.container-video__item');
    if (video) {
      const rect          = video.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const visibleRatio  = rect.height > 0 ? visibleHeight / rect.height : 0;

      if (visibleRatio >= 0.5) {
        autoPlayWhenReady(video);
      } else {
        // Не в viewport — сбрасываем на начало и ждём скролла
        video.pause();
        video.muted       = true;
        video.currentTime = 0;
        video.removeAttribute('controls');
      }
    }
  });

  document.addEventListener('DOMContentLoaded', function () {

    // ─── About-video (автовоспроизведение + мьют по скроллу + кнопка) ──────────
    const aboutVideo      = document.querySelector('.container__about-video__item');
    const aboutContainer  = document.querySelector('.container__about-video');
    const aboutPlayButton = aboutContainer?.querySelector('.container-video__play');
    const aboutPlayIcon   = aboutContainer?.querySelector('.play-icon');

    if (aboutVideo) {
      aboutVideo.muted       = true;
      aboutVideo.autoplay    = true;
      aboutVideo.playsInline = true;
      aboutVideo.setAttribute('playsinline', '');
      aboutVideo.setAttribute('webkit-playsinline', '');

      let aboutUserUnmuted = false;

      aboutVideo.addEventListener('volumechange', () => {
        aboutUserUnmuted = !aboutVideo.muted;
      });

      const aboutObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.5) {
              aboutVideo.play().catch(() => {});
              if (!aboutUserUnmuted) aboutVideo.muted = false;
            } else {
              aboutVideo.pause();
              if (!aboutUserUnmuted) aboutVideo.muted = true;
            }
          });
        },
        { threshold: 0.5 }
      );

      aboutObserver.observe(aboutVideo);

      if (aboutPlayButton && aboutPlayIcon) {

        function updateAboutUI() {
          if (aboutVideo.paused) {
            aboutVideo.classList.remove('playing');
            aboutVideo.removeAttribute('controls');
            aboutPlayIcon.style.display = 'block';
            aboutPlayButton.classList.add('show');
          } else {
            aboutVideo.classList.add('playing');
            aboutVideo.setAttribute('controls', 'controls');
            aboutPlayIcon.style.display = 'none';
            aboutPlayButton.classList.remove('show');
          }
        }

        function toggleAboutVideo() {
          if (aboutVideo.paused) {
            aboutVideo.play().then(updateAboutUI).catch(() => {});
          } else {
            aboutVideo.pause();
            updateAboutUI();
          }
        }

        aboutVideo.addEventListener('click',      (e) => { e.stopPropagation(); toggleAboutVideo(); });
        aboutPlayButton.addEventListener('click', (e) => { e.stopPropagation(); toggleAboutVideo(); });

        aboutVideo.addEventListener('play',  updateAboutUI);
        aboutVideo.addEventListener('pause', updateAboutUI);
        aboutVideo.addEventListener('ended', updateAboutUI);

        aboutVideo.addEventListener('mouseenter', () => { if (!aboutVideo.paused) aboutPlayButton.classList.add('show');    });
        aboutVideo.addEventListener('mouseleave', () => { if (!aboutVideo.paused) aboutPlayButton.classList.remove('show'); });

        if (aboutVideo.readyState >= 1) {
          updateAboutUI();
        } else {
          aboutVideo.addEventListener('loadedmetadata', updateAboutUI, { once: true });
        }
      }
    }

    // ─── Container-video (кастомный плеер с контентом) ──────────────────────────
    const video      = document.querySelector('.container-video__item');
    const playButton = document.querySelector('.container-video__play');
    const playIcon   = document.querySelector('.play-icon');
    const content    = document.querySelector('.container-video__content');

    if (video && playButton && playIcon && content) {

      video.muted = true;

      let videoUserUnmuted = false;

      video.addEventListener('volumechange', () => {
        videoUserUnmuted = !video.muted;
      });

      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.5) {
              video.play().catch(() => {});
              if (!videoUserUnmuted) video.muted = false;
            } else {
              video.pause();
              if (!videoUserUnmuted) video.muted = true;
            }
          });
        },
        { threshold: 0.5 }
      );

      videoObserver.observe(video);

      function updateUI() {
        if (video.paused) {
          video.classList.remove('playing');
          video.removeAttribute('controls');
          playButton.classList.add('show');
          playButton.classList.add('clickable');
          content.classList.remove('hide');
          playButton.style.zIndex = '30';
        } else {
          video.classList.add('playing');
          video.setAttribute('controls', 'controls');
          playButton.classList.remove('show');
          playButton.classList.remove('clickable');
          playButton.style.zIndex = '-1';
          content.classList.add('hide');
        }
      }

      function toggleVideo() {
        if (video.paused) {
          video.play().then(updateUI).catch((error) => console.log('Ошибка:', error));
        } else {
          video.pause();
          updateUI();
        }
      }

      video.addEventListener('click',      (e) => { e.stopPropagation(); toggleVideo(); });
      playButton.addEventListener('click', (e) => { e.stopPropagation(); toggleVideo(); });

      video.addEventListener('play',  updateUI);
      video.addEventListener('pause', updateUI);
      video.addEventListener('ended', updateUI);

      video.addEventListener('mouseenter', () => { if (!video.paused) playButton.classList.add('show');    });
      video.addEventListener('mouseleave', () => { if (!video.paused) playButton.classList.remove('show'); });

      if (video.readyState >= 1) {
        updateUI();
      } else {
        video.addEventListener('loadedmetadata', updateUI, { once: true });
      }
    }

  });
})();