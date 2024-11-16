/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { Hex } from 'viem';
import { hexToString } from 'viem';

enum MessageType {
  OPEN_POPUP = 'open-popup',
  CREATE_MARKET = 'create-market',
  GET_MARKET = 'get-market',
  VOTE = 'vote',
}

interface MessageResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Remove unused Market interface
interface CreateMarketFormData {
  question: string;
  tokenAmount: number;
}

interface TooltipProps {
  tweetId: string;
  tweetContent: string;
  onYes: () => void;
  onNo: () => void;
  onCreateMarket: () => void;
  userVote?: 'yes' | 'no' | null;
}

interface VoteFormData {
  amount: number;
}

interface Market {
  resolved: boolean;
  assertedOutcomeId: string;
  outcome1Token: string;
  outcome2Token: string;
  outcome1: string;
  outcome2: string;
  description: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ tweetId, tweetContent, userVote = null }) => {
  const { isPending, isLoading, error, data, refetch } = useQuery<
    MessageResponse<{ market: Market; token1Balance: number; token2Balance: number }>
  >({
    queryKey: ['repoData'],
    queryFn: () =>
      chrome.runtime.sendMessage({
        type: MessageType.GET_MARKET,
        data: {
          marketId: tweetId,
        },
      }),
  });

  const [voteType, setVoteType] = React.useState<'yes' | 'no' | null>(null);
  const [isWriting, setIsWriting] = React.useState(false);

  const { register: registerVote, handleSubmit: handleVoteSubmit } = useForm<VoteFormData>({
    defaultValues: {
      amount: 1,
    },
  });

  const { register, handleSubmit } = useForm<CreateMarketFormData>({
    defaultValues: {
      question: tweetContent,
      tokenAmount: 100,
    },
  });

  const handleCreateMarket = async (data: CreateMarketFormData) => {
    try {
      setIsWriting(true);
      const response = await chrome.runtime.sendMessage({
        type: MessageType.CREATE_MARKET,
        data: {
          marketId: tweetId,
          question: data.question,
          tokenAmount: data.tokenAmount,
        },
      });
      console.log('>>> response create market', response);
      refetch();
    } catch (e) {
      console.error('Error creating market:', e);
    } finally {
      setIsWriting(false);
    }
  };

  const doesMarketExist = data?.success;

  console.log('>>> data', data);
  const { market, token1Balance, token2Balance } = data?.data || {};
  const token1B = token1Balance ?? 0;
  const token2B = token2Balance ?? 0;
  const total = token1B + token2B;

  const token1Odd = total ? (token1B / total) * 100 : 50;
  const token2Odd = total ? (token2B / total) * 100 : 50;

  const handleVote = async (data: VoteFormData) => {
    try {
      setIsWriting(true);
      if (!doesMarketExist) {
        throw new Error('No available market');
      }
      const response = await chrome.runtime.sendMessage({
        type: MessageType.VOTE,
        data: {
          marketId: tweetId,
          voteTokenAddress: voteType === 'yes' ? market?.outcome1Token : market?.outcome2Token,
          amount: data.amount,
        },
      });
      console.log('>>> vote response', response);
      setVoteType(null); // Reset vote type after submission
      refetch();
    } catch (e) {
      console.error('Error voting:', e);
    } finally {
      setIsWriting(false);
    }
  };

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const isLoadingOrPending = isLoading || isPending;

  return (
    <div
      className="absolute bottom-full right-0 mb-2 w-[520px] rounded-lg bg-white p-4 shadow-lg"
      onClick={handleTooltipClick}>
      {error && 'An error has occurred: ' + error.message}
      {isLoadingOrPending && 'Loading...'}
      {!isLoadingOrPending && !error ? (
        doesMarketExist ? (
          <div className="flex flex-col space-y-2">
            {isWriting && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                <div className="text-center">
                  <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                  <p className="text-sm text-gray-600">Processing transaction...</p>
                </div>
              </div>
            )}
            <p className="mb-4 max-w-[520px] text-sm text-gray-700">{hexToString(market?.description as Hex)}</p>
            {!userVote ? (
              <>
                {!voteType ? (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setVoteType('yes')}
                      className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50">
                      Yes {`(${token1Odd}%)`}
                    </button>
                    <button
                      onClick={() => setVoteType('no')}
                      className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50">
                      No {`(${token2Odd}%)`}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVoteSubmit(handleVote)} className="flex flex-col space-y-4">
                    <div>
                      <label htmlFor="voteAmount" className="block text-sm font-medium text-gray-700">
                        Amount to Vote ({voteType.toUpperCase()})
                      </label>
                      <div className="mt-1 flex items-center space-x-2">
                        <input
                          id="voteAmount"
                          type="number"
                          {...registerVote('amount')}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setVoteType(null)}
                          className="rounded bg-gray-500 px-3 py-2 text-white hover:bg-gray-600">
                          Cancel
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={`rounded px-4 py-2 text-white ${
                        voteType === 'yes' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                      }`}>
                      Confirm {voteType.toUpperCase()}
                    </button>
                  </form>
                )}
              </>
            ) : (
              <div className="text-center text-sm font-medium text-gray-700">You voted: {userVote.toUpperCase()}</div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleCreateMarket)} className="flex flex-col space-y-4">
            {isWriting && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                <div className="text-center">
                  <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                  <p className="text-sm text-gray-600">Processing transaction...</p>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <textarea
                id="question"
                {...register('question')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="tokenAmount" className="block text-sm font-medium text-gray-700">
                Token Amount
              </label>
              <input
                type="number"
                {...register('tokenAmount')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50">
              Create Market
            </button>
          </form>
        )
      ) : null}
    </div>
  );
};
