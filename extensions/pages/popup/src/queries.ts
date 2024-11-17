import { fetchActivitySepolia, fetchLatestMarketSepolia } from "./activity.sepolia";
import { fetchActivityBaseSepolia, fetchLatestMarketBaseSepolia } from "./activity.base-sepolia";
import { CHAIN_NAME, type ChainNameType } from "./constants";

export const fetchActivity = async (currentChain: ChainNameType) => {
  let result;
  switch (currentChain) {
    case CHAIN_NAME.SEPOLIA:
      result = await fetchActivitySepolia();
      break;
    case CHAIN_NAME.BASE_SEPOLIA:
      result = await fetchActivityBaseSepolia();
      break;
  }
  return result;
}

export const fetchMarket = async (currentChain: ChainNameType) => {
  let result;
  switch (currentChain) {
    case CHAIN_NAME.SEPOLIA:
      result = await fetchLatestMarketSepolia();
      break;
    case CHAIN_NAME.BASE_SEPOLIA:
      result = await fetchLatestMarketBaseSepolia();
      break;
  }
  return result;
}
