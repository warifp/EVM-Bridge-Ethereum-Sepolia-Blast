const { ethers } = require("ethers");

const INFURA_KEY = "";
const PRIVATE_KEY = "";

// This is for Blast Sepolia Testnet, not Blast mainnet
const BlastBridgeAddress = "0xc644cc19d2A9388b71dd1dEde07cFFC73237Dca8";

// Providers for Sepolia and Blast networks
const sepoliaProvider = new ethers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${INFURA_KEY}`
);
const blastProvider = new ethers.JsonRpcProvider("https://sepolia.blast.io");

// Wallet setup
const wallet = new ethers.Wallet(PRIVATE_KEY);
const sepoliaWallet = wallet.connect(sepoliaProvider);
const blastWallet = wallet.connect(blastProvider);

async function main() {
  // Transaction to send 0.1 Sepolia ETH
  const tx = {
    to: BlastBridgeAddress,
    value: ethers.parseEther("0.1"),
  };

  // Send the transaction
  const transaction = await sepoliaWallet.sendTransaction(tx);
  await transaction.wait();

  // Confirm the bridged balance on Blast
  const balance = await blastProvider.getBalance(wallet.address);
  console.log(`Balance on Blast: ${ethers.formatEther(balance)} ETH`);
}

// Execute the async function
main().catch(console.error);
