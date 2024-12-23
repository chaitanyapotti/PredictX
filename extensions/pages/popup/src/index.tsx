import '@src/global';
import '@src/index.css';
import { createRoot } from 'react-dom/client';
import App from '@src/App';
import { SessionProvider } from './contexts/SessionContext';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<SessionProvider><App /></SessionProvider>);
}

init();
