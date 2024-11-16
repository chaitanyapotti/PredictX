import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initWeb3Auth } from '@src/web3auth';
import createMetaMaskProvider from 'metamask-extension-provider';
import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { IProvider } from '@web3auth/base';
import type { Web3Auth } from '@web3auth/single-factor-auth';

type LoginType = 'google' | 'metamask' | null;

interface SessionContextType {
  isLoading: boolean;
  loginType: LoginType;
  token: string | null;
  provider: IProvider | MetaMaskInpageProvider | null;
  web3authSFAuth: Web3Auth | null;
  metamaskProvider: MetaMaskInpageProvider | null;
  login: (type: LoginType, token: string) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState<LoginType>(null);
  const [token, setToken] = useState<string | null>(null);

  const web3authSFAuth = useMemo(() => initWeb3Auth(), []);
  const metamaskProvider = useMemo(() => createMetaMaskProvider(), []);

  const provider = useMemo(() => {
    if (loginType === 'google') {
      return web3authSFAuth.provider;
    } else if (loginType === 'metamask') {
      return metamaskProvider;
    }
    return null;
  }, [loginType, web3authSFAuth, metamaskProvider]);

  useEffect(() => {
    const initSession = async () => {
      const data = await chrome.storage.local.get(['token', 'login_type']);
      if (data.login_type) {
        setLoginType(data.login_type as 'google' | 'metamask');
        if (data.login_type === 'google') {
          await web3authSFAuth?.init();
          if (web3authSFAuth.status === 'connected') {
            setLoginType('google');
          } else {
            logout();
          }
        } else if (data.login_type === 'metamask') {
          const accounts = await metamaskProvider.request<string[]>({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setLoginType('metamask');
          } else {
            logout();
          }
        }
      }
      setIsLoading(false);
    };
    initSession();
  }, [web3authSFAuth, metamaskProvider]);

  const login = async (type: LoginType, newToken: string) => {
    setLoginType(type);
    setToken(newToken);
    await chrome.storage.local.set({ 
      token: newToken, 
      login_type: type 
    });
  };

  const logout = async () => {
    setLoginType(null);
    setToken(null);
    await chrome.storage.local.remove(['token', 'login_type']);
  };

  return (
    <SessionContext.Provider 
      value={{ 
        isLoading, 
        loginType, 
        provider, 
        token, 
        web3authSFAuth,
        metamaskProvider,
        login,
        logout 
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
} 