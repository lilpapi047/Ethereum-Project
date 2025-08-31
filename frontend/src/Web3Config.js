import { http, createConfig } from 'wagmi'
import { sepolia, goerli } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Contract configuration
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0xce715b667569A1294940e102FEeb001E3312681c'
export const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "_username", "type": "string"}],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_userAddress", "type": "address"}],
    "name": "isUserRegistered",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_userAddress", "type": "address"}],
    "name": "getUserInfo",
    "outputs": [
      {"internalType": "string", "name": "username", "type": "string"},
      {"internalType": "uint256", "name": "registrationTimestamp", "type": "uint256"},
      {"internalType": "bool", "name": "isRegistered", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "login",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "_username", "type": "string"}],
    "name": "isUsernameAvailable",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "userAddress", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "username", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "userAddress", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "UserLoggedIn",
    "type": "event"
  }
]

// RainbowKit configuration
export const config = getDefaultConfig({
  appName: 'Donation Platform',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from https://cloud.walletconnect.com
  chains: [sepolia, goerli],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/2a6ff129c08a4138b15d224c7ebd2548`),
    [goerli.id]: http(`https://sepolia.infura.io/v3/2a6ff129c08a4138b15d224c7ebd2548`)
  },
  ssr: false // Disable server-side rendering for Vite
})
