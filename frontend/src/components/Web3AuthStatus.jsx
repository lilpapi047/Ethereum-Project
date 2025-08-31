import React from 'react'
import { useAccount } from 'wagmi'
import { useAuth } from '../hooks/useAuth'
import { Shield, Wallet, User, AlertTriangle } from 'lucide-react'

export default function Web3AuthStatus() {
  const { address, isConnected } = useAccount()
  const { isRegistered, isLoggedIn, userInfo } = useAuth()

  const getStatusColor = () => {
    if (!isConnected) return 'bg-red-100 border-red-200 text-red-800'
    if (!isRegistered) return 'bg-yellow-100 border-yellow-200 text-yellow-800'
    if (!isLoggedIn) return 'bg-blue-100 border-blue-200 text-blue-800'
    return 'bg-green-100 border-green-200 text-green-800'
  }

  const getStatusIcon = () => {
    if (!isConnected) return <AlertTriangle className="w-4 h-4" />
    if (!isRegistered) return <User className="w-4 h-4" />
    if (!isLoggedIn) return <Wallet className="w-4 h-4" />
    return <Shield className="w-4 h-4" />
  }

  const getStatusText = () => {
    if (!isConnected) return 'Wallet Not Connected'
    if (!isRegistered) return 'Account Not Registered'
    if (!isLoggedIn) return 'Not Authenticated'
    return `Authenticated as ${userInfo?.username || 'User'}`
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium ${getStatusColor()}`}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
    </div>
  )
}
