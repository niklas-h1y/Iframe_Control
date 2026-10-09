const tokenMap = {
  'allow-scripts': 'allow-scripts',
  'allow-same-origin': 'allow-same-origin',
  'allow-popups': 'allow-popups',
  'allow-popups-to-escape-sandbox': 'allow-popups-to-escape-sandbox',
  'allow-top-navigation': 'allow-top-navigation',
  'allow-top-navigation-by-user-activation': 'allow-top-navigation-by-user-activation',
  'allow-modals': 'allow-modals',
  'allow-top-navigation-to-custom-protocols': 'allow-top-navigation-to-custom-protocols',
  'allow-forms': 'allow-forms',
  'allow-pointer-lock': 'allow-pointer-lock',
  'allow-downloads': 'allow-downloads',
  'allow-orientation-lock': 'allow-orientation-lock',
  'allow-presentation': 'allow-presentation',
  'allow-storage-access-by-user-activation': 'allow-storage-access-by-user-activation'
};

// Automatically run detector when opening popup
document.addEventListener('DOMContentLoaded', runDetection);
document.getElementById('detect-btn').addEventListener('click', runDetection);

// Select All / Deselect All logic
document.getElementById('select-all-btn').addEventListener('click', () => setAllToggles(true));
document.getElementById('deselect-all-btn').addEventListener('click', () => setAllToggles(false));

function setAllToggles(status) {
  Object.keys(tokenMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = status;
  });
}

// Apply configuration
document.getElementById('apply-btn').addEventListener('click', () => {
  let activeTokens = [];
  for (const [elementId, tokenValue] of Object.entries(tokenMap)) {
    const element = document.getElementById(elementId);
    if (element && element.checked) {
      activeTokens.push(tokenValue);
    }
  }
  const sandboxString = activeTokens.join(' ');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) return;
    chrome.tabs.sendMessage(tabs[0].id, { action: "SET_IFRAME_PERMISSIONS", sandboxString: sandboxString });
  });
});

// Detection execution routine
function runDetection() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) return;
    
    chrome.tabs.sendMessage(tabs[0].id, { action: "DETECT_IFRAME_PERMISSIONS" }, (response) => {
      const statusText = document.getElementById('detector-text');
      if (chrome.runtime.lastError || !response) {
        statusText.innerText = "Error scanning. Please refresh the page.";
        return;
      }

      if (response.count === 0) {
        statusText.innerText = "🔍 Found 0 active iframes on this page.";
        return;
      }

      statusText.innerText = `🔍 Found ${response.count} iframe(s). Showing properties of Frame #1:`;
      
      // If the iframe has a sandbox attribute, update toggles to match it
      if (response.hasSandboxAttribute) {
        const allowedTokens = response.currentTokens;
        // Sync popup switches to match target frame state
        Object.entries(tokenMap).forEach(([id, val]) => {
          document.getElementById(id).checked = allowedTokens.includes(val);
        });
      } else {
        // No sandbox layout means EVERYTHING is currently uninhibited/allowed
        statusText.innerText = `🔍 Found ${response.count} iframe(s) (Unsandboxed = Fully Unlocked!)`;
        setAllToggles(true);
      }
    });
  });
}
