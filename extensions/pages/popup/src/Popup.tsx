import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useEffect, useState } from 'react';

import type { Chain, Hex } from 'viem';
import { createPublicClient, createWalletClient, custom, http, toHex } from 'viem';
import { PredictX_ABI, getContractAddress, USDC_ABI, getUSDCContractAddress } from './config';
import { useSession } from './contexts/SessionContext';
import PopupScreen from './PopupScreen';
import { fetchMarket } from './queries';
import type { ChainNameType } from './constants';

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

type VoteRequest = {
  type: 'vote';
  data: {
    marketId: string;
    voteTokenAddress: string;
    amount: number;
  };
};

// const chain = sepolia;
// const chain = unichainSepolia;
// const chain = polygonAmoy;
// const chain = bitkubTestnet;
// const chain = mantleSepoliaTestnet;
// const chain = lineaSepolia;
// const chain = flowTestnet;
// const chain = scrollSepolia;
// const chain = morphHolesky;

const Popup = ({ chainConfig, chainName }: { chainConfig: Chain, chainName: ChainNameType }) => {
  const { web3authSFAuth, metamaskProvider } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [marketData, setMarketData] = useState<any[]>([]);
  const [isMarketLoading, setIsMarketLoading] = useState(false);

  useEffect(() => {
    const listener = (
      request: MessageRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: unknown) => void,
    ) => {
      setTimeout(async () => {
        console.log('>>>> popup request', request);
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
              chain: chainConfig,
              transport: http(),
            });
            const client = createWalletClient({
              chain: chainConfig,
              transport: custom(provid!),
            });
            const addresses = await client.getAddresses();
            const allowance = await publicClient.readContract({
              account: addresses[0],
              address: getUSDCContractAddress(chainName) as Hex,
              abi: USDC_ABI,
              functionName: 'allowance',
              args: [addresses[0], getContractAddress(chainName)],
            });
            const createTokenAmount = BigInt(createMarketRequest.data.tokenAmount * DECIMAL);
            if ((allowance as bigint) < createTokenAmount) {
              const approveHash = await client.writeContract({
                account: addresses[0],
                address: getUSDCContractAddress(chainName) as Hex,
                abi: USDC_ABI,
                functionName: 'approve',
                args: [getContractAddress(chainName), Number(createTokenAmount) * 10],
              });
              await publicClient.waitForTransactionReceipt({ hash: approveHash });
            }
            const hash = await client.writeContract({
              account: addresses[0],
              address: getContractAddress(chainName) as Hex,
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
              chain: chainConfig,
              transport: http(),
            });
            const client = createWalletClient({
              chain: chainConfig,
              transport: custom(provid!),
            });
            const addresses = await client.getAddresses();
            console.log('>>> coninc comd data', voteRequest);
            const approveHash = await client.writeContract({
              account: addresses[0],
              address: getUSDCContractAddress(chainName) as Hex,
              abi: USDC_ABI,
              functionName: 'approve',
              args: [getContractAddress(chainName), Number(voteRequest.data.amount) * 10 * DECIMAL],
            });
            await publicClient.waitForTransactionReceipt({ hash: approveHash });
            const hash = await client.writeContract({
              account: addresses[0],
              address: getContractAddress(chainName) as Hex,
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
      setIsMarketLoading(true);
      try {
        const data = await fetchMarket(chainName);
        if (data && data.data && data.data.marketInitializeds) {
          const marketData = [];
          const client = createPublicClient({
            chain: chainConfig,
            transport: http(),
          });
          for (const item of data.data.marketInitializeds) {
            const [balance1, balance2] = await Promise.all([
              client.readContract({
                address: item.outcome1Token,
                functionName: 'balanceOf',
                abi: USDC_ABI,
                args: [getContractAddress(chainName)],
              }),
              client.readContract({
                address: item.outcome2Token,
                functionName: 'balanceOf',
                abi: USDC_ABI,
                args: [getContractAddress(chainName)],
              }),
            ]);
  
            marketData.push({
              ...item,
              token1Balance: Math.round(Number(balance1 as bigint) / 1e18),
              token2Balance: Math.round(Number(balance2 as bigint) / 1e18),
            });
          }
          console.log('>>> marketData', marketData);
          marketData.sort((a, b) => b.blockTimestamp - a.blockTimestamp);
          setMarketData(marketData);
          setIsMarketLoading(false);
        }
      } catch (error) {
        console.error('>>> error', error);
      } finally {
        setIsMarketLoading(false);
      }
    };

    getMarketData();
  }, []);

  return (
    <div>
      {isMarketLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl backdrop-blur-sm">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 size-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p className="text-sm font-medium text-white">Loading Current Markets...</p>
          </div>
        </div>
      ) : (
        <PopupScreen marketData={marketData} />
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
