import { ethers } from "ethers";

const INFURA_KEY = "YOUR_INFURA_KEY";
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";

// This is for Blast Sepolia Testnet, not Blast mainnet
const BlastBridgeAddress = "0xc644cc19d2A9388b71dd1dEde07cFFC73237Dca8";

// Providers for Sepolia and Blast networks
const sepoliaProvider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);
const blastProvider = new ethers.JsonRpcProvider("https://sepolia.blast.io");

// Wallet setup
const wallet = new ethers.Wallet(PRIVATE_KEY);
const sepoliaWallet = wallet.connect(sepoliaProvider);
const blastWallet = wallet.connect(blastProvider);

async function main() {
    try {
        // Transaction to send Sepolia ETH
        const tx = {
            to: BlastBridgeAddress,
            value: ethers.parseEther("1.4") // Updated for ethers@6.x
        };

        console.log("Sending transaction...");
        const transaction = await sepoliaWallet.sendTransaction(tx);
        console.log(`Transaction Hash: ${transaction.hash}`);

        console.log("Waiting for transaction confirmation...");
        await transaction.wait();

        // Confirm the bridged balance on Blast
        const balance = await blastProvider.getBalance(wallet.address);
        console.log(`Balance on Blast: ${ethers.formatEther(balance)} ETH`);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

// Call the main function
main();
