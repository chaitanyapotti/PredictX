import { fetchActivitySepolia } from "./activity.sepolia";
import { fetchActivityBaseSepolia } from "./activity.base-sepolia";

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
