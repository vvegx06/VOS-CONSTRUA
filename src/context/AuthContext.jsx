import { createContext, useContext, useState, useCallback } from 'react'
import MOCK_DATA from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => {
    const stored = localStorage.getItem('sesionActual')
    return stored ? JSON.parse(stored) : null
  })

  const loginEmpleado = useCallback((email, password) => {
    const usuario = MOCK_DATA.usuarios.find(u => u.email === email && u.password === password)
    if (usuario) {
      const s = { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol, avatar: usuario.avatar, tipo: 'empleado' }
      localStorage.setItem('sesionActual', JSON.stringify(s))
      setSesion(s)
      return { success: true, usuario: s }
    }
    return { success: false, error: 'Correo o contraseña incorrectos' }
  }, [])

  const loginCliente = useCallback((email, password) => {
    const cliente = MOCK_DATA.clientes.find(c => c.email === email && c.password === password)
    if (cliente) {
      const s = { id: cliente.id, nombre: cliente.nombre, email: cliente.email, tipo: 'cliente', empresa: cliente.empresa }
      localStorage.setItem('sesionActual', JSON.stringify(s))
      setSesion(s)
      return { success: true, cliente: s }
    }
    return { success: false, error: 'Correo o contraseña incorrectos' }
  }, [])

  const registrarCliente = useCallback((datos) => {
    const existe = MOCK_DATA.clientes.find(c => c.email === datos.email)
    if (existe) return { success: false, error: 'Este correo ya está registrado' }
    const nuevoCliente = { id: MOCK_DATA.clientes.length + 1, ...datos }
    MOCK_DATA.clientes.push(nuevoCliente)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('sesionActual')
    setSesion(null)
  }, [])

  return (
    <AuthContext.Provider value={{ sesion, loginEmpleado, loginCliente, registrarCliente, logout, setSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
