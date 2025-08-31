import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import './index.css'
import HomePage from './app/HomePage'
import Registro from './app/Registro'
import InicioSesion from './app/InicioSesion'
import DashboardDonantes from './app/Donante/DashboardDonantes'
import DashboardONG from './app/ONG/DashboardONG'
import DetallesProyecto from './app/ONG/DetallesProyecto'
import ProyectosONG from './app/Donante/DashboardProyectos'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/inicio" element={<InicioSesion />} />
      <Route path="/dashboardDonantes/:id" element={<DashboardDonantes  />} />
      <Route path="/dashboardONG/:id" element={<DashboardONG />} />
      <Route path="/proyecto/:id" element={<DetallesProyecto />} />
      <Route path="/proyectoDonante/:id" element={<ProyectosONG  />} />
    </Routes>
  </BrowserRouter>
);
