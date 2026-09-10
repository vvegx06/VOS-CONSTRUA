import { useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '../../context/DataContext'

export default function CrmPersonal() {
  const { data } = useData()
  const [busqueda, setBusqueda] = useState('')
  const [filtroDepto, setFiltroDepto] = useState('')

  let empleados = data.empleados
  if (filtroDepto) empleados = empleados.filter(e => e.departamento === filtroDepto)
  if (busqueda) empleados = empleados.filter(e => e.nombre.toLowerCase().includes(busqueda.toLowerCase()) || e.cargo.toLowerCase().includes(busqueda.toLowerCase()))

  const departamentos = [...new Set(data.empleados.map(e => e.departamento))]

  return (
    <div>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border-light gap-3">
          <h2 className="font-heading text-sm font-bold">Personal ({empleados.length})</h2>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm bg-surface-alt">
              <Search size={14} />
              <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar..." className="border-none outline-none text-sm bg-transparent w-40 text-text" />
            </div>
            <select value={filtroDepto} onChange={e => setFiltroDepto(e.target.value)} className="px-3 py-1.5 border border-border rounded-sm text-sm bg-surface text-text-secondary cursor-pointer">
              <option value="">Todos los departamentos</option>
              {departamentos.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-alt">
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Nombre</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Cargo</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Departamento</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Email</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map(e => (
                <tr key={e.id} className="border-b border-border-light hover:bg-surface-alt transition-colors">
                  <td className="px-3.5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold">{e.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                      <span className="text-sm font-medium">{e.nombre}</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{e.cargo}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{e.departamento}</td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{e.email}</td>
                  <td className="px-3.5 py-3"><span className={`badge badge-success`}>{e.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
