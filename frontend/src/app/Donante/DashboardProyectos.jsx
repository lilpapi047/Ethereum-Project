"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProyectosONG() {
  const navigate = useNavigate()

  // Datos de ejemplo para proyectos temporales
  const proyectosTemporales = [
    {
      id: 1,
      titulo: "Campaña de Navidad 2024",
      descripcion: "Recolección de juguetes y alimentos para familias necesitadas durante las fiestas navideñas.",
      fechaInicio: "2024-12-01",
      fechaFin: "2024-12-25",
      estado: "Activo",
      participantes: 45,
    },
    {
      id: 2,
      titulo: "Jornada de Vacunación",
      descripcion: "Campaña de vacunación gratuita en comunidades rurales.",
      fechaInicio: "2024-11-15",
      fechaFin: "2024-11-30",
      estado: "Finalizado",
      participantes: 120,
    },
    {
      id: 3,
      titulo: "Limpieza de Playas",
      descripcion: "Actividad de limpieza y concientización ambiental en las costas locales.",
      fechaInicio: "2024-10-10",
      fechaFin: "2024-10-12",
      estado: "Finalizado",
      participantes: 80,
    },
  ]

  // Datos de ejemplo para proyectos permanentes
  const proyectosPermanentes = [
    {
      id: 4,
      titulo: "Centro de Educación Comunitaria",
      descripcion: "Programa educativo continuo para niños y adultos de la comunidad.",
      fechaInicio: "2020-01-15",
      estado: "Activo",
      beneficiarios: 200,
      ubicacion: "Barrio San José",
    },
    {
      id: 5,
      titulo: "Comedor Social",
      descripcion: "Servicio diario de alimentación para personas en situación de vulnerabilidad.",
      fechaInicio: "2019-03-01",
      estado: "Activo",
      beneficiarios: 150,
      ubicacion: "Centro de la ciudad",
    },
    {
      id: 6,
      titulo: "Programa de Salud Mental",
      descripcion: "Atención psicológica gratuita y talleres de bienestar emocional.",
      fechaInicio: "2021-06-01",
      estado: "Activo",
      beneficiarios: 75,
      ubicacion: "Clínica Comunitaria",
    },
  ]

  const [tipoVista, setTipoVista] = useState("todos")

  const handleVerDetalle = (proyecto) => {
    // Navegar a la página de detalle del proyecto
    navigate(`/proyecto/${proyecto.id}`, { state: { proyecto } })
  }



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
            <button
                onClick={() => navigate("/dashboardDonantes/${org.id}")}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Proyectos de la ONG</h1>
            <p className="text-gray-600 text-lg">Gestiona y visualiza todos los proyectos de nuestra organización</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTipoVista("todos")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tipoVista === "todos"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Todos los Proyectos
            </button>
            <button
              onClick={() => setTipoVista("temporales")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tipoVista === "temporales"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Temporales
            </button>
            <button
              onClick={() => setTipoVista("permanentes")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tipoVista === "permanentes"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Permanentes
            </button>
          </div>

        </div>

        {/* Proyectos Temporales */}
        {(tipoVista === "todos" || tipoVista === "temporales") && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-4 h-4 bg-orange-500 rounded-full mr-3"></span>
              Proyectos Temporales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectosTemporales.map((proyecto) => (
                <div key={proyecto.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{proyecto.titulo}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        proyecto.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {proyecto.estado}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{proyecto.descripcion}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Inicio:</span>
                      <span className="text-gray-900">{proyecto.fechaInicio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fin:</span>
                      <span className="text-gray-900">{proyecto.fechaFin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Participantes:</span>
                      <span className="text-gray-900">{proyecto.participantes}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerDetalle(proyecto)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalle
                    </button>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proyectos Permanentes */}
        {(tipoVista === "todos" || tipoVista === "permanentes") && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
              Proyectos Permanentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectosPermanentes.map((proyecto) => (
                <div key={proyecto.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{proyecto.titulo}</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {proyecto.estado}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{proyecto.descripcion}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Inicio:</span>
                      <span className="text-gray-900">{proyecto.fechaInicio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Beneficiarios:</span>
                      <span className="text-gray-900">{proyecto.beneficiarios}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ubicación:</span>
                      <span className="text-gray-900">{proyecto.ubicacion}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerDetalle(proyecto)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
