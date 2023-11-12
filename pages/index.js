import React, { useState, useEffect } from 'react';
import { useConnect, useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { SendTransaction } from './send';
import { ERC20Token } from './load';

export default function Home() {
  const { connect, connectors } = useConnect();
  const { address, connector, isConnected, error, isReconnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const [contractAddress, setContractAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isConnected) {
      // Attempt to auto-connect using the first available connector
      connect({ connector: connectors[0] });
    }
  }, [isConnected]);

  const handleInputChange = (event) => {
    setContractAddress(event.target.value);
  };

  const handleSubmit = () => {
    // Clear any previous error or success messages
    setErrorMessage('');
    setSuccessMessage('');

    // Attempt to load token information
    try {
      <ERC20Token contractAddress={contractAddress} />;
      setSuccessMessage('Token information loaded successfully.');
    } catch (error) {
      setErrorMessage(`Error loading token information: ${error.message}`);
    }
  };

  if (isConnected) {
    return (
      <main>
        <div className="container">
        <hr></hr>
        <br></br>
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        <h1>User Information</h1>
        <div>Connected to {connector.name}</div>
        <button onClick={disconnect}>Disconnect</button>
</div>
        <div className="container">
          <h1>User Transactions</h1>
          <hr></hr>
          <br></br>
          <SendTransaction />
        </div>

        <div>
          <div className="container">
            <hr></hr>
            <br></br>
            <h1>Chargement des Informations du Token ERC-20</h1>

            <form onSubmit={handleSubmit}>
              <label>Adresse du contrat ERC-20:</label>
              <input type="text" value={contractAddress} onChange={handleInputChange} />
              <input type="submit" value="Charger" />
            </form>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div className="container">
          <h1>Login</h1>

          {connectors.map((connector) => (
            <button key={connector.id} onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          ))}

          {error && <div className="error-message">{error.message}</div>}
        </div>
      </main>
    );
  }
}
