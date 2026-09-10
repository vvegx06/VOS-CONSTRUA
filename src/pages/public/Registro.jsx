import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', telefono: '', empresa: '' })
  const { registrarCliente } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = registrarCliente(form)
    if (result.success) {
      alert('Registro exitoso. Ahora puede iniciar sesión.')
      navigate('/login')
    } else {
      alert(result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt p-6">
      <div className="w-full max-w-[420px] bg-surface p-9 rounded-lg shadow-lg border border-border animate-fade-in-up">
        <h2 className="font-heading text-2xl font-extrabold mb-1">Registro de Cliente</h2>
        <p className="text-text-muted mb-8 text-sm">Cree su cuenta para acceder al portal de clientes</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Su nombre" />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="correo@ejemplo.com" />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Mínimo 6 caracteres" />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+506 0000-0000" />
          </div>
          <div className="form-group">
            <label>Empresa</label>
            <input type="text" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de su empresa" />
          </div>
          <button type="submit" className="btn btn-primary w-full py-3 text-sm">Registrarse</button>
        </form>

        <div className="text-center mt-5 text-sm text-text-muted">
          <p>¿Ya tiene cuenta? <Link to="/login" className="text-primary font-semibold">Iniciar sesión</Link></p>
          <p className="mt-3"><Link to="/" className="text-text-muted hover:text-primary">&larr; Volver al sitio web</Link></p>
        </div>
      </div>
    </div>
  )
}
