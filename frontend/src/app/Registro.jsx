import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../Web3Config'
import WalletConnection from '../components/WalletConnection'

export default function Registro() {
  const [userType, setUserType] = useState(null)
  const navigate = useNavigate()
  const { isConnected } = useAccount()

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900 flex items-center absolute top-4 left-4 z-50"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Inicio
        </button>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
            <p className="text-gray-600">Conecta tu billetera y selecciona el tipo de cuenta</p>
          </div>

          {!isConnected ? (
            <WalletConnection />
          ) : (
            <>
              <div className="space-y-4">
                <button
                  onClick={() => setUserType("organization")}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Organización</h3>
                      <p className="text-sm text-gray-600">Para organizaciones que reciben donaciones</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setUserType("donor")}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Donante</h3>
                      <p className="text-sm text-gray-600">Para personas que realizan donaciones</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?{" "}
                  <button
                    onClick={() => navigate("/inicio")}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Iniciar Sesión
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return userType === "organization" ? (
    <OrganizationRegister navigate={navigate} />
  ) : (
    <DonorRegister navigate={navigate} />
  )
}

function OrganizationRegister({ navigate }) {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { address } = useAccount()
  const { writeContract } = useWriteContract()
  
  // Check if username is available
  const { data: isAvailable } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'isUsernameAvailable',
    args: [username],
    enabled: username.length > 2
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!username.trim()) {
        throw new Error('El nombre de usuario es requerido')
      }

      if (username.length < 3) {
        throw new Error('El nombre de usuario debe tener al menos 3 caracteres')
      }

      if (!isAvailable) {
        throw new Error('Este nombre de usuario ya está en uso')
      }

      // Register user on blockchain
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerUser',
        args: [username]
      })

      setSuccess(true)
      setTimeout(() => {
        navigate('/inicio')
      }, 2000)

    } catch (err) {
      console.error('Registration error:', err)
      setError(err.message || 'Error al registrar usuario')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Registro Exitoso!</h2>
          <p className="text-gray-600 mb-4">Tu cuenta de organización ha sido creada en la blockchain</p>
          <p className="text-sm text-gray-500">Redirigiendo al inicio de sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <button
        onClick={() => navigate("/")}
        className="text-gray-600 hover:text-gray-900 flex items-center absolute top-4 left-4 z-50"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Volver al Inicio
      </button>
      
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de Organización</h1>
          <p className="text-gray-600">Registra tu organización en la blockchain</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Billetera conectada:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors border-gray-300"
              placeholder="mi-organizacion"
              disabled={isLoading}
            />
            {username.length > 2 && (
              <p className={`text-sm mt-1 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {isAvailable ? '✓ Nombre disponible' : '✗ Nombre no disponible'}
              </p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !isAvailable || username.length < 3}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Registrando en Blockchain...' : 'Crear Cuenta de Organización'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <button onClick={() => navigate("/inicio")} className="text-emerald-600 hover:text-emerald-700 font-medium">
              Iniciar Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

function DonorRegister({ navigate }) {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { address } = useAccount()
  const { writeContract } = useWriteContract()
  
  // Check if username is available
  const { data: isAvailable } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'isUsernameAvailable',
    args: [username],
    enabled: username.length > 2
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!username.trim()) {
        throw new Error('El nombre de usuario es requerido')
      }

      if (username.length < 3) {
        throw new Error('El nombre de usuario debe tener al menos 3 caracteres')
      }

      if (!isAvailable) {
        throw new Error('Este nombre de usuario ya está en uso')
      }

      // Register user on blockchain
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerUser',
        args: [username]
      })

      setSuccess(true)
      setTimeout(() => {
        navigate('/inicio')
      }, 2000)

    } catch (err) {
      console.error('Registration error:', err)
      setError(err.message || 'Error al registrar usuario')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Registro Exitoso!</h2>
          <p className="text-gray-600 mb-4">Tu cuenta de donante ha sido creada en la blockchain</p>
          <p className="text-sm text-gray-500">Redirigiendo al inicio de sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <button
        onClick={() => navigate("/")}
        className="text-gray-600 hover:text-gray-900 flex items-center absolute top-4 left-4 z-50"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Volver al Inicio
      </button>
      
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de Donante</h1>
          <p className="text-gray-600">Registra tu cuenta en la blockchain</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Billetera conectada:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-300"
              placeholder="mi-usuario"
              disabled={isLoading}
            />
            {username.length > 2 && (
              <p className={`text-sm mt-1 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {isAvailable ? '✓ Nombre disponible' : '✗ Nombre no disponible'}
              </p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !isAvailable || username.length < 3}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Registrando en Blockchain...' : 'Crear Cuenta de Donante'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <button onClick={() => navigate("/inicio")} className="text-blue-600 hover:text-blue-700 font-medium">
              Iniciar Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

