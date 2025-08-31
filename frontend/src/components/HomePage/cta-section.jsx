import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate} from "react-router-dom"

export default function CTASection() {
  const navigate = useNavigate()
  return (
    <section className="bg-primary py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
          ¿Listo para hacer la diferencia?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8">
          Únete a miles de personas que ya están transformando el mundo con sus donaciones en criptomonedas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/registro")}
            size="lg"
            variant="secondary"
            className="bg-yellow-50 text-foreground hover:bg-yellow-300 hover:font-semibold px-8 py-3 cursor-pointer"
          >
            Crear Cuenta Gratis
          </button>
        </div>
      </div>
    </section>
  );
}
