const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const statusMessage = document.querySelector('#status-message');
const toolButtons = document.querySelectorAll('[data-action]');

const settings = {
  fontScale: Number(localStorage.getItem('fontScale')) || 1,
  highContrast: localStorage.getItem('highContrast') === 'true',
};

function applySettings() {
  document.documentElement.style.setProperty('--font-scale', settings.fontScale.toFixed(2));
  document.body.classList.toggle('high-contrast', settings.highContrast);

  const contrastButton = document.querySelector('[data-action="toggle-contrast"]');
  if (contrastButton) {
    contrastButton.setAttribute('aria-pressed', String(settings.highContrast));
    contrastButton.textContent = settings.highContrast ? 'Default Contrast' : 'High Contrast';
  }
}

function saveSettings() {
  localStorage.setItem('fontScale', String(settings.fontScale));
  localStorage.setItem('highContrast', String(settings.highContrast));
}

function announce(message) {
  if (!statusMessage) return;
  statusMessage.textContent = message;
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

toolButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'increase-font') {
      settings.fontScale = Math.min(settings.fontScale + 0.1, 1.5);
      announce('Text size increased.');
    }

    if (action === 'decrease-font') {
      settings.fontScale = Math.max(settings.fontScale - 0.1, 0.9);
      announce('Text size decreased.');
    }

    if (action === 'toggle-contrast') {
      settings.highContrast = !settings.highContrast;
      announce(settings.highContrast ? 'High contrast mode enabled.' : 'Default contrast mode enabled.');
    }

    applySettings();
    saveSettings();
  });
});

applySettings();
