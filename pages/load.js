import React, { useState } from "react";
import { ethers } from "ethers";
import { Wagmi } from "wagmi";

const LoadERC20Token = ({ mockToken, previousUser }) => {
  // Define state variables to store contract address, token information, and error message
  const [contractAddress, setContractAddress] = useState("");
  const [tokenInfo, setTokenInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoadToken = async () => {
    // Check if contract address input is empty
    if (!contractAddress) {
      setErrorMessage("Please enter a contract address");
      return;
    }

    // Reset error message
    setErrorMessage("");

    // Try loading token information
    try {
      // Check if mock token is provided
      if (mockToken) {
        // Use mock token data
        const { name, symbol, balance } = mockToken;
        setTokenInfo({
          name,
          symbol,
          balance,
        });
      } else {
        // Use real contract data
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const wagmi = new Wagmi(provider);

        const contract = new Wagmi.Contract(contractAddress);
        const name = await contract.name();
        const symbol = await contract.symbol();
        const balance = await contract.balanceOf(wagmi.signer.address);

        setTokenInfo({
          name,
          symbol,
          balance,
        });

        // Get previous balance for comparison
        const previousContract = new Wagmi.Contract(contractAddress);
        const previousBalance = await previousContract.balanceOf(previousUser);
        setPreviousBalance(previousBalance);
      }
    } catch (error) {
      // Handle errors
      console.error(error);

      if (error.message.includes("NotFound")) {
        setErrorMessage("Token does not exist");
      } else {
        setErrorMessage("Error loading token information.");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={contractAddress}
        onChange={(event) => {
          setContractAddress(event.target.value);
          setErrorMessage(""); // Reset error message when input changes
        }}
      />

      <button onClick={handleLoadToken}>Load Token</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {tokenInfo && (
        <div>
          <h2>{tokenInfo.name}</h2>
          <p>Symbol: {tokenInfo.symbol}</p>
          <p>Balance: {tokenInfo.balance}</p>
        </div>
      )}
    </div>
  );
};

export default LoadERC20Token;
