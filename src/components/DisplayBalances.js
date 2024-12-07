import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import usdtLogo from '../templates/2.png';
import usdcLogo from '../templates/2.png';
import yfiLogo from '../templates/1.png';

const DisplayBalances = ({ walletAddress, contracts }) => {
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (walletAddress && contracts) {
          const updatedBalances = {};
          for (const [token, contract] of Object.entries(contracts)) {
            const balance = await contract.balanceOf(walletAddress);
            updatedBalances[token] = ethers.formatUnits(balance, 18); // Adjust decimals if needed
          }
          setBalances(updatedBalances);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching balances:", err.message);
        setError("Failed to fetch balances. Please check your network or contracts.");
        setLoading(false);
      }
    };

    fetchBalances();
  }, [walletAddress, contracts]);

  if (loading) {
    return <p className="text-center text-indigo-600">Loading balances...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  // Map token names to their respective logos
  const tokenLogos = {
    usdt: usdtLogo,
    usdc: usdcLogo,
    yfi: yfiLogo,
  };

  return (
    <div className="balances">
      {Object.entries(balances).map(([token, balance]) => (
        <p key={token} className="flex items-center">
          <img
            src={tokenLogos[token.toLowerCase()]} // Get the logo based on the token name
            alt={`${token.toUpperCase()} logo`}
            style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and margin as needed
          />
          <strong>{token.toUpperCase()}:</strong> {balance}
        </p>
      ))}
    </div>
  );
};

export default DisplayBalances;