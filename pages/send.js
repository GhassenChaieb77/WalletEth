import * as React from 'react'; // Import React library for creating UI components
import { useDebounce } from 'use-debounce'; // Import useDebounce hook for debouncing inputs
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'; // Import Wagmi hooks for preparing, sending, and waiting for transactions
import { parseEther } from 'viem'; // Import parseEther function for converting ether values

export function SendTransaction() {
  // State variables to store recipient address and amount
  const [to, setTo] = React.useState('');
  const [amount, setAmount] = React.useState('');

  // Debounced versions of to and amount for better performance
  const [debouncedTo] = useDebounce(to, 500); // Debounce to input with 500ms delay
  const [debouncedAmount] = useDebounce(amount, 500); // Debounce amount input with 500ms delay

  // Use prepareSendTransaction hook to prepare the transaction config
  const { config } = usePrepareSendTransaction({
    to: debouncedTo, // Debounced recipient address
    value: debouncedAmount ? parseEther(debouncedAmount) : undefined, // Debounced amount parsed to ether
  });

  // Use sendTransaction hook to send the transaction
  const { data, sendTransaction } = useSendTransaction(config);

  // Use waitForTransaction hook to wait for transaction confirmation
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash, // Transaction hash obtained from sendTransaction
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        sendTransaction?.(); // Execute the sendTransaction function
      }}
    >
      <input
        aria-label="Recipient" // Accessibility label for recipient input
        onChange={(e) => setTo(e.target.value)} // Update recipient state on input change
        placeholder="0xA0Cf…251e" // Placeholder text for recipient input
        value={to} // Display current recipient value
      />

      <input
        aria-label="Amount (ether)" // Accessibility label for amount input
        onChange={(e) => setAmount(e.target.value)} // Update amount state on input change
        placeholder="0.05" // Placeholder text for amount input
        value={amount} // Display current amount value
      />

      <button
        type="submit" // Submit button type
        disabled={isLoading || !sendTransaction || !to || !amount} // Disable button if transaction is loading, sendTransaction is not available, or recipient/amount is empty
      >
        {isLoading ? 'Sending...' : 'Send'} 
      </button>

      {isLoading && <div>Check Wallet</div>} 

      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} 

      {isSuccess && ( // Display success message and Etherscan link if transaction is successful
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}
