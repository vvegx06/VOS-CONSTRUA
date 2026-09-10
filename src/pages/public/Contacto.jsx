import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Navbar from '../../components/public/Navbar'
import Footer from '../../components/public/Footer'
import ChatbotWidget from '../../components/public/Chatbot'


export default function Contacto() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 px-6 bg-text text-white text-center page-enter">
        <h1 className="font-heading text-3xl lg:text-4xl font-extrabold tracking-tight">Contáctenos</h1>
      </div>
      <section className="py-20 px-6">
        <div className="container max-w-[900px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-5">
              <h2 className="font-heading text-2xl font-extrabold mb-6">Información de Contacto</h2>
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
            <form onSubmit={e => { e.preventDefault(); alert('Mensaje enviado correctamente.'); e.target.reset() }} className="p-6 border border-border rounded-lg">
              <h3 className="font-heading text-lg font-bold mb-4">Envíenos un mensaje</h3>
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
