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

  // odd is reverse of percentage
  const token2Odd = total ? (token1B / total) * 100 : 50;
  const token1Odd = total ? (token2B / total) * 100 : 50;

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
      className="absolute bottom-full right-0 mb-2 w-[420px] rounded-xl bg-gray-900 p-6 shadow-xl ring-1 ring-gray-200"
      onClick={handleTooltipClick}>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">An error has occurred: {error.message}</div>
      )}

      {isLoadingOrPending && (
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      )}

      {!isLoadingOrPending && !error ? (
        doesMarketExist ? (
          <div className="flex flex-col space-y-4">
            {isWriting && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-900 backdrop-blur-sm">
                <div className="text-center">
                  <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                  <p className="text-sm font-medium">Processing transaction...</p>
                </div>
              </div>
            )}

            <div className="rounded-lg p-4">
              <p className="text-sm leading-relaxed">{hexToString(market?.description as Hex)}</p>
            </div>

            {!userVote ? (
              <>
                {!voteType ? (
                  <div className="flex flex-col space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setVoteType('yes')}
                        className="flex items-center justify-center space-x-2 rounded-lg bg-green-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-green-600 disabled:opacity-50">
                        <span>Yes</span>
                        <span className="rounded bg-green-400/30 px-2 py-0.5">{token1Odd.toFixed(1)}%</span>
                      </button>
                      <button
                        onClick={() => setVoteType('no')}
                        className="flex items-center justify-center space-x-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50">
                        <span>No</span>
                        <span className="rounded bg-red-400/30 px-2 py-0.5">{token2Odd.toFixed(1)}%</span>
                      </button>
                    </div>
                    <div className="text-center text-xs text-white">Click to place your prediction</div>
                  </div>
                ) : (
                  <form onSubmit={handleVoteSubmit(handleVote)} className="space-y-4">
                    <div className="rounded-lg p-4">
                      <label htmlFor="voteAmount" className="block text-sm font-medium">
                        Amount to Vote ({voteType.toUpperCase()})
                      </label>
                      <div className="mt-2 flex items-center space-x-2">
                        <input
                          id="voteAmount"
                          type="number"
                          {...registerVote('amount')}
                          className="block w-full rounded-lg p-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                          voteType === 'yes' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                        }`}>
                        Confirm {voteType.toUpperCase()}
                      </button>
                      <button
                        type="button"
                        onClick={() => setVoteType(null)}
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-200">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <div className="rounded-lg bg-blue-50 p-4 text-center text-sm font-medium text-blue-700">
                You voted: {userVote.toUpperCase()}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleCreateMarket)} className="space-y-4">
            {isWriting && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl backdrop-blur-sm">
                <div className="text-center">
                  <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                  <p className="text-sm font-medium text-white">Processing transaction...</p>
                </div>
              </div>
            )}

            <div className="space-y-4 rounded-lg p-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-white">
                  Question
                </label>
                <textarea
                  id="question"
                  {...register('question')}
                  className="mt-1.5 p-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="tokenAmount" className="block text-sm font-medium text-white">
                  Token Amount
                </label>
                <input
                  id="tokenAmount"
                  type="number"
                  {...register('tokenAmount')}
                  className="mt-1.5 p-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50">
              Create Market
            </button>
          </form>
        )
      ) : null}
    </div>
  );
};
