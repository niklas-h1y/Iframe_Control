chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SET_IFRAME_PERMISSIONS") {
    const iframes = document.querySelectorAll('iframe');
    
    if (iframes.length === 0) {
      alert('No iFrames discovered on this tab target.');
      sendResponse({ status: "no_iframes" });
      return;
    }

    iframes.forEach(iframe => {
      // Overwrite previous sandbox configuration with complete master tokens
      iframe.setAttribute('sandbox', message.sandboxString);
      
      // Flush and reset frame rendering engine context execution layers
      const currentSrc = iframe.src;
      iframe.src = '';
      // Tiny timeout to guarantee the browser updates the DOM attributes before refetching src
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 10);
    });

    alert(`Master Security updated across ${iframes.length} iFrame element(s).`);
    sendResponse({ status: "success", count: iframes.length });
  }
});
