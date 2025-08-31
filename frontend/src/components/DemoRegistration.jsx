import React, { useState } from 'react'
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react'
import { useAccount } from 'wagmi'

export default function DemoRegistration() {
  const [username, setUsername] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const { address } = useAccount()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || username.length < 3) return

    // Simulate registration without blockchain transaction
    localStorage.setItem(`demo_user_${address}`, JSON.stringify({
      username,
      address,
      registrationTimestamp: Date.now(),
      isRegistered: true
    }))
    
    setIsRegistered(true)
  }

  if (isRegistered) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-green-800 mb-4">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Demo Registration Complete!</span>
        </div>
        <p className="text-sm text-green-700">
          Username: <strong>{username}</strong>
        </p>
        <p className="text-xs text-green-600 mt-2">
          ⚠️ This is demo mode - no blockchain transaction required
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-800">Demo Mode - No Gas Fees Required</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5" />
        Demo Registration
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Choose a Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username (min 3 characters)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            minLength={3}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!username || username.length < 3}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Register (Demo Mode)
        </button>
      </form>
    </div>
  )
}
