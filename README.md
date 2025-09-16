# CaseHash - Judicial Document Verification System 🔒⚖️

A blockchain-based, tamper-proof verification system for judicial documents built on Ethereum. This system ensures the integrity and authenticity of legal documents through cryptographic hashing and immutable blockchain storage.

![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-3C3C3D?style=for-the-badge&logo=ethereum)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Smart Contracts](https://img.shields.io/badge/Smart%20Contracts-Solidity-363636?style=for-the-badge&logo=solidity)


## 🌟 Features

### 🔐 Core Functionality
- **Document Hash Registration**: Store cryptographic hashes of judicial documents on Ethereum blockchain
- **Tamper-Proof Verification**: Verify document authenticity and detect any alterations
- **Immutable Timestamping**: Precise registration timestamps for legal evidence
- **Access Control**: Role-based permissions for court administrators

### 🛡️ Security Features
- **Cryptographic Integrity**: SHA-256 hashing ensures document immutability
- **Zero-Knowledge Verification**: Verify documents without revealing contents
- **Blockchain Immutability**: Once registered, records cannot be altered or deleted
- **Transparent Audit Trail**: Complete history of document registrations

### 💻 User Experience
- **Intuitive React Interface**: User-friendly web application
- **MetaMask Integration**: Secure wallet connectivity
- **Real-time Status Updates**: Live transaction monitoring
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Frontend
        React[React.js UI]
        Ethers[Ethers.js]
        MM[MetaMask Integration]
    end

    subgraph Blockchain
        SC[Smart Contract<br/>CaseHash.sol]
        BC[Ethereum Blockchain]
    end

    subgraph Storage
        Hash[Document Hashes]
        TS[Timestamps]
        Meta[Metadata]
    end

    React -->|Interaction| Ethers
    Ethers -->|Blockchain Calls| MM
    MM -->|Transactions| SC
    SC -->|Storage| Hash
    SC -->|Storage| TS
    SC -->|Storage| Meta
    SC -->|RPC| BC
🛠️ Tech Stack
Smart Contracts
Solidity ^0.8.19 - Smart contract programming language

Hardhat - Development framework and testing suite

Ethers.js - Blockchain interaction library

Frontend
React.js - User interface framework

Ethers.js - Web3 integration library

MetaMask - Wallet connection and transaction signing

Development Tools
Node.js - JavaScript runtime

Git - Version control

GitHub - Code repository and collaboration

📦 Installation & Setup
Prerequisites
Node.js (v16 or higher)

MetaMask browser extension

Git

Local Development
Clone the repository

bash

Copy

Download
git clone https://github.com/ananya-droid/casehash-dapp.git
cd casehash-dapp
Install dependencies

bash

Copy

Download
# Install blockchain dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
Start local blockchain

bash

Copy

Download
npx hardhat node
Deploy smart contracts

bash

Copy

Download
npx hardhat run scripts/deploy.js --network localhost
Update contract address

bash

Copy

Download
# Copy the deployed contract address and update frontend/src/App.js
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
Start development server

bash

Copy

Download
cd frontend
npm start
Access application
Open http://localhost:3000 in your browser

🚀 Deployment
Smart Contract Deployment
Sepolia Testnet
bash

Copy

Download
# Set environment variables
export ALCHEMY_API_KEY=your_alchemy_key
export PRIVATE_KEY=your_private_key

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
Mainnet Deployment
bash

Copy

Download
npx hardhat run scripts/deploy.js --network mainnet
Frontend Deployment
Vercel (Recommended)
Connect GitHub repository to Vercel

Set environment variables

Deploy automatically

Netlify
Build project: cd frontend && npm run build

Drag and drop build folder to Netlify

📖 Usage Guide
For Court Clerks
Connect MetaMask wallet

Select judicial document (PDF, DOC, etc.)

Click "Register Document"

Confirm transaction in MetaMask

Document hash is stored on blockchain

For Verification
Upload the same document

Click "Verify Document"

System checks blockchain for hash match

Receive verification status with timestamp

🔧 Smart Contract Functions
CaseHash.sol
solidity

Copy

Download
// Register document hash
function registerHash(bytes32 _documentHash, string memory _caseNumber) external onlyCourt

// Verify document existence
function verifyHash(bytes32 _documentHash) external view returns (bool, uint256, string memory, address)

// Access control modifier
modifier onlyCourt()
🧪 Testing
Run comprehensive test suite:

bash

Copy

Download
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/CaseHash.js

# Test with coverage report
npx hardhat coverage
📊 Project Structure
text

Copy

Download
casehash-dapp/
├── contracts/
│   └── CaseHash.sol          # Main smart contract
├── scripts/
│   └── deploy.js             # Deployment script
├── test/
│   └── CaseHash.js           # Test cases
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styles
│   │   └── index.js          # React entry point
│   └── public/               # Static assets
├── hardhat.config.js         # Hardhat configuration
└── package.json              # Dependencies
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push to branch: git push origin feature/amazing-feature

Open a Pull Request

Development Guidelines
Follow Solidity style guide

Write comprehensive tests for new features

Update documentation accordingly

Use descriptive commit messages

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

🛡️ Security
Auditing
Smart contracts include access control modifiers

Input validation and error handling implemented

Comprehensive test coverage

Best Practices
Use latest Solidity version with security patches

Implement circuit breakers for emergency stops

Regular security audits recommended for production use

🙋‍♂️ Support
For support, questions, or contributions:

Open an issue on GitHub

Email: ananyak8704@gmail.com


🎯 Future Enhancements
IPFS integration for document storage

Multi-signature approval system

Zero-knowledge proof verification

Cross-chain compatibility

Mobile application

API for third-party integrations


