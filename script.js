/* =========================================================
   Doce Encanto — Confeitaria Artesanal
   JavaScript puro: navegação, menu mobile, parallax do hero,
   animações de entrada ao rolar a página e envio do formulário.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Navbar: fundo ao rolar ---------- */
  var navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  var mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', openMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  mobileMenu.addEventListener('click', function (event) {
    if (event.target === mobileMenu) {
      closeMobileMenu();
    }
  });
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- Parallax suave no hero ---------- */
  var heroMedia = document.getElementById('heroMedia');
  var hero = document.getElementById('hero');

  function updateHeroParallax() {
    var heroHeight = hero.offsetHeight || window.innerHeight;
    var progress = Math.min(window.scrollY / heroHeight, 1);
    var translateY = progress * 15; // percentage-like drift
    var opacity = 1 - Math.min(progress / 0.8, 1);
    heroMedia.style.transform = 'translateY(' + translateY + '%)';
    heroMedia.style.opacity = opacity;
  }

  window.addEventListener('scroll', updateHeroParallax, { passive: true });
  updateHeroParallax();

  /* ---------- Revelação de elementos ao rolar (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: caso o navegador não suporte IntersectionObserver
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Rolagem suave para links internos ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Formulário de contato ---------- */
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('formSubmitBtn');
  var submitLabel = document.getElementById('formSubmitLabel');
  var submitIcon = document.getElementById('formSubmitIcon');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      submitBtn.disabled = true;
      submitLabel.textContent = 'Enviando...';
      submitIcon.style.display = 'none';

      // Simula o envio (não há backend nesta página estática)
      setTimeout(function () {
        submitLabel.textContent = 'Mensagem Enviada!';

        setTimeout(function () {
          form.reset();
          submitBtn.disabled = false;
          submitLabel.textContent = 'Enviar Mensagem';
          submitIcon.style.display = '';
        }, 3000);
      }, 1200);
    });
  }

  /* ---------- Ano dinâmico no rodapé ---------- */
  var footerYear = document.getElementById('footerYear');
  if (footerYear) {
    var year = new Date().getFullYear();
    footerYear.textContent = '© ' + year + ' Doce Encanto. Todos os direitos reservados.';
  }

});
