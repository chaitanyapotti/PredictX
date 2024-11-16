import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  (async () => {
    console.log('>>>> request', request);
    if (request.type === 'open-popup') {
      await chrome.action.openPopup();
      sendResponse({ success: true });
    }
    if (request.type === 'create-market') {
      await chrome.action.openPopup();
      setTimeout(async () => {
        try {
          const res = await chrome.runtime.sendMessage({ type: 'create-market' });
          console.log('>>> res', res);
          sendResponse({ res });
        } catch (error) {
          console.log('>>> error', error);
          sendResponse({ error: (error as Error).message });
        }
      }, 300); // magic number to wait for popup to load and handle receiving message
    }
  })();
  return true; // Keep the message channel open for sendResponse
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
