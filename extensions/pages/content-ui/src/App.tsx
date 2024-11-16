import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { TweetButton } from './components/TweetButton';
import ReactDOM from 'react-dom';
import tailwindcssOutput from '../dist/tailwind-output.css?inline';
import { WagmiProvider } from 'wagmi';
import { config } from './config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface Tweet {
  id: string;
  content: string;
  username: string;
  handle: string;
  element: Element;
}

const App: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const processedTweets = useRef(new Set<string>());
  const tweetContainersRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const cleanupTweet = (tweetId: string) => {
    // Remove from processed tweets set
    processedTweets.current.delete(tweetId);

    // Remove container reference
    const container = tweetContainersRef.current.get(tweetId);
    if (container) {
      container.remove();
      tweetContainersRef.current.delete(tweetId);
    }

    // Remove from tweets state
    setTweets(prev => prev.filter(t => t.id !== tweetId));
  };

  useEffect(() => {
    const findTweets = () => {
      const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
      const newTweets: Tweet[] = [];

      tweetElements.forEach(tweet => {
        const statusLink = tweet.querySelector('a[href*="/status/"]') as HTMLAnchorElement;
        if (!statusLink) return;

        const tweetId = statusLink.href.split('/status/')[1]?.split('?')[0] ?? '';

        // Skip if we've already processed this tweet
        if (processedTweets.current.has(tweetId)) {
          return;
        }

        const tweetTextElement = tweet.querySelector('[data-testid="tweetText"]');
        const userNameElement = tweet.querySelector('[data-testid="User-Name"]');
        const userNameLink = tweet.querySelector('[data-testid="User-Name"] a') as HTMLAnchorElement;

        const tweetContent = tweetTextElement?.textContent ?? '';
        const username = userNameElement?.textContent ?? '';
        const tweetHandle = userNameLink?.href.split('/').pop() ?? '';

        newTweets.push({
          id: tweetId,
          content: tweetContent,
          username: username,
          handle: tweetHandle,
          element: tweet,
        });

        // Mark this tweet as processed
        processedTweets.current.add(tweetId);
      });

      if (newTweets.length > 0) {
        setTweets(prev => [...prev, ...newTweets]);
      }
    };

    // Set up observer for new tweets
    const observer = new MutationObserver(mutations => {
      let needsUpdate = false;

      mutations.forEach(mutation => {
        // Handle removed nodes
        mutation.removedNodes.forEach(node => {
          if (node instanceof Element) {
            // Check if the removed node is a tweet or contains tweets
            const tweets = [
              ...(node.matches('[data-testid="tweet"]') ? [node] : []),
              ...Array.from(node.querySelectorAll('[data-testid="tweet"]')),
            ];

            tweets.forEach(tweet => {
              const statusLink = tweet.querySelector('a[href*="/status/"]') as HTMLAnchorElement;
              if (!statusLink) return;

              const tweetId = statusLink.href.split('/status/')[1]?.split('?')[0] ?? '';
              if (processedTweets.current.has(tweetId)) {
                cleanupTweet(tweetId);
                needsUpdate = true;
              }
            });
          }
        });

        // Handle added nodes
        mutation.addedNodes.forEach(node => {
          if (
            node instanceof Element &&
            (node.querySelector('[data-testid="tweet"]') || node.matches('[data-testid="tweet"]'))
          ) {
            needsUpdate = true;
          }
        });
      });

      if (needsUpdate) {
        findTweets();
      }
    });

    // Initial tweet search
    findTweets();

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      // Clean up all tweets
      tweets.forEach(tweet => cleanupTweet(tweet.id));
      processedTweets.current.clear();
    };
  }, []);

  const createTweetContainer = (tweetId: string, actionBar: Element) => {
    // Create container if it doesn't exist
    if (!tweetContainersRef.current.has(tweetId)) {
      const container = document.createElement('div');
      const shadowRoot = container.attachShadow({ mode: 'open' });

      // Add styles to shadow DOM
      if (navigator.userAgent.includes('Firefox')) {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = tailwindcssOutput;
        shadowRoot.appendChild(styleElement);
      } else {
        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(tailwindcssOutput);
        shadowRoot.adoptedStyleSheets = [styleSheet];
      }

      const root = document.createElement('div');
      shadowRoot.appendChild(root);
      actionBar.appendChild(container);
      tweetContainersRef.current.set(tweetId, root);
    }

    return tweetContainersRef.current.get(tweetId)!;
  };

  return (
    <div id="tweet-buttons-container">
      {tweets.map(tweet => {
        const actionBar = tweet.element.querySelector('[role="group"]');
        if (!actionBar) return null;

        const container = createTweetContainer(tweet.id, actionBar);

        return (
          <div key={tweet.id}>
            {ReactDOM.createPortal(
              <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                  <TweetButton
                    tweetId={tweet.id}
                    tweetContent={tweet.content}
                    username={tweet.username}
                    tweetHandle={tweet.handle}
                  />
                </QueryClientProvider>
              </WagmiProvider>,
              container,
            )}
          </div>
        );
      })}
    </div>
  );
};

export default App;
