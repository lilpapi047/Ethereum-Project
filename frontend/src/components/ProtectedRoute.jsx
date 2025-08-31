import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAccount } from 'wagmi'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute({ children, requireAuth = true }) {
  const { isConnected } = useAccount()
  const { isRegistered, isLoggedIn, isLoading } = useAuth()

  // Show loading while checking authentication status
  if (isConnected && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    )
  }

  // Redirect to auth page if authentication is required but user is not authenticated
  if (requireAuth && (!isConnected || !isRegistered || !isLoggedIn)) {
    return <Navigate to="/auth" replace />
  }

  return children
}
