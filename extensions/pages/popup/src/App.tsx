import { useEffect, useMemo } from 'react';
import { createPublicClient, type Hex, http, toHex } from 'viem';
import { useSession } from './contexts/SessionContext';

import Login from './LoginScreen';
import Popup from './Popup';
import { PredictX_ABI, getContractAddress } from './config';
import { CHAIN_NAME } from './constants';
import { getChainConfig } from './utils';

type MessageRequest = {
  type: string;
};

type GetMarketRequest = {
  type: 'get-market';
  data: {
    marketId: string;
  };
};

const chainName = CHAIN_NAME.BASE_SEPOLIA;

const App = () => {
  const { loginType } = useSession();
  const chainConfig = useMemo(() => {
    return getChainConfig(chainName);
  }, []);

  useEffect(() => {
    const listener = (
      request: MessageRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: unknown) => void,
    ) => {
      setTimeout(async () => {
        console.log('>>>> popup request', request);
        try {
          if (request.type === 'get-market') {
            const getMarketRequest = request as GetMarketRequest;
            const marketId = getMarketRequest.data.marketId;
            const publicClient = createPublicClient({
              chain: chainConfig,
              transport: http(),
            });
            const res = await publicClient.readContract({
              address: getContractAddress(chainName) as Hex,
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

  return (
    <div>
      <div className="min-h-screen w-full bg-gray-900 text-white">
        <Login />
        {loginType && <Popup chainName={chainName} chainConfig={chainConfig} />}
      </div>
    </div>
  );
};

export default App;
