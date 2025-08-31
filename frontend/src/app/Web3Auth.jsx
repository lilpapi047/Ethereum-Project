import React from 'react'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useAuth } from '../hooks/useAuth'
import AuthenticationFlow from '../components/AuthenticationFlow'
import AuthenticationFlowDemo from '../components/AuthenticationFlowDemo'
import { ArrowLeft, Shield } from 'lucide-react'

export default function Web3Auth() {
  const { isConnected } = useAccount()
  const { isRegistered, isLoggedIn } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Web3 Authentication</h1>
            </div>
            <p className="text-gray-600">
              Connect your wallet and authenticate to access the dApp
            </p>
          </div>
        </div>

        {/* Authentication Flow */}
        <AuthenticationFlowDemo />

        {/* Instructions */}
        <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg">
          <h3 className="font-semibold mb-2">How it works:</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li><strong>1.</strong> Connect your MetaMask or compatible wallet</li>
            <li><strong>2.</strong> Register your account with a unique username</li>
            <li><strong>3.</strong> Sign a message to authenticate your session</li>
            <li><strong>4.</strong> Access all dApp features securely</li>
          </ol>
        </div>

        {/* Status Summary */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className={`p-3 rounded-lg ${isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            <div className="font-semibold">Wallet</div>
            <div className="text-xs">{isConnected ? 'Connected' : 'Not Connected'}</div>
          </div>
          <div className={`p-3 rounded-lg ${isRegistered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            <div className="font-semibold">Account</div>
            <div className="text-xs">{isRegistered ? 'Registered' : 'Not Registered'}</div>
          </div>
          <div className={`p-3 rounded-lg ${isLoggedIn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            <div className="font-semibold">Session</div>
            <div className="text-xs">{isLoggedIn ? 'Authenticated' : 'Not Authenticated'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
