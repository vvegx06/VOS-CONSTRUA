import { CheckCircle2, Building2, FileText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

function formatDate(fecha) {
  if (!fecha) return '-'
  return new Date(fecha).toLocaleDateString('es-CR', { year: 'numeric', month: 'short', day: 'numeric' })
}

function getBadgeClass(estado) {
  const map = { 'Agendada': 'badge-info', 'Confirmada': 'badge-success', 'Finalizada': 'badge-success', 'Reprogramada': 'badge-warning', 'Cancelada': 'badge-secondary' }
  return map[estado] || 'badge-secondary'
}

export default function ClienteDashboard() {
  const { sesion } = useAuth()
  const { getCitasCliente, getProyectosCliente } = useData()

  const citas = getCitasCliente(sesion.id)
  const proyectos = getProyectosCliente()
  const citasActivas = citas.filter(c => c.estado !== 'Cancelada')
  const proximas = citas.filter(c => c.estado === 'Agendada' || c.estado === 'Confirmada').slice(0, 3)

  return (
    <div>
      <div className="bg-text text-white py-12 px-6 text-center rounded-b-lg mb-8">
        <h1 className="font-heading text-2xl lg:text-3xl font-extrabold">Bienvenido, {sesion?.nombre?.split(' ')[0]}</h1>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex justify-between items-center mb-3">
              <div className="w-10 h-10 bg-success-bg rounded flex items-center justify-center">
                <CheckCircle2 size={20} color="#059669" />
              </div>
            </div>
            <div className="font-heading text-2xl font-extrabold">{citasActivas.length}</div>
            <div className="text-text-muted text-xs">Citas</div>
          </div>
          <div className="stat-card">
            <div className="flex justify-between items-center mb-3">
              <div className="w-10 h-10 bg-info-bg rounded flex items-center justify-center">
                <Building2 size={20} color="#9B9B9B" />
              </div>
            </div>
            <div className="font-heading text-2xl font-extrabold">{proyectos.length}</div>
            <div className="text-text-muted text-xs">Proyectos</div>
          </div>
          <div className="stat-card">
            <div className="flex justify-between items-center mb-3">
              <div className="w-10 h-10 bg-warning-bg rounded flex items-center justify-center">
                <FileText size={20} color="#D97706" />
              </div>
            </div>
            <div className="font-heading text-2xl font-extrabold">2</div>
            <div className="text-text-muted text-xs">Documentos</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-lg p-5">
            <h3 className="font-heading text-sm font-bold mb-4">Próximas Citas</h3>
            {proximas.length > 0 ? proximas.map(c => (
              <div key={c.id} className="flex justify-between items-center py-2.5 border-b border-border-light last:border-none">
                <div>
                  <strong className="text-sm">{c.motivo}</strong>
                  <div className="text-xs text-text-muted mt-0.5">{formatDate(c.fecha)} - {c.hora}</div>
                </div>
                <span className={`badge ${getBadgeClass(c.estado)}`}>{c.estado}</span>
              </div>
            )) : <p className="text-text-muted text-sm text-center py-5">No tiene citas programadas</p>}
          </div>

          <div className="bg-surface border border-border rounded-lg p-5">
            <h3 className="font-heading text-sm font-bold mb-4">Accesos Rápidos</h3>
            <div className="flex flex-col gap-2 mt-2">
              <a href="/cliente/citas" className="btn btn-primary">Agendar Nueva Cita</a>
              <a href="/cliente/contacto" className="btn btn-secondary">Contactar Asesor</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
