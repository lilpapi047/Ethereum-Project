import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function DetallesProyecto() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [project, setProject] = useState(null)

  // Datos de ejemplo de proyectos con información detallada de fases
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
      phases: [
        {
          name: "Inicialización del Proyecto",
          percentage: 30,
          amount: 15000,
          description:
            "Establecimiento de centros de distribución, coordinación con organizaciones locales y compra inicial de suministros básicos.",
          status: "Completado",
        },
        {
          name: "Desarrollo y Expansión",
          percentage: 50,
          amount: 25000,
          description:
            "Ampliación de la red de distribución, contratación de personal local y establecimiento de rutas de suministro regulares.",
          status: "En Progreso",
        },
        {
          name: "Finalización y Sostenibilidad",
          percentage: 20,
          amount: 10000,
          description:
            "Transferencia de operaciones a organizaciones locales y establecimiento de sistemas de monitoreo a largo plazo.",
          status: "Pendiente",
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
      phases: [
        {
          name: "Preparación y Equipamiento",
          percentage: 40,
          amount: 40000,
          description:
            "Adquisición de equipos de rescate, suministros médicos de emergencia y establecimiento de centros de operaciones.",
          status: "Completado",
        },
        {
          name: "Capacitación y Despliegue",
          percentage: 35,
          amount: 35000,
          description:
            "Entrenamiento de equipos de respuesta, simulacros de emergencia y coordinación con autoridades locales.",
          status: "En Progreso",
        },
        {
          name: "Mantenimiento y Actualización",
          percentage: 25,
          amount: 25000,
          description:
            "Mantenimiento de equipos, actualización de protocolos y evaluación continua de capacidades de respuesta.",
          status: "Pendiente",
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
      phases: [
        {
          name: "Construcción de Infraestructura",
          percentage: 45,
          amount: 11250,
          description:
            "Construcción de centros de salud, instalación de equipos médicos básicos y establecimiento de sistemas de comunicación.",
          status: "Completado",
        },
        {
          name: "Capacitación y Contratación",
          percentage: 35,
          amount: 8750,
          description:
            "Capacitación de personal médico local, establecimiento de protocolos de atención y coordinación con el sistema de salud nacional.",
          status: "Completado",
        },
        {
          name: "Operación y Evaluación",
          percentage: 20,
          amount: 5000,
          description:
            "Inicio de operaciones, programas de educación en salud comunitaria y evaluación de impacto del proyecto.",
          status: "Completado",
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
      case "Completado":
        return "bg-green-100 text-green-800"
      case "En Progreso":
        return "bg-blue-100 text-blue-800"
      case "Pendiente":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
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
              <h1 className="text-2xl font-bold text-gray-900">Detalles del Proyecto</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal del Proyecto */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción del Proyecto */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h2>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* Fases del Proyecto */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Fases del Proyecto</h3>
              <div className="space-y-6">
                {project.phases.map((phase, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{phase.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {phase.percentage}% del total - ${phase.amount.toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPhaseStatusColor(phase.status)}`}
                      >
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{phase.description}</p>

                    {/* Barra de progreso de la fase */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            phase.status === "Completado"
                              ? "bg-green-500"
                              : phase.status === "En Progreso"
                                ? "bg-blue-500"
                                : "bg-gray-300"
                          }`}
                          style={{
                            width:
                              phase.status === "Completado" ? "100%" : phase.status === "En Progreso" ? "60%" : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel Lateral con Estadísticas */}
          <div className="space-y-6">
            {/* Progreso General */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso General</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Meta Total</span>
                    <span>${project.goal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Recaudado</span>
                    <span>${project.raised.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-emerald-600 h-3 rounded-full"
                      style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-2xl font-bold text-emerald-600">
                      {Math.round((project.raised / project.goal) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas Adicionales */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total de Donantes</span>
                  <span className="text-xl font-bold text-blue-600">{project.donors}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Faltante</span>
                  <span className="text-xl font-bold text-red-600">
                    ${(project.goal - project.raised).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fases Completadas</span>
                  <span className="text-xl font-bold text-green-600">
                    {project.phases.filter((phase) => phase.status === "Completado").length}/3
                  </span>
                </div>
              </div>
            </div>

            {/* Distribución por Fases */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución por Fases</h3>
              <div className="space-y-3">
                {project.phases.map((phase, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{phase.name}</span>
                    <span className="text-sm font-medium text-gray-900">{phase.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
