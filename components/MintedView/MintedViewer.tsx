import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import getOwned from '../../sol/getOwned';
import { Html , Billboard, CameraShake, useAspect,  Preload , TransformControls, Scroll} from '@react-three/drei'
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Image,
  Stack,
} from '@chakra-ui/react';

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

function ProductSimple({image, name, text}: any) {
  return (
    <Center py={12} sx={{margin:'20px'}}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={image}
	    alt="anotheralternate"
          />
{/*   <Image
      loader={image}
      src="me.png"
      alt="Picture of the author"
      layout="fill"/>
      */}
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={400} fontSize={'xs'}>
              {text}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}


const GetOwnedNfts = () => {
  const { publicKey, connected } = useWallet();
  const [ownedNfts, setOwnedNfts] = useState<any[]>([{},{},{}])
  useEffect(() => {
    if (publicKey !== null) {
    (async ()=>{
      console.log(publicKey.toBase58());
      const owned = await getOwned(publicKey.toBase58());
      setOwnedNfts(owned)
      console.log(owned);
      })();
    }
  }, [publicKey]);
  return (
    <div style={{display:"flex",flexDirection:"row" ,width:"100%", maxWidth:"900px", margin: "auto"}}>
    {ownedNfts.map((item)=>{return <div key={item.image}>
    <ProductSimple image={item.image} name={item.name} text={item.description}/>
    </div>})}
    </div>
  );
};

export default GetOwnedNfts;

export const GetOwnedNfts3D = () => {
  const { publicKey, connected } = useWallet();
  const [ownedNfts, setOwnedNfts] = useState<any[]>([{},{},{}])
  useEffect(() => {
    if (publicKey !== null) {
    (async ()=>{
      console.log(publicKey.toBase58());
      const owned = await getOwned(publicKey.toBase58());
      setOwnedNfts(owned)
      console.log(owned);
      })();
    }
  }, [publicKey]);

const scale = useAspect(
  1024,                     // Pixel-width
  512,                      // Pixel-height
  1                         // Optional scaling factor
)

  return (<>
    {ownedNfts.map((item: any)=>{ 
    return( 
    <mesh scale={scale}>
    <planeGeometry />
    <meshBasicMaterial map={item.image} />
    </mesh>)})}
  </>);
};

