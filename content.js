chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SET_IFRAME_PERMISSIONS") {
    const iframes = document.querySelectorAll('iframe');
    
    if (iframes.length === 0) {
      alert('No iFrames found on this page.');
      sendResponse({ status: "no_iframes" });
      return;
    }

    iframes.forEach(iframe => {
      // Set the sandbox limits
      iframe.setAttribute('sandbox', message.sandboxString);
      
      // Force reload the individual iframe to commit the sandbox context change
      const currentSrc = iframe.src;
      iframe.src = '';
      iframe.src = currentSrc;
    });

    alert(`Applied sandbox permissions to ${iframes.length} iFrame(s).`);
    sendResponse({ status: "success", count: iframes.length });
  }
});
