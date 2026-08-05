/* ==========================================================
   proyecto.js — Lightbox para las páginas de detalle de proyecto
   El menú responsive y el scroll-reveal viven en main.js
   (cargado antes que este archivo en cada página de proyecto).
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const triggers = document.querySelectorAll('[data-lightbox]');

  function openLightbox(trigger) {
    const img = trigger.querySelector('img');
    const caption = trigger.getAttribute('data-caption') || (img ? img.alt : '');

    if (img && img.getAttribute('src')) {
      lightboxImg.src = img.getAttribute('src');
      lightboxImg.alt = img.alt || '';
      lightboxImg.style.display = 'block';
    } else {
      lightboxImg.style.display = 'none';
    }

    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('role', 'button');
    trigger.addEventListener('click', () => openLightbox(trigger));
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(trigger);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

});
