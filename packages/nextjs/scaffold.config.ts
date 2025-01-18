import * as chains from "viem/chains";
import { defineChain } from "viem";

// Definimos Base Sepolia como una nueva chain
const baseSepolia = defineChain({
  id: 84532,
  name: "Base Sepolia",
  network: "base-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { 
      http: ["https://sepolia.base.org"],
      webSocket: ["wss://sepolia.base.org"]
    },
    public: {
      http: ["https://sepolia.base.org"],
      webSocket: ["wss://sepolia.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "BaseScan",
      url: "https://sepolia.basescan.org"
    }
  },
  testnet: true
});

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  
  targetNetworks: [chains.hardhat, baseSepolia],

  pollingInterval: 30000,

  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  onlyLocalBurnerWallet: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;