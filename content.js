function controlVideo(action) {
  // Regular video player
  let mainVideo = document.querySelector('video.html5-main-video');

  // Mini player
  let miniPlayer = document.querySelector('.ytp-miniplayer .html5-video-player video');

  // Control main video player
  if (mainVideo) {
    if (action === "play" && mainVideo.paused) {
      mainVideo.play();
    } else if (action === "pause" && !mainVideo.paused) {
      mainVideo.pause();
    }
  }

  // Control mini player
  if (miniPlayer) {
    if (action === "play" && miniPlayer.paused) {
      miniPlayer.play();
    } else if (action === "pause" && !miniPlayer.paused) {
      miniPlayer.pause();
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "play" || message.action === "pause") {
    controlVideo(message.action);
  }
});
