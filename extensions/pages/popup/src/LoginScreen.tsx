import { useSession } from './contexts/SessionContext';
import { generateJWTToken } from './utils';
import { decodeToken } from '@web3auth/single-factor-auth';

import Logo from "./assets/logo.jpg";

const Login = () => {
  const { isLoading, loginType, login, logout, web3authSFAuth, metamaskProvider } = useSession();

  const onLogin = async (idToken: string) => {
    try {
      if (!idToken || !web3authSFAuth) throw new Error('no id token or web3auth is not initialized.');
      
      if (web3authSFAuth.status === 'not_ready') {
        await web3authSFAuth.init();
      }
      
      const { payload } = decodeToken<{ email: string }>(idToken);
      await web3authSFAuth.connect({
        verifier: 'eth-google-w3a-verifier',
        verifierId: payload.email,
        idToken: idToken,
      });

      const accounts = await web3authSFAuth.provider?.request<never, string[]>({ 
        method: 'eth_accounts' 
      });

      if (accounts?.[0]) {
        const data = await generateJWTToken({
          login_type: 'google',
          login_email: payload.email,
          public_address: accounts[0],
        });

        if (data.token) {
          login('google', data.token);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const triggerGoogleLogin = () => {
    const redirectUri = chrome.identity.getRedirectURL();
    const clientId = '290849074501-8a0t4e1dffe2mn5m5iu622fg3b68vtmm.apps.googleusercontent.com';
    const scopes = 'openid email profile';
    const nonce = Math.random().toString(36).slice(2);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=token id_token&redirect_uri=${redirectUri}&scope=${scopes}&nonce=${nonce}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      async function (redirectUrl) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        if (!redirectUrl) {
          console.error('No redirect URL found');
          return;
        }

        const urlParams = new URLSearchParams(new URL(redirectUrl).hash.substring(1));
        const idToken = urlParams.get('id_token');

        if (idToken) {
          console.log('ID Token:', idToken);
          await onLogin(idToken);
        }
      },
    );
  };

  const triggerMetamaskLogin = async () => {
    if (!metamaskProvider) throw new Error('No metamask provider is not initialized.');
    const accounts = await metamaskProvider.request<string[]>({ 
      method: 'eth_requestAccounts' 
    });
    
    if (accounts?.[0]) {
      const data = await generateJWTToken({
        login_type: 'metamask',
        login_email: '',
        public_address: accounts[0],
      });

      if (data.token) {
        login('metamask', data.token);
      }
    }
  };

  const loggedInView = () => {
    return (
      <div className='flex justify-between items-center pt-4'>
        <div className="flex items-center gap-2 ml-4">
          <img src={Logo} alt="logo" className="size-8 rounded-full"></img>
          <span className='text-lg font-semibold text-white'>PredictX</span>
        </div>
        <div className="mr-4">
          <button className="text-sm text-gray-400 underline underline-offset-2 transition-colors duration-200 hover:text-white" onClick={logout}>Logout</button>
        </div>
      </div>
    );
  };

  const loggedOutView = () => {
    return (
      <div className="mb-2 flex h-screen w-[414px] flex-col items-center justify-center">
        <div className='fixed top-28 flex items-center gap-2'>
          <img src={Logo} alt="logo" className="size-8 rounded-full"></img>
          <span className='text-lg font-semibold text-white'>PredictX</span>
        </div>
        <button
          className="mb-4 min-w-[200px] rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={triggerGoogleLogin}>
          Login with Google
        </button>
        <button
          className="min-w-[200px] rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={triggerMetamaskLogin}>
          Login with Metamask
        </button>
      </div>
    );
  };

  // Rest of your component remains the same, but use the context's logout
  return (
    <div>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl backdrop-blur-sm">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 size-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p className="text-sm font-medium text-white">Logging in...</p>
          </div>
        </div>
      ) : loginType ? (
        loggedInView()
      ) : (
        loggedOutView()
      )}
    </div>
  );
};

export default Login;