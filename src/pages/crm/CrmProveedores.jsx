import { useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '../../context/DataContext'

export default function CrmProveedores() {
  const { data } = useData()
  const [busqueda, setBusqueda] = useState('')

  let proveedores = data.proveedores
  if (busqueda) proveedores = proveedores.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  return (
    <div>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border-light gap-3">
          <h2 className="font-heading text-sm font-bold">Proveedores ({proveedores.length})</h2>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm bg-surface-alt">
            <Search size={14} />
            <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar..." className="border-none outline-none text-sm bg-transparent w-40 text-text" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-alt">
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Proveedor</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Contacto</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Categoría</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Calificación</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map(p => (
                <tr key={p.id} className="border-b border-border-light hover:bg-surface-alt transition-colors">
                  <td className="px-3.5 py-3 text-sm font-medium">{p.nombre}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{p.contacto}<br /><span className="text-xs text-text-muted">{p.email}</span></td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{p.categoria}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{'★'.repeat(Math.floor(p.calificacion))}{'☆'.repeat(5 - Math.floor(p.calificacion))} ({p.calificacion})</td>
                  <td className="px-3.5 py-3"><span className="badge badge-success">{p.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
