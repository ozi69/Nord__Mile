(function () {
  const video = document.querySelector('.container__about-video__item');
  if (!video) return;

  // Атрибуты для автовоспроизведения (особенно важно для Safari)
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  let userUnmuted = false; // флаг: пользователь сам включил звук

  // Следим за изменением muted вручную пользователем
  video.addEventListener('volumechange', () => {
    // Если пользователь сам размутил — не трогаем его выбор
    if (!video.muted) {
      userUnmuted = true;
    } else {
      userUnmuted = false;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.5) {
          // Больше половины видео в экране
          video.play().catch(() => {});

          if (!userUnmuted) {
            video.muted = false; // размутить
          }
        } else {
          // Видео уехало с экрана
          video.pause();

          if (!userUnmuted) {
            video.muted = true; // замутить обратно
          }
        }
      });
    },
    {
      threshold: 0.5, // срабатывает когда 50% видео в viewport
    }
  );

  observer.observe(video);
})();