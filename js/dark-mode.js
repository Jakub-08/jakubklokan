const toggleButtons = document.querySelectorAll('#dark-mode-toggle, #dark-toggle-mobile');

function updateButtonContent(isDark) {
  toggleButtons.forEach(btn => {
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', isDark);
  });
}

function setDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
  }
  updateButtonContent(isDark);
}

// Načtení uložené preference
const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'true') {
  setDarkMode(true);
} else if (savedMode === 'false') {
  setDarkMode(false);
} else {
  // Pokud není nic uloženo, můžeš nastavit podle prefers-color-scheme:
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setDarkMode(prefersDark);
}

// Přidání event listenerů na všechna tlačítka
toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark-mode'));
  });
});
