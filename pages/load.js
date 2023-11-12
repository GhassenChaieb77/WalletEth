import React from 'react';
import { useContract } from 'wagmi';

const ERC20Token = ({ contractAddress }) => {
  const { data, error } = useContract(contractAddress, {
    readContract: {
      name: true,
      symbol: true,
      balanceOf: {
        args: [eth_accounts()[0]],
      },
    },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const { name, symbol, balanceOf } = data;

  return (
    <div>
      <h2>{name}</h2>
      <p>Symbol: {symbol}</p>
      <p>Solde: {balanceOf}</p>
    </div>
  );
};

