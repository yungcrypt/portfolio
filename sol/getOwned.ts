import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import axios from "axios";



const getOwned = async (wallet: string) => {
  const connection = new Connection('https://api.devnet.solana.com');
  const keypair = Keypair.generate();

  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(keypair));

  const owner = new PublicKey(wallet);
  const allNFTs = await metaplex.nfts().findAllByOwner({ owner });
  console.log(allNFTs);

  return await Promise.all(allNFTs.map(async (nft) => {
            try {
              const meta = await axios.get(nft.uri);
              if (
                meta.data.image !== undefined
              ) {
                console.log("RETURNED");

                 return({
                    image: meta.data.image,
                    animation: meta.data.animation_url
                      ? meta.data.animation_url
                      : "none",
                    description: meta.data.description,
                    name: meta.data.name,
                    attributes: meta.data.attributes,
                  })

		}
	    } catch (err) {
              console.log(err);
            }
   }))

}

export default getOwned;
