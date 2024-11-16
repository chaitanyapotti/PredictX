import { sepolia, baseSepolia, unichainSepolia, polygonAmoy, bitkubTestnet, mantleSepoliaTestnet, lineaSepolia, flowTestnet, scrollSepolia, morphHolesky } from "viem/chains";
import { CHAIN_NAME, type ChainNameType } from "./constants";

export const generateJWTToken = async ({ login_type, login_email, public_address }: { login_type: string, login_email: string, public_address: string }) => {
  try {
    console.log('generating JWT token', { login_type, login_email, public_address });
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login_type,
        login_email,
        public_address,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to submit user data:', error);
    throw error;
  }
};

export const getChainConfig = (chain: ChainNameType) => {
  switch (chain) {
    case CHAIN_NAME.SEPOLIA:
      return sepolia;
    case CHAIN_NAME.BASE_SEPOLIA:
      return baseSepolia;
    case CHAIN_NAME.UNICHAIN_SEPOLIA:
      return unichainSepolia;
    case CHAIN_NAME.POLYGON_AMOY:
      return polygonAmoy;
    case CHAIN_NAME.BITKUB_TESTNET:
      return bitkubTestnet;
    case CHAIN_NAME.MANTEL_SEPOLIA_TESTNET:
      return mantleSepoliaTestnet;
    case CHAIN_NAME.LINEA_SEPOLIA:
      return lineaSepolia;
    case CHAIN_NAME.FLOW_TESTNET:
      return flowTestnet;
    case CHAIN_NAME.SCROLL_SEPOLIA:
      return scrollSepolia;
    case CHAIN_NAME.MORPH_HOLESKY:
      return morphHolesky;
    default:
      return baseSepolia;
  }
}