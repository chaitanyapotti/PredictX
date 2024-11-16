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
  tokenAmount: string;
}

interface TooltipProps {
  tweetId: string;
  tweetContent: string;
  onYes: () => void;
  onNo: () => void;
  onCreateMarket: () => void;
  yesOdds?: number;
  noOdds?: number;
  userVote?: 'yes' | 'no' | null;
}

interface VoteFormData {
  amount: string;
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

export const Tooltip: React.FC<TooltipProps> = ({ tweetId, tweetContent, yesOdds, noOdds, userVote = null }) => {
  const [voteType, setVoteType] = React.useState<'yes' | 'no' | null>(null);

  const { register: registerVote, handleSubmit: handleVoteSubmit } = useForm<VoteFormData>({
    defaultValues: {
      amount: '1',
    },
  });

  const { isPending, error, data } = useQuery<MessageResponse<Market>>({
    queryKey: ['repoData'],
    queryFn: () =>
      chrome.runtime.sendMessage({
        type: MessageType.GET_MARKET,
        data: {
          marketId: tweetId,
        },
      }),
  });

  const { register, handleSubmit } = useForm<CreateMarketFormData>({
    defaultValues: {
      question: tweetContent,
      tokenAmount: '1',
    },
  });

  const handleCreateMarket = async (data: CreateMarketFormData) => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: MessageType.CREATE_MARKET,
        data: {
          marketId: tweetId,
          question: data.question,
          tokenAmount: data.tokenAmount,
        },
      });
      console.log('>>> response create market', response);
    } catch (e) {
      console.error('Error creating market:', e);
    }
  };

  const handleVote = async (data: VoteFormData) => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: MessageType.VOTE,
        data: {
          marketId: tweetId,
          vote: voteType,
          amount: data.amount,
        },
      });
      console.log('>>> vote response', response);
      setVoteType(null); // Reset vote type after submission
    } catch (e) {
      console.error('Error voting:', e);
    }
  };

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const doesMarketExist = data?.success;

  console.log('>>> data', data);

  return (
    <div
      className="absolute bottom-full right-0 mb-2 w-[520px] rounded-lg bg-white p-4 shadow-lg"
      onClick={handleTooltipClick}>
      {error && 'An error has occurred: ' + error.message}
      {isPending && 'Loading...'}
      {!isPending && doesMarketExist ? (
        <div className="flex flex-col space-y-2">
          <p className="mb-4 max-w-[520px] text-sm text-gray-700">{hexToString(data.data.description as Hex)}</p>
          {!userVote ? (
            <>
              {!voteType ? (
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setVoteType('yes')}
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50">
                    Yes {yesOdds && `(${yesOdds}x)`}
                  </button>
                  <button
                    onClick={() => setVoteType('no')}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50">
                    No {noOdds && `(${noOdds}x)`}
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
                        step="0.1"
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
          {(yesOdds || noOdds) && (
            <div className="text-center text-sm text-gray-500">
              Current odds: Yes {yesOdds?.toFixed(2)}x | No {noOdds?.toFixed(2)}x
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleCreateMarket)} className="flex flex-col space-y-4">
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
      )}
    </div>
  );
};
