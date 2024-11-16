import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import createMetaMaskProvider from 'metamask-extension-provider';
import { decodeToken } from '@web3auth/single-factor-auth';

import { initWeb3Auth } from './login';


const Popup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'google' | 'metamask' | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [metamaskProvider, setMetamaskProvider] = useState<any>(null);
  const web3authSFAuth = initWeb3Auth();

  const onLogin = async (idToken: string) => {
    try {
      if (!idToken) {
        console.error('No ID Token found');
        return;
      }
      if (!web3authSFAuth) {
        console.error("Web3Auth Single Factor Auth SDK not initialized yet");
        return;
      }
      setIsLoading(true);
      if (web3authSFAuth.status === "not_ready") await web3authSFAuth.init();
      const { payload } = decodeToken<{ email: string }>(idToken);
      await web3authSFAuth.connect({
        verifier: "eth-google-w3a-verifier",
        verifierId: payload.email,
        idToken: idToken!,
      });
      setLoginType('google');
      setIsLoading(false);
    } catch (err) {
      // Single Factor Auth SDK throws an error if the user has already enabled MFA
      // One can use the Web3AuthNoModal SDK to handle this case
      setIsLoading(false);
      console.error(err);
    }
  };

  const logout = () => {
    if (loginType === 'google') {
      web3authSFAuth?.logout();
    } else if (loginType === 'metamask') {
      // TODO: logout from metamask
      metamaskProvider?.disconnect();
    }
    setLoginType(null);
  }

  const triggerGoogleLogin = () => {
    const redirectUri = chrome.identity.getRedirectURL();
    const clientId = '290849074501-8a0t4e1dffe2mn5m5iu622fg3b68vtmm.apps.googleusercontent.com';
    const scopes = 'openid email profile';
    const nonce = Math.random().toString(36).slice(2);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=token id_token&redirect_uri=${redirectUri}&scope=${scopes}&nonce=${nonce}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true
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
      }
    );
  }

  const triggerMetamaskLogin = async () => {
    const provider = createMetaMaskProvider();
    const accounts = await provider.request<string[]>({ method: 'eth_requestAccounts' });
    console.log('accounts:', accounts);
    if (accounts && accounts.length > 0) {
      setLoginType('metamask');
      setMetamaskProvider(provider);
    }
  }

  const loggedInView = () => {
    return (
      <div className="mb-2 flex justify-center">
        <button onClick={logout}>Logout</button>
      </div>
    )
  }

  const loggedOutView = () => {
    return (
      <div className="mb-2 flex flex-col justify-center">
        <button className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={triggerGoogleLogin}>Login with Google</button>
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={triggerMetamaskLogin}>Login with Metamask</button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="App bg-slate-50">
        <div>Loading...</div>
    </div>
    )
  }

  return (
    <div className="App bg-slate-50">
      { loginType ? loggedInView() : loggedOutView() }
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
