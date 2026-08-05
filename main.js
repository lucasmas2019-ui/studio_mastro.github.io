/* ==========================================================
   main.js — Comportamiento compartido en todas las páginas
   - Menú responsive (hamburguesa)
   - Navbar con fondo sólido al hacer scroll
   - Aparición progresiva de elementos (IntersectionObserver)
   - Envío del formulario de contacto vía mailto
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú responsive ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Navbar sólida al hacer scroll ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Aparición progresiva al hacer scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('is-visible'));
    }
  }

  /* ---------- Formulario de contacto (mailto) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();

      if (!name || !email || !message) {
        if (status) status.textContent = 'Completá todos los campos antes de enviar.';
        return;
      }

      const subject = encodeURIComponent(`Contacto desde el portfolio — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:lucasmas2019@gmail.com?subject=${subject}&body=${body}`;

      if (status) status.textContent = 'Se abrió tu cliente de correo con el mensaje listo para enviar.';
    });
  }

});
