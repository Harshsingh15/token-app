import React, { useState } from "react";

const ConnectWallet = ({ setWalletAddress }) => {
  const [status, setStatus] = useState("Not Connected");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        setStatus("Connected");
      } catch (error) {
        console.error("Connection error:", error);
        setStatus("Failed to Connect");
      }
    } else {
      setStatus("MetaMask Not Installed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-indigo-50 min-h-screen">
      <button
        onClick={connectWallet}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-indigo-700 transition-all"
      >
        Connect Wallet
      </button>
      <p className="mt-4 text-gray-700 font-medium">Status: {status}</p>
    </div>
  );
};

export default ConnectWallet;
