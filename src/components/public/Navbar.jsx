import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, HardHat } from 'lucide-react'

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setScrolled(current > 20)
      if (current > lastScroll && current > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScroll(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  const isHome = transparent && !scrolled

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] h-16 flex items-center justify-between px-4 lg:px-8 transition-all duration-200 ${hidden && scrolled ? '-translate-y-full' : ''} ${scrolled || !transparent ? 'bg-white/95 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className={`flex items-center gap-2.5 font-heading font-extrabold text-lg tracking-tight ${isHome ? 'text-white' : 'text-primary'}`}>
        <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
          <HardHat size={16} color="white" />
        </div>
        <span>Construa S.A.</span>
      </div>

      <div className={`flex flex-col lg:flex-row fixed lg:static top-0 ${menuOpen ? 'left-0' : '-left-full'} lg:left-auto w-[260px] lg:w-auto h-screen lg:h-auto bg-white lg:bg-transparent pt-20 lg:pt-0 shadow-xl lg:shadow-none z-50 transition-all duration-300`}>
        {['Nosotros', 'Proyectos', 'Servicios', 'Contacto'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="px-6 py-3 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-text border-b border-border-light lg:border-none lg:rounded-sm lg:px-4"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          to="/login"
          className={`btn btn-sm ${isHome ? 'bg-transparent text-white border border-white/50 hover:bg-white/15' : 'bg-primary text-white'}`}
        >
          Iniciar Sesión
        </Link>
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-text w-9 h-9 flex items-center justify-center">
        <Menu size={22} color={isHome ? 'white' : 'currentColor'} />
      </button>

      {menuOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMenuOpen(false)} />}
    </nav>
  )
}
