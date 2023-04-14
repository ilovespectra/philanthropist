import {
  Button,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
  Box,
  Center,
} from "@chakra-ui/react"
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { PublicKey } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  Metaplex,
  walletAdapterIdentity,
  CandyMachine,
  CandyMachineV2
} from "@metaplex-foundation/js"
import { useRouter } from "next/router"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import "typeface-inter";



const Connected: FC = () => {
  const { connection } = useConnection()
  const walletAdapter = useWallet()
  const [candyMachine, setCandyMachine] = useState<CandyMachineV2>()
  const [isMinting, setIsMinting] = useState(false)

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  }, [connection, walletAdapter])
  const images = [
    "../images/0.png",
    "../images/1.png",
    "../images/2.png",
    "../images/3.png",
    "../images/4.png",
    "../images/5.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  const handlePrevImage = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };
  useEffect(() => {
    if (!metaplex) return

    metaplex
      .candyMachinesV2()
      .findByAddress({
        address: new PublicKey("Hsyh4GFPao5cE3n21Q8MGGz3KKkEibehLWsBvvqkGePm"),
      })
      .then((candyMachine) => {
        console.log(candyMachine)
        setCandyMachine(candyMachine)
      })
      .catch((error) => {
        alert(error)
      })
  }, [metaplex])

  const router = useRouter()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (event.defaultPrevented) return

      if (!walletAdapter.connected || !candyMachine) {
        return
      }

      try {
        setIsMinting(true)
        const nft = await metaplex.candyMachinesV2().mint({
          candyMachine,
    });
        console.log(nft)
        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`)
      } catch (error) {
        alert(error)
      } finally {
        setIsMinting(false)
      }
    },
    [walletAdapter.connected, candyMachine, metaplex, router]
  )

  return (
      <Box
  minW="90vh"
  bgColor="rgba(0, 0, 0, 0.6)"
  borderRadius="20px"
  marginTop="10%"
  p={20}
  w="auto"
  h="auto"
  //maxW={{ base: "95vw", md: "700px" }}
  mt={{ base: "10%", md: "20%" }}
  overflow="auto"
  my={10}
  mx="auto"
  overflowY="auto"
>
  <Box><Text><br></br><br></br><br></br><br></br></Text>
        <Box
          backgroundImage="url('/images/welcome.png')"
          width="50%"
          height="50%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          border="none"
          margin={0}
          marginTop="25%"
          padding={0}
          my={0}
          mx="auto"
          >
          <Image 
          src="/images/welcome.png" 
          alt="Welcome" 
          width="100%" 
          height="100%" 
          marginTop="70%"
          />
        </Box>
      </Box>
            <VStack spacing={2} alignItems="center" maxW="100%">
              <Text color="white" fontSize="l" textAlign="center" py={2} px={7} fontFamily="Inter">
                The Philanthropy Token allows you to directly support the HeliumDenver ecosystem in its earliest stages. This token comes with perks! You will be awarded:<br /><br />
                
                <li>Free booth hosting at all HeliumDenver events</li>
                <li>SWAG! T-shirt, hoodie, stickers, and more!</li>
                <li>100,000 LavaDAO governance tokens<br></br><i>(Out of a max supply of 2,500,000)</i></li>
                <li>LavaDAO Lifetime Membership</li><br></br>
                <b>Price:</b> 220 SOL
              </Text>
      
              <Box w="full" h="full" display="flex" justifyContent="center" alignItems="center">
              <Box position="relative">
            <HStack spacing={0}>
              <Box
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                left={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                zIndex={1}
                w="10%"
                h="10%"
                bgColor="gray.500"
                opacity={0.6}
                borderRadius="full"
                onClick={handlePrevImage}
                _hover={{ cursor: "pointer", opacity: 0.8 }}
              >
                <ChevronLeftIcon boxSize={8} />
              </Box>
                <Image
                  src={images[currentImage]}
                  alt=""
                  w={{ base: "80%", md: "60vw" }}
                  h={{ base: "auto", md: "auto" }}
                  objectFit="fill"
                  borderRadius="md"
                />

              <Box
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                right={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                zIndex={1}
                w="10%"
                h="10%"
                bgColor="gray.500"
                opacity={0.6}
                borderRadius="full"
                onClick={handleNextImage}
                _hover={{ cursor: "pointer", opacity: 0.8 }}
              >
          <ChevronRightIcon boxSize={8} />
      </Box>
  </HStack>
</Box>

              </Box>
          
              <Button
                bgColor="accent"
                color="white"
                maxW={{ base: "80%", md: "420px" }}
                isLoading={isMinting}
                onClick={handleClick}
              >
                <Text> Mint </Text>
              </Button>
          
        </VStack>
  </Box>
);
}
export default Connected
