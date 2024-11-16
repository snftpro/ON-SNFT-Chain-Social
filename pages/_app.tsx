import type { AppProps } from "next/app";
import { ThirdwebProvider} from "@thirdweb-dev/react";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Head from "next/head";

const activeChain = {
  chainId: 12012, 
  rpc: ["https://12012.rpc.thirdweb.com/"],
  src : "https://i.imgur.com/j1m7Pqo.png",

  blockExplorerUrls: "https://explorer.snft.pro",
  nativeCurrency: {
    decimals: 18,
    name: "SNFT",
    symbol: "S",

  },
  "icon": {
    "url": "https://i.imgur.com/j1m7Pqo.png",
    "width": 3000,
    "height": 3325,
    "format": "png"
  },
  shortName: "SNFT", 
  slug: "SNFT", 
  testnet: true, 
  chain: "SNFT", 
  name: "SNFT", 

};
const supportedChains = {
  chainId: 12012, 
  rpc: ["https://12012.rpc.thirdweb.com"],
  src : "https://i.imgur.com/j1m7Pqo.png",
  blockExplorerUrls: ["https://explorer.snft.pro"],
  nativeCurrency: {
    decimals: 18,
    name: "SNFT",
    symbol: "S",

  },
  "icon": {
    "url": "https://i.imgur.com/j1m7Pqo.png",
    "width": 3000,
    "height": 3325,
    "format": "png"
  },
  shortName: "SNFT", 
  slug: "SNFT", 
  testnet: true, 
  chain: "SNFT", 
  name: "SNFT", 

};
function MyApp({ Component, pageProps }: AppProps) {


  //Set up smart wallet config

  
  return (
    <><ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedChains={[supportedChains]}


    >
    <Head>
    <title>SNFT</title>
    </Head>
    <Navbar />
    <Component {...pageProps} />
    </ThirdwebProvider>
    <Footer /></>
  );
}

export default MyApp;
