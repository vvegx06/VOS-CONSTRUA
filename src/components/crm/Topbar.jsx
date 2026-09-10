import { useAuth } from '../../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function Topbar() {
  const { sesion, logout } = useAuth()
  const location = useLocation()

  const pageTitle = location.pathname.split('/').pop() || 'Dashboard'
  const title = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)

  return (
    <header className="bg-surface border-b border-border h-14 px-4 lg:px-7 flex items-center justify-between sticky top-0 z-50 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button className="lg:hidden bg-transparent border border-border rounded-sm w-8 h-8 flex items-center justify-center text-text">
          <Menu size={16} />
        </button>
        <h1 className="font-heading text-base font-bold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-sm hover:bg-surface-hover cursor-pointer transition-all">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-[11px]">{sesion?.avatar}</div>
          <div className="leading-tight hidden sm:block">
            <div className="font-semibold text-sm text-text">{sesion?.nombre}</div>
            <div className="text-[11px] text-text-muted">{sesion?.rol?.replace('_', ' ')}</div>
          </div>
        </div>
        <button onClick={logout} className="hidden lg:inline-flex btn btn-ghost btn-sm" style={{ display: 'none' }}>Cerrar Sesión</button>
      </div>
    </header>
  )
}
