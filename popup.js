document.getElementById('apply-btn').addEventListener('click', () => {
  const allowScripts = document.getElementById('allow-scripts').checked;
  const allowSameOrigin = document.getElementById('allow-same-origin').checked;
  const allowPopups = document.getElementById('allow-popups').checked;
  const allowForms = document.getElementById('allow-forms').checked;

  let flags = [];
  if (allowScripts) flags.push('allow-scripts');
  if (allowSameOrigin) flags.push('allow-same-origin');
  if (allowPopups) flags.push('allow-popups');
  if (allowForms) flags.push('allow-forms');
  
  const sandboxString = flags.join(' ');

  // Query the active tab and send the message straight to content.js
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) return;
    
    chrome.tabs.sendMessage(tabs[0].id, { action: "SET_IFRAME_PERMISSIONS", sandboxString: sandboxString }, (response) => {
      // Handle optional response confirmation if needed
      if (chrome.runtime.lastError) {
        alert("Please refresh the webpage before using the extension for the first time.");
      }
    });
  });
});
