import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import type { IAsyncStorage } from '@web3auth/single-factor-auth';
import { Web3Auth } from '@web3auth/single-factor-auth';

const chainConfig = {
  chainNamespace: 'eip155' as const,
  chainId: '0xaa36a7',
  rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: 'Ethereum Sepolia Testnet',
  blockExplorerUrl: 'https://sepolia.etherscan.io',
  ticker: 'ETH',
  tickerName: 'Ethereum',
  logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
};

const ethPrivateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
});

let web3authSfa: Web3Auth;

class ChromeStorage implements IAsyncStorage {
  async = false;
  async getItem(key: string): Promise<string | null> {
    const data = await chrome.storage.local.get(key);
    return data[key] || null;
  }
  async setItem(key: string, value: string): Promise<void> {
    return chrome.storage.local.set({ [key]: value });
  }
}

export const initWeb3Auth = () => {
  if (web3authSfa) return web3authSfa;

  web3authSfa = new Web3Auth({
    clientId: 'BF5Dc7y5KsVh9lLbzPelGjn1TBNrgwZdUj-9h5mEB0n3TXouH68H3E8IaoqqhVxtVy7M1u1Z8P_T1ezq3XbYaMw', // Get your Client ID from Web3Auth Dashboard
    web3AuthNetwork: 'sapphire_mainnet',
    usePnPKey: true, // Setting this to true returns the same key as PnP Web SDK, By default, this SDK returns CoreKitKey.
    privateKeyProvider: ethPrivateKeyProvider,
    // sessionTime: 1,
    storage: new ChromeStorage(),
    // accountAbstractionProvider: aaProvider,
    // useDkg: false,
  });

  return web3authSfa;
};

export const web3authSFAuth = initWeb3Auth();
