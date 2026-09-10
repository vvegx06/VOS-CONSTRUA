import { useState, useRef, useEffect } from 'react'
import { useData } from '../../context/DataContext'

function formatCurrency(num) {
  return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', minimumFractionDigits: 0 }).format(num)
}

function getResponse(message) {
  const msg = message.toLowerCase()
  const { data } = useData.getState()

  if (msg.includes('proyecto')) {
    const activos = data.proyectos.filter(p => p.estado === 'En ejecución').length
    const planificacion = data.proyectos.filter(p => p.estado === 'En planificación').length
    const finalizados = data.proyectos.filter(p => p.estado === 'Finalizado').length
    return `<strong>Resumen de Proyectos:</strong><br>- En ejecución: <strong>${activos}</strong><br>- En planificación: <strong>${planificacion}</strong><br>- Finalizados: <strong>${finalizados}</strong>`
  }

  if (msg.includes('inventario') || msg.includes('stock')) {
    const agotados = data.inventario.filter(i => i.estado === 'Agotado')
    const bajos = data.inventario.filter(i => i.estado === 'Stock bajo')
    const disp = data.inventario.filter(i => i.estado === 'Disponible').length
    let html = `<strong>Estado del Inventario:</strong><br>Disponibles: <strong>${disp}</strong><br>Stock bajo: <strong>${bajos.length}</strong><br>Agotados: <strong>${agotados.length}</strong>`
    return html
  }

  if (msg.includes('maquinaria') || msg.includes('equipo')) {
    const disp = data.maquinaria.filter(m => m.estado === 'Disponible').length
    const asignada = data.maquinaria.filter(m => m.estado === 'Asignada').length
    const mant = data.maquinaria.filter(m => m.estado.includes('mantenimiento')).length
    return `<strong>Estado de Maquinaria:</strong><br>Disponibles: <strong>${disp}</strong><br>Asignadas: <strong>${asignada}</strong><br>En mantenimiento: <strong>${mant}</strong>`
  }

  if (msg.includes('tarea')) {
    const pend = data.tareas.filter(t => t.estado === 'Pendiente').length
    const prog = data.tareas.filter(t => t.estado === 'En progreso').length
    const comp = data.tareas.filter(t => t.estado === 'Completada').length
    return `<strong>Resumen de Tareas:</strong><br>Pendientes: <strong>${pend}</strong><br>En progreso: <strong>${prog}</strong><br>Completadas: <strong>${comp}</strong>`
  }

  if (msg.includes('resumen')) {
    const proy = data.proyectos.filter(p => p.estado === 'En ejecución').length
    const tarPend = data.tareas.filter(t => t.estado === 'Pendiente').length
    const invBajo = data.inventario.filter(i => i.estado === 'Stock bajo' || i.estado === 'Agotado').length
    return `<strong>Resumen del Sistema:</strong><br>- Proyectos en ejecución: <strong>${proy}</strong><br>- Tareas pendientes: <strong>${tarPend}</strong><br>- Materiales con alerta: <strong>${invBajo}</strong><br>- Empleados activos: <strong>${data.empleados.length}</strong>`
  }

  if (msg.includes('hola') || msg.includes('buenos')) {
    return 'Hola! En qué puedo ayudarle? Puede pedirme un resumen, consultar inventario, maquinaria, tareas o personal.'
  }

  return 'Puede preguntar sobre: resumen, inventario, maquinaria, tareas o proveedores.'
}

