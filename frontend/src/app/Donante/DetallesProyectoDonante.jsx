import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"

export default function DetallesProyectoDonante() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const [project, setProject] = useState(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState(null) // 'for', 'against', null
  const [hasDonated, setHasDonated] = useState(false) // Estado para rastrear si el usuario ha donado
  const [showMessage, setShowMessage] = useState(false) // Estado para mostrar mensajes

  // Datos de ejemplo de proyectos con información completa para donantes
  const projectsData = {
    1: {
      id: 1,
      titulo: "Campaña de Navidad 2024",
      descripcion: "Recolección de juguetes y alimentos para familias necesitadas durante las fiestas navideñas. Este proyecto busca llevar alegría y esperanza a más de 500 familias en situación de vulnerabilidad.",
      tipo: "temporal",
      fechaInicio: "2024-12-01",
      fechaFin: "2024-12-25",
      estado: "Activo",
      participantes: 45,
      ubicacion: "Centro Comunitario San José",
      direccion: "Calle Principal #123, San José",
      coordenadas: "9.9281, -84.0907",
      fase: 2,
      fases: [
        {
          id: 1,
          nombre: "Fase 1: Recolección de Donaciones",
          descripcion: "Recolección de juguetes, alimentos no perecederos y ropa",
          estado: "completada",
          fechaInicio: "2024-12-01",
          fechaFin: "2024-12-15",
          votosRequeridos: 30,
          votosAFavor: 28,
          votosEnContra: 2,
          desbloqueada: true
        },
        {
          id: 2,
          nombre: "Fase 2: Distribución de Regalos",
          descripcion: "Entrega de regalos y alimentos a las familias beneficiarias",
          estado: "en_progreso",
          fechaInicio: "2024-12-16",
          fechaFin: "2024-12-25",
          votosRequeridos: 40,
          votosAFavor: 35,
          votosEnContra: 5,
          desbloqueada: true
        },
        {
          id: 3,
          nombre: "Fase 3: Evaluación y Seguimiento",
          descripcion: "Evaluación del impacto y seguimiento post-navidad",
          estado: "bloqueada",
          fechaInicio: "2024-12-26",
          fechaFin: "2025-01-10",
          votosRequeridos: 25,
          votosAFavor: 12,
          votosEnContra: 3,
          desbloqueada: false
        }
      ],
      meta: 10000,
      recaudado: 7500,
      donantes: 45
    },
    2: {
      id: 2,
      titulo: "Jornada de Vacunación",
      descripcion: "Campaña de vacunación gratuita en comunidades rurales para prevenir enfermedades infecciosas.",
      tipo: "temporal",
      fechaInicio: "2024-11-15",
      fechaFin: "2024-11-30",
      estado: "Finalizado",
      participantes: 120,
      ubicacion: "Centro de Salud Rural",
      direccion: "Carretera Principal, Zona Rural",
      coordenadas: "9.9281, -84.0907",
      fase: 3,
      fases: [
        {
          id: 1,
          nombre: "Fase 1: Preparación y Logística",
          descripcion: "Preparación de equipos médicos y coordinación con autoridades",
          estado: "completada",
          fechaInicio: "2024-11-15",
          fechaFin: "2024-11-20",
          votosRequeridos: 50,
          votosAFavor: 48,
          votosEnContra: 2,
          desbloqueada: true
        },
        {
          id: 2,
          nombre: "Fase 2: Ejecución de Vacunación",
          descripcion: "Aplicación de vacunas a la población objetivo",
          estado: "completada",
          fechaInicio: "2024-11-21",
          fechaFin: "2024-11-28",
          votosRequeridos: 80,
          votosAFavor: 75,
          votosEnContra: 5,
          desbloqueada: true
        },
        {
          id: 3,
          nombre: "Fase 3: Evaluación y Reportes",
          descripcion: "Evaluación de cobertura y generación de reportes",
          estado: "completada",
          fechaInicio: "2024-11-29",
          fechaFin: "2024-11-30",
          votosRequeridos: 40,
          votosAFavor: 38,
          votosEnContra: 2,
          desbloqueada: true
        }
      ],
      meta: 15000,
      recaudado: 15000,
      donantes: 120
    },
    3: {
      id: 3,
      titulo: "Centro de Educación Comunitaria",
      descripcion: "Programa educativo continuo para niños y adultos de la comunidad, proporcionando herramientas para el desarrollo personal y profesional.",
      tipo: "permanente",
      fechaInicio: "2020-01-15",
      estado: "Activo",
      beneficiarios: 200,
      ubicacion: "Barrio San José",
      direccion: "Avenida Central #456, Barrio San José",
      coordenadas: "9.9281, -84.0907",
      fase: 2,
      fases: [
        {
          id: 1,
          nombre: "Fase 1: Construcción del Centro",
          descripcion: "Construcción y equipamiento del centro educativo",
          estado: "completada",
          fechaInicio: "2020-01-15",
          fechaFin: "2020-06-15",
          votosRequeridos: 100,
          votosAFavor: 95,
          votosEnContra: 5,
          desbloqueada: true
        },
        {
          id: 2,
          nombre: "Fase 2: Programas Educativos",
          descripcion: "Implementación de programas educativos básicos",
          estado: "en_progreso",
          fechaInicio: "2020-07-01",
          fechaFin: null,
          votosRequeridos: 150,
          votosAFavor: 142,
          votosEnContra: 8,
          desbloqueada: true
        },
        {
          id: 3,
          nombre: "Fase 3: Expansión y Especialización",
          descripcion: "Expansión de programas y especialización en áreas técnicas",
          estado: "bloqueada",
          fechaInicio: null,
          fechaFin: null,
          votosRequeridos: 200,
          votosAFavor: 156,
          votosEnContra: 12,
          desbloqueada: false
        }
      ],
      meta: 50000,
      recaudado: 35000,
      donantes: 200
    }
  }

  useEffect(() => {
    const projectData = projectsData[Number(id)]
    if (projectData) {
      setProject(projectData)
      
      // Verificar si el usuario ha donado a este proyecto
      // En una implementación real, esto vendría de la blockchain o base de datos
      const userDonations = JSON.parse(localStorage.getItem('userDonations') || '{}')
      const hasUserDonated = userDonations[projectData.id] || false
      setHasDonated(hasUserDonated)
    }
  }, [id])

  // Verificar si hay un mensaje de confirmación de donación
  useEffect(() => {
    if (location.state?.message) {
      // Si hay un mensaje de donación exitosa, actualizar el estado
      const userDonations = JSON.parse(localStorage.getItem('userDonations') || '{}')
      if (userDonations[id]) {
        setHasDonated(true)
      }
      setShowMessage(true)
      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => setShowMessage(false), 5000)
    }
  }, [location.state, id])

  const handleVote = (vote) => {
    if (hasVoted) return
    
    setUserVote(vote)
    setHasVoted(true)
    
    // Aquí se enviaría la votación al backend
    console.log(`Usuario votó: ${vote} para el proyecto ${id}`)
  }

  const getFaseStatusColor = (estado) => {
    switch (estado) {
      case "completada":
        return "bg-green-100 text-green-800"
      case "en_progreso":
        return "bg-blue-100 text-blue-800"
      case "bloqueada":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getFaseStatusText = (estado) => {
    switch (estado) {
      case "completada":
        return "Completada"
      case "en_progreso":
        return "En Progreso"
      case "bloqueada":
        return "Bloqueada"
      default:
        return "Pendiente"
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Proyecto no encontrado</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    )
  }

  const currentPhase = project.fases.find(fase => fase.estado === "en_progreso") || project.fases[project.fase - 1]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notificación de donación exitosa */}
      {showMessage && location.state?.message && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{location.state.message}</span>
            <button
              onClick={() => setShowMessage(false)}
              className="ml-4 text-green-500 hover:text-green-700"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{project.titulo}</h1>
            </div>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                project.estado === "Activo"
                  ? "bg-green-100 text-green-800"
                  : project.estado === "Finalizado"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {project.estado}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descripción del Proyecto */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción del Proyecto</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{project.descripcion}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{project.recaudado.toLocaleString()} ETH</div>
                  <div className="text-sm text-gray-600">Recaudado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{project.meta.toLocaleString()} ETH</div>
                  <div className="text-sm text-gray-600">Meta</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{project.donantes}</div>
                  <div className="text-sm text-gray-600">Donantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{project.fase}</div>
                  <div className="text-sm text-gray-600">Fase Actual</div>
                </div>
              </div>
            </div>

            {/* Información del Proyecto */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Proyecto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {project.tipo === "temporal" ? "Temporal" : "Permanente"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha de Inicio:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(project.fechaInicio).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  {project.fechaFin && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha de Finalización:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(project.fechaFin).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {project.tipo === "temporal" ? "Participantes:" : "Beneficiarios:"}
                    </span>
                    <span className="font-medium text-gray-900">
                      {project.tipo === "temporal" ? project.participantes : project.beneficiarios}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ubicación:</span>
                    <span className="font-medium text-gray-900">{project.ubicacion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dirección:</span>
                    <span className="font-medium text-gray-900">{project.direccion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Progreso:</span>
                    <span className="font-medium text-gray-900">
                      {Math.round((project.recaudado / project.meta) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fases del Proyecto */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fases del Proyecto</h3>
              <div className="space-y-4">
                {project.fases.map((fase, index) => (
                  <div key={fase.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{fase.nombre}</h4>
                        <p className="text-sm text-gray-600 mt-1">{fase.descripcion}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFaseStatusColor(fase.estado)}`}>
                        {getFaseStatusText(fase.estado)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex justify-between text-gray-600 mb-1">
                          <span>Votos requeridos:</span>
                          <span>{fase.votosRequeridos}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 mb-1">
                          <span>Votos a favor:</span>
                          <span className="text-green-600">{fase.votosAFavor}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Votos en contra:</span>
                          <span className="text-red-600">{fase.votosEnContra}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-emerald-600 h-2 rounded-full"
                            style={{ width: `${Math.min((fase.votosAFavor / fase.votosRequeridos) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 text-center">
                          {Math.round((fase.votosAFavor / fase.votosRequeridos) * 100)}% de votos requeridos
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Progreso General */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso General</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-emerald-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((project.recaudado / project.meta) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-emerald-600">
                  {Math.round((project.recaudado / project.meta) * 100)}%
                </span>
                <div className="text-sm text-gray-600">
                  {project.recaudado.toLocaleString()} ETH de {project.meta.toLocaleString()} ETH
                </div>
              </div>
            </div>

            {/* Botón de Donación */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Apoyar este Proyecto</h3>
              <p className="text-sm text-gray-600 mb-4">
                Tu donación ayudará a que este proyecto continúe creciendo y beneficiando a más personas.
              </p>
              
              {hasDonated ? (
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm text-green-800 mb-2">
                    <svg className="w-5 h-5 mx-auto mb-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <strong>¡Ya has donado!</strong>
                  </div>
                  <p className="text-xs text-green-700 mb-3">
                    Gracias por tu apoyo. Ahora puedes participar en las votaciones del proyecto.
                  </p>
                  <button
                    onClick={() => navigate(`/donacion/${project.id}`)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                  >
                    Donar Nuevamente
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate(`/donacion/${project.id}`)}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Donar a este Proyecto
                </button>
              )}
            </div>

            {/* Sistema de Votación */}
            {currentPhase && !currentPhase.desbloqueada && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Votar por la Siguiente Fase</h3>
                <p className="text-sm text-gray-600 mb-4">
                  ¿Estás de acuerdo con desbloquear la fase "{currentPhase.nombre}"?
                </p>
                
                {!hasDonated ? (
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-sm text-yellow-800 mb-3">
                      <svg className="w-5 h-5 mx-auto mb-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <strong>Debes donar primero</strong>
                    </div>
                    <p className="text-xs text-yellow-700 mb-3">
                      Solo los donantes pueden participar en las votaciones para desbloquear fases del proyecto.
                    </p>
                    <button
                      onClick={() => navigate(`/donacion/${project.id}`)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                    >
                      Donar Ahora
                    </button>
                  </div>
                ) : hasVoted ? (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Ya has votado</div>
                    <div className={`text-sm font-medium ${
                      userVote === 'for' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Tu voto: {userVote === 'for' ? 'A favor' : 'En contra'}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleVote('for')}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Votar a Favor
                    </button>
                    <button
                      onClick={() => handleVote('against')}
                      className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Votar en Contra
                    </button>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs text-blue-800">
                    <strong>Nota:</strong> Solo los donantes pueden votar para desbloquear fases del proyecto.
                  </div>
                </div>
              </div>
            )}

            {/* Información de Ubicación */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ubicación</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Centro</div>
                  <div className="font-medium text-gray-900">{project.ubicacion}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Dirección</div>
                  <div className="font-medium text-gray-900">{project.direccion}</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-2">Mapa</div>
                  <div className="text-xs text-gray-500">
                    Coordenadas: {project.coordenadas}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
