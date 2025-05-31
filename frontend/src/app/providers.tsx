'use client';

import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import {
  mainnet,
  linea,
  lineaSepolia
} from 'wagmi/chains';

// WalletConnect v2 Project ID - Replace with your own in a production app
const projectId = '9811958bd307518b364ff7178034c435';

// Configure supported chains for MetaID
const metaIdChains = [lineaSepolia, mainnet, linea] as const;

// Configure RainbowKit and wagmi
const config = getDefaultConfig({
  appName: 'MetaID',
  projectId: projectId,
  chains: metaIdChains,
  ssr: true,
});

// Get default wallets with MetaID app name
const { wallets } = getDefaultWallets({
  appName: 'MetaID',
  projectId,
});

// Custom app info for RainbowKit
const metaIdAppInfo = {
  appName: 'MetaID',
  learnMoreUrl: '/learn-more'
};

// Create a new query client for React Query
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  // Handle hydration issues by only rendering when component is mounted client-side
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {mounted ? (
          <RainbowKitProvider
            appInfo={metaIdAppInfo}
            theme={darkTheme({
              accentColor: '#3b82f6', // blue-500 to match our design
              accentColorForeground: 'white',
              borderRadius: 'medium',
              overlayBlur: 'small',
            })}
          >
            {children}
          </RainbowKitProvider>
        ) : (
          // Prevent layout shift by rendering invisible children during SSR
          <div style={{ visibility: "hidden" }}>
            {children}
          </div>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