export default function CrmAsistente() {
  const { data } = useData()
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Asistente interno de Construa S.A. Puede preguntar sobre <strong>inventario</strong>, <strong>maquinaria</strong>, <strong>tareas</strong>, <strong>personal</strong>, <strong>proveedores</strong> o <strong>reportes</strong>.' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const getBotResponse = (message) => {
    const msg = message.toLowerCase()

    if (msg.includes('proyecto')) {
      const activos = data.proyectos.filter(p => p.estado === 'En ejecución').length
      const planificacion = data.proyectos.filter(p => p.estado === 'En planificación').length
      const finalizados = data.proyectos.filter(p => p.estado === 'Finalizado').length
      const suspendidos = data.proyectos.filter(p => p.estado === 'Suspendido').length
      return `<strong>Resumen de Proyectos:</strong><br>- En ejecución: <strong>${activos}</strong><br>- En planificación: <strong>${planificacion}</strong><br>- Finalizados: <strong>${finalizados}</strong><br>- Suspendidos: <strong>${suspendidos}</strong>`
    }

    if (msg.includes('inventario') || msg.includes('stock') || msg.includes('material')) {
      const agotados = data.inventario.filter(i => i.estado === 'Agotado')
      const bajos = data.inventario.filter(i => i.estado === 'Stock bajo')
      const disp = data.inventario.filter(i => i.estado === 'Disponible').length
      let html = `<strong>Estado del Inventario:</strong><br><br>Disponibles: <strong>${disp}</strong><br>Stock bajo: <strong>${bajos.length}</strong><br>Agotados: <strong>${agotados.length}</strong><br><br>`
      if (bajos.length > 0) {
        html += '<span style="color:#D97706">Stock bajo:</span><br>'
        bajos.forEach(i => { html += `- ${i.nombre} (${i.cantidad} ${i.unidad})<br>` })
      }
      if (agotados.length > 0) {
        html += '<span style="color:#DC2626">Agotados:</span><br>'
        agotados.forEach(i => { html += `- ${i.nombre}<br>` })
      }
      return html
    }

    if (msg.includes('maquinaria') || msg.includes('equipo')) {
      const disp = data.maquinaria.filter(m => m.estado === 'Disponible')
      const asignada = data.maquinaria.filter(m => m.estado === 'Asignada')
      const mant = data.maquinaria.filter(m => m.estado.includes('mantenimiento'))
      let html = `<strong>Estado de Maquinaria:</strong><br><br>Disponibles: <strong>${disp.length}</strong><br>Asignadas: <strong>${asignada.length}</strong><br>En mantenimiento: <strong>${mant.length}</strong><br><br>`
      if (mant.length > 0) {
        html += '<span style="color:#D97706">En mantenimiento:</span><br>'
        mant.forEach(m => { html += `- ${m.nombre} (${m.estado})<br>` })
      }
      if (disp.length > 0) {
        html += '<br><span style="color:#059669">Disponibles:</span><br>'
        disp.forEach(m => { html += `- ${m.nombre}<br>` })
      }
      return html
    }

    if (msg.includes('tarea')) {
      const pend = data.tareas.filter(t => t.estado === 'Pendiente')
      const prog = data.tareas.filter(t => t.estado === 'En progreso')
      const comp = data.tareas.filter(t => t.estado === 'Completada').length
      let html = `<strong>Tareas pendientes (${pend.length}):</strong><br>`
      pend.slice(0, 3).forEach(t => { html += `- ${t.titulo} <span style="color:#999">(${t.prioridad})</span><br>` })
      html += `<br><strong>En progreso (${prog.length}):</strong><br>`
      prog.slice(0, 3).forEach(t => { html += `- ${t.titulo}<br>` })
      html += `<br>Completadas: <strong>${comp}</strong>`
      return html
    }

    if (msg.includes('empleado') || msg.includes('personal')) {
      const deptos = {}
      data.empleados.forEach(e => { deptos[e.departamento] = (deptos[e.departamento] || 0) + 1 })
      let html = `<strong>Equipo Humano (${data.empleados.length} empleados):</strong><br><br>`
      Object.entries(deptos).forEach(([d, c]) => { html += `- ${d}: <strong>${c}</strong><br>` })
      return html
    }

    if (msg.includes('proveedor') || msg.includes('compra')) {
      const activos = data.proveedores.filter(p => p.estado === 'Activo').length
      const ocPend = data.ordenesCompra.filter(o => o.estado === 'Pendiente de aprobación').length
      return `<strong>Proveedores:</strong><br>- Activos: <strong>${activos}</strong><br>- OC pendientes: <strong>${ocPend}</strong>`
    }

    if (msg.includes('reporte') || msg.includes('resumen') || msg.includes('estadistica')) {
      const presTotal = data.proyectos.reduce((s, p) => s + p.presupuesto, 0)
      const presActivos = data.proyectos.filter(p => p.estado === 'En ejecución').reduce((s, p) => s + p.presupuesto, 0)
      return `<strong>Resumen Financiero:</strong><br>- Presupuesto total: <strong>${formatCurrency(presTotal)}</strong><br>- En ejecución: <strong>${formatCurrency(presActivos)}</strong><br>- OC este mes: <strong>${data.ordenesCompra.length}</strong>`
    }

    if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas')) {
      return 'Hola! En qué puedo ayudarle? Puede pedirme un <strong>resumen</strong>, consultar <strong>inventario</strong>, <strong>maquinaria</strong>, <strong>tareas</strong> o <strong>personal</strong>.'
    }

    if (msg.includes('gracias') || msg.includes('perfecto')) {
      return 'De nada! Si tiene alguna otra pregunta, no dude en consultarme.'
    }

    return 'Puede preguntar sobre: <strong>resumen</strong>, <strong>inventario</strong>, <strong>maquinaria</strong>, <strong>tareas</strong>, <strong>personal</strong>, <strong>proveedores</strong> o <strong>reportes</strong>.'
  }

  const send = () => {
    const message = input.trim()
    if (!message) return
    setMessages(prev => [...prev, { type: 'user', text: message }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      const response = getBotResponse(message)
      setMessages(prev => [...prev, { type: 'bot', text: response }])
    }, 800 + Math.random() * 700)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-surface border border-border rounded-lg overflow-hidden">
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
          placeholder="Escriba su consulta..."
          className="flex-1 px-3.5 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
        />
        <button onClick={send} className="btn btn-primary px-5">Enviar</button>
      </div>
    </div>
  )
}
