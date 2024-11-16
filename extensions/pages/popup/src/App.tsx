import { useEffect, useState } from 'react';
import { createPublicClient, createWalletClient, custom, http, toHex } from 'viem';
import { useSession } from './contexts/SessionContext';

import Login from './LoginScreen';
import Popup from './Popup';
import { PredictX_ABI, PredictX_CONTRACT_ADDRESS, USDC_ABI, USDC_CONTRACT_ADDRESS } from './config';
import { baseSepolia } from 'viem/chains';

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

const App = () => {
  const { loginType } = useSession();
  const [continueRequest, setContinueRequest] = useState(false);
  const [showLogin, setShowLogin] = useState(!loginType);

  useEffect(() => {
    const listener = (
      request: MessageRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: unknown) => void,
    ) => {
      setTimeout(async () => {
        console.log('>>>> pop urpequrest', request);
        try {
          if (request.type === 'get-market') {
            const getMarketRequest = request as GetMarketRequest;
            const marketId = getMarketRequest.data.marketId;
            const publicClient = createPublicClient({
              chain: baseSepolia,
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
    if (loginType) {
      setContinueRequest(true);
    }
  }, [loginType]);

  return (
    <div>
      <div className="min-h-screen w-full bg-gray-900 text-white">
        <Login show={showLogin} />
        {loginType && <Popup continueRequest={continueRequest} setShowLogin={setShowLogin} />}
      </div>
    </div>
  );
};

export default App;
