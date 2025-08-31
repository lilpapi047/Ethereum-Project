import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function InicioSesion() {
  const [userType, setUserType] = useState(null) // null, 'organization', 'donor'
  const [formData, setFormData] = useState({
    wallet: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateWallet = (wallet) => {
    // Validación básica de dirección de billetera (puede ser más específica según el tipo de crypto)
    return wallet.length >= 26 && wallet.length <= 62
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors = {}

    if (!validateWallet(formData.wallet)) {
      newErrors.wallet = "Ingresa una dirección de billetera válida"
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log("Iniciando sesión como:", userType, formData)

        // Usar la dirección de billetera como identificador único
        const userWalletAddress = formData.wallet

        if (userType === "organization") {
          navigate(`/dashboardONG/${userWalletAddress}`)
        } else {
          navigate(`/dashboardDonantes/${userWalletAddress}`)
        }
      } catch (error) {
        console.error("Error durante el inicio de sesión:", error)
        setErrors({ general: "Error al iniciar sesión. Intenta nuevamente." })
      }
    }

    setIsLoading(false)
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h1>
            <p className="text-gray-600">Selecciona tu tipo de cuenta</p>
          </div>

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
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Organización</h3>
                  <p className="text-sm text-gray-600">Accede como organización benéfica</p>
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
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Donante</h3>
                  <p className="text-sm text-gray-600">Accede como donante individual</p>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => navigate("/registro")}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Crear Cuenta
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <button
            onClick={() => setUserType(null)}
            className="mb-4 text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center mx-auto"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Cambiar tipo de cuenta
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Iniciar Sesión - {userType === "organization" ? "Organización" : "Donante"}
          </h1>
          <p className="text-gray-600">Accede con tu billetera registrada</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dirección de Billetera</label>
            <input
              type="text"
              value={formData.wallet}
              onChange={(e) => handleInputChange("wallet", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                errors.wallet ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
              disabled={isLoading}
            />
            {errors.wallet && <p className="text-red-500 text-sm mt-1">{errors.wallet}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Tu contraseña"
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <button
              onClick={() => navigate("/registro")}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Crear Cuenta
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
