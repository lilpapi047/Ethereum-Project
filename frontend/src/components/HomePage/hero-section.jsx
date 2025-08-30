import React from "react";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Transforma tu Generosidad en <span className="text-primary">Impacto</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Dona con criptomonedas de forma segura, transparente y sin fronteras. Cada contribución cuenta para crear un
            mundo mejor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3">
              Comienza a Donar
            </button>
            <button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
              Ver Cómo Funciona
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Seguro</h3>
            <p className="text-muted-foreground">Tecnología blockchain para máxima seguridad en cada transacción</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Rápido</h3>
            <p className="text-muted-foreground">Donaciones instantáneas sin intermediarios ni comisiones altas</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Global</h3>
            <p className="text-muted-foreground">Dona desde cualquier parte del mundo sin restricciones</p>
          </div>
        </div>
      </div>
    </section>
  );
}
