export const CHAIN_NAME = {
  SEPOLIA: 'Sepolia',
  BASE_SEPOLIA: 'Base Sepolia',
  UNICHAIN_SEPOLIA: 'Unichain Sepolia',
  POLYGON_AMOY: 'Polygon Amoy',
  BITKUB_TESTNET: 'Bitkub Testnet',
  MANTEL_SEPOLIA_TESTNET: 'Mantle Sepolia Testnet',
  LINEA_SEPOLIA: 'Linea Sepolia',
  FLOW_TESTNET: 'Flow Testnet',
  SCROLL_SEPOLIA: 'Scroll Sepolia',
  MORPH_HOLESKY: 'Morph Holesky',
} as const;

export type ChainNameType = (typeof CHAIN_NAME)[keyof typeof CHAIN_NAME];
