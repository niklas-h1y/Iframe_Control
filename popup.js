document.getElementById('apply-btn').addEventListener('click', () => {
  // Mapping of checkbox IDs to standard HTML5 sandbox tokens
  const tokenMap = {
    'allow-scripts': 'allow-scripts',
    'allow-same-origin': 'allow-same-origin',
    'allow-popups': 'allow-popups',
    'allow-popups-to-escape-sandbox': 'allow-popups-to-escape-sandbox',
    'allow-top-navigation': 'allow-top-navigation',
    'allow-top-navigation-by-user-activation': 'allow-top-navigation-by-user-activation',
    'allow-modals': 'allow-modals',
    'allow-forms': 'allow-forms',
    'allow-pointer-lock': 'allow-pointer-lock',
    'allow-downloads': 'allow-downloads',
    'allow-orientation-lock': 'allow-orientation-lock',
    'allow-presentation': 'allow-presentation',
    'allow-storage-access-by-user-activation': 'allow-storage-access-by-user-activation'
  };

  let activeTokens = [];

  // Check each switch status
  for (const [elementId, tokenValue] of Object.entries(tokenMap)) {
    const element = document.getElementById(elementId);
    if (element && element.checked) {
      activeTokens.push(tokenValue);
    }
  }
  
  const sandboxString = activeTokens.join(' ');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) return;
    
    chrome.tabs.sendMessage(tabs[0].id, { 
      action: "SET_IFRAME_PERMISSIONS", 
      sandboxString: sandboxString 
    }, (response) => {
      if (chrome.runtime.lastError) {
        alert("Please refresh the web page once before applying master controls.");
      }
    });
  });
});
