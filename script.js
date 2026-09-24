const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const typingTarget = document.querySelector('#typing-text');
const yearTarget = document.querySelector('#current-year');
const revealItems = document.querySelectorAll('.reveal');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const closeMenu = () => {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('is-open', !expanded);
    document.body.classList.toggle('menu-open', !expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId?.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          event.preventDefault();
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

if (typingTarget) {
  const sourceText = typingTarget.dataset.text || typingTarget.textContent || '';
  typingTarget.textContent = '';

  let charIndex = 0;
  const typeNextCharacter = () => {
    if (charIndex <= sourceText.length) {
      typingTarget.textContent = sourceText.slice(0, charIndex);
      const delay = charIndex === sourceText.length ? 1200 : 85;
      charIndex += 1;
      window.setTimeout(typeNextCharacter, delay);
    } else {
      charIndex = 0;
      window.setTimeout(typeNextCharacter, 400);
    }
  };

  typeNextCharacter();
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
