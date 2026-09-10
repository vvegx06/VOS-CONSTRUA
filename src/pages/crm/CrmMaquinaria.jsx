import { useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '../../context/DataContext'

function getBadgeClass(estado) {
  const map = {
    'Disponible': 'badge-success', 'Asignada': 'badge-info',
    'En mantenimiento preventivo': 'badge-warning', 'En mantenimiento correctivo': 'badge-warning',
    'Fuera de servicio': 'badge-danger'
  }
  return map[estado] || 'badge-secondary'
}

export default function CrmMaquinaria() {
  const { data } = useData()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  let maquinaria = data.maquinaria
  if (filtroEstado) maquinaria = maquinaria.filter(m => m.estado === filtroEstado)
  if (busqueda) maquinaria = maquinaria.filter(m => m.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  const estados = [...new Set(data.maquinaria.map(m => m.estado))]

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <div className="font-heading text-2xl font-extrabold">{data.maquinaria.length}</div>
          <div className="text-text-muted text-xs">Total Unidades</div>
        </div>
        <div className="stat-card">
          <div className="font-heading text-2xl font-extrabold text-success">{data.maquinaria.filter(m => m.estado === 'Disponible').length}</div>
          <div className="text-text-muted text-xs">Disponibles</div>
        </div>
        <div className="stat-card">
          <div className="font-heading text-2xl font-extrabold text-info">{data.maquinaria.filter(m => m.estado === 'Asignada').length}</div>
          <div className="text-text-muted text-xs">Asignadas</div>
        </div>
        <div className="stat-card">
          <div className="font-heading text-2xl font-extrabold text-warning">{data.maquinaria.filter(m => m.estado.includes('mantenimiento')).length}</div>
          <div className="text-text-muted text-xs">En Mantenimiento</div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border-light gap-3">
          <h2 className="font-heading text-sm font-bold">Maquinaria ({maquinaria.length})</h2>
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
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Equipo</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Tipo</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Estado</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Proyecto</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Próx. Mantenimiento</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Horas Operación</th>
              </tr>
            </thead>
            <tbody>
              {maquinaria.map(m => {
                const proyecto = data.proyectos.find(p => p.id === m.proyectoId)
                return (
                  <tr key={m.id} className="border-b border-border-light hover:bg-surface-alt transition-colors">
                    <td className="px-3.5 py-3 text-sm font-medium">{m.nombre}</td>
                    <td className="px-3.5 py-3 text-sm text-text-secondary">{m.tipo}</td>
                    <td className="px-3.5 py-3"><span className={`badge ${getBadgeClass(m.estado)}`}>{m.estado}</span></td>
                    <td className="px-3.5 py-3 text-sm text-text-secondary">{proyecto?.nombre || '-'}</td>
                    <td className="px-3.5 py-3 text-sm text-text-secondary">{new Date(m.proximoMantenimiento).toLocaleDateString('es-CR')}</td>
                    <td className="px-3.5 py-3 text-sm text-text-secondary">{m.horasOperacion.toLocaleString()} h</td>
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
