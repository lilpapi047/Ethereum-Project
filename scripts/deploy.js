const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Check account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy UserAuthentication contract
  console.log("\nDeploying UserAuthentication contract...");
  const UserAuthentication = await ethers.getContractFactory("UserAuthentication");
  const userAuth = await UserAuthentication.deploy();
  
  await userAuth.waitForDeployment();
  const contractAddress = await userAuth.getAddress();

  console.log("UserAuthentication deployed to:", contractAddress);
  console.log("Transaction hash:", userAuth.deploymentTransaction().hash);

  // Verify deployment
  console.log("\nVerifying deployment...");
  const code = await ethers.provider.getCode(contractAddress);
  if (code === "0x") {
    console.error("❌ Contract deployment failed - no code at address");
  } else {
    console.log("✅ Contract deployed successfully!");
  }

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deployerAddress: deployer.address,
    transactionHash: userAuth.deploymentTransaction().hash,
    timestamp: new Date().toISOString(),
    blockNumber: userAuth.deploymentTransaction().blockNumber
  };

  console.log("\n📋 Deployment Summary:");
  console.log("Network:", deploymentInfo.network);
  console.log("Contract Address:", deploymentInfo.contractAddress);
  console.log("Deployer:", deploymentInfo.deployerAddress);
  console.log("Transaction Hash:", deploymentInfo.transactionHash);
  console.log("Timestamp:", deploymentInfo.timestamp);

  console.log("\n🔧 Next Steps:");
  console.log("1. Update VITE_CONTRACT_ADDRESS in frontend/.env.local");
  console.log("2. Update CONTRACT_ADDRESS in frontend/src/Web3Config.js");
  console.log("3. Verify contract on Etherscan (optional):");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress}`);

  return deploymentInfo;
}

main()
  .then((deploymentInfo) => {
    console.log("\n✅ Deployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
