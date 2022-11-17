import {useMemo, useRef} from 'react'
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { clusterApiUrl } from "@solana/web3.js";
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
import { extendTheme, Button } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { createClient } from "contentful";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { CardHolder } from "../components/Cards/Card";
import { CaptionCarousel } from "../components/Carousel/CarouselHome";
import Script from "next/script";
import Lenis from "@studio-freight/lenis";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html , Billboard, CameraShake, Text, Center,  Preload , TransformControls, Scroll} from '@react-three/drei'
import dynamic from "next/dynamic";
import Instructions from "../components/dom/Instructions";
import * as anchor from '@project-serum/anchor';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import SplitWithImage from '../components/Cards/About';
import GetOwnedNfts from '../components/MintedView/MintedViewer';

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import("../components/canvas/Logo"), { ssr: false });

let error: string | undefined = undefined;

if (process.env.NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK === undefined) {
  error =
    "Your REACT_APP_SOLANA_NETWORK value in the .env file doesn't look right! The options are devnet and mainnet-beta!";
} else if (process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST === undefined) {
  error =
    "Your REACT_APP_SOLANA_RPC_HOST value in the .env file doesn't look right! Make sure you enter it in as a plain-text url (i.e., https://metaplex.devnet.rpcpool.com/)";
}
const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    return new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_REACT_APP_CANDY_MACHINE_ID!);
  } catch (e) {
    console.log("Failed to construct CandyMachineId", e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const network = (process.env.NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK ??
  "devnet") as WalletAdapterNetwork;
const rpcHost =
  process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST ?? anchor.web3.clusterApiUrl("devnet");
const connection = new anchor.web3.Connection(rpcHost);
  const endpoint = clusterApiUrl(network)

  const wallets = 
    [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ]


export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID
      ? process.env.CONTENTFUL_SPACE_ID
      : "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
      ? process.env.CONTENTFUL_ACCESS_KEY
      : "",
  });

  const res = await client.getEntries({ content_type: "showcase" });
  console.log(res.items);

  return {
    props: {
      films: res.items ? res.items : [{ fields: { title: "none" } }],
    },
  };
};

export const Carousel = ({
  films,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(films);

  return (
    <>
  {/*<CaptionCarousel films={films}/>
  <CardHolder films={films}/>
  */}
    </>
  );
};
export default Carousel;


const config = {
  maxYaw: 0.1, // Max amount camera can yaw in either direction
  maxPitch: 0.1, // Max amount camera can pitch in either direction
  maxRoll: 0.1, // Max amount camera can roll in either direction
  yawFrequency: 0.1, // Frequency of the the yaw rotation
  pitchFrequency: 0.1, // Frequency of the pitch rotation
  rollFrequency: 0.1, // Frequency of the roll rotation
  intensity: 1, // initial intensity of the shake
  decay: false, // should the intensity decay over time
  decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
  controls: undefined, // if using orbit controls, pass a ref here so we can update the rotation
}
Carousel.canvas = (props: any) => (<>
<CameraShake {...config} />
  <Html
   center={true}
   transform={true}
   occlude={false}
   distanceFactor={10}
  >

    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
      <SplitWithImage
        candyMachineId={candyMachineId}
        connection={connection}
        txTimeout={60000}
        rpcHost={rpcHost}
        network={network}
        error={error}

      />
      <GetOwnedNfts/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </Html>

<Billboard
  follow={true}
  lockX={false}
  lockY={true}
  lockZ={false} // Lock the rotation on the z axis (default=false)
  position={[0,3,1]}
>
  <Text fontSize={1}>Mint a NFT</Text>
</Billboard>
      </>
);

