import React from 'react'
import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { Wallet, LogOut } from 'lucide-react'

export default function WalletConnection() {
  const { connectors, connect, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()

  if (isConnected) {
    return (
      <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <Wallet className="w-5 h-5 text-green-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">Wallet Connected</p>
          <p className="text-xs text-green-600">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
        </div>
        <button
          onClick={() => disconnect()}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Wallet className="w-5 h-5" />
        Connect Your Wallet
      </h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">Connection error: {error.message}</p>
        </div>
      )}
      
      <div className="space-y-2">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? 'Connecting...' : `Connect ${connector.name}`}
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-600">
        <p>• Make sure you're on Sepolia testnet</p>
        <p>• Disable other wallet extensions if you have conflicts</p>
      </div>
    </div>
  )
}
