import "./App.css";
import React, { useMemo, useRef } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
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
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { LayoutC } from "../components/Layout";
import { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import createEmotionCache from "../createEmotionCache";
import Layout from "../components/dom/Layout";
import dynamic from "next/dynamic";
require("@solana/wallet-adapter-react-ui/styles.css");
const Scene = dynamic(() => import("../components/canvas/Scene"), {
  ssr: true,
});


const clientSideEmotionCache = createEmotionCache();

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const themeChakra = extendTheme({ colors });

const App = ({ Component, pageProps }: AppProps) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const ref = useRef();

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
            <LayoutC>
              <Layout ref={ref}>
                <Component {...pageProps} />
                {Component?.canvas && (
                  <Scene
                    className="pointer-events-none"
                    eventSource={ref}
                    eventPrefix="client"
                  >
                    {Component.canvas(pageProps)}
                  </Scene>
                )}
              </Layout>
            </LayoutC>
          </ChakraProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
