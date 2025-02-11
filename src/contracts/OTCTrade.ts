import { ethers } from 'ethers';

const OTC_ABI = [
  // Function to execute trade
  "function executeTrade(uint256 tradeAmount, uint256 nonce, bytes memory signature, string memory message) external",
  // Event emitted on trade execution
  "event TradeExecuted(address indexed trader, uint256 amount, uint256 nonce, string message)"
];

export class OTCTrade {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor(contractAddress: string, signer: ethers.Signer) {
    this.contract = new ethers.Contract(contractAddress, OTC_ABI, signer);
    this.signer = signer;
  }

  async executeTrade(
    amount: number,
    nonce: number,
    signature: string,
    message: string
  ): Promise<ethers.ContractTransaction> {
    try {
      const tx = await this.contract.executeTrade(
        ethers.utils.parseEther(amount.toString()),
        nonce,
        signature,
        message
      );
      return tx;
    } catch (error) {
      console.error('Error executing trade:', error);
      throw error;
    }
  }
} 