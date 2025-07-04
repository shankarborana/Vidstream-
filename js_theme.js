// theme.js: Dark mode auto-detect and manual toggle logic

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function setDarkMode(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3m15.364 7.364l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />`;
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 0111.21 3a7 7 0 107.79 9.79z" />`;
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Initial load
setDarkMode(getPreferredTheme());

// Toggle button
themeToggle.addEventListener('click', () => {
  setDarkMode(!document.documentElement.classList.contains('dark'));
});

// Update icon on system change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) setDarkMode(e.matches);
});