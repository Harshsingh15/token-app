Overview
This project involves the creation and deployment of custom tokens (USDC, USDT, and YFI) on the Binance Smart Chain (BSC) Testnet. The tokens were integrated with a React-based front-end application, enabling seamless token management, including transfers between wallets. The project was deployed using Remix IDE.

Features
Custom Token Creation:

Tokens created: USDC, USDT, and YFI.
Compatible with the ERC-20 standard.
Blockchain Integration:

Deployed smart contracts on the BSC Testnet.
Tokens are importable to MetaMask for easy wallet integration.
Enables token transfers between wallets on the Testnet.
Front-End Integration:

React app for interacting with deployed smart contracts.
Includes functionalities such as checking token balances and initiating transfers.
Deployment:

Smart contracts deployed via Remix IDE.
React app hosted and connected to the BSC Testnet.
Prerequisites
Tools and Dependencies:
MetaMask: For wallet integration and token management.
Node.js: For running the React application.
Remix IDE: For deploying Solidity contracts.
Accounts and Network:
BSC Testnet account with sufficient test BNB for gas fees.
MetaMask configured to the BSC Testnet.
Installation and Setup
Step 1: Clone the Repository-
git clone <repository_url>
cd <project_directory>
Step 2: Install Dependencies
npm install
Step 3: Start the React App
npm start
Deployment Instructions
Deploy Smart Contracts
Open Remix IDE.
Import the Solidity files from the contracts directory.
Compile and deploy the contracts to the BSC Testnet.
Note the deployed contract addresses for further use.
Import Tokens to MetaMask
Open MetaMask and switch to the BSC Testnet.
Add each token:
Token Address: Use the deployed contract address.
Token Symbol: As defined in the contract (e.g., USDC, USDT, YFI).
Usage
Transfer Tokens: Use the React app to transfer tokens to other wallets.
Check Balances: View token balances of any wallet address.
Monitor Transactions: Use BscScan Testnet to track token transactions.
Technologies Used
Solidity: Smart contract development.
Remix IDE: Smart contract deployment.
React: Front-end framework.
MetaMask: Wallet integration.
BSC Testnet: Blockchain network.

Future Improvements
Enable mainnet deployment.
Integrate additional token utilities.

License
This project is licensed under the MIT License.
