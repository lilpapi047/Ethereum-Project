import { useNavigate } from "react-router-dom"

export default function DashboardDonantes(){
  const navigate = useNavigate()

  // Datos de ejemplo de organizaciones
  const organizations = [
    {
      id: 1,
      name: "Cruz Roja Internacional",
      image: "/img/cruz-roja-logo.png",
      description: "Ayuda humanitaria mundial",
      projectsCount: 12,

    },
    {
      id: 2,
      name: "UNICEF",
      image: "/img/unicef-logo.png",
      description: "Protección de la infancia",
      projectsCount: 8,
    },
    {
      id: 3,
      name: "Médicos Sin Fronteras",
      image: "/img/medicos-sin-fronteras-logo.png",
      description: "Atención médica de emergencia",
      projectsCount: 15,
    },
    {
      id: 4,
      name: "WWF",
      image: "/img/wwf-panda-logo.png",
      description: "Conservación del medio ambiente",
      projectsCount: 6,
    },
    {
      id: 5,
      name: "Oxfam",
      image: "/img/oxfam-logo.png",
      description: "Lucha contra la pobreza",
      projectsCount: 10,
    },
    {
      id: 6,
      name: "Save the Children",
      image: "/img/save-the-children-logo.png",
      description: "Derechos de los niños",
      projectsCount: 9,
    },
  ]

  const handleOrganizationClick = (organizationId) => {
    navigate(`/proyectoDonante/${organizationId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard de Donaciones</h1>
              <p className="text-gray-600 mt-1">Selecciona una organización para ver sus proyectos disponibles</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200"
            >
              {/* Image */}
              <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                <img src={org.image || "/placeholder.svg"} alt={org.name} className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{org.name}</h3>
                <p className="text-gray-600 mb-4">{org.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    {org.projectsCount} proyectos
                  </div>
                  <div 
                  key={org.id}
                  onClick={() => handleOrganizationClick(org.id)}
                  className="text-emerald-600 font-medium text-sm rounded-sm p-1 hover:bg-gray-100 hover:font-bold transition-colors">
                    Ver proyectos →</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
