import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import getMintAddresses  from '../../sol/getCollection';
import { PublicKey } from "@solana/web3.js";

const GetMints = () => {
  const { publicKey, connected } = useWallet();
  const [ownedNfts, setOwnedNfts] = useState<any[]>([])
const candyMachineId = new PublicKey("9k6NTDLxFt99oXDgaMX5FHdBBGXRRgwfW75MS8SRbsDq");
  useEffect(() => {
    if (publicKey !== null) {
    (async ()=>{
      console.log(publicKey.toBase58());
      const owned = await getMintAddresses(candyMachineId);
      setOwnedNfts(owned)
      console.log(owned);
      })();
    }
  }, [publicKey, candyMachineId]);
  return (
    <>
    <div>{ownedNfts.map((item, i)=>{return <div key={i}>count</div>})}</div>
    </>
  );
};

export default GetMints;
