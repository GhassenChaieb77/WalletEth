import React, { useState } from 'react'; // Import React and useState hooks for managing component state
import { useConnect, useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'; // Import Wagmi hooks for connecting wallet, managing account, and interacting with ENS
import { SendTransaction } from './send'; // Import SendTransaction component for sending transactions
import LoadERC20Token from "./load"; // Import LoadERC20Token component for loading token information

export default function Home() {
  // Define state variable to store contract address

  // Mock token data
  const mockToken = {
    name: "Mock Token",
    symbol: "MTK",
    balance: "1000000000000000000",
    address: "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF",
  };

  
  // Wagmi hooks for connecting wallet and managing account
  const { connect, connectors } = useConnect(); // Hook for connecting to a wallet
  const { address, connector, isConnected, error } = useAccount(); // Hook for accessing connected account information
  const { data: ensName } = useEnsName({ address }); // Hook for resolving ENS name for connected address
  const { disconnect } = useDisconnect(); // Hook for disconnecting from the connected wallet


  if (isConnected) {

    return (

      <main>
        <div class="container">
          <h1>User Informations</h1>
          {ensName ? `${ensName} (${address})` : address}
          <div>Connected to {connector.name}</div>
          <button onClick={disconnect}>Disconnect</button>
        </div>

        <div class="container">
          <h1>User Transaction</h1>
          <hr></hr>
          <br></br>
          <SendTransaction />
        </div>

        <div class="container">
          <h1>Chargement des Informations du Token ERC-20</h1>
          <h3>Mock test token : 0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF</h3>
          <LoadERC20Token mockToken={mockToken} />
        </div>
      </main>

      
    );

  } else {
    return (
      <main>
        <div class="container">
          <h1>Login</h1>

          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </button>
          ))}

          {/* Display error message if connection fails */}
          {error && <div>{error.message}</div>}
        </div>
      </main>
    );
  }
}
