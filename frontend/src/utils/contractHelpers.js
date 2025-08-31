import { readContract, writeContract, waitForTransactionReceipt } from 'wagmi/actions'
import { config, CONTRACT_ADDRESS, CONTRACT_ABI } from '../Web3Config'

// Helper functions for contract interactions
export const contractHelpers = {
  // Read functions
  async isUserRegistered(address) {
    try {
      const result = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'isUserRegistered',
        args: [address]
      })
      return result
    } catch (error) {
      console.error('Error checking user registration:', error)
      throw error
    }
  },

  async getUserInfo(address) {
    try {
      const result = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getUserInfo',
        args: [address]
      })
      return {
        username: result[0],
        registrationTimestamp: result[1],
        isRegistered: result[2]
      }
    } catch (error) {
      console.error('Error getting user info:', error)
      throw error
    }
  },

  async isUsernameAvailable(username) {
    try {
      const result = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'isUsernameAvailable',
        args: [username]
      })
      return result
    } catch (error) {
      console.error('Error checking username availability:', error)
      throw error
    }
  },

  // Write functions
  async registerUser(username) {
    try {
      const hash = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerUser',
        args: [username]
      })

      // Wait for transaction confirmation
      const receipt = await waitForTransactionReceipt(config, { hash })
      return { hash, receipt }
    } catch (error) {
      console.error('Error registering user:', error)
      throw error
    }
  },

  async login() {
    try {
      const hash = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'login'
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return { hash, receipt }
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    }
  }
}

// Message signing utilities
export const createLoginMessage = (address) => {
  const timestamp = Date.now()
  return {
    message: `Welcome to Web3 dApp!\n\nSign this message to authenticate your session.\n\nAddress: ${address}\nTimestamp: ${timestamp}`,
    timestamp
  }
}

export const verifySession = (address) => {
  const savedSession = localStorage.getItem(`session_${address}`)
  if (!savedSession) return false

  try {
    const session = JSON.parse(savedSession)
    const now = Date.now()
    // Session expires after 24 hours
    return (now - session.timestamp) < 24 * 60 * 60 * 1000
  } catch (error) {
    console.error('Error verifying session:', error)
    return false
  }
}

export const clearSession = (address) => {
  localStorage.removeItem(`session_${address}`)
}
