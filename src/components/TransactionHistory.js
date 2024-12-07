import React from "react";

const TransactionHistory = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p className="text-center">No transactions to display.</p>;
  }

  return (
    <div className="transaction-history">
      {transactions.map((tx, index) => (
        <div key={index} className="transaction">
          <p>
            <strong>Token:</strong> {tx.token}
          </p>
          <p>
            <strong>Amount:</strong> {tx.amount}
          </p>
          <p>
            <strong>Recipient:</strong> {tx.recipient}
          </p>
          <p>
            <strong>Transaction:</strong>{" "}
            <a
              href={`https://testnet.bscscan.com/address/${tx.recipient}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on BscScan
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
