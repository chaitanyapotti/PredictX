import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://api.studio.thegraph.com/query/94980/predict-x-webhook/0.0.3'

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

export const fetchActivitySepolia = async () => {
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

export const fetchLatestMarketSepolia = async () => {
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

