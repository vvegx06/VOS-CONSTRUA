import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, User, Briefcase, HardHat } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [tipo, setTipo] = useState('cliente')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginCliente, loginEmpleado } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    let result
    if (tipo === 'cliente') {
      result = loginCliente(email, password)
      if (result.success) { navigate('/cliente/dashboard'); return }
    } else {
      result = loginEmpleado(email, password)
      if (result.success) { navigate('/crm/dashboard'); return }
    }
    alert(result.error)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 bg-gradient-to-br from-text to-slate-800 flex items-center justify-center text-white p-10">
        <div className="max-w-[360px] animate-fade-in-up">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <HardHat size={24} color="white" />
            </div>
          </div>
          <h1 className="font-heading text-3xl font-extrabold mb-3">Construa S.A.</h1>
          <p className="opacity-60 mb-7 leading-relaxed text-sm">Acceda al sistema para gestionar proyectos, citas, inventario y más.</p>
          <div className="space-y-3.5">
            {['Gestión completa de proyectos y citas', 'Comunicación directa con el equipo', 'Acceso seguro y en tiempo real'].map(t => (
              <div key={t} className="flex items-center gap-3 text-white/70 text-sm">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check size={16} color="white" />
                </div>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-10 bg-surface-alt">
        <div className="w-full max-w-[420px] bg-surface p-9 rounded-lg shadow-lg border border-border animate-fade-in-up">
          <h2 className="font-heading text-2xl font-extrabold mb-1">Bienvenido</h2>
          <p className="text-text-muted mb-8 text-sm">Seleccione cómo desea acceder al sistema</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {['cliente', 'empleado'].map(t => (
              <button
                key={t}
                onClick={() => setTipo(t)}
                className={`relative p-7 border-2 rounded-lg cursor-pointer transition-all text-center bg-surface ${tipo === t ? 'border-primary bg-gradient-to-br from-red-50 to-red-100 shadow-md' : 'border-border hover:border-primary hover:-translate-y-0.5 hover:shadow-lg'}`}
              >
                {tipo === t && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check size={12} color="white" strokeWidth={3} />
                  </div>
                )}
                <div className={`w-14 h-14 mx-auto mb-3.5 rounded-full flex items-center justify-center ${tipo === t ? 'bg-primary' : 'bg-primary-light'}`}>
                  {t === 'cliente'
                    ? <User size={24} color={tipo === t ? 'white' : '#B91C1C'} />
                    : <Briefcase size={24} color={tipo === t ? 'white' : '#B91C1C'} />
                  }
                </div>
                <h3 className="font-heading text-base font-bold capitalize">{t}</h3>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted uppercase tracking-widest font-semibold">Ingrese sus credenciales</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="correo@ejemplo.com" />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Ingrese su contraseña" />
            </div>
            <button type="submit" className="btn btn-primary w-full py-3 text-sm">Iniciar Sesión</button>
          </form>

          <div className="text-center mt-5 text-sm text-text-muted">
            <p>¿No tiene cuenta? {tipo === 'cliente' && <Link to="/registro" className="text-primary font-semibold">Registrarse como cliente</Link>}</p>
            <p className="mt-3"><Link to="/" className="text-text-muted hover:text-primary">&larr; Volver al sitio web</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
