import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useEffect, useState } from 'react';

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
  scrollSepolia,
  morphHolesky,
  unichainSepolia,
} from 'viem/chains';
import { PredictX_ABI, PredictX_CONTRACT_ADDRESS, USDC_ABI, USDC_CONTRACT_ADDRESS } from './config';
import { useSession } from './contexts/SessionContext';
import PopupScreen from './PopupScreen';
import { fetchMarket } from './queries';

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

// const chain = sepolia;
const chain = baseSepolia;
// const chain = unichainSepolia;
// const chain = polygonAmoy;
// const chain = bitkubTestnet;
// const chain = mantleSepoliaTestnet;
// const chain = lineaSepolia;
// const chain = flowTestnet;
// const chain = scrollSepolia;
// const chain = morphHolesky;

const Popup = ({ continueRequest }: { continueRequest: boolean; setShowLogin: (show: boolean) => void }) => {
  const { provider, web3authSFAuth, metamaskProvider } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [marketData, setMarketData] = useState<any[]>([]);

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
        console.log('>>>> pop urpequrest', request);
        const data = await chrome.storage.local.get(['token', 'login_type']);
        let provid;
        if (!web3authSFAuth || !metamaskProvider) return;
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
        try {
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
            const allowance = await publicClient.readContract({
              account: addresses[0],
              address: USDC_CONTRACT_ADDRESS as Hex,
              abi: USDC_ABI,
              functionName: 'allowance',
              args: [addresses[0], PredictX_CONTRACT_ADDRESS],
            });
            const createTokenAmount = BigInt(createMarketRequest.data.tokenAmount * DECIMAL);
            if ((allowance as bigint) < createTokenAmount) {
              const approveHash = await client.writeContract({
                account: addresses[0],
                address: USDC_CONTRACT_ADDRESS as Hex,
                abi: USDC_ABI,
                functionName: 'approve',
                args: [PredictX_CONTRACT_ADDRESS, Number(createTokenAmount) * 10],
              });
              await publicClient.waitForTransactionReceipt({ hash: approveHash });
            }
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
              address: PredictX_CONTRACT_ADDRESS as Hex,
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
    console.log('>>> listenneddd');

    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    const getMarketData = async () => {
      const data = await fetchMarket('base-sepolia');
      if (data && data.data && data.data.marketInitializeds) {
        const marketData = [];
        const client = createPublicClient({
          chain,
          transport: http(),
        });
        for (const item of data.data.marketInitializeds) {
          const [balance1, balance2] = await Promise.all([
            client.readContract({
              address: item.outcome1Token,
              functionName: 'balanceOf',
              abi: USDC_ABI,
              args: [PredictX_CONTRACT_ADDRESS],
            }),
            client.readContract({
              address: item.outcome2Token,
              functionName: 'balanceOf',
              abi: USDC_ABI,
              args: [PredictX_CONTRACT_ADDRESS],
            }),
          ]);

          marketData.push({
            ...item,
            token1Balance: Math.round(Number(balance1 as bigint) / 1e18),
            token2Balance: Math.round(Number(balance2 as bigint) / 1e18),
          });
        }
        console.log('>>> marketData', marketData);
        setMarketData(marketData);
      }
    };

    getMarketData();
  }, []);

  return <PopupScreen marketData={marketData} />;
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
