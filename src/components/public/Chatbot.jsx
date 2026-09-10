import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Bot } from 'lucide-react'
import MOCK_DATA from '../../data/mockData'

const QUICK_ACTIONS = {
  public: [
    { label: 'Servicios', msg: 'Que servicios ofrecen?' },
    { label: 'Proyectos', msg: 'Proyectos recientes' },
    { label: 'Contacto', msg: 'Informacion de contacto' },
    { label: 'Empresa', msg: 'Quienes son?' },
  ],
  cliente: [
    { label: 'Mis proyectos', msg: 'Cuales son mis proyectos?' },
    { label: 'Agendar cita', msg: 'Quiero agendar una cita' },
    { label: 'Contacto', msg: 'Informacion de contacto' },
    { label: 'Horario', msg: 'Horario de atencion' },
  ],
  crm: [
    { label: 'Resumen', msg: 'Dame un resumen general del sistema' },
    { label: 'Inventario', msg: 'Estado del inventario' },
    { label: 'Maquinaria', msg: 'Estado de la maquinaria' },
    { label: 'Tareas', msg: 'Resumen de tareas pendientes' },
  ],
}

function getWelcomeMessage(portal) {
  if (portal === 'cliente') return 'Bienvenido al asistente de Construa S.A. En que puedo ayudarle? Puede preguntar sobre sus proyectos, agendar citas o consultar informacion general.'
  if (portal === 'public') return 'Bienvenido a Construa S.A. En que puedo ayudarle? Puede preguntar sobre nuestros servicios, proyectos, contacto o empresa.'
  return 'Asistente interno de Construa S.A. Puede preguntar sobre inventario, maquinaria, tareas, personal, proveedores o reportes.'
}

function getResponse(message, portal) {
  const msg = message.toLowerCase()

  if (msg.includes('proyecto')) {
    if (portal === 'cliente') return 'Puede ver el estado de sus proyectos en su <strong>Dashboard</strong>.'
    const activos = MOCK_DATA.proyectos.filter(p => p.estado === 'En ejecución').length
    const planificacion = MOCK_DATA.proyectos.filter(p => p.estado === 'En planificación').length
    const finalizados = MOCK_DATA.proyectos.filter(p => p.estado === 'Finalizado').length
    const suspendidos = MOCK_DATA.proyectos.filter(p => p.estado === 'Suspendido').length
    return `<strong>Resumen de Proyectos:</strong><br>- En ejecución: <strong>${activos}</strong><br>- En planificación: <strong>${planificacion}</strong><br>- Finalizados: <strong>${finalizados}</strong><br>- Suspendidos: <strong>${suspendidos}</strong>`
  }

  if (msg.includes('inventario') || msg.includes('material') || msg.includes('stock')) {
    const agotados = MOCK_DATA.inventario.filter(i => i.estado === 'Agotado')
    const bajos = MOCK_DATA.inventario.filter(i => i.estado === 'Stock bajo')
    const disp = MOCK_DATA.inventario.filter(i => i.estado === 'Disponible').length
    let html = `<strong>Estado del Inventario:</strong><br><br>Disponibles: <strong>${disp}</strong><br>Stock bajo: <strong>${bajos.length}</strong><br>Agotados: <strong>${agotados.length}</strong><br><br>`
    if (bajos.length > 0) {
      html += '<span className="text-warning">Stock bajo:</span><br>'
      bajos.forEach(i => { html += `- ${i.nombre} (${i.cantidad} ${i.unidad})<br>` })
    }
    if (agotados.length > 0) {
      html += '<span className="text-danger">Agotados:</span><br>'
      agotados.forEach(i => { html += `- ${i.nombre}<br>` })
    }
    return html
  }

  if (msg.includes('maquinaria') || msg.includes('equipo')) {
    const disp = MOCK_DATA.maquinaria.filter(m => m.estado === 'Disponible')
    const asignada = MOCK_DATA.maquinaria.filter(m => m.estado === 'Asignada')
    const mant = MOCK_DATA.maquinaria.filter(m => m.estado.includes('mantenimiento'))
    let html = `<strong>Estado de Maquinaria:</strong><br><br>Disponibles: <strong>${disp.length}</strong><br>Asignadas: <strong>${asignada.length}</strong><br>En mantenimiento: <strong>${mant.length}</strong>`
    return html
  }

  if (msg.includes('empleado') || msg.includes('personal')) {
    const deptos = {}
    MOCK_DATA.empleados.forEach(e => { deptos[e.departamento] = (deptos[e.departamento] || 0) + 1 })
    let html = `<strong>Equipo Humano (${MOCK_DATA.empleados.length} empleados):</strong><br><br>`
    Object.entries(deptos).forEach(([d, c]) => { html += `- ${d}: <strong>${c}</strong><br>` })
    return html
  }

  if (msg.includes('cita') || msg.includes('agendar')) {
    return portal === 'cliente'
      ? 'Puede agendar una cita desde la sección <strong>Mis Citas</strong> en su portal.'
      : `Las citas se gestionan desde el Portal del Cliente. Actualmente hay citas próximas.`
  }

  if (msg.includes('contacto') || msg.includes('telefono')) {
    return '<strong>Tel:</strong> +506 2440-1818<br><strong>Email:</strong> info@construacr.com<br><strong>Ubicación:</strong> Alajuela, Costa Rica'
  }

  if (msg.includes('horario') || msg.includes('atencion')) {
    return 'Nuestro horario de atención es:<br><strong>Lunes a Viernes:</strong> 7:00 AM - 5:00 PM'
  }

  if (msg.includes('resumen')) {
    const proy = MOCK_DATA.proyectos.filter(p => p.estado === 'En ejecución').length
    const tarPend = MOCK_DATA.tareas.filter(t => t.estado === 'Pendiente').length
    const invBajo = MOCK_DATA.inventario.filter(i => i.estado === 'Stock bajo' || i.estado === 'Agotado').length
    return `<strong>Resumen del Sistema:</strong><br><br>- Proyectos en ejecución: <strong>${proy}</strong><br>- Tareas pendientes: <strong>${tarPend}</strong><br>- Materiales con alerta: <strong>${invBajo}</strong><br>- Empleados activos: <strong>${MOCK_DATA.empleados.length}</strong>`
  }

  if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas')) {
    return portal === 'crm'
      ? 'Hola! En que puedo ayudarle? Puede pedirme un resumen, consultar inventario, maquinaria, tareas o personal.'
      : 'Bienvenido! En que puedo ayudarle hoy?'
  }

  if (msg.includes('gracias') || msg.includes('perfecto')) {
    return 'De nada! Si tiene alguna otra pregunta, no dude en consultarme.'
  }

  return portal === 'crm'
    ? 'Puede preguntar sobre: resumen, inventario, maquinaria, tareas o proveedores.'
    : 'Puede preguntar sobre: proyectos, servicios, contacto, horario o inventario.'
}

