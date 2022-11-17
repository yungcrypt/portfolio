import React from 'react';
import Image from 'next/image';
import {
  Box,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { createClient } from 'contentful';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import * as anchor from '@project-serum/anchor';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import Home from '../mint/Home';
import DirectorCard from '../components/Cards/DirectorCard';
import GetOwnedNfts from '../components/MintedView/MintedViewer';
import SplitWithImage from '../components/Cards/About';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Html , Billboard, Text, Center,  Preload , ScrollControls, Scroll} from '@react-three/drei'

const theme = createTheme({
  palette: {
    type: 'light',
  },
});


export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID
      ? process.env.CONTENTFUL_SPACE_ID
      : '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
      ? process.env.CONTENTFUL_ACCESS_KEY
      : '',
  });

  const res = await client.getEntries({ content_type: 'showcase' });
  console.log(res.items);

  return {
    props: {
      films: res.items ? res.items : [{ fields: { title: 'none' } }],
    },
  };
};
const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    return new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_REACT_APP_CANDY_MACHINE_ID!);
  } catch (e) {
    console.log("Failed to construct CandyMachineId", e);
    return undefined;
  }
};

let error: string | undefined = undefined;

if (process.env.NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK === undefined) {
  error =
    "Your REACT_APP_SOLANA_NETWORK value in the .env file doesn't look right! The options are devnet and mainnet-beta!";
} else if (process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST === undefined) {
  error =
    "Your REACT_APP_SOLANA_RPC_HOST value in the .env file doesn't look right! Make sure you enter it in as a plain-text url (i.e., https://metaplex.devnet.rpcpool.com/)";
}

const candyMachineId = getCandyMachineId();
const network = (process.env.NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK ??
  "devnet") as WalletAdapterNetwork;
const rpcHost =
  process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST ?? anchor.web3.clusterApiUrl("devnet");
const connection = new anchor.web3.Connection(rpcHost);

const Film = ({ films }: InferGetStaticPropsType<typeof getStaticProps>) => {


  const items = films.map((film: any) => {
    return {
      title: film.fields.title,
      text: film.fields.description,
      image: film.fields.thumbnail.fields.file.url,
    };
  });
  return (<></>
  );
};

Film.canvas = (props: any) => (<>
  <Html
   center={true}
   transform={true}
  >
      </Html>

</>)
export default Film;
