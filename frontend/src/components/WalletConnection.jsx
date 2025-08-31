import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Wallet } from 'lucide-react'

export default function WalletConnection() {
  const { isConnected } = useAccount()

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Wallet className="w-5 h-5" />
        {isConnected ? 'Wallet Connected' : 'Connect Your Wallet'}
      </h3>
      
      <div className="flex justify-center">
        <ConnectButton />
      </div>
      
      {!isConnected && (
        <div className="mt-4 text-xs text-gray-600 text-center">
          <p>• Make sure you're on Sepolia testnet</p>
          <p>• Supports MetaMask, WalletConnect, and more</p>
        </div>
      )}
    </div>
  )
}
