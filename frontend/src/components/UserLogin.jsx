import React from 'react'
import { LogIn, Loader2, Shield } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function UserLogin() {
  const { login, logout, isLoggedIn, isLoading, error, userInfo } = useAuth()

  const handleLogin = async () => {
    await login()
  }

  const handleLogout = () => {
    logout()
  }

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-800">
          <Shield className="w-5 h-5" />
          Welcome Back!
        </h2>
        
        {userInfo && (
          <div className="mb-4">
            <p className="text-sm text-green-700">
              <strong>Username:</strong> {userInfo.username}
            </p>
            <p className="text-xs text-green-600">
              Registered: {new Date(Number(userInfo.registrationTimestamp) * 1000).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-green-700">✅ Authenticated</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <LogIn className="w-5 h-5" />
        Sign In
      </h2>
      
      <p className="text-sm text-gray-600 mb-4">
        Sign a message with your wallet to authenticate and access your account.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing Message...
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            Sign In with Wallet
          </>
        )}
      </button>
    </div>
  )
}
