import { fetchActivitySepolia, fetchLatestMarketSepolia } from "./activity.sepolia";
import { fetchActivityBaseSepolia, fetchLatestMarketBaseSepolia } from "./activity.base-sepolia";

export const fetchActivity = async (currentChain: "sepolia" | "base-sepolia") => {
  let result;
  switch (currentChain) {
    case "sepolia":
      result = await fetchActivitySepolia();
      break;
    case "base-sepolia":
      result = await fetchActivityBaseSepolia();
      break;
  }
  return result;
}

export const fetchMarket = async (currentChain: "sepolia" | "base-sepolia") => {
  let result;
  switch (currentChain) {
    case "sepolia":
      result = await fetchLatestMarketSepolia();
      break;
    case "base-sepolia":
      result = await fetchLatestMarketBaseSepolia();
      break;
  }
  return result;
}
