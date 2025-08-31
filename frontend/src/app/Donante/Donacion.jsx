import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Donacion() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [monto, setMonto] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Datos de ejemplo de proyectos (mismo que en DetallesProyectoDonante)
  const projectsData = {
    1: {
      id: 1,
      titulo: "Campaña de Navidad 2024",
      descripcion: "Recolección de juguetes y alimentos para familias necesitadas durante las fiestas navideñas.",
      meta: 10000,
      recaudado: 7500,
      donantes: 45
    },
    2: {
      id: 2,
      titulo: "Jornada de Vacunación",
      descripcion: "Campaña de vacunación gratuita en comunidades rurales para prevenir enfermedades infecciosas.",
      meta: 15000,
      recaudado: 15000,
      donantes: 120
    },
    3: {
      id: 3,
      titulo: "Centro de Educación Comunitaria",
      descripcion: "Programa educativo continuo para niños y adultos de la comunidad.",
      meta: 50000,
      recaudado: 35000,
      donantes: 200
    }
  }

  useEffect(() => {
    const projectData = projectsData[Number(id)]
    if (projectData) {
      setProject(projectData)
    } else {
      navigate("/")
    }
  }, [id, navigate])

  const handleMontoChange = (e) => {
    const value = e.target.value
    setMonto(value)
    setError("")
    
         // Validar que sea un número válido
     if (value && (isNaN(value) || parseFloat(value) <= 0)) {
       setError("El monto debe ser un número mayor a cero")
     } else if (value && parseFloat(value) < 0.001) {
       setError("El monto mínimo es 0.001 ETH")
     }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validaciones
    if (!monto || monto.trim() === "") {
      setError("Por favor ingresa un monto")
      return
    }
    
         const montoNum = parseFloat(monto)
     if (isNaN(montoNum) || montoNum <= 0) {
       setError("El monto debe ser un número mayor a cero")
       return
     }
     
     if (montoNum < 0.001) {
       setError("El monto mínimo es 0.001 ETH")
       return
     }

    setIsSubmitting(true)
    
    try {
             // Aquí se conectaría con el smart contract para procesar la donación
       console.log(`Procesando donación de ${montoNum} ETH para el proyecto ${id}`)
       
       // Simular procesamiento
       await new Promise(resolve => setTimeout(resolve, 2000))
       
       // Guardar la donación en localStorage para rastrear que el usuario ha donado
       const userDonations = JSON.parse(localStorage.getItem('userDonations') || '{}')
       userDonations[id] = true
       localStorage.setItem('userDonations', JSON.stringify(userDonations))
       
       // Redirigir a la página de confirmación o de vuelta al proyecto
       navigate(`/proyecto/${id}`, { 
         state: { 
           message: `¡Gracias por tu donación de ${montoNum.toFixed(4)} ETH! Ahora puedes votar en las decisiones del proyecto.` 
         } 
       })
    } catch (error) {
      setError("Error al procesar la donación. Por favor intenta de nuevo.")
      console.error("Error en donación:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cargando...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/proyecto/${id}`)}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al Proyecto
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Realizar Donación</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de Donación */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Información de la Donación</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                             <div>
                 <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-2">
                   Monto a Donar (ETH)
                 </label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <span className="text-gray-500 sm:text-sm">Ξ</span>
                   </div>
                   <input
                     type="number"
                     id="monto"
                     value={monto}
                     onChange={handleMontoChange}
                     placeholder="0.00"
                     step="0.001"
                     min="0.001"
                     className={`block w-full pl-7 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                       error ? 'border-red-300' : 'border-gray-300'
                     }`}
                     disabled={isSubmitting}
                   />
                 </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Resumen de la Donación</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Proyecto:</span>
                    <span className="font-medium text-gray-900">{project.titulo}</span>
                  </div>
                                     <div className="flex justify-between">
                     <span className="text-gray-600">Monto:</span>
                     <span className="font-medium text-gray-900">
                       {monto ? parseFloat(monto).toFixed(4) : "0.0000"} ETH
                     </span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Gas fee (estimado):</span>
                     <span className="font-medium text-gray-900">~0.001 ETH</span>
                   </div>
                   <div className="border-t pt-2 flex justify-between font-semibold">
                     <span className="text-gray-900">Total:</span>
                     <span className="text-emerald-600">
                       {monto ? (parseFloat(monto) + 0.001).toFixed(4) : "0.0000"} ETH
                     </span>
                   </div>
                </div>
              </div>

                             <button
                 type="submit"
                 disabled={isSubmitting || !monto || parseFloat(monto) < 0.001}
                 className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                   isSubmitting || !monto || parseFloat(monto) < 0.001
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     : 'bg-emerald-600 text-white hover:bg-emerald-700'
                 }`}
               >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </div>
                ) : (
                  "Confirmar Donación"
                )}
              </button>
            </form>
          </div>

          {/* Información del Proyecto */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Proyecto: {project.titulo}</h3>
              <p className="text-gray-700 mb-6">{project.descripcion}</p>
              
              <div className="space-y-4">
                                 <div className="flex justify-between items-center">
                   <span className="text-gray-600">Meta de recaudación:</span>
                   <span className="font-semibold text-gray-900">{project.meta.toLocaleString()} ETH</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-600">Recaudado hasta ahora:</span>
                   <span className="font-semibold text-emerald-600">{project.recaudado.toLocaleString()} ETH</span>
                 </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Donantes:</span>
                  <span className="font-semibold text-gray-900">{project.donantes}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((project.recaudado / project.meta) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {Math.round((project.recaudado / project.meta) * 100)}% completado
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">¿Por qué donar?</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Tu donación se registra en la blockchain para máxima transparencia
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Puedes votar en las decisiones importantes del proyecto
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Seguimiento en tiempo real del impacto de tu donación
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sin comisiones ocultas, todo tu dinero va al proyecto
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
