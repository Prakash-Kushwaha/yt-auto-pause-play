// Function to handle pause/play actions
function handlePausePlay(action) {
  chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { action: action });
    });
  });
}

// Listener for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.storage.local.get(['pauseOnTabSwitch'], (result) => {
    if (result.pauseOnTabSwitch) {
      chrome.tabs.query({ active: false, currentWindow: true }, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.url.includes("youtube.com")) {
            chrome.tabs.sendMessage(tab.id, { action: "pause" });
          }
        });
      });
    }
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tab.id, { action: "play" });
      }
    });
  });
});

// Listener for window focus change
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    handlePausePlay('pause');
  } else {
    handlePausePlay('play');
    }
});
