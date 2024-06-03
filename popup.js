document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggleSwitch');

  // Load the current state of the toggle switch
  chrome.storage.local.get(['pauseOnTabSwitch'], (result) => {
    toggleSwitch.checked = result.pauseOnTabSwitch || false;
  });

  // Update the state when the toggle switch is changed
  toggleSwitch.addEventListener('change', () => {
    chrome.storage.local.set({ pauseOnTabSwitch: toggleSwitch.checked });
  });
});
