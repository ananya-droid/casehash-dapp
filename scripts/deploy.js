const hre = require("hardhat");

async function main() {
  const CaseHash = await hre.ethers.getContractFactory("CaseHash");
  const caseHash = await CaseHash.deploy();
  await caseHash.waitForDeployment();
  const contractAddress = await caseHash.getAddress();
  console.log("CaseHash contract deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});