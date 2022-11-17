import Link from 'next/link'
import { WalletConnectButton } from "@solana/wallet-adapter-react-ui";
import { ReactNode } from 'react';

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

type LayoutProps = {
	children: React.ReactNode;
}

export const LayoutC = (props: LayoutProps) => {
  return (
    <div className="layout">
      <header style={{display:"flex",justifyContent:"center"}}>
      </header>

      <div className="page-content App">
        { props.children }
      </div>

    </div>
  )
}