export default function ChatbotWidget({ portal = 'public' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: getWelcomeMessage(portal) }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = () => {
    const message = input.trim()
    if (!message) return
    setMessages(prev => [...prev, { type: 'user', text: message }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      const response = getResponse(message, portal)
      setMessages(prev => [...prev, { type: 'bot', text: response }])
    }, 800 + Math.random() * 700)
  }

  const handleQuickAction = (msg) => {
    setInput(msg)
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'user', text: msg }])
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        const response = getResponse(msg, portal)
        setMessages(prev => [...prev, { type: 'bot', text: response }])
      }, 800 + Math.random() * 700)
    }, 100)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[1000] w-12 h-12 bg-primary text-white border-none rounded-full cursor-pointer flex items-center justify-center transition-all shadow-lg hover:scale-105 ${isOpen ? 'rotate-0' : ''}`}
      >
        {isOpen ? (
          <span className="text-xl">&times;</span>
        ) : (
          <MessageCircle size={20} />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-[999] w-[360px] max-w-[calc(100vw-2rem)] h-[480px] bg-surface border border-border rounded-xl shadow-xl flex flex-col animate-fade-in-up overflow-hidden">
          <div className="px-5 py-4 bg-primary text-white flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold">Asistente Construa</h4>
              <p className="text-[11px] opacity-80">En línea</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-surface-alt flex flex-col gap-2.5">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] px-3.5 py-2.5 rounded text-sm leading-relaxed animate-fade-in-up ${msg.type === 'user' ? 'bg-primary text-white self-end rounded-br-sm' : 'bg-surface border border-border self-start rounded-bl-sm'}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
            ))}
            {typing && (
              <div className="bg-surface border border-border self-start rounded-bl-sm px-4 py-3 rounded">
                <div className="flex gap-1">
                  {[0, 0.15, 0.3].map(d => (
                    <span key={d} className="w-1.5 h-1.5 bg-text-muted rounded-full" style={{ animation: `typingBounce 1.2s infinite ${d}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-2 flex gap-1.5 flex-wrap border-t border-border-light bg-surface">
            {(QUICK_ACTIONS[portal] || []).map(action => (
              <button key={action.label} onClick={() => handleQuickAction(action.msg)} className="px-3 py-1 bg-surface-alt border border-border rounded-2xl text-[11px] font-medium cursor-pointer transition-all hover:bg-primary-light hover:border-primary hover:text-primary">
                {action.label}
              </button>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-border bg-surface flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Escriba su mensaje..."
              className="flex-1 px-3.5 py-2 border border-border rounded-2xl text-sm bg-surface-alt focus:outline-none focus:border-primary"
            />
            <button onClick={send} className="w-9 h-9 bg-primary text-white border-none rounded-full cursor-pointer flex items-center justify-center text-sm transition-all hover:bg-primary-dark">&raquo;</button>
          </div>
        </div>
      )}
    </>
  )
}
