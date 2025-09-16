const hre = require("hardhat");

async function main() {
  // 1. Get our contract. We need the address to know where it is.
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ← WE WILL REPLACE THIS AFTER DEPLOYMENT
  const CaseHash = await hre.ethers.getContractFactory("CaseHash");
  const caseHash = await CaseHash.attach(contractAddress);

  console.log("Interacting with contract at:", contractAddress);

  // 2. Let's create a fake document hash to test with.
  // A real hash is 66 characters long (including '0x').
  const testDocumentHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

  console.log("Testing with hash:", testDocumentHash);

  // 3. Register the hash
  console.log("Registering document hash on the blockchain...");
  const registerTx = await caseHash.registerHash(testDocumentHash);
  await registerTx.wait(); // Wait for the transaction to be mined

  console.log("✅ Document hash registered!");

  // 4. Now, let's verify it exists
  console.log("Verifying the hash...");
  const [exists, timestamp] = await caseHash.verifyHash(testDocumentHash);

  if (exists) {
    // JavaScript dates expect timestamps in milliseconds, Solidity uses seconds
    const date = new Date(Number(timestamp) * 1000);
    console.log("✅ Verification SUCCESSFUL!");
    console.log("Document was registered on:", date.toISOString());
  } else {
    console.log("❌ Verification FAILED. Hash not found.");
  }

  // 5. Let's also test verifying a hash we NEVER registered
  console.log("\nTesting verification of an UNREGISTERED hash...");
  const fakeHash = "0xFAKE7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
  const [fakeExists, fakeTimestamp] = await caseHash.verifyHash(fakeHash);

  if (!fakeExists) {
    console.log("✅ Correctly verified that the fake hash is NOT registered.");
  } else {
    console.log("❌ Something is wrong. Fake hash was found.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});