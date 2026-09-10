import { useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '../../context/DataContext'

export default function CrmUsuarios() {
  const { data } = useData()
  const [busqueda, setBusqueda] = useState('')

  let usuarios = data.usuarios
  if (busqueda) usuarios = usuarios.filter(u => u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || u.rol.toLowerCase().includes(busqueda.toLowerCase()))

  return (
    <div>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border-light gap-3">
          <h2 className="font-heading text-sm font-bold">Usuarios del Sistema ({usuarios.length})</h2>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm bg-surface-alt">
            <Search size={14} />
            <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar..." className="border-none outline-none text-sm bg-transparent w-40 text-text" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-alt">
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Usuario</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Email</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Rol</th>
                <th className="px-3.5 py-2.5 text-left text-[11px] uppercase tracking-widest text-text-muted font-heading font-semibold">Permisos</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id} className="border-b border-border-light hover:bg-surface-alt transition-colors">
                  <td className="px-3.5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold">{u.avatar}</div>
                      <span className="text-sm font-medium">{u.nombre}</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{u.email}</td>
                  <td className="px-3.5 py-3"><span className="badge badge-info">{u.rol.replace('_', ' ')}</span></td>
                  <td className="px-3.5 py-3 text-sm text-text-secondary">{u.rol === 'Admin' ? 'Todos los módulos' : u.rol === 'Gerente_Proyectos' ? 'Dashboard, Proyectos, Tareas, Maquinaria' : u.rol === 'Especialista_RH' ? 'Dashboard, Personal, Usuarios' : u.rol === 'Especialista_Compras' ? 'Dashboard, Proveedores' : u.rol === 'Especialista_Almacen' ? 'Dashboard, Inventario' : u.rol === 'Especialista_Maquinaria' ? 'Dashboard, Maquinaria' : 'Dashboard, Tareas'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
