import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function DashboardONG() {
  const navigate = useNavigate()
  const { id: walletAddress } = useParams() // Cambiar nombre para claridad
  const [projects, setProjects] = useState([])

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
    // Convertir el objeto de proyectos a un array para mostrar todos los proyectos
    const projectsArray = Object.values(projectsData)
    setProjects(projectsArray)
  }, [walletAddress])

  const handleLogout = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard ONG</h1>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {walletAddress?.slice(0, 8)}...{walletAddress?.slice(-6)}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Proyectos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Recaudado</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.reduce((sum, project) => sum + project.currentRaised, 0).toLocaleString()} ETH
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donantes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.reduce((sum, project) => sum + project.donors, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Proyectos Completados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(project => project.currentRaised >= project.totalGoal).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Proyectos */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Mis Proyectos</h2>
            <button
              onClick={() => navigate(`/agregar-proyecto/${walletAddress}`)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Proyecto
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay proyectos aún</h3>
              <p className="text-gray-600 mb-6">Comienza creando tu primer proyecto para recibir donaciones</p>
              <button
                onClick={() => navigate(`/agregar-proyecto/${walletAddress}`)}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Crear Primer Proyecto
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.currentRaised >= project.totalGoal
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {project.currentRaised >= project.totalGoal ? "Completado" : "Activo"}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progreso</span>
                        <span>{Math.round((project.currentRaised / project.totalGoal) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((project.currentRaised / project.totalGoal) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Recaudado</p>
                        <p className="font-semibold text-gray-900">{project.currentRaised.toLocaleString()} ETH</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Meta</p>
                        <p className="font-semibold text-gray-900">{project.totalGoal.toLocaleString()} ETH</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Donantes</p>
                        <p className="font-semibold text-gray-900">{project.donors}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fases</p>
                        <p className="font-semibold text-gray-900">{project.phases.length}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <button
                        onClick={() => navigate(`/detalles-proyecto/${project.id}`)}
                        className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

