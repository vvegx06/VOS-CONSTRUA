import { Outlet } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { LayoutDashboard, CalendarDays, Phone, LogOut, Menu, HardHat } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ChatbotWidget from '../components/public/Chatbot'

const menuLinks = [
  { to: '/cliente/dashboard', label: 'Mi Panel', icon: LayoutDashboard },
  { to: '/cliente/citas', label: 'Mis Citas', icon: CalendarDays },
  { to: '/cliente/contacto', label: 'Contacto', icon: Phone },
]

export default function ClienteLayout() {
  const { sesion, logout } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-surface border-b border-border h-16 px-4 lg:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2.5 font-heading font-extrabold text-lg text-primary tracking-tight">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <HardHat size={16} color="white" />
          </div>
          <span>Construa S.A.</span>
        </div>

        <div className={`flex flex-col fixed top-0 left-0 w-[260px] h-screen bg-surface border-r border-border pt-16 gap-0 shadow-xl z-50 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 lg:flex-row lg:w-auto lg:h-auto lg:border-none lg:shadow-none lg:pt-0`}>
          {menuLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-5 py-3 text-sm flex items-center gap-3 border-b border-border-light lg:border-b-0 lg:rounded-sm transition-all ${location.pathname === link.to ? 'bg-primary/5 text-primary font-semibold border-l-3 border-primary' : 'text-text-secondary hover:bg-surface-hover hover:text-text'}`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
          <div className="mt-auto border-t border-border pt-2 lg:hidden">
            <button onClick={logout} className="px-5 py-3 text-sm text-text-muted flex items-center gap-3 w-full hover:bg-surface-hover">
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-text-secondary hidden sm:block">{sesion?.nombre}</span>
          <button onClick={logout} className="btn btn-ghost btn-sm hidden lg:inline-flex">Cerrar Sesión</button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden bg-surface border border-border rounded-sm w-9 h-9 flex items-center justify-center text-text">
          <Menu size={18} />
        </button>
      </nav>

      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" style={{ display: menuOpen ? 'block' : 'none' }} onClick={() => setMenuOpen(false)} />

      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
      <ChatbotWidget portal="cliente" />
    </div>
  )
}
