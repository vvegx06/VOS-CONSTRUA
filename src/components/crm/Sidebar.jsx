import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ROLES_PERMISOS, MODULOS_INFO } from '../../data/mockData'
import { LayoutDashboard, Building2, ListChecks, Users, Truck, Package, Construction, Bot, UserCog, BarChart3, LogOut, HardHat } from 'lucide-react'

const ICONOS = {
  dashboard: LayoutDashboard,
  proyectos: Building2,
  tareas: ListChecks,
  personal: Users,
  proveedores: Truck,
  inventario: Package,
  maquinaria: Construction,
  asistente: Bot,
  usuarios: UserCog,
  reportes: BarChart3,
}

export default function Sidebar() {
  const { sesion, logout } = useAuth()
  const location = useLocation()
  const permisos = ROLES_PERMISOS[sesion?.rol] || []

  return (
    <aside className="w-[255px] bg-text text-white fixed top-0 left-0 bottom-0 z-50 flex flex-col transition-all">
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
          <HardHat size={16} color="white" />
        </div>
        <span className="font-heading text-sm font-bold tracking-tight">Construa S.A.</span>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="px-5 pt-4 pb-1.5 text-[10px] uppercase tracking-widest text-white/35 font-bold">Menú</div>
        {permisos.map(modulo => {
          const info = MODULOS_INFO[modulo]
          if (!info) return null
          const activa = location.pathname === info.pagina
          const Icono = ICONOS[info.icono]
          return (
            <Link
              key={modulo}
              to={info.pagina}
              className={`flex items-center gap-2.5 px-5 py-2 text-sm transition-all border-l-2 mx-0.5 ${activa ? 'bg-primary/15 text-white border-primary' : 'text-white/60 border-transparent hover:bg-white/5 hover:text-white/90'}`}
            >
              {Icono && <Icono size={16} className="flex-shrink-0" />}
              <span>{info.titulo}</span>
            </Link>
          )
        })}

        <div className="flex-1" />
        <div className="px-5 pt-4 pb-1.5 text-[10px] uppercase tracking-widest text-white/35 font-bold">Cuenta</div>
        <button
          onClick={logout}
          className="flex items-center gap-2.5 px-5 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white/90 w-full text-left border-l-2 border-transparent transition-all"
        >
          <LogOut size={16} className="flex-shrink-0" />
          <span>Cerrar Sesión</span>
        </button>
      </nav>

      <div className="px-5 py-3 border-t border-white/10 text-[11px] text-white/30">© 2026 CONSTRUA S.A.</div>
    </aside>
  )
}
