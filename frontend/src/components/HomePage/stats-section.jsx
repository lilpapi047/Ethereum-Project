import React from "react";

export default function StatsSection() {
  return (
    <section className="bg-muted py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Impacto en Números</h2>
          <p className="text-muted-foreground text-lg">Juntos estamos creando un cambio real</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-div border-border">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">$2.5M+</div>
              <div className="text-muted-foreground">Donado en Total</div>
            </div>
          </div>
          <div className="bg-div border-border">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">15,000+</div>
              <div className="text-muted-foreground">Donantes Activos</div>
            </div>
          </div>
          <div className="bg-div border-border">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">250+</div>
              <div className="text-muted-foreground">Organizaciones</div>
            </div>
          </div>
          <div className="bg-div border-border">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Países</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
