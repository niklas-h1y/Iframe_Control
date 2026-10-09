chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const iframes = document.querySelectorAll('iframe');

  if (message.action === "DETECT_IFRAME_PERMISSIONS") {
    if (iframes.length === 0) {
      sendResponse({ count: 0 });
      return true;
    }

    const firstFrame = iframes[0];
    const hasSandbox = firstFrame.hasAttribute('sandbox');
    const sandboxValue = firstFrame.getAttribute('sandbox') || "";
    
    // Split flags into clean iterable array items
    const tokens = sandboxValue.split(/\s+/).filter(t => t.length > 0);

    sendResponse({
      count: iframes.length,
      hasSandboxAttribute: hasSandbox,
      currentTokens: tokens
    });
    return true;
  }

  if (message.action === "SET_IFRAME_PERMISSIONS") {
    if (iframes.length === 0) {
      alert('No active iframe hooks discovered to rewrite.');
      return true;
    }

    iframes.forEach(iframe => {
      iframe.setAttribute('sandbox', message.sandboxString);
      
      const currentSrc = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 15);
    });

    alert(`Successfully applied permissions across ${iframes.length} element(s).`);
  }
});
