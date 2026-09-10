export default function Footer() {
  return (
    <footer className="bg-text text-white pt-12 pb-6 px-6 rounded-t-[24px] mt-16">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-heading text-base font-bold mb-3">CONSTRUA S.A.</h3>
          <p className="opacity-60 text-sm leading-relaxed">Constructora costarricense comprometida con el desarrollo sostenible de la región. Soluciones integrales de infraestructura con más de 15 años de experiencia.</p>
        </div>
        <div>
          <h4 className="font-heading text-xs font-bold mb-4 uppercase tracking-widest text-white/50">Servicios</h4>
          <ul className="space-y-2">
            {['Construcción Civil', 'Infraestructura Vial', 'Acueductos', 'Energías Renovables'].map(s => (
              <li key={s}><a href="#servicios" className="opacity-70 text-sm hover:opacity-100 transition-all">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-xs font-bold mb-4 uppercase tracking-widest text-white/50">Contacto</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>La Uruca, San José</li>
            <li>+506 2440-1818</li>
            <li>info@construacr.com</li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-6 mt-8 border-t border-white/10 opacity-50 text-xs">
        <p>&copy; 2026 CONSTRUA S.A. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
