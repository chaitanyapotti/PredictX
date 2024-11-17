import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://api.studio.thegraph.com/query/94980/predictx-base-sepolia/0.0.2'

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

export const fetchActivityBaseSepolia = async () => {
  const query = gql`
    query TokenBought {
      tokensBoughts {
        currencyAmount
        blockTimestamp
        blockNumber
        outcomeTokensBought
        marketId
      }
    }
  `;
  const data = await client.query({ query }); 
  console.log("fetch activity data:", data);
  return data;
};

export const fetchLatestMarketBaseSepolia = async () => {
  const query = gql`
    query FetchMarket {
      marketInitializeds {
        marketId
        description
        outcome1
        outcome2
        outcome1Token
        outcome2Token
        blockTimestamp
      }
    }
  `;
  const data = await client.query({ query });
  console.log("fetch market data", data);
  return data;
}