import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
    manifest_version: 3,
    default_locale: 'en',
    /**
     * if you want to support multiple languages, you can use the following reference
     * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
     */
    name: 'PredictX',
    version: packageJson.version,
    description: 'Predictor market for twitter',
    host_permissions: ['<all_urls>'],
    permissions: ['storage', 'scripting', 'tabs', 'notifications', 'identity'],
    background: {
      service_worker: 'background.iife.js',
      type: 'module',
    },
    oauth2: {
      client_id: "290849074501-gma0qokktg1tqnuofadl8c8m8ji0hikm.apps.googleusercontent.com",
      scopes: ["openid", "profile", "email"],
    },
    action: {
      default_popup: 'popup/index.html',
      default_icon: 'logo.png',
      default_width: 512,
      default_height: 600,
    },
    chrome_url_overrides: {
      newtab: 'new-tab/index.html',
    },
    icons: {
      128: 'logo.png',
    },
    content_scripts: [
      {
        matches: ["https://twitter.com/*", "https://x.com/*"],
        js: ['content/index.iife.js'],
      },
      {
        matches: ["https://twitter.com/*", "https://x.com/*"],
        js: ['content-ui/index.iife.js'],
      },
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        css: ['content.css'], // public folder
      },
    ],
    web_accessible_resources: [
      {
        resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
        matches: ['*://*/*'],
      },
    ],
};

export default manifest;