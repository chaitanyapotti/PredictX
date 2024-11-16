import { gql } from "@apollo/client/core";
import { execute } from "../.graphclient";

const fetchActivity = async () => {
  const query = gql`
    query TokenBought @live {
      tokensBoughts {
        currencyAmount
      blockTimestamp
        blockNumber
        outcomeTokensBought
        marketId
      }
    }
  `;
  const data = await execute(query, {}); 
  console.log("fetch activity data:", data);
};

fetchActivity();
