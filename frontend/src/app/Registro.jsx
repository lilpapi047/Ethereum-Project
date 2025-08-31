import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Registro() {
  const [userType, setUserType] = useState(null)
  const navigate = useNavigate()

  if (!userType) {
    return (
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-900 flex items-center absolute top-4 left-4 z-50 "
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al Inicio
        </button>
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
            <p className="text-gray-600">Selecciona el tipo de cuenta que deseas crear</p>
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    wallet: "",
    rtn: "",
  })
  const [errors, setErrors] = useState({})
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    underscore: false,
  })

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      underscore: /_/.test(password),
    }
    setPasswordValidation(validation)
    return Object.values(validation).every(Boolean)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateRTN = (rtn) => {
    return /^\d{14}$/.test(rtn)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Real-time password validation
    if (field === "password") {
      validatePassword(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!validateEmail(formData.email)) {
      newErrors.email = "Ingresa un correo válido"
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "La contraseña no cumple con los requisitos"
    }

    if (!formData.wallet.trim()) {
      newErrors.wallet = "La dirección de billetera es requerida"
    }

    if (!validateRTN(formData.rtn)) {
      newErrors.rtn = "El RTN debe tener exactamente 14 dígitos"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Registro de organización:", formData)
      navigate("/dashboardONG/${org.id}")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-900 flex items-center absolute top-4 left-4 z-50 "
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al Inicio
        </button>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de Organización</h1>
          <p className="text-gray-600">Completa los datos para crear tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="organizacion@ejemplo.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              placeholder="Tu contraseña segura"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            <div className="mt-2 space-y-1">
              <div
                className={`text-xs flex items-center ${passwordValidation.length ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.length ? "✓" : "○"}</span>
                Mínimo 8 caracteres
              </div>
              <div
                className={`text-xs flex items-center ${passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.uppercase ? "✓" : "○"}</span>
                Una letra mayúscula
              </div>
              <div
                className={`text-xs flex items-center ${passwordValidation.lowercase ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.lowercase ? "✓" : "○"}</span>
                Una letra minúscula
              </div>
              <div
                className={`text-xs flex items-center ${passwordValidation.number ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.number ? "✓" : "○"}</span>
                Un número
              </div>
              <div
                className={`text-xs flex items-center ${passwordValidation.underscore ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.underscore ? "✓" : "○"}</span>
                Un guión bajo (_)
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dirección de Billetera</label>
            <input
              type="text"
              value={formData.wallet}
              onChange={(e) => handleInputChange("wallet", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                errors.wallet ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0x1234567890abcdef..."
            />
            {errors.wallet && <p className="text-red-500 text-sm mt-1">{errors.wallet}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">RTN (14 dígitos)</label>
            <input
              type="text"
              value={formData.rtn}
              onChange={(e) => handleInputChange("rtn", e.target.value.replace(/\D/g, "").slice(0, 14))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                errors.rtn ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="12345678901234"
            />
            {errors.rtn && <p className="text-red-500 text-sm mt-1">{errors.rtn}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Crear Cuenta de Organización
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    wallet: "",
    identity: "",
  })
  const [errors, setErrors] = useState({})
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    underscore: false,
  })

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      underscore: /_/.test(password),
    }
    setPasswordValidation(validation)
    return Object.values(validation).every(Boolean)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateIdentity = (identity) => {
    return /^\d{13}$/.test(identity)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    if (field === "password") {
      validatePassword(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!validateEmail(formData.email)) {
      newErrors.email = "Ingresa un correo válido"
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "La contraseña no cumple con los requisitos"
    }

    if (!formData.wallet.trim()) {
      newErrors.wallet = "La dirección de billetera es requerida"
    }

    if (!validateIdentity(formData.identity)) {
      newErrors.identity = "La identidad debe tener exactamente 13 dígitos"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Registro de donante:", formData)
      navigate("/dashboardDonante/${donor.id}")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de Donante</h1>
          <p className="text-gray-600">Completa los datos para crear tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="tu@ejemplo.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Tu contraseña segura"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            <div className="mt-2 space-y-1">
              <div
                className={`text-xs flex items-center ${passwordValidation.length ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.length ? "✓" : "○"}</span>
                Mínimo 8 caracteres
              </div>
              <div
                className={`text-xs flex items-center ${passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.uppercase ? "✓" : "○"}</span>
                Una letra mayúscula
              </div>
              <div
                className={`text-xs flex items-center ${passwordValidation.lowercase ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.lowercase ? "✓" : "○"}</span>
                Una letra minúscula
              </div>
              <div
                className={`text-xs flex items-center ${passwordValidation.number ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.number ? "✓" : "○"}</span>
                Un número
              </div>
              <div
                className={`text-xs flex items-center ${passwordValidation.underscore ? "text-green-600" : "text-gray-500"}`}
              >
                <span className="mr-2">{passwordValidation.underscore ? "✓" : "○"}</span>
                Un guión bajo (_)
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dirección de Billetera</label>
            <input
              type="text"
              value={formData.wallet}
              onChange={(e) => handleInputChange("wallet", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.wallet ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0x1234567890abcdef..."
            />
            {errors.wallet && <p className="text-red-500 text-sm mt-1">{errors.wallet}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Número de Identidad (13 dígitos)</label>
            <input
              type="text"
              value={formData.identity}
              onChange={(e) => handleInputChange("identity", e.target.value.replace(/\D/g, "").slice(0, 13))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.identity ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="1234567890123"
            />
            {errors.identity && <p className="text-red-500 text-sm mt-1">{errors.identity}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Crear Cuenta de Donante
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

