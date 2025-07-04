const magnetForm = document.getElementById('magnet-form');
const magnetInput = document.getElementById('magnet-input');
const errorMsg = document.getElementById('error-msg');
const videoContainer = document.getElementById('video-container');
const videoPlayer = document.getElementById('video-player');

let client = null;

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
  magnetForm.style.display = ''; // Show form on error
  videoContainer.style.display = 'none';
}

function clearError() {
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}

function showVideo() {
  videoContainer.style.display = '';
  magnetForm.style.display = 'none'; // Hide form after streaming
}

function resetUI() {
  videoContainer.style.display = 'none';
  magnetForm.style.display = '';
  videoPlayer.pause();
  videoPlayer.removeAttribute('src');
  videoPlayer.load();
}

document.getElementById('back-btn')?.addEventListener('click', resetUI);

magnetForm.addEventListener('submit', function (e) {
  e.preventDefault();
  clearError();
  resetUI();

  const magnetURI = magnetInput.value.trim();
  if (!magnetURI.startsWith("magnet:")) {
    showError("Please enter a valid magnet URI.");
    return;
  }
  if (!window.WebTorrent) {
    showError("WebTorrent is not supported in this browser.");
    return;
  }
  if (client) {
    try { client.destroy(); } catch {}
    client = null;
  }
  client = new WebTorrent();

  client.add(magnetURI, torrent => {
    const file = torrent.files.find(f =>
      /\.(mp4|webm|mkv)$/i.test(f.name)
    );
    if (!file) {
      showError("No supported video file (.mp4, .webm, .mkv) found in this torrent.");
      client.destroy();
      return;
    }
    file.renderTo(videoPlayer, { autoplay: true, controls: true }, err => {
      if (err) {
        showError("Failed to stream video: " + err.message);
        client.destroy();
      } else {
        showVideo();
      }
    });
    torrent.on('error', err => {
      showError("Torrent Error: " + err.message);
      client.destroy();
    });
  });

  client.on('error', err => {
    showError("WebTorrent Error: " + err.message);
    client.destroy();
  });
});
