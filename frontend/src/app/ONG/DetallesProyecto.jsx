import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function DetallesProyecto() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [project, setProject] = useState(null)

  // Datos de ejemplo de proyectos con sistema de votación para desbloqueo de fases
  const projectsData = {
    1: {
      id: 1,
      title: "Ayuda Humanitaria en Siria",
      description:
        "Proporcionar alimentos y medicinas a familias afectadas por el conflicto en Siria. Este proyecto busca llevar ayuda directa a las comunidades más vulnerables, estableciendo centros de distribución y coordinando con organizaciones locales para maximizar el impacto.",
      goal: 50000,
      raised: 32500,
      status: "Activo",
      donors: 245,
      totalVotes: 180, // Total de votos emitidos
      phases: [
        {
          id: 1,
          name: "Fase 1: Ayuda Inmediata",
          description: "Distribución de alimentos y agua potable a familias afectadas",
          goal: 15000,
          raised: 15000,
          status: "completed",
          votesRequired: 50, // Votos necesarios para desbloquear
          votesFor: 45,
          votesAgainst: 5,
          unlocked: true,
          completionDate: "2024-01-15",
        },
        {
          id: 2,
          name: "Fase 2: Atención Médica",
          description: "Suministro de medicinas y atención médica básica",
          goal: 20000,
          raised: 17500,
          status: "active",
          votesRequired: 75,
          votesFor: 72,
          votesAgainst: 8,
          unlocked: true,
          completionDate: null,
        },
        {
          id: 3,
          name: "Fase 3: Refugio Temporal",
          description: "Construcción de refugios temporales seguros",
          goal: 15000,
          raised: 0,
          status: "locked",
          votesRequired: 100,
          votesFor: 63,
          votesAgainst: 12,
          unlocked: false,
          completionDate: null,
        },
      ],
    },
    2: {
      id: 2,
      title: "Respuesta a Desastres Naturales",
      description:
        "Fondo de emergencia para responder rápidamente a desastres naturales en toda la región. Este proyecto mantiene recursos listos para despliegue inmediato cuando ocurren emergencias, incluyendo equipos de rescate, suministros médicos y refugios temporales.",
      goal: 100000,
      raised: 78900,
      status: "Activo",
      donors: 412,
      totalVotes: 298,
      phases: [
        {
          id: 1,
          name: "Fase 1: Respuesta Inmediata",
          description: "Equipos de rescate y primeros auxilios",
          goal: 30000,
          raised: 30000,
          status: "completed",
          votesRequired: 80,
          votesFor: 78,
          votesAgainst: 2,
          unlocked: true,
          completionDate: "2024-02-10",
        },
        {
          id: 2,
          name: "Fase 2: Suministros Médicos",
          description: "Medicinas y equipos médicos de emergencia",
          goal: 35000,
          raised: 35000,
          status: "completed",
          votesRequired: 120,
          votesFor: 115,
          votesAgainst: 5,
          unlocked: true,
          completionDate: "2024-03-05",
        },
        {
          id: 3,
          name: "Fase 3: Reconstrucción",
          description: "Reconstrucción de infraestructura básica",
          goal: 35000,
          raised: 13900,
          status: "active",
          votesRequired: 150,
          votesFor: 105,
          votesAgainst: 15,
          unlocked: true,
          completionDate: null,
        },
      ],
    },
    3: {
      id: 3,
      title: "Programa de Salud Comunitaria",
      description:
        "Establecer centros de salud en comunidades rurales para proporcionar atención médica básica y programas de prevención. El proyecto incluye la construcción de clínicas, capacitación de personal médico local y programas de educación en salud.",
      goal: 25000,
      raised: 25000,
      status: "Completado",
      donors: 156,
      totalVotes: 142,
      phases: [
        {
          id: 1,
          name: "Fase 1: Construcción del Centro",
          description: "Construcción y equipamiento del centro de salud",
          goal: 15000,
          raised: 15000,
          status: "completed",
          votesRequired: 60,
          votesFor: 58,
          votesAgainst: 2,
          unlocked: true,
          completionDate: "2024-01-20",
        },
        {
          id: 2,
          name: "Fase 2: Capacitación del Personal",
          description: "Capacitación de personal médico local",
          goal: 5000,
          raised: 5000,
          status: "completed",
          votesRequired: 40,
          votesFor: 38,
          votesAgainst: 2,
          unlocked: true,
          completionDate: "2024-02-15",
        },
        {
          id: 3,
          name: "Fase 3: Programas Preventivos",
          description: "Implementación de programas de prevención",
          goal: 5000,
          raised: 5000,
          status: "completed",
          votesRequired: 30,
          votesFor: 28,
          votesAgainst: 2,
          unlocked: true,
          completionDate: "2024-03-10",
        },
      ],
    },
  }

  useEffect(() => {
    const projectData = projectsData[Number(id)]
    if (projectData) {
      setProject(projectData)
    }
  }, [id])

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Proyecto no encontrado</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  const getPhaseStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "locked":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getPhaseStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completada"
      case "active":
        return "En Progreso"
      case "locked":
        return "Bloqueada"
      default:
        return "Pendiente"
    }
  }

  const getVoteProgressColor = (votesFor, votesRequired) => {
    const percentage = (votesFor / votesRequired) * 100
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboardONG/${userWalletAddress}")}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            </div>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                project.status === "Activo"
                  ? "bg-green-100 text-green-800"
                  : project.status === "Completado"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {project.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información General del Proyecto */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción del Proyecto</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">${project.raised.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Recaudado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">${project.goal.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Meta Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{project.donors}</div>
                  <div className="text-sm text-gray-600">Donantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{project.totalVotes}</div>
                  <div className="text-sm text-gray-600">Votos Emitidos</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso General</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-emerald-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                ${project.raised.toLocaleString()} de ${project.goal.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Fases del Proyecto con Sistema de Votación */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Fases del Proyecto - Sistema de Votación</h2>
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              Solo donantes pueden votar
            </div>
          </div>
          
          <div className="space-y-6">
            {project.phases.map((phase, index) => (
              <div key={phase.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getPhaseStatusColor(phase.status)}`}
                      >
                        {getPhaseStatusText(phase.status)}
                      </span>
                      {!phase.unlocked && (
                        <span className="flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          Bloqueada
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{phase.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Progreso de la Fase */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progreso de la Fase</span>
                      <span>{Math.round((phase.raised / phase.goal) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((phase.raised / phase.goal) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      ${phase.raised.toLocaleString()} de ${phase.goal.toLocaleString()}
                    </div>
                  </div>

                  {/* Sistema de Votación */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Votación para Desbloquear Fase</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Votos requeridos:</span>
                        <span className="text-sm font-medium text-gray-900">{phase.votesRequired}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">A favor</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{phase.votesFor} votos</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">En contra</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{phase.votesAgainst} votos</span>
                      </div>

                      {/* Barra de progreso de votos */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progreso de votos: {Math.round((phase.votesFor / phase.votesRequired) * 100)}%</span>
                          <span>{phase.votesFor}/{phase.votesRequired}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getVoteProgressColor(phase.votesFor, phase.votesRequired)}`}
                            style={{ width: `${Math.min((phase.votesFor / phase.votesRequired) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Estado de desbloqueo */}
                      <div className="mt-3 p-3 rounded-lg bg-gray-50">
                        {phase.unlocked ? (
                          <div className="flex items-center text-green-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">Fase desbloqueada</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-orange-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span className="text-sm font-medium">
                              Necesita {phase.votesRequired - phase.votesFor} votos más para desbloquear
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Fecha de completado si aplica */}
                      {phase.completionDate && (
                        <div className="text-xs text-gray-500 mt-2">
                          Completada el: {new Date(phase.completionDate).toLocaleDateString('es-ES')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Información adicional sobre el sistema de votación */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">¿Cómo funciona el sistema de votación?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Solo los usuarios que han donado al proyecto pueden votar</li>
              <li>• Cada fase requiere un número específico de votos para desbloquearse</li>
              <li>• Los votos se cuentan como "a favor" o "en contra" de desbloquear la fase</li>
              <li>• Una vez alcanzados los votos requeridos, la fase se desbloquea automáticamente</li>
              <li>• Las fases se ejecutan en orden secuencial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
