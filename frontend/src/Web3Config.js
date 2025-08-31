import { http, createConfig } from 'wagmi'
import { sepolia, goerli } from 'wagmi/chains'
import { metaMask, walletConnect } from 'wagmi/connectors'

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

// Wagmi configuration
export const config = createConfig({
  chains: [sepolia, goerli],
  connectors: [
    metaMask(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id'
    })
  ],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_SEPOLIA_RPC_URL || `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`),
    [goerli.id]: http(import.meta.env.VITE_GOERLI_RPC_URL || `https://goerli.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`)
  }
})
