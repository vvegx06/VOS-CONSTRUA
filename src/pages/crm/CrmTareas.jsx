import { useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '../../context/DataContext'

function getBadgeClass(estado) {
  const map = {
    'Completada': 'badge-success', 'En progreso': 'badge-info', 'En revisión': 'badge-info',
    'Pendiente': 'badge-warning', 'Cancelada': 'badge-secondary'
  }
  return map[estado] || 'badge-secondary'
}

function getPrioridadClass(p) {
  const map = { 'Alta': 'badge-danger', 'Media': 'badge-warning', 'Baja': 'badge-info' }
  return map[p] || 'badge-secondary'
}

export default function CrmTareas() {
  const { data } = useData()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  let tareas = data.tareas
  if (filtroEstado) tareas = tareas.filter(t => t.estado === filtroEstado)
  if (busqueda) tareas = tareas.filter(t => t.titulo.toLowerCase().includes(busqueda.toLowerCase()))

  const estados = [...new Set(data.tareas.map(t => t.estado))]

  return (
    <div>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border-light gap-3">
          <h2 className="font-heading text-sm font-bold">Tareas ({tareas.length})</h2>
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
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Tarea</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Proyecto</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Estado</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Prioridad</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Responsable</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Fecha Límite</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map(t => {
                const proyecto = data.proyectos.find(p => p.id === t.proyectoId)
                return (
                  <tr key={t.id} className="border-b border-border-light hover:bg-surface-alt transition-colors">
                    <td className="px-3.5 py-3 text-sm font-medium">{t.titulo}</td>
                    <td className="px-3.5 py-3 text-sm text-text-secondary">{proyecto?.nombre || '-'}</td>
                    <td className="px-3.5 py-3"><span className={`badge ${getBadgeClass(t.estado)}`}>{t.estado}</span></td>
                    <td className="px-3.5 py-3"><span className={`badge ${getPrioridadClass(t.prioridad)}`}>{t.prioridad}</span></td>
                    <td className="px-3.5 py-3 text-sm text-text-secondary">{t.responsable}</td>
                    <td className="px-3.5 py-3 text-sm text-text-secondary">{new Date(t.fechaLimite).toLocaleDateString('es-CR')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
