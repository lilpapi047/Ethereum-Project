import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { config } from './Web3Config'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'

// Import components
import HomePage from './app/HomePage'
import Web3Auth from './app/Web3Auth'
import Registro from './app/Registro'
import InicioSesion from './app/InicioSesion'
import DashboardDonantes from './app/Donante/DashboardDonantes'
import DashboardONG from './app/ONG/DashboardONG'
import DetallesProyecto from './app/ONG/DetallesProyecto'
import AgregarProyecto from './app/ONG/AgregarProyecto'
import ProyectosONG from './app/Donante/DashboardProyectos'
import DetallesProyectoDonante from './app/Donante/DetallesProyectoDonante'
import Donacion from './app/Donante/Donacion'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<Web3Auth />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/inicio" element={<InicioSesion />} />
              <Route path="/dashboardDonantes/:id" element={<DashboardDonantes />} />
              <Route path="/dashboardONG/:id" element={<DashboardONG />} />
              <Route path="/detalles-proyecto/:id" element={<DetallesProyecto />} />
              <Route path="/agregar-proyecto/:id" element={<AgregarProyecto />} />
              <Route path="/proyectoDonante/:id" element={<ProyectosONG />} />
              <Route path="/proyecto/:id" element={<DetallesProyectoDonante />} />
              <Route path="/donacion/:id" element={<Donacion />} />
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
)
