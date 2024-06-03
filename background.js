chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.storage.local.get(['pauseOnTabSwitch'], (result) => {
    if (result.pauseOnTabSwitch) {
      chrome.tabs.query({ active: false, currentWindow: true }, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.url.includes("youtube.com/watch")) {
            chrome.tabs.sendMessage(tab.id, { action: "pause" });
          }
        });
      });
    }
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url.includes("youtube.com/watch")) {
        chrome.tabs.sendMessage(tab.id, { action: "play" });
      }
    });
  });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ url: "*://www.youtube.com/watch*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { action: "pause" });
      });
    });
  } else {
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url.includes("youtube.com/watch")) {
          chrome.tabs.sendMessage(tab.id, { action: "play" });
        }
      });
    });
  }
});
