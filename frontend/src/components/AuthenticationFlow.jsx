import React from 'react'
import { useAccount } from 'wagmi'
import { useAuth } from '../hooks/useAuth'
import WalletConnection from './WalletConnection'
import UserRegistration from './UserRegistration'
import UserLogin from './UserLogin'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

export default function AuthenticationFlow() {
  const { isConnected } = useAccount()
  const { isRegistered, isLoggedIn, isLoading, userInfo } = useAuth()

  // Show loading state while checking registration status
  if (isConnected && isLoading && !userInfo) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Checking account status...</span>
        </div>
      </div>
    )
  }

  // Step 1: Connect wallet
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

  // Step 2: Register if not registered
  if (!isRegistered) {
    return (
      <div className="space-y-4">
        <UserRegistration />
      </div>
    )
  }

  // Step 3: Login if registered but not logged in
  if (!isLoggedIn) {
    return (
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-800">Account found! Please sign in to continue.</span>
          </div>
        </div>
        <UserLogin />
      </div>
    )
  }

  // Step 4: Authenticated state
  return (
    <div className="space-y-4">
      <UserLogin />
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-green-800">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">You are successfully authenticated!</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          You can now access all features of the dApp.
        </p>
      </div>
    </div>
  )
}
