# iFrame Control

A lightweight, Manifest V3 Google Chrome extension that gives you complete control over `<iframe>` element behaviors on any webpage. Easily grant or revoke scripts, same-origin restrictions, popups, and form submissions on the fly.

## 🚀 Features

- **Granular Control:** Independently toggle core HTML5 sandbox security flags.
- **Dynamic Application:** Updates and reloads existing iframes on the current tab without needing a full browser tab refresh.
- **Developer-Friendly:** Clean, dependency-free vanilla JavaScript implementation aligned with modern Web Extension standards.

## 🔒 Controlled Permissions

By toggling the options in the popup panel, you modify the `sandbox` attribute of the page's iframes:

*   **Allow Scripts:** Enables or disables JavaScript execution inside the iframe.
*   **Allow Same-Origin:** Allows the iframe content to retain its original origin permissions (e.g., access to its own cookies and local storage).
*   **Allow Popups:** Permits the iframe to open new windows or tabs.
*   **Allow Forms:** Enables form submissions within the iframe environment.

---

## 🛠️ Installation Guide

Follow these steps to load the extension locally into Google Chrome:

1. **Download the Source:** Clone this repository or download the source files into a dedicated folder on your machine (e.g., `iframe-permission-manager`).
2. **Open Extensions Page:** In Chrome, navigate to `chrome://extensions/`.
3. **Enable Developer Mode:** Toggle the **Developer mode** switch in the top-right corner to **ON**.
4. **Load Unpacked:** Click the **Load unpacked** button in the top-left corner.
5. **Select Folder:** Select the folder containing your `manifest.json`, `popup.html`, and `popup.js` files.

---

## 📖 How to Use

1. Navigate to any website containing iframes (e.g., rich Markdown previews, dashboards, or embedded environments).
2. Click the **Extension puzzle piece** icon in your browser toolbar and pin the **iFrame Permission Manager**.
3. Open the extension popup window.
4. Customize your security posture by turning the permission switches **ON** or **OFF**.
5. Click **Apply to Page**. 
6. The extension will modify the iframe attributes in real-time, flush the cache frame context, and reload them safely.

---

## 📁 Repository Structure

```text
├── manifest.json         # Extension configuration and permission declarations
├── popup.html            # User interface and toggle switch layout
├── popup.js              # Tab communication and sandbox injection script
└── README.md             # Repository documentation
```

## 📄 License

This project is licensed under the MIT License - see the local project details for terms.
