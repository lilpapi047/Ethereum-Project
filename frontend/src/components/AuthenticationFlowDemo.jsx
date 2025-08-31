import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import WalletConnection from './WalletConnection'
import DemoRegistration from './DemoRegistration'
import { AlertCircle, CheckCircle, ToggleLeft, ToggleRight } from 'lucide-react'

export default function AuthenticationFlowDemo() {
  const { isConnected } = useAccount()
  const [isDemoMode, setIsDemoMode] = useState(true)

  if (!isConnected) {
    return (
      <div className="space-y-4">
        <WalletConnection />
        <div className="text-center text-sm text-gray-600">
          Connect your wallet to continue
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Demo Mode Toggle */}
      <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium">Demo Mode</span>
        <button
          onClick={() => setIsDemoMode(!isDemoMode)}
          className="flex items-center"
        >
          {isDemoMode ? (
            <ToggleRight className="w-6 h-6 text-blue-500" />
          ) : (
            <ToggleLeft className="w-6 h-6 text-gray-400" />
          )}
        </button>
        <span className="text-sm font-medium">Real Blockchain</span>
      </div>

      {isDemoMode ? (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">Demo Mode: No gas fees required!</span>
            </div>
          </div>
          <DemoRegistration />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">Real mode: Requires Sepolia ETH for gas fees</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600">
            Get free Sepolia ETH from: 
            <a href="https://sepoliafaucet.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              sepoliafaucet.com
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
