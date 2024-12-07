import React, { useState, useEffect } from "react";
import ConnectWallet from "./components/ConnectWallet";
import DisplayBalances from "./components/DisplayBalances";
import TransferTokens from "./components/TransferTokens";
import TransactionHistory from "./components/TransactionHistory";
import { ethers } from "ethers";

import usdtAbi from "./utils/usdtAbi.json";
import usdcAbi from "./utils/usdcAbi.json";
import yfiAbi from "./utils/yfiAbi.json";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [contracts, setContracts] = useState({});
  const [provider, setProvider] = useState(null);

  // Load transactions from localStorage or initialize as empty array
  const loadTransactionsFromLocalStorage = () => {
    const savedTransactions = localStorage.getItem("transactionHistory");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  };

  const [transactions, setTransactions] = useState(loadTransactionsFromLocalStorage());

  // Save transactions to localStorage
  const saveTransactionsToLocalStorage = (updatedTransactions) => {
    localStorage.setItem("transactionHistory", JSON.stringify(updatedTransactions));
  };

  // Initialize the ethers provider
  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);
        } catch (error) {
          console.error("Error initializing provider:", error);
        }
      } else {
        console.error("MetaMask not detected. Please install it!");
      }
    };

    initializeProvider();
  }, []);

  // Initialize contracts
  const initializeContracts = async () => {
    if (!provider) return;

    try {
      const signer = await provider.getSigner(); // Get signer for write operations
      const tokenAddresses = {
        usdt: "0x090fbc1eb5da54c68a07c180096add7fb7323255",
        usdc: "0x9af45b1a1cfa86520a1df193f19bcfac566ab8de",
        yfi: "0x747260ef864ae1736fdf5fb43dce124d02da310a",
      };

      const abis = {
        usdt: usdtAbi,
        usdc: usdcAbi,
        yfi: yfiAbi,
      };

      const initializedContracts = {};
      for (const [token, address] of Object.entries(tokenAddresses)) {
        initializedContracts[token] = new ethers.Contract(address, abis[token], signer); // Attach signer
      }
      setContracts(initializedContracts);
    } catch (error) {
      console.error("Error initializing contracts:", error.message);
    }
  };

  // Initialize contracts when wallet is connected
  useEffect(() => {
    if (walletAddress) {
      initializeContracts();
    }
  }, [walletAddress, provider]);

  // Update transactions on successful transfer
  const handleNewTransaction = (newTransaction) => {
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveTransactionsToLocalStorage(updatedTransactions); // Save to localStorage
  };

  return (
    <div className="card">
      <div className="card-content">
        {/* Wallet Connection */}
        <ConnectWallet setWalletAddress={setWalletAddress} />

        {/* Display Balances */}
        {walletAddress && (
          <>
            <DisplayBalances walletAddress={walletAddress} contracts={contracts} />

            {/* Token Transfer Feature */}
            <h2>Transfer Tokens</h2>
            <div className="transfer-sections">
              {Object.keys(contracts).map((token) => (
                <TransferTokens
                  key={token}
                  tokenName={token.toUpperCase()}
                  contract={contracts[token]}
                  decimals={18} // Adjust decimals if necessary
                  onTransferComplete={initializeContracts} // Refresh balances after transfer
                  onTransactionComplete={handleNewTransaction} // Add new transaction
                />
              ))}
            </div>

            {/* Transaction History */}
            <h2>Transaction History</h2>
            <TransactionHistory walletAddress={walletAddress} transactions={transactions} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
