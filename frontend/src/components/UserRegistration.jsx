import React, { useState } from 'react'
import { UserPlus, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function UserRegistration() {
  const [username, setUsername] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState(null)
  
  const { registerUser, isLoading, error, checkUsernameAvailability } = useAuth()

  const handleUsernameChange = async (e) => {
    const value = e.target.value
    setUsername(value)
    
    if (value.length >= 3) {
      setIsCheckingUsername(true)
      try {
        const isAvailable = await checkUsernameAvailability(value)
        setUsernameStatus(isAvailable ? 'available' : 'taken')
      } catch (err) {
        setUsernameStatus('error')
      }
      setIsCheckingUsername(false)
    } else {
      setUsernameStatus(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || username.length < 3) return

    const success = await registerUser(username)
    if (success) {
      setUsername('')
      setUsernameStatus(null)
    }
  }

  const getUsernameStatusIcon = () => {
    if (isCheckingUsername) return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
    if (usernameStatus === 'available') return <CheckCircle className="w-4 h-4 text-green-500" />
    if (usernameStatus === 'taken') return <AlertCircle className="w-4 h-4 text-red-500" />
    return null
  }

  const getUsernameStatusText = () => {
    if (usernameStatus === 'available') return 'Username available'
    if (usernameStatus === 'taken') return 'Username already taken'
    if (usernameStatus === 'error') return 'Error checking username'
    return ''
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5" />
        Register Your Account
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Choose a Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter username (min 3 characters)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              minLength={3}
              required
            />
            <div className="absolute right-3 top-2.5">
              {getUsernameStatusIcon()}
            </div>
          </div>
          {usernameStatus && (
            <p className={`text-xs mt-1 ${
              usernameStatus === 'available' ? 'text-green-600' : 'text-red-600'
            }`}>
              {getUsernameStatusText()}
            </p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !username || username.length < 3 || usernameStatus === 'taken'}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Register Account
            </>
          )}
        </button>
      </form>
    </div>
  )
}
