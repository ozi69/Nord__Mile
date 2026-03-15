(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // ─── About-video (автовоспроизведение + мьют по скроллу + кнопка) ──────────
    const aboutVideo      = document.querySelector('.container__about-video__item');
    const aboutContainer  = document.querySelector('.container__about-video');
    const aboutPlayButton = aboutContainer?.querySelector('.container-video__play');
    const aboutPlayIcon   = aboutContainer?.querySelector('.play-icon');

    if (aboutVideo) {
      // muted обязательно до autoplay — иначе браузер заблокирует воспроизведение
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

      // Кнопка play для about-video
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

        aboutVideo.addEventListener('click',       (e) => { e.stopPropagation(); toggleAboutVideo(); });
        aboutPlayButton.addEventListener('click',  (e) => { e.stopPropagation(); toggleAboutVideo(); });

        aboutVideo.addEventListener('play',  updateAboutUI);
        aboutVideo.addEventListener('pause', updateAboutUI);
        aboutVideo.addEventListener('ended', updateAboutUI);

        aboutVideo.addEventListener('mouseenter', () => { if (!aboutVideo.paused) aboutPlayButton.classList.add('show');    });
        aboutVideo.addEventListener('mouseleave', () => { if (!aboutVideo.paused) aboutPlayButton.classList.remove('show'); });

        // Безопасная инициализация UI — ждём готовности видео
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

      // Гарантируем muted при старте — без этого autoplay может быть заблокирован
      video.muted = true;

      let videoUserUnmuted = false;

      video.addEventListener('volumechange', () => {
        videoUserUnmuted = !video.muted;
      });

      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.5) {
              if (!videoUserUnmuted) video.muted = false;
            } else {
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

      // Безопасная инициализация UI — ждём готовности видео
      if (video.readyState >= 1) {
        updateUI();
      } else {
        video.addEventListener('loadedmetadata', updateUI, { once: true });
      }
    }

  });
})();