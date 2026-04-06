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




// vybereme všechny odkazy s atributem hreflang
document.querySelectorAll('a[hreflang]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // zabrání okamžitému přesměrování

    // uložíme aktuální scroll a hash
    const scrollPos = window.scrollY;
    const currentHash = window.location.hash; 
    sessionStorage.setItem('scrollPos', scrollPos);
    sessionStorage.setItem('scrollHash', currentHash);

    // přesměrujeme na href z odkazu
    window.location.href = this.href;
  });
});

// po načtení stránky obnovíme scroll a hash plynule
window.addEventListener('load', () => {
  const scrollPos = sessionStorage.getItem('scrollPos');
  const scrollHash = sessionStorage.getItem('scrollHash');

  if(scrollPos) {
    if(scrollHash) {
      const targetElement = document.querySelector(scrollHash);
      if(targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' }); // plynulý scroll
      } else {
        window.scrollTo({ top: parseInt(scrollPos), behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: parseInt(scrollPos), behavior: 'smooth' });
    }

    sessionStorage.removeItem('scrollPos');
    sessionStorage.removeItem('scrollHash');
  }
});

