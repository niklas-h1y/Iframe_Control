document.getElementById('apply-btn').addEventListener('click', async () => {
  // Get toggle states
  const allowScripts = document.getElementById('allow-scripts').checked;
  const allowSameOrigin = document.getElementById('allow-same-origin').checked;
  const allowPopups = document.getElementById('allow-popups').checked;
  const allowForms = document.getElementById('allow-forms').checked;

  // Build the sandbox token string based on unchecked constraints
  let flags = [];
  if (allowScripts) flags.push('allow-scripts');
  if (allowSameOrigin) flags.push('allow-same-origin');
  if (allowPopups) flags.push('allow-popups');
  if (allowForms) flags.push('allow-forms');
  
  const sandboxString = flags.join(' ');

  // Get current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab) return;

  // Inject script to update iframes dynamically
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: updateIframes,
    args: [sandboxString]
  });
});

// This function runs directly inside the webpage context
function updateIframes(sandboxString) {
  const iframes = document.querySelectorAll('iframe');
  
  if (iframes.length === 0) {
    alert('No iframes found on this page.');
    return;
  }

  iframes.forEach(iframe => {
    // Set the new restrictions
    iframe.setAttribute('sandbox', sandboxString);
    
    // Refresh the iframe to apply the new sandbox rule changes
    const src = iframe.src;
    iframe.src = '';
    iframe.src = src;
  });

  alert(`Applied permissions to ${iframes.length} iframe(s).`);
}
