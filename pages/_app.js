import '@/styles/globals.css'
import { WagmiConfig, configureChains, mainnet,createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import {infuraProvider} from 'wagmi/providers/infura'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'



const { chains,publicClient,webSocketPublicClient } = configureChains(
  [mainnet],
  [infuraProvider({apiKey: '6282af9ff2144acd92ed9a366bd015d6'}),publicProvider()],
  ) 

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})



  function App({ Component, pageProps }) {

    return(
    <WagmiConfig config={config}>
     <Component {...pageProps} />
    </WagmiConfig>
    );

   }
   export default App;
