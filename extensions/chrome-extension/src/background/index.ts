import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  (async () => {
    console.log('>>>> request background', request);
    await chrome.action.openPopup();
    setTimeout(async () => {
      try {
        const res = await chrome.runtime.sendMessage(request);
        console.log('>>> res background', res);
        sendResponse(res);
      } catch (error) {
        sendResponse({ error: (error as Error).message });
      }
    }, 300); // magic number to wait for popup to load and handle receiving message
  })();
  return true; // Keep the message channel open for sendResponse
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
