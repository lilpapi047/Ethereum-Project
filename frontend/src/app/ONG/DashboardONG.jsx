import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function DashboardONG() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [project, setProject] = useState(null)

  // Datos simulados de proyectos con sistema de fases
  const projectsData = {
    1: {
      id: 1,
      title: "Ayuda Humanitaria en Siria",
      description:
        "Proporcionar alimentos, medicinas y refugio temporal a familias afectadas por el conflicto en Siria. Este proyecto busca brindar ayuda inmediata y sostenible a través de tres fases estratégicas.",
      totalGoal: 50000,
      currentRaised: 32500,
      donors: 245,
      phases: [
        {
          id: 1,
          name: "Fase 1: Ayuda Inmediata",
          description: "Distribución de alimentos y agua potable",
          goal: 15000,
          raised: 15000,
          status: "completed",
          votesFor: 180,
          votesAgainst: 12,
          unlocked: true,
        },
        {
          id: 2,
          name: "Fase 2: Atención Médica",
          description: "Suministro de medicinas y atención médica básica",
          goal: 20000,
          raised: 17500,
          status: "active",
          votesFor: 145,
          votesAgainst: 8,
          unlocked: true,
        },
        {
          id: 3,
          name: "Fase 3: Refugio Temporal",
          description: "Construcción de refugios temporales seguros",
          goal: 15000,
          raised: 0,
          status: "locked",
          votesFor: 89,
          votesAgainst: 23,
          unlocked: false,
        },
      ],
    },
    2: {
      id: 2,
      title: "Respuesta a Desastres Naturales",
      description:
        "Fondo de emergencia para responder rápidamente a desastres naturales en América Central. Incluye equipos de rescate, suministros médicos y reconstrucción de infraestructura básica.",
      totalGoal: 100000,
      currentRaised: 78900,
      donors: 412,
      phases: [
        {
          id: 1,
          name: "Fase 1: Respuesta Inmediata",
          description: "Equipos de rescate y primeros auxilios",
          goal: 30000,
          raised: 30000,
          status: "completed",
          votesFor: 298,
          votesAgainst: 5,
          unlocked: true,
        },
        {
          id: 2,
          name: "Fase 2: Suministros Médicos",
          description: "Medicinas y equipos médicos de emergencia",
          goal: 35000,
          raised: 35000,
          status: "completed",
          votesFor: 267,
          votesAgainst: 8,
          unlocked: true,
        },
        {
          id: 3,
          name: "Fase 3: Reconstrucción",
          description: "Reconstrucción de infraestructura básica",
          goal: 35000,
          raised: 13900,
          status: "active",
          votesFor: 201,
          votesAgainst: 15,
          unlocked: true,
        },
      ],
    },
    3: {
      id: 3,
      title: "Programa de Salud Comunitaria",
      description:
        "Establecer centros de salud en comunidades rurales de Honduras, proporcionando atención médica básica y programas de prevención de enfermedades.",
      totalGoal: 25000,
      currentRaised: 25000,
      donors: 156,
      phases: [
        {
          id: 1,
          name: "Fase 1: Construcción del Centro",
          description: "Construcción y equipamiento del centro de salud",
          goal: 15000,
          raised: 15000,
          status: "completed",
          votesFor: 142,
          votesAgainst: 3,
          unlocked: true,
        },
        {
          id: 2,
          name: "Fase 2: Capacitación del Personal",
          description: "Capacitación de personal médico local",
          goal: 5000,
          raised: 5000,
          status: "completed",
          votesFor: 138,
          votesAgainst: 2,
          unlocked: true,
        },
        {
          id: 3,
          name: "Fase 3: Programas Preventivos",
          description: "Implementación de programas de prevención",
          goal: 5000,
          raised: 5000,
          status: "completed",
          votesFor: 134,
          votesAgainst: 1,
          unlocked: true,
        },
      ],
    },
  }

  useEffect(() => {
    const projectData = projectsData[id]
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
            onClick={() => navigate("/dashboardONG/${org.id}")}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Volver al Dashboard
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboardONG/${org.id}")}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            </div>
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
                  <div className="text-2xl font-bold text-emerald-600">${project.currentRaised.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Recaudado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">${project.totalGoal.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Meta Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{project.donors}</div>
                  <div className="text-sm text-gray-600">Donantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((project.currentRaised / project.totalGoal) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Completado</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso General</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-emerald-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((project.currentRaised / project.totalGoal) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                ${project.currentRaised.toLocaleString()} de ${project.totalGoal.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Fases del Proyecto */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Fases del Proyecto</h2>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  {/* Votación */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Votación de Donantes</h4>
                    <div className="space-y-2">
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
                      <div className="mt-3">
                        <div className="text-xs text-gray-500 mb-1">
                          Aprobación: {Math.round((phase.votesFor / (phase.votesFor + phase.votesAgainst)) * 100)}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(phase.votesFor / (phase.votesFor + phase.votesAgainst)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

