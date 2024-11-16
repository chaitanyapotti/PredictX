import fs from 'node:fs';
import deepmerge from 'deepmerge';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = deepmerge(
  {
    manifest_version: 3,
    default_locale: 'en',
    /**
     * if you want to support multiple languages, you can use the following reference
     * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
     */
    name: '__MSG_extensionName__',
    version: packageJson.version,
    description: '__MSG_extensionDescription__',
    host_permissions: ['<all_urls>'],
    permissions: ['storage', 'scripting', 'tabs', 'notifications', 'identity'],
    options_page: 'options/index.html',
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
      default_icon: 'icon-34.png',
    },
    chrome_url_overrides: {
      newtab: 'new-tab/index.html',
    },
    icons: {
      128: 'icon-128.png',
    },
    content_scripts: [
      {
        matches: ["https://twitter.com/*", "https://x.com/*"],
        js: ['content/index.iife.js'],
      },
      {
        world: "MAIN",
        matches: ["https://twitter.com/*", "https://x.com/*"],
        js: ['content-ui/index.iife.js'],
      },
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        css: ['content.css'], // public folder
      },
    ],
    devtools_page: 'devtools/index.html',
    web_accessible_resources: [
      {
        resources: ['popup.html'],
        matches: ['<all_urls>']
      },
      {
        resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
        matches: ['*://*/*'],
      },
    ],
  },
);

export default manifest;
