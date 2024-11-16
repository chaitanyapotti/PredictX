import React, { useState, useRef, useEffect } from 'react';
import { Tooltip } from './Tooltip';
import { useAccount } from 'wagmi';

interface TweetButtonProps {
  tweetId: string;
  tweetContent: string;
  username: string;
  tweetHandle: string;
  marketExists?: boolean;
  yesOdds?: number;
  noOdds?: number;
  userVote?: 'yes' | 'no' | null;
}

export const TweetButton: React.FC<TweetButtonProps> = ({
  tweetId,
  tweetContent,
  username,
  tweetHandle,
  marketExists = false,
  yesOdds,
  noOdds,
  userVote = null,
}) => {
  const { isConnected } = useAccount();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsTooltipOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTooltipOpen(!isTooltipOpen);
  };

  const handleYes = () => {
    console.log('Betting YES on tweet:', { tweetId, tweetContent, username, tweetHandle });
    setIsTooltipOpen(false);
  };

  const handleNo = () => {
    console.log('Betting NO on tweet:', { tweetId, tweetContent, username, tweetHandle });
    setIsTooltipOpen(false);
  };

  const handleCreateMarket = () => {
    console.log('Creating market for tweet:', { tweetId, tweetContent, username, tweetHandle });
    setIsTooltipOpen(false);
  };

  return (
    <div className="relative" ref={buttonRef}>
      <Tooltip
        isOpen={isTooltipOpen}
        tweetContent={tweetContent}
        onYes={handleYes}
        onNo={handleNo}
        marketExists={marketExists}
        onCreateMarket={handleCreateMarket}
        yesOdds={yesOdds}
        noOdds={noOdds}
        userVote={userVote}
      />
      <button
        className="ml-2.5 cursor-pointer rounded-full border-none bg-[#1da1f2] px-2.5 py-1.5 text-white transition-colors hover:bg-[#1a91da]"
        onClick={handleClick}>
        🎲
      </button>
    </div>
  );
};
