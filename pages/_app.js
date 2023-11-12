import '@/styles/globals.css'; // Import global styles from the styles/globals.css file
import {
  WagmiConfig,
  configureChains,
  mainnet,
  createConfig,
} from 'wagmi'; // Import Wagmi core components
import { publicProvider } from 'wagmi/providers/public'; // Import public provider for connecting to the Ethereum blockchain
import { infuraProvider } from 'wagmi/providers/infura'; // Import Infura provider for connecting to the Ethereum blockchain
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'; // Import MetaMask connector for interacting with MetaMask wallets

// Configure chains and providers for Wagmi
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet], // Array of chains to support (e.g., mainnet, rinkeby)
  [
    infuraProvider({ apiKey: '6282af9ff2144acd92ed9a366bd015d6' }), // Infura provider with your Infura API key
    publicProvider(), // Public provider for connecting to the Ethereum blockchain
  ],
);

// Create Wagmi config object
const config = createConfig({
  autoConnect: true, // Automatically connect to a wallet if available
  connectors: [
    new MetaMaskConnector({ chains }), // MetaMask connector for connecting to MetaMask wallets
  ],
  publicClient, // Public client for accessing blockchain data
  webSocketPublicClient, // WebSocket public client for real-time blockchain updates
});

// App component that wraps the page component and provides Wagmi context
function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default App; // Export the App component for use in the main application
  