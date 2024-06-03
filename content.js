chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "play") {
    let video = document.querySelector('video');
    if (video && video.paused) {
      video.play();
    }
  } else if (message.action === "pause") {
    let video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
});
