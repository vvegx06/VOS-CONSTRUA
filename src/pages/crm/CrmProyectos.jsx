import { useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '../../context/DataContext'

function getBadgeClass(estado) {
  const map = {
    'Activo': 'badge-success', 'Disponible': 'badge-success', 'Finalizado': 'badge-success', 'Finalizada': 'badge-success',
    'Completada': 'badge-success', 'Aprobada': 'badge-success', 'Recibida': 'badge-success', 'Confirmada': 'badge-success',
    'En ejecución': 'badge-info', 'En progreso': 'badge-info', 'En revisión': 'badge-info', 'Asignada': 'badge-info',
    'Enviada al proveedor': 'badge-info', 'Agendada': 'badge-info',
    'Pendiente': 'badge-warning', 'Pendiente de aprobación': 'badge-warning', 'En planificación': 'badge-warning',
    'Borrador': 'badge-warning', 'Stock bajo': 'badge-warning', 'Reprogramada': 'badge-warning',
    'En mantenimiento preventivo': 'badge-warning', 'En mantenimiento correctivo': 'badge-warning',
    'Suspendido': 'badge-secondary', 'Cancelado': 'badge-secondary', 'Cancelada': 'badge-secondary',
    'Inactivo': 'badge-secondary', 'Fuera de servicio': 'badge-danger',
    'Agotado': 'badge-danger'
  }
  return map[estado] || 'badge-secondary'
}

function formatCurrency(num) {
  return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', minimumFractionDigits: 0 }).format(num)
}

export default function CrmProyectos() {
  const { data } = useData()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  let proyectos = data.proyectos
  if (filtroEstado) proyectos = proyectos.filter(p => p.estado === filtroEstado)
  if (busqueda) proyectos = proyectos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.cliente.toLowerCase().includes(busqueda.toLowerCase()))

  const estados = [...new Set(data.proyectos.map(p => p.estado))]

  return (
    <div>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border-light gap-3">
          <h2 className="font-heading text-sm font-bold">Proyectos ({proyectos.length})</h2>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm bg-surface-alt">
              <Search size={14} />
              <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar..." className="border-none outline-none text-sm bg-transparent w-40 text-text" />
            </div>
            <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="px-3 py-1.5 border border-border rounded-sm text-sm bg-surface text-text-secondary cursor-pointer">
              <option value="">Todos los estados</option>
              {estados.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-alt">
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Proyecto</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Cliente</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Ubicación</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Estado</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Progreso</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Presupuesto</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map(p => (
                <tr key={p.id} className="border-b border-border-light hover:bg-surface-alt transition-colors">
                  <td className="px-3.5 py-3 text-sm font-medium">{p.nombre}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{p.cliente}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{p.ubicacion}</td>
                  <td className="px-3.5 py-3"><span className={`badge ${getBadgeClass(p.estado)}`}>{p.estado}</span></td>
                  <td className="px-3.5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 progress-bar">
                        <div className="progress-fill" style={{ width: `${p.progreso}%` }} />
                      </div>
                      <span className="text-xs text-text-muted">{p.progreso}%</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{formatCurrency(p.presupuesto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
