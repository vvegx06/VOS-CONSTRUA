import { useState, useRef, useEffect } from 'react'
import MOCK_DATA from '../../data/mockData'

function getResponse(message) {
  const msg = message.toLowerCase()

  if (msg.includes('proyecto')) {
    return 'Puede ver el estado de sus proyectos en su <strong>Dashboard</strong>. Si necesita información específica, puede agendar una cita con nuestro equipo.'
  }

  if (msg.includes('cita') || msg.includes('agendar')) {
    return 'Puede agendar una cita desde la sección <strong>Mis Citas</strong> en su portal. Seleccione fecha, hora y motivo de la visita.'
  }

  if (msg.includes('contacto') || msg.includes('telefono') || msg.includes('correo')) {
    return '<strong>Tel:</strong> +506 2440-1818<br><strong>Email:</strong> info@construacr.com<br><strong>Ubicación:</strong> Alajuela, Costa Rica'
  }

  if (msg.includes('horario') || msg.includes('atencion')) {
    return 'Nuestro horario de atención es:<br><strong>Lunes a Viernes:</strong> 7:00 AM - 5:00 PM<br><strong>Sábados:</strong> 7:00 AM - 12:00 PM'
  }

  if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas')) {
    return 'Bienvenido! En qué puedo ayudarle hoy? Puede preguntar sobre proyectos, servicios, contacto o cualquier información que necesite.'
  }

  if (msg.includes('gracias') || msg.includes('perfecto')) {
    return 'De nada! Si tiene alguna otra pregunta, no dude en consultarme.'
  }

  if (msg.includes('servicio') || msg.includes('hacen')) {
    return 'Nuestros servicios incluyen:<br>- Ingeniería estructural y civil<br>- Edificación e inmuebles<br>- Remodelaciones<br>- Movimientos de tierra<br>- Construcción industrial<br>- Mantenimiento general'
  }

  return 'Puede preguntar sobre: <strong>proyectos</strong>, <strong>servicios</strong>, <strong>contacto</strong>, <strong>horario</strong> o <strong>inventario</strong>.'
}

export default function ClienteChat() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Bienvenido al asistente de Construa S.A. En qué puedo ayudarle? Puede preguntar sobre sus proyectos, agendar citas o consultar información general.' }
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
      const response = getResponse(message)
      setMessages(prev => [...prev, { type: 'bot', text: response }])
    }, 800 + Math.random() * 700)
  }

  return (
    <div>
      <div className="bg-text text-white py-12 px-6 text-center rounded-b-lg mb-8">
        <h1 className="font-heading text-2xl lg:text-3xl font-extrabold">Chat de Asistencia</h1>
      </div>

      <div className="container max-w-[700px]">
        <div className="flex flex-col h-[500px] bg-surface border border-border rounded-lg overflow-hidden">
          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`max-w-[70%] px-3.5 py-2.5 rounded text-sm leading-relaxed animate-fade-in-up ${msg.type === 'user' ? 'bg-primary text-white rounded-br-sm' : 'bg-surface-alt border border-border rounded-bl-sm'}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
            {typing && (
              <div className="bg-surface-alt border border-border rounded-bl-sm px-4 py-3 rounded self-start">
                <div className="flex gap-1">
                  {[0, 0.15, 0.3].map(d => (
                    <span key={d} className="w-1.5 h-1.5 bg-text-muted rounded-full" style={{ animation: `typingBounce 1.2s infinite ${d}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2 p-3 border-t border-border">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Escriba su mensaje..."
              className="flex-1 px-3.5 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
            />
            <button onClick={send} className="btn btn-primary px-5">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
