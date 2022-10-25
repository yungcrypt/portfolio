import './App.css';
import React, { useMemo } from 'react';
import Home from '../mint/Home';
import { DEFAULT_TIMEOUT } from '../mint/connection';
import * as anchor from '@project-serum/anchor';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { createTheme, ThemeProvider } from '@material-ui/core';
import GetOwnedNfts from '../components/MintedView/MintedViewer';
import GetMints from '../components/CollectionView/CollectionViewer';
import { Layout } from '../components/Layout';
import { AppProps } from 'next/app';
import Recipes from './index';
import { extendTheme } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import createEmotionCache from "../createEmotionCache";
import { CacheProvider } from "@emotion/react";
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const clientSideEmotionCache = createEmotionCache();

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const themeChakra = extendTheme({ colors });




const App = ({ Component, pageProps }: AppProps) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ChakraProvider theme={themeChakra}>
            <Layout>

              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
