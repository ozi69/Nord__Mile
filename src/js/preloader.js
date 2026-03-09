document.addEventListener('DOMContentLoaded', function() {
  const isMainPage = window.location.pathname === '/' || 
                     window.location.pathname === '/index.html' ||
                     window.location.pathname.endsWith('/');
  
  if (isMainPage) {
    initPreloader();
  }
});

function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  const STORAGE_KEY = 'preloader_shown';
  const EXPIRY_MS = 30 * 60 * 1000;
  const stored = localStorage.getItem(STORAGE_KEY);
  const now = Date.now();

  // Не показываем — просто выходим, preloader остаётся display:none
  if (stored && (now - parseInt(stored)) < EXPIRY_MS) {
    return;
  }

  // Показываем preloader только если нужно
  preloader.style.display = 'block';
  localStorage.setItem(STORAGE_KEY, now.toString());
  document.body.style.overflow = 'hidden';

  setTimeout(function() {
    const text = preloader.querySelector('.preloader-img__text');
    if (text) {
      text.style.animation = 'none';
    }
    preloader.classList.add('split');

    setTimeout(function() {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1000);

  }, 3500);
}

if (document.readyState === 'complete') {
  document.dispatchEvent(new Event('DOMContentLoaded'));
}