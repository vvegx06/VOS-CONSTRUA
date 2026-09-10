import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import ChatbotWidget from '../../components/public/Chatbot'
import MOCK_DATA from '../../data/mockData'

export default function Home() {
  const countersRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target
          const target = parseInt(el.dataset.target)
          let current = 0
          const increment = target / 50
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              el.textContent = target
              clearInterval(timer)
            } else {
              el.textContent = Math.floor(current)
            }
          }, 30)
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.5 })

    countersRef.current.forEach(c => c && observer.observe(c))
    return () => observer.disconnect()
  }, [])

  const proyectos = MOCK_DATA.proyectos

  return (
    <>
      <Navbar transparent />

      <section className="relative h-screen min-h-[560px] flex items-center justify-center overflow-hidden page-enter" id="hero">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 to-slate-900/60 z-[1]" />
        <div className="relative z-[2] max-w-[700px] px-12 mx-auto text-center animate-fade-in-up">
          <h1 className="font-heading text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">Construyendo el Futuro de Costa Rica</h1>
          <p className="text-base text-white/80 leading-relaxed mb-8 max-w-[600px] mx-auto">Más de 15 años de experiencia en infraestructura, edificaciones y proyectos de ingeniería civil. Soluciones integrales para el desarrollo nacional.</p>
          <div className="flex gap-3 flex-wrap justify-center">
            <a href="#proyectos" className="btn btn-primary px-7 py-3 text-sm">Ver Proyectos</a>
            <a href="#contacto" className="btn btn-outline px-7 py-3 text-sm">Contáctenos</a>
          </div>
        </div>
      </section>

      <section className="bg-text py-14 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[960px] mx-auto text-center">
          {[
            { target: 48, label: 'Proyectos' },
            { target: 15, label: 'Años de Trayectoria' },
            { target: 120, label: 'Colaboradores' },
            { target: 2, label: 'Países' },
          ].map((c, i) => (
            <div key={i} className="text-white">
              <div ref={el => countersRef.current[i] = el} className="font-heading text-4xl font-extrabold text-primary tracking-tight" data-target={c.target}>0</div>
              <div className="text-sm text-white/60 mt-1">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6" id="nosotros">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-extrabold text-text tracking-tight mb-4">Construyendo el Futuro desde 2010</h2>
              <p className="text-text-secondary mb-3 text-[15px]">CONSTRUA S.A. es una empresa costarricense dedicada a la construcción de infraestructura de alto impacto. Con presencia en Costa Rica, Panamá, Colombia, Nicaragua y El Salvador, nos especializamos en obras que transforman comunidades.</p>
              <p className="text-text-secondary mb-3 text-[15px]">Nuestro equipo de más de 120 profesionales combina experiencia local con estándares internacionales de calidad, seguridad y sostenibilidad.</p>
              <p className="text-text-secondary text-[15px]">Contamos con certificación ISO 9001 y estamos comprometidos con las mejores prácticas de gestión ambiental y responsabilidad social.</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80" alt="Equipo Construa S.A." className="w-full h-[380px] object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="p-8 bg-surface-alt rounded-lg border-l-[3px] border-primary">
              <h3 className="font-heading text-lg font-bold text-primary mb-3">Nuestra Misión</h3>
              <p className="text-text-secondary text-[15px]">Desarrollar proyectos de infraestructura que transformen comunidades, superando las expectativas de nuestros clientes mediante la innovación, el compromiso con la calidad y el respeto por el medio ambiente.</p>
            </div>
            <div className="p-8 bg-surface-alt rounded-lg border-l-[3px] border-primary">
              <h3 className="font-heading text-lg font-bold text-primary mb-3">Nuestra Visión</h3>
              <p className="text-text-secondary text-[15px]">Ser la constructora líder en Centroamérica, reconocida por nuestra excelencia operativa, innovación tecnológica y contribución al desarrollo sostenible de la región.</p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-3xl font-extrabold text-text text-center tracking-tight mb-3">Nuestra Historia</h2>
            <p className="text-text-muted text-center mb-12 max-w-[520px] mx-auto">Más de una década de logros y crecimiento continuo.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { year: '2010 - Fundación', desc: 'Nace CONSTRUA S.A. con la visión de ofrecer soluciones constructivas de alta calidad en Costa Rica.' },
                { year: '2015 - Expansión Regional', desc: 'Iniciamos operaciones en Panamá y Nicaragua, consolidando nuestra presencia internacional.' },
                { year: '2020 - Innovación', desc: 'Implementamos tecnologías BIM y procesos de construcción sustentable en todos nuestros proyectos.' },
              ].map(h => (
                <div key={h.year} className="project-card border border-border rounded-lg overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <div className="p-5">
                    <h3 className="font-heading text-base font-bold mb-1">{h.year}</h3>
                    <p className="text-text-muted text-sm">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#f8f8f8]" id="proyectos">
        <div className="container">
          <h2 className="font-heading text-3xl font-extrabold text-text text-center tracking-tight mb-3">Nuestros Proyectos</h2>
          <p className="text-text-muted text-center mb-12 max-w-[520px] mx-auto">Conozca algunos de nuestros proyectos más recientes que transforman la infraestructura regional.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {proyectos.map(p => (
              <div key={p.id} className="project-card border border-border rounded-lg overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div className="h-48 bg-surface-alt overflow-hidden">
                  <img
                    src={p.categoria === 'Remodelaciones' ? 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'}
                    alt={p.nombre}
                    className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold mb-1">{p.nombre}</h3>
                  <p className="text-text-muted text-sm">{p.ubicacion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" id="servicios">
        <div className="container">
          <h2 className="font-heading text-3xl font-extrabold text-text text-center tracking-tight mb-3">Nuestros Servicios</h2>
          <p className="text-text-muted text-center mb-12 max-w-[520px] mx-auto">Ofrecemos soluciones integrales para todo tipo de proyectos de construcción e infraestructura.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Construcción Civil', desc: 'Edificaciones residenciales, comerciales e industriales con los más altos estándares de calidad.' },
              { title: 'Infraestructura Vial', desc: 'Carreteras, puentes, viaductos y obras de drenaje con tecnología de punta.' },
              { title: 'Acueductos y Alcantarillado', desc: 'Sistemas de agua potable y tratamiento de aguas residuales para comunidades.' },
              { title: 'Energías Renovables', desc: 'Parques eólicos, solares y proyectos hidroeléctricos sustentables.' },
              { title: 'Obras Marítimas', desc: 'Muelles, puertos y estructuras costeras para el transporte marítimo.' },
              { title: 'Procesos Industriales', desc: 'Plantas de asfalto, concreto premezclado y agregados para la construcción.' },
            ].map(s => (
              <div key={s.title} className="p-7 border border-border rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5">
                <h3 className="font-heading text-base font-bold mb-2">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="font-heading text-3xl font-extrabold text-text text-center tracking-tight mb-3">¿Por qué elegirnos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
              {[
                { title: 'Certificación ISO 9001', desc: 'Procesos certificados que garantizan la calidad en cada etapa de construcción.' },
                { title: 'Sostenibilidad', desc: 'Compromiso ambiental con prácticas de construcción sustentable y eficiente.' },
                { title: 'Equipo Experto', desc: 'Más de 120 profesionales con experiencia en proyectos de alta complejidad.' },
              ].map(s => (
                <div key={s.title} className="p-7 border border-border rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <h3 className="font-heading text-base font-bold mb-2">{s.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#f8f8f8]" id="contacto">
        <div className="container">
          <h2 className="font-heading text-3xl font-extrabold text-text text-center tracking-tight mb-3">Contáctenos</h2>
          <p className="text-text-muted text-center mb-12 max-w-[520px] mx-auto">Estamos aquí para ayudarle. Comuníquese con nosotros para cualquier consulta.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-5">
              {[
                { icon: MapPin, title: 'Dirección', text: 'La Uruca, San José, Costa Rica' },
                { icon: Phone, title: 'Teléfono', text: '+506 2440-1818' },
                { icon: Mail, title: 'Correo Electrónico', text: 'info@construacr.com' },
                { icon: Clock, title: 'Horario', text: 'Lunes a Viernes: 7:00 AM - 5:00 PM' },
              ].map(item => (
                <div key={item.title} className="flex gap-3.5 items-start">
                  <div className="w-11 h-11 bg-primary-light rounded flex items-center justify-center text-primary flex-shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold mb-0.5">{item.title}</h4>
                    <p className="text-text-muted text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={e => { e.preventDefault(); alert('Mensaje enviado correctamente.'); e.target.reset() }} className="space-y-4">
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" required placeholder="Su nombre" />
              </div>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" required placeholder="correo@ejemplo.com" />
              </div>
              <div className="form-group">
                <label>Asunto</label>
                <select required>
                  <option value="">Seleccione un asunto</option>
                  <option value="cotizacion">Solicitar Cotización</option>
                  <option value="proyecto">Información de Proyecto</option>
                  <option value="general">Consulta General</option>
                  <option value="empleo">Oportunidad Laboral</option>
                </select>
              </div>
              <div className="form-group">
                <label>Mensaje</label>
                <textarea required placeholder="Escriba su mensaje aquí..." />
              </div>
              <button type="submit" className="btn btn-primary w-full">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotWidget portal="public" />
    </>
  )
}
