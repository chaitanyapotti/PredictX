/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import type { Hex } from 'viem';
import { parseEther } from 'viem';
import { PREDICTX_ADDRESS, PREDICTX_ABI } from '../constants';

interface TooltipProps {
  isOpen: boolean;
  tweetContent: string;
  onYes: () => void;
  onNo: () => void;
  marketExists?: boolean;
  onCreateMarket: () => void;
  yesOdds?: number;
  noOdds?: number;
  userVote?: 'yes' | 'no' | null;
  marketId?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  isOpen,
  tweetContent,
  marketExists = false,
  yesOdds,
  noOdds,
  userVote = null,
  marketId,
}) => {
  const { data: createMarketHash, writeContract: writeCreateMarket } = useWriteContract();
  const { data: createTokensHash, writeContract: writeCreateTokens } = useWriteContract();
  const { address } = useAccount();

  // Wait for transactions
  const { isLoading: isCreatingMarket, isSuccess: isMarketCreatedSuccess } = useWaitForTransactionReceipt({
    hash: createMarketHash,
  });
  const { isLoading: isCreatingTokens, isSuccess: isTokensCreatedSuccess } = useWaitForTransactionReceipt({
    hash: createTokensHash,
  });

  const handleCreateMarket = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await writeCreateMarket({
        address: PREDICTX_ADDRESS,
        abi: PREDICTX_ABI,
        functionName: 'initializeMarket',
        args: [
          'Yes', // outcome1
          'No', // outcome2
          tweetContent, // description
          parseEther('0.1'), // reward
          parseEther('0.1'), // requiredBond
        ],
      });
    } catch (error) {
      console.error('Error creating market:', error);
    }
  };

  const handleVote = async (vote: 'yes' | 'no') => {
    if (!address || !marketId) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Create outcome tokens to place vote
      await writeCreateTokens({
        address: PREDICTX_ADDRESS,
        abi: PREDICTX_ABI,
        functionName: 'createOutcomeTokens',
        args: [
          marketId as Hex,
          parseEther('0.1'), // Amount of tokens to create
        ],
      });
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (!isOpen) return null;

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="absolute bottom-full right-0 mb-2 w-[520px] rounded-lg bg-white p-4 shadow-lg"
      onClick={handleTooltipClick}>
      <p className="mb-4 max-w-[520px] text-sm text-gray-700">{tweetContent}</p>

      {marketExists ? (
        <div className="flex flex-col space-y-2">
          {!userVote ? (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleVote('yes')}
                disabled={!address || isCreatingTokens || isTokensCreatedSuccess}
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50">
                Yes {yesOdds && `(${yesOdds}x)`}
              </button>
              <button
                onClick={() => handleVote('no')}
                disabled={!address || isCreatingTokens || isTokensCreatedSuccess}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50">
                No {noOdds && `(${noOdds}x)`}
              </button>
            </div>
          ) : (
            <div className="text-center text-sm font-medium text-gray-700">You voted: {userVote.toUpperCase()}</div>
          )}
          {(yesOdds || noOdds) && (
            <div className="text-center text-sm text-gray-500">
              Current odds: Yes {yesOdds?.toFixed(2)}x | No {noOdds?.toFixed(2)}x
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          {!isMarketCreatedSuccess && (
            <button
              onClick={handleCreateMarket}
              // disabled={!address || isCreatingMarket}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50">
              {isCreatingMarket ? 'Creating...' : 'Create Market'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
