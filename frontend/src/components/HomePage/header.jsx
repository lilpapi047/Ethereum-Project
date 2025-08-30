import { useNavigate } from "react-router-dom"; 

export default function Header() {
   const navigate = useNavigate();

  return (
    <header className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">CryptoGive</h1>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200">
                Sobre Nosotros
              </button>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-foreground border border-border hover:bg-muted bg-transparent rounded-md transition-colors duration-200" onClick={() => navigate("/inicio")}>
              Iniciar Sesión
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors duration-200" onClick={() => navigate("/registro")}>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

