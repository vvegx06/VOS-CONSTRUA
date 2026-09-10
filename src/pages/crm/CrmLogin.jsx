import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function CrmLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginEmpleado } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = loginEmpleado(email, password)
    if (result.success) {
      navigate('/crm/dashboard')
    } else {
      alert(result.error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 bg-gradient-to-br from-text to-slate-800 flex items-center justify-center text-white p-10">
        <div className="max-w-[360px] animate-fade-in-up">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-extrabold text-sm">CS</div>
            <span className="font-heading font-extrabold text-xl">Construa S.A.</span>
          </div>
          <h1 className="font-heading text-3xl font-extrabold mb-3">Sistema de Gestión Interna</h1>
          <p className="opacity-60 leading-relaxed text-sm">Acceda para administrar proyectos, personal, inventario, maquinaria y más.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-10 bg-surface-alt">
        <div className="w-full max-w-[380px] bg-surface p-9 rounded-lg shadow-lg border border-border animate-fade-in-up">
          <h2 className="font-heading text-2xl font-extrabold mb-1">Iniciar Sesión</h2>
          <p className="text-text-muted mb-7 text-sm">CRM / Panel de Empleados</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="correo@construa.com" />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary w-full py-3 text-sm">Ingresar</button>
          </form>

          <div className="text-center mt-5 text-sm text-text-muted">
            <p><Link to="/" className="hover:text-primary">← Volver al sitio</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
