import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import ContractABI from './CaseHash.json';

const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const CONTRACT_ABI = ContractABI.abi;

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [connectedAddress, setConnectedAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setConnectedAddress(address.slice(0, 6) + '...' + address.slice(-4));
        setStatus('✅ Wallet connected');
      } catch (error) {
        setStatus('❌ Error connecting wallet: ' + error.message);
      }
    } else {
      setStatus('❌ Please install MetaMask!');
    }
  };

  const calculateFileHash = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return '0x' + hashHex;
  };

  const registerDocument = async () => {
    if (!file) {
      setStatus('❌ Please select a file first');
      return;
    }

    if (!connectedAddress) {
      setStatus('❌ Please connect your wallet first');
      return;
    }

    try {
      setStatus('Calculating file hash...');
      const documentHash = await calculateFileHash(file);
      
      setStatus('Connecting to contract...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setStatus('Registering on blockchain... (Confirm in MetaMask)');
      const tx = await contract.registerHash(documentHash);
      await tx.wait();

      setStatus('✅ Document successfully registered on blockchain!');
      setVerificationResult(`Hash: ${documentHash.slice(0, 16)}...`);
    } catch (error) {
      setStatus('❌ Error: ' + error.message);
    }
  };

  const verifyDocument = async () => {
    if (!file) {
      setStatus('❌ Please select a file first');
      return;
    }

    try {
      setStatus('Calculating file hash...');
      const documentHash = await calculateFileHash(file);
      
      setStatus('Verifying on blockchain...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const [exists, timestamp] = await contract.verifyHash(documentHash);

      if (exists) {
        const date = new Date(Number(timestamp) * 1000);
        setStatus('✅ Document verification SUCCESSFUL!');
        setVerificationResult(`Registered on: ${date.toLocaleString()}`);
      } else {
        setStatus('❌ Document NOT FOUND on blockchain');
        setVerificationResult('This document may be tampered with or never registered');
      }
    } catch (error) {
      setStatus('❌ Error: ' + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CaseHash - Judicial Document Verifier</h1>
        
        {!connectedAddress ? (
          <button onClick={connectWallet} className="connect-btn">
            Connect MetaMask Wallet
          </button>
        ) : (
          <p className="connected">Connected: {connectedAddress}</p>
        )}

        <div className="file-section">
          <h2>Select Document</h2>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="file-input"
          />
          {file && <p>Selected: {file.name}</p>}
        </div>

        <div className="action-buttons">
          <button onClick={registerDocument} className="btn register">
            Register Document
          </button>
          <button onClick={verifyDocument} className="btn verify">
            Verify Document
          </button>
        </div>

        <div className="status">
          <h3>Status:</h3>
          <p>{status}</p>
        </div>

        {verificationResult && (
          <div className="result">
            <h3>Result:</h3>
            <p>{verificationResult}</p>
          </div>
        )}

        <div className="info">
          <p>This system stores document hashes on blockchain for tamper-proof verification.</p>
          <p>Original documents remain private - only the hash is stored publicly.</p>
        </div>
      </header>
    </div>
  );
}

export default App;