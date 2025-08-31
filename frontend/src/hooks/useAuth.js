import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useSignMessage } from 'wagmi'
import { readContract } from 'wagmi/actions'
import { CONTRACT_ADDRESS, CONTRACT_ABI, config } from '../Web3Config'

export function useAuth() {
  const { address, isConnected } = useAccount()
  const [isRegistered, setIsRegistered] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { writeContract, isPending: isRegistering } = useWriteContract()
  const { signMessage, isPending: isSigning } = useSignMessage()

  // Check if user is registered
  const { data: registrationStatus, refetch: refetchRegistration } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'isUserRegistered',
    args: [address],
    enabled: !!address
  })

  // Get user info
  const { data: userData, refetch: refetchUserData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUserInfo',
    args: [address],
    enabled: !!address && registrationStatus
  })

  useEffect(() => {
    if (registrationStatus !== undefined) {
      setIsRegistered(registrationStatus)
    }
  }, [registrationStatus])

  useEffect(() => {
    if (userData) {
      setUserInfo({
        username: userData[0],
        registrationTimestamp: userData[1],
        isRegistered: userData[2]
      })
    }
  }, [userData])

  // Check session on mount
  useEffect(() => {
    if (address) {
      const savedSession = localStorage.getItem(`session_${address}`)
      if (savedSession) {
        const session = JSON.parse(savedSession)
        const now = Date.now()
        // Session expires after 24 hours
        if (now - session.timestamp < 24 * 60 * 60 * 1000) {
          setIsLoggedIn(true)
        } else {
          localStorage.removeItem(`session_${address}`)
        }
      }
    }
  }, [address])

  const registerUser = async (username) => {
    if (!address || !username) return

    setIsLoading(true)
    setError(null)

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerUser',
        args: [username]
      })

      // Refetch data after registration
      await refetchRegistration()
      await refetchUserData()
      
      setIsLoading(false)
      return true
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
      return false
    }
  }

  const login = async () => {
    if (!address || !isRegistered) return

    setIsLoading(true)
    setError(null)

    try {
      // Create message to sign
      const message = `Login to dApp\nAddress: ${address}\nTimestamp: ${Date.now()}`
      
      // Sign message
      const signature = await signMessage({ message })
      
      if (signature) {
        // Save session
        const session = {
          address,
          signature,
          timestamp: Date.now(),
          message
        }
        localStorage.setItem(`session_${address}`, JSON.stringify(session))
        setIsLoggedIn(true)

        // Optional: Call contract login function to emit event
        try {
          await writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'login'
          })
        } catch (contractError) {
          console.warn('Contract login call failed:', contractError)
          // Don't fail the login if contract call fails
        }
      }

      setIsLoading(false)
      return true
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    if (address) {
      localStorage.removeItem(`session_${address}`)
    }
    setIsLoggedIn(false)
  }

  const checkUsernameAvailability = async (username) => {
    if (!username) return false

    try {
      const data = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'isUsernameAvailable',
        args: [username]
      })
      return data
    } catch (err) {
      console.error('Error checking username:', err)
      return false
    }
  }

  return {
    // State
    address,
    isConnected,
    isRegistered,
    userInfo,
    isLoggedIn,
    isLoading: isLoading || isRegistering || isSigning,
    error,

    // Actions
    registerUser,
    login,
    logout,
    checkUsernameAvailability,

    // Utilities
    refetchRegistration,
    refetchUserData
  }
}
