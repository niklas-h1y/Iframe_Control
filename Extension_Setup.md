# iFrame Permission Manager Setup Guide

This extension allows you to dynamically restrict or grant permissions to all `<iframe>` elements loaded on a given webpage (like GitHub) using HTML5 Sandbox flags.

## Installation Steps

1. **Create a Folder:** Create a new folder on your computer named `iframe-permission-manager`.
2. **Save the Files:** Save the following three files directly inside that folder:
   - `manifest.json`
   - `popup.html`
   - `popup.js`
3. **Open Chrome Extensions:** Open Google Chrome and navigate to `chrome://extensions/`.
4. **Enable Developer Mode:** In the top-right corner of the Extensions page, toggle the **Developer mode** switch to **ON**.
5. **Load the Extension:** Click the **Load unpacked** button in the top-left corner. Select the `iframe-permission-manager` folder you created in Step 1.

## How to Test on GitHub

1. Navigate to a GitHub page that utilizes iframes (e.g., a rich-text issue comment rendering an external asset, GitHub Pages environments, or third-party integrations).
2. Click the Extension puzzle piece icon in your browser toolbar and pin **iFrame Permission Manager**.
3. Open the extension popup window.
4. Toggle off permissions you want to revoke (e.g., turn off **Allow Scripts** to halt execution inside iframes).
5. Click **Apply to Page**. The extension will find all iframes on the current tab, re-assign their sandbox attributes, and reload them to forcefully apply the new permissions layout safely.
