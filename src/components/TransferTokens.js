import React, { useState } from "react";
import {ethers} from 'ethers';
const TransferTokens = ({
  tokenName,
  contract,
  decimals,
  onTransferComplete,
  onTransactionComplete,
}) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleTransfer = async () => {
    try {
      setStatus(`Processing ${tokenName} transfer...`);
      const transferAmount = ethers.parseUnits(amount, decimals);

      // Perform the transfer
      const tx = await contract.transfer(recipient, transferAmount);
      setStatus(`Waiting for ${tokenName} transfer to be mined...`);
      const receipt = await tx.wait(); // Wait for transaction confirmation

      if (receipt.status === 1) {
        setStatus(`Transfer of ${tokenName} successful!`);

        // Notify parent component of the new transaction
        onTransactionComplete({
          token: tokenName,
          amount,
          recipient,
          txHash: receipt.transactionHash,
        });

        // Refresh balances
        onTransferComplete();
      } else {
        setStatus(`Transfer of ${tokenName} failed.`);
      }
    } catch (error) {
      console.error("Transfer failed:", error);
      setStatus(`Transfer failed: ${error.message}`);
    }
  };

  return (
    <div className="transfer-tokens">
      <h4>Transfer {tokenName}</h4>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder={`Amount (${tokenName})`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />
      <button onClick={handleTransfer} className="button">
        Transfer {tokenName}
      </button>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default TransferTokens;
