(() => {
  const slides    = Array.from(document.querySelectorAll('.slide'));
  const total     = slides.length;
  const elCurrent = document.getElementById('slide-current');
  const elTotal   = document.getElementById('slide-total');
  const btnPrev   = document.getElementById('prev');
  const btnNext   = document.getElementById('next');

  let current = 0;

  elTotal.textContent = total;

  function goTo(index) {
    if (index < 0 || index >= total) return;
    slides[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    elCurrent.textContent = current + 1;
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  goTo(current + 1);
    if (e.key === 'Home') goTo(0);
    if (e.key === 'End')  goTo(total - 1);
  });

  // Touch / swipe support
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? goTo(current + 1) : goTo(current - 1);
  }, { passive: true });

  // Init
  goTo(0);

  // Copy prompt to clipboard
  const copyBtn = document.getElementById('copy-prompt');
  const promptEl = document.getElementById('prompt-text');
  if (copyBtn && promptEl) {
    const originalHTML = copyBtn.innerHTML;
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(promptEl.textContent).then(() => {
        copyBtn.classList.add('copy-btn--copied');
        copyBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
        setTimeout(() => {
          copyBtn.classList.remove('copy-btn--copied');
          copyBtn.innerHTML = originalHTML;
        }, 2000);
      });
    });
  }
})();
