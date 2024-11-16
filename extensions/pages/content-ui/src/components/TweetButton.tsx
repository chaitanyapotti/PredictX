import React, { useState, useRef, useEffect } from 'react';
import { Tooltip } from './Tooltip';

import Logo from "../assets/logo.png";

interface TweetButtonProps {
  tweetId: string;
  tweetContent: string;
  username: string;
  tweetHandle: string;
  yesOdds?: number;
  noOdds?: number;
  userVote?: 'yes' | 'no' | null;
}

export const TweetButton: React.FC<TweetButtonProps> = ({
  tweetId,
  tweetContent,
  username,
  tweetHandle,
  yesOdds,
  noOdds,
  userVote = null,
}) => {
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
      {isTooltipOpen && (
        <Tooltip
          tweetContent={tweetContent}
          tweetId={tweetId}
          onYes={handleYes}
          onNo={handleNo}
          onCreateMarket={handleCreateMarket}
          yesOdds={yesOdds}
          noOdds={noOdds}
          userVote={userVote}
        />
      )}
      <button
        className="ml-2.5 cursor-pointer rounded-full border-none px-2.5 py-1.5 text-white transition-colors"
        onClick={handleClick}>
        <img src={Logo} alt="logo" className='size-8 rounded-full' />
      </button>
    </div>
  );
};
