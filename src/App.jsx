import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/public/Home'
import Contacto from './pages/public/Contacto'
import Login from './pages/public/Login'
import Registro from './pages/public/Registro'
import CrmLogin from './pages/crm/CrmLogin'
import CrmDashboard from './pages/crm/CrmDashboard'
import CrmProyectos from './pages/crm/CrmProyectos'
import CrmTareas from './pages/crm/CrmTareas'
import CrmPersonal from './pages/crm/CrmPersonal'
import CrmProveedores from './pages/crm/CrmProveedores'
import CrmInventario from './pages/crm/CrmInventario'
import CrmMaquinaria from './pages/crm/CrmMaquinaria'
import CrmAsistente from './pages/crm/CrmAsistente'
import CrmUsuarios from './pages/crm/CrmUsuarios'
import ClienteDashboard from './pages/cliente/ClienteDashboard'
import ClienteCitas from './pages/cliente/ClienteCitas'
import ClienteContacto from './pages/cliente/ClienteContacto'
import ClienteChat from './pages/cliente/ClienteChat'
import CrmLayout from './layouts/CrmLayout'
import ClienteLayout from './layouts/ClienteLayout'
import { useAuth } from './context/AuthContext'

function RequireAuth({ children, tipo }) {
  const { sesion } = useAuth()
  if (!sesion) return <Navigate to="/login" replace />
  if (sesion.tipo !== tipo) return <Navigate to="/login" replace />
  return children
}

function RequireEmpleado({ children }) {
  const { sesion } = useAuth()
  if (!sesion || sesion.tipo !== 'empleado') return <Navigate to="/crm/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route path="/crm/login" element={<CrmLogin />} />
      <Route path="/crm/*" element={<RequireEmpleado><CrmLayout /></RequireEmpleado>}>
        <Route path="dashboard" element={<CrmDashboard />} />
        <Route path="proyectos" element={<CrmProyectos />} />
        <Route path="tareas" element={<CrmTareas />} />
        <Route path="personal" element={<CrmPersonal />} />
        <Route path="proveedores" element={<CrmProveedores />} />
        <Route path="inventario" element={<CrmInventario />} />
        <Route path="maquinaria" element={<CrmMaquinaria />} />
        <Route path="asistente" element={<CrmAsistente />} />
        <Route path="usuarios" element={<CrmUsuarios />} />
      </Route>

      <Route path="/cliente/*" element={<RequireAuth tipo="cliente"><ClienteLayout /></RequireAuth>}>
        <Route path="dashboard" element={<ClienteDashboard />} />
        <Route path="citas" element={<ClienteCitas />} />
        <Route path="contacto" element={<ClienteContacto />} />
        <Route path="chat" element={<ClienteChat />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
