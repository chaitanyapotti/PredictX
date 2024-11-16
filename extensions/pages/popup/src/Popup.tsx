import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useEffect, useMemo, useState } from 'react';
import createMetaMaskProvider from 'metamask-extension-provider';
import { decodeToken } from '@web3auth/single-factor-auth';

import { initWeb3Auth } from './login';
import { generateJWTToken } from './utils';
import type { Hex } from 'viem';
import { createPublicClient, createWalletClient, custom, http, toHex } from 'viem';
import {
  sepolia,
  baseSepolia,
  polygonAmoy,
  bitkubTestnet,
  flowTestnet,
  mantleSepoliaTestnet,
  lineaSepolia,
} from 'viem/chains';
import { PredictX_ABI, PredictX_CONTRACT_ADDRESS, USDC_ABI, USDC_CONTRACT_ADDRESS } from './config';

const DECIMAL = 1e18;

type MessageRequest = {
  type: string;
};

type CreateMarketRequest = {
  type: 'create-market';
  data: {
    marketId: string;
    question: string;
    tokenAmount: number;
  };
};

type GetMarketRequest = {
  type: 'get-market';
  data: {
    marketId: string;
  };
};

type VoteRequest = {
  type: 'vote';
  data: {
    marketId: string;
    voteTokenAddress: string;
    amount: number;
  };
};

const chain = sepolia;
// const chain = baseSepolia;
// const chain = polygonAmoy;
// const chain = bitkubTestnet;
// const chain = mantleSepoliaTestnet;
// const chain = lineaSepolia;
// const chain = flowTestnet;

