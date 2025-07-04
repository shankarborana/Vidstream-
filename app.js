// Theme toggle logic (Light/Dark)
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
function setTheme(theme) {
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(theme);
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  } else {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  }
  localStorage.setItem('theme', theme);
}
function toggleTheme() {
  setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
}
themeToggle.addEventListener('click', toggleTheme);
window.onload = () => {
  setTheme(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
};

// Elements
const magnetForm = document.getElementById('magnet-form');
const magnetInput = document.getElementById('magnet-input');
const errorMsg = document.getElementById('error-msg');
const torrentInfo = document.getElementById('torrent-info');
const torrentName = document.getElementById('torrent-name');
const torrentSize = document.getElementById('torrent-size');
const fileList = document.getElementById('file-list');
const torrentStatus = document.getElementById('torrent-status');

// WebTorrent client
let client = new WebTorrent();
let currentTorrent = null;

// Format bytes for display
function bytesToSize(bytes) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

// Error display helper
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
  errorMsg.classList.add('animate__shakeX');
  setTimeout(() => errorMsg.classList.remove('animate__shakeX'), 800);
}
function clearError() {
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}

// Torrent loading logic
magnetForm.addEventListener('submit', function(e) {
  e.preventDefault();
  clearError();
  const magnetURI = magnetInput.value.trim();
  if (!magnetURI.startsWith('magnet:?xt=urn:btih:')) {
    showError('Invalid magnet link.');
    return;
  }
  // Remove existing torrent if present
  if (currentTorrent) {
    try { client.remove(currentTorrent, () => {}); } catch {}
    currentTorrent = null;
  }
  torrentStatus.textContent = 'Fetching torrent info...';
  torrentInfo.classList.remove('hidden');
  torrentName.textContent = '';
  torrentSize.textContent = '';
  fileList.innerHTML = '';
  client.add(magnetURI, {announce: [ // extra trackers for better connectivity
      'wss://tracker.openwebtorrent.com',
      'wss://tracker.btorrent.xyz',
      'wss://tracker.fastcast.nz',
      'wss://tracker.webtorrent.io',
    ]}, function(torrent) {
    currentTorrent = torrent;
    torrentName.textContent = torrent.name || 'Unknown Name';
    torrentSize.textContent = bytesToSize(torrent.length);
    fileList.innerHTML = '';
    torrent.files.forEach((file, idx) => {
      const id = `file-${idx}`;
      // file row UI
      const fileDiv = document.createElement('div');
      fileDiv.className = 'flex flex-col md:flex-row items-stretch md:items-center gap-2 p-2 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/50 shadow-sm transition hover:scale-[1.01]';

      // File name + size
      const fileInfo = document.createElement('div');
      fileInfo.className = 'flex-1 flex flex-col';
      fileInfo.innerHTML = `<span class="font-medium">${file.name}</span>
        <span class="text-xs text-zinc-500">${bytesToSize(file.length)}</span>`;

      // Progress bar
      const progressDiv = document.createElement('div');
      progressDiv.className = 'w-full md:w-32 bg-zinc-200 dark:bg-zinc-700 rounded h-2 overflow-hidden';
      const bar = document.createElement('div');
      bar.className = 'h-2 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-200';
      bar.style.width = '0%';
      progressDiv.appendChild(bar);

      // Download button
      const dlBtn = document.createElement('button');
      dlBtn.className = 'bg-blue-500 hover:bg-indigo-600 text-white px-3 py-1 rounded font-semibold text-sm shadow transition active:scale-95';
      dlBtn.textContent = 'Download';
      dlBtn.disabled = false;

      // Copy Link button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded text-xs font-semibold ml-1 transition';
      copyBtn.textContent = 'Copy Link';

      // Download handler
      dlBtn.onclick = async () => {
        dlBtn.disabled = true;
        dlBtn.textContent = 'Downloading...';
        bar.style.background = 'linear-gradient(to right, #818cf8, #22d3ee)';
        file.getBlobURL((err, url) => {
          if (err) {
            showError('File download failed.');
            dlBtn.textContent = 'Download';
            dlBtn.disabled = false;
            return;
          }
          // Use FileSaver.js if available
          if (window.saveAs) {
            file.getBlob((err, blob) => {
              if (err) {
                showError('Blob download failed.');
                dlBtn.textContent = 'Download';
                dlBtn.disabled = false;
                return;
              }
              window.saveAs(blob, file.name);
              dlBtn.textContent = 'Download';
              dlBtn.disabled = false;
            });
          } else {
            // fallback: open blob URL
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
            dlBtn.textContent = 'Download';
            dlBtn.disabled = false;
          }
        });
      };

      // Copy link handler
      copyBtn.onclick = () => {
        file.getBlobURL((err, url) => {
          if (err) {
            showError('Cannot get file link.');
            return;
          }
          navigator.clipboard.writeText(url).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = 'Copy Link', 1200);
          });
        });
      };

      // File row layout
      const actions = document.createElement('div');
      actions.className = 'flex gap-2 items-center mt-2 md:mt-0';
      actions.appendChild(dlBtn);
      actions.appendChild(copyBtn);

      fileDiv.appendChild(fileInfo);
      fileDiv.appendChild(progressDiv);
      fileDiv.appendChild(actions);
      fileList.appendChild(fileDiv);

      // Progress update per file
      torrent.on('download', () => {
        const prog = (file.downloaded / file.length) * 100;
        bar.style.width = prog.toFixed(1) + '%';
      });
      file.on('download', () => {
        const prog = (file.downloaded / file.length) * 100;
        bar.style.width = prog.toFixed(1) + '%';
      });
      file.on('done', () => {
        bar.style.width = '100%';
        bar.classList.add('bg-green-400');
      });
    });
    // General status
    torrent.on('download', () => {
      torrentStatus.textContent = `Peers: ${torrent.numPeers} | Downloaded: ${bytesToSize(torrent.downloaded)} / ${bytesToSize(torrent.length)}`;
    });
    torrent.on('noPeers', () => {
      showError('No seeders found for this magnet link.');
    });
    torrent.on('error', err => {
      showError('Torrent error: ' + (err.message || err));
    });
    torrent.on('done', () => {
      torrentStatus.textContent = 'All files downloaded ✓';
    });
  });
});

// Reset UI if user edits magnet input
magnetInput.addEventListener('input', () => {
  clearError();
  torrentInfo.classList.add('hidden');
  fileList.innerHTML = '';
  torrentStatus.textContent = '';
  if (currentTorrent) {
    try { client.remove(currentTorrent, () => {}); } catch {}
    currentTorrent = null;
  }
});
