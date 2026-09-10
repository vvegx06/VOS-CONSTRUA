import { useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '../../context/DataContext'

function getBadgeClass(estado) {
  const map = { 'Disponible': 'badge-success', 'Stock bajo': 'badge-warning', 'Agotado': 'badge-danger' }
  return map[estado] || 'badge-secondary'
}

export default function CrmInventario() {
  const { data } = useData()
  const [busqueda, setBusqueda] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('')

  let items = data.inventario
  if (filtroCategoria) items = items.filter(i => i.categoria === filtroCategoria)
  if (busqueda) items = items.filter(i => i.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  const categorias = [...new Set(data.inventario.map(i => i.categoria))]

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <div className="font-heading text-2xl font-extrabold">{data.inventario.length}</div>
          <div className="text-text-muted text-xs">Total Items</div>
        </div>
        <div className="stat-card">
          <div className="font-heading text-2xl font-extrabold text-success">{data.inventario.filter(i => i.estado === 'Disponible').length}</div>
          <div className="text-text-muted text-xs">Disponibles</div>
        </div>
        <div className="stat-card">
          <div className="font-heading text-2xl font-extrabold text-warning">{data.inventario.filter(i => i.estado === 'Stock bajo').length}</div>
          <div className="text-text-muted text-xs">Stock Bajo</div>
        </div>
        <div className="stat-card">
          <div className="font-heading text-2xl font-extrabold text-danger">{data.inventario.filter(i => i.estado === 'Agotado').length}</div>
          <div className="text-text-muted text-xs">Agotados</div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border-light gap-3">
          <h2 className="font-heading text-sm font-bold">Inventario ({items.length})</h2>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm bg-surface-alt">
              <Search size={14} />
              <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar..." className="border-none outline-none text-sm bg-transparent w-40 text-text" />
            </div>
            <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)} className="px-3 py-1.5 border border-border rounded-sm text-sm bg-surface text-text-secondary cursor-pointer">
              <option value="">Todas las categorías</option>
              {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-alt">
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Material</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Categoría</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Cantidad</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Mínimo</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Ubicación</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id} className="border-b border-border-light hover:bg-surface-alt transition-colors">
                  <td className="px-3.5 py-3 text-sm font-medium">{i.nombre}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{i.categoria}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{i.cantidad} {i.unidad}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{i.minimo} {i.unidad}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{i.ubicacion}</td>
                  <td className="px-3.5 py-3"><span className={`badge ${getBadgeClass(i.estado)}`}>{i.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