const Popup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'google' | 'metamask' | null>(null);
  const metamaskProvider = useMemo(() => createMetaMaskProvider(), []);
  const web3authSFAuth = useMemo(() => initWeb3Auth(), []);

  // const provider = useMemo(() => {
  //   if (loginType === 'google') {
  //     return web3authSFAuth?.provider;
  //   } else if (loginType === 'metamask') {
  //     return metamaskProvider;
  //   }
  //   return null;
  // }, [loginType, web3authSFAuth, metamaskProvider]);

  useEffect(() => {
    const listener = (
      request: MessageRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: unknown) => void,
    ) => {
      setTimeout(async () => {
        try {
          const data = await chrome.storage.local.get(['token', 'login_type']);
          let provid;
          if (data.login_type === 'google') {
            await web3authSFAuth?.init();
            if (web3authSFAuth.status === 'connected') {
              provid = web3authSFAuth?.provider;
            }
          } else if (data.login_type === 'metamask') {
            const accounts = await metamaskProvider.request<string[]>({ method: 'eth_accounts' });
            if (accounts && accounts.length > 0) {
              provid = metamaskProvider;
            }
          }
          if (request.type === 'create-market') {
            const createMarketRequest = request as CreateMarketRequest;
            const publicClient = createPublicClient({
              chain,
              transport: http(),
            });
            const client = createWalletClient({
              chain,
              transport: custom(provid!),
            });
            const addresses = await client.getAddresses();
            const hash = await client.writeContract({
              account: addresses[0],
              address: PredictX_CONTRACT_ADDRESS as Hex,
              abi: PredictX_ABI,
              functionName: 'initializeMarketAndCreateOutcomeTokens',
              args: [
                'yes',
                'no',
                createMarketRequest.data.question,
                toHex(createMarketRequest.data.marketId, { size: 32 }),
                Number(createMarketRequest.data.tokenAmount * DECIMAL),
              ],
            });
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            sendResponse({ success: true, data: receipt.transactionHash, request });
          }

          if (request.type === 'get-market') {
            const getMarketRequest = request as GetMarketRequest;
            const marketId = getMarketRequest.data.marketId;
            const publicClient = createPublicClient({
              chain,
              transport: http(),
            });
            const res = await publicClient.readContract({
              address: PredictX_CONTRACT_ADDRESS as Hex,
              abi: PredictX_ABI,
              functionName: 'getMarket',
              args: [toHex(marketId, { size: 32 })],
            });
            const market = (res as Array<unknown>)[0];
            const token1Balance = (res as Array<unknown>)[1];
            const token2Balance = (res as Array<unknown>)[2];
            sendResponse({
              success: true,
              data: {
                market,
                token1Balance: Number(token1Balance as bigint),
                token2Balance: Number(token2Balance as bigint),
              },
              request,
            });
          }

          if (request.type === 'vote') {
            const voteRequest = request as VoteRequest;
            const publicClient = createPublicClient({
              chain,
              transport: http(),
            });
            const client = createWalletClient({
              chain,
              transport: custom(provid!),
            });
            const addresses = await client.getAddresses();
            console.log('>>> coninc comd data', voteRequest);
            const approveHash = await client.writeContract({
              account: addresses[0],
              address: USDC_CONTRACT_ADDRESS as Hex,
              abi: USDC_ABI,
              functionName: 'approve',
              args: [PredictX_CONTRACT_ADDRESS, Number(voteRequest.data.amount) * 10 * DECIMAL],
            });
            await publicClient.waitForTransactionReceipt({ hash: approveHash });
            const hash = await client.writeContract({
              account: addresses[0],
              address: PredictX_CONTRACT_ADDRESS,
              abi: PredictX_ABI,
              functionName: 'buy',
              args: [
                toHex(voteRequest.data.marketId, { size: 32 }),
                voteRequest.data.voteTokenAddress,
                Number(voteRequest.data.amount) * DECIMAL,
              ],
            });
            console.log('>>> hash', hash);
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            console.log('>>> receipt', receipt);
            sendResponse({ success: true, data: receipt.transactionHash, request });
          }
        } catch (error) {
          sendResponse({ success: false, error: (error as Error).message, request });
        }
      }, 100);

      return true; // Keep the message channel open for sendResponse
    };
    chrome.runtime.onMessage.addListener(listener);

    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);

  const onLogin = async (idToken: string) => {
    try {
      if (!idToken) {
        console.error('No ID Token found');
        return;
      }
      if (!web3authSFAuth) {
        console.error('Web3Auth Single Factor Auth SDK not initialized yet');
        return;
      }
      setIsLoading(true);
      if (web3authSFAuth.status === 'not_ready') await web3authSFAuth.init();
      const { payload } = decodeToken<{ email: string }>(idToken);
      await web3authSFAuth.connect({
        verifier: 'eth-google-w3a-verifier',
        verifierId: payload.email,
        idToken: idToken!,
      });
      setLoginType('google');
      setIsLoading(false);
      const accounts = await web3authSFAuth.provider?.request<never, string[]>({ method: 'eth_accounts' });
      if (accounts && accounts.length > 0) {
        getJwtToken({ loginType: 'google', loginEmail: payload.email, publicAddress: accounts[0] as string });
      }
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
      // metamaskProvider.disconnect();
    }
    chrome.storage.local.remove(['token', 'login_type']);
    setLoginType(null);
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
    const accounts = await metamaskProvider.request<string[]>({ method: 'eth_requestAccounts' });
    console.log('accounts:', accounts);
    if (accounts && accounts.length > 0) {
      setLoginType('metamask');
      getJwtToken({ loginType: 'metamask', loginEmail: '', publicAddress: accounts[0] as string });
    }
  };

  const getJwtToken = async ({
    loginType,
    loginEmail,
    publicAddress,
  }: {
    loginType: string;
    loginEmail: string;
    publicAddress: string;
  }) => {
    if (loginType && (loginEmail || publicAddress)) {
      const data = await generateJWTToken({
        login_type: loginType as string,
        login_email: loginEmail as string,
        public_address: publicAddress as string,
      });
      console.log('data:', data);
      if (data.token) {
        // TODO: save token to chrome storage
        chrome.storage.local.set({ token: data.token, login_type: loginType as string });
      }
    }
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const data = await chrome.storage.local.get(['token', 'login_type']);
      console.log('data:', data);
      if (data.login_type) {
        setLoginType(data.login_type as 'google' | 'metamask');
        if (data.login_type === 'google') {
          await web3authSFAuth?.init();
          if (web3authSFAuth.status === 'connected') {
            setLoginType('google');
          }
        } else if (data.login_type === 'metamask') {
          const accounts = await metamaskProvider.request<string[]>({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setLoginType('metamask');
          }
        }
      }
    };
    checkIfLoggedIn();
  }, [web3authSFAuth, metamaskProvider]);

  const loggedInView = () => {
    return (
      <div className="mb-2 flex justify-center">
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  const loggedOutView = () => {
    return (
      <div className="mb-2 flex flex-col justify-center">
        <button
          className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={triggerGoogleLogin}>
          Login with Google
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={triggerMetamaskLogin}>
          Login with Metamask
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="App bg-slate-50">
        <div>Loading...</div>
      </div>
    );
  }

  return <div className="App bg-slate-50">{loginType ? loggedInView() : loggedOutView()}</div>;
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
