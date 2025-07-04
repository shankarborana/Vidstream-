// app.js: WebTorrent streaming logic and UI handling

const magnetForm = document.getElementById('magnet-form');
const magnetInput = document.getElementById('magnet-input');
const errorMsg = document.getElementById('error-msg');
const videoContainer = document.getElementById('video-container');
const videoPlayer = document.getElementById('video-player');

let client = null;

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}
function clearError() {
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}

function showVideo(url, mime) {
  videoPlayer.src = url;
  videoPlayer.type = mime;
  videoPlayer.load();
  videoContainer.style.display = '';
}

function resetVideo() {
  videoPlayer.pause();
  videoPlayer.removeAttribute('src');
  videoPlayer.load();
  videoContainer.style.display = 'none';
}

magnetForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError();
  resetVideo();

  const magnetURI = magnetInput.value.trim();
  if (!magnetURI.startsWith("magnet:")) {
    showError("Please enter a valid magnet URI.");
    return;
  }
  if (!window.WebTorrent) {
    showError("WebTorrent is not supported in this browser.");
    return;
  }
  // Clean up previous client
  if (client) {
    try { client.destroy(); } catch {}
    client = null;
  }
  client = new WebTorrent();

  client.add(magnetURI, torrent => {
    // Find first video file
    const file = torrent.files.find(f =>
      /\.(mp4|webm|mkv)$/i.test(f.name)
    );
    if (!file) {
      showError("No supported video file (.mp4, .webm, .mkv) found in this torrent.");
      client.destroy();
      return;
    }
    // Stream to video tag
    file.renderTo(videoPlayer, {
      autoplay: true,
      controls: true
    }, err => {
      if (err) {
        showError("Failed to stream video: " + err.message);
        client.destroy();
      } else {
        videoContainer.style.display = '';
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