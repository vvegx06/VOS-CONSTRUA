import { Building2, CheckCircle2, Users, Wrench } from 'lucide-react'
import { useData } from '../../context/DataContext'

function getBadgeClass(estado) {
  const map = {
    'Activo': 'badge-success', 'Disponible': 'badge-success', 'Finalizado': 'badge-success', 'Finalizada': 'badge-success',
    'Completada': 'badge-success', 'Aprobada': 'badge-success', 'Recibida': 'badge-success', 'Confirmada': 'badge-success',
    'En ejecución': 'badge-info', 'En progreso': 'badge-info', 'En revisión': 'badge-info', 'Asignada': 'badge-info',
    'Enviada al proveedor': 'badge-info', 'Agendada': 'badge-info',
    'Pendiente': 'badge-warning', 'Pendiente de aprobación': 'badge-warning', 'En planificación': 'badge-warning',
    'Borrador': 'badge-warning', 'Stock bajo': 'badge-warning', 'Reprogramada': 'badge-warning',
    'En mantenimiento preventivo': 'badge-warning', 'En mantenimiento correctivo': 'badge-warning',
    'Suspendido': 'badge-secondary', 'Cancelado': 'badge-secondary', 'Cancelada': 'badge-secondary',
    'Inactivo': 'badge-secondary', 'Fuera de servicio': 'badge-danger',
    'Agotado': 'badge-danger'
  }
  return map[estado] || 'badge-secondary'
}

function formatCurrency(num) {
  return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', minimumFractionDigits: 0 }).format(num)
}

export default function CrmDashboard() {
  const { data } = useData()
  const proyectos = data.proyectos
  const proyectosActivos = proyectos.filter(p => p.estado === 'En ejecución')

  const estados = {}
  proyectos.forEach(p => { estados[p.estado] = (estados[p.estado] || 0) + 1 })

  const presTotal = proyectos.reduce((s, p) => s + p.presupuesto, 0)
  const presActivos = proyectos.filter(p => p.estado === 'En ejecución').reduce((s, p) => s + p.presupuesto, 0)

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex justify-between items-center mb-3">
            <div className="w-10 h-10 bg-danger-bg rounded flex items-center justify-center">
              <Building2 size={20} color="#DC2626" />
            </div>
          </div>
          <div className="font-heading text-2xl font-extrabold text-text">{proyectos.length}</div>
          <div className="text-text-muted text-xs mt-0.5">Proyectos Totales</div>
        </div>
        <div className="stat-card">
          <div className="flex justify-between items-center mb-3">
            <div className="w-10 h-10 bg-success-bg rounded flex items-center justify-center">
              <CheckCircle2 size={20} color="#059669" />
            </div>
          </div>
          <div className="font-heading text-2xl font-extrabold text-text">{proyectosActivos.length}</div>
          <div className="text-text-muted text-xs mt-0.5">En Ejecución</div>
        </div>
        <div className="stat-card">
          <div className="flex justify-between items-center mb-3">
            <div className="w-10 h-10 bg-warning-bg rounded flex items-center justify-center">
              <Users size={20} color="#D97706" />
            </div>
          </div>
          <div className="font-heading text-2xl font-extrabold text-text">{data.empleados.length}</div>
          <div className="text-text-muted text-xs mt--0.5">Empleados Activos</div>
        </div>
        <div className="stat-card">
          <div className="flex justify-between items-center mb-3">
            <div className="w-10 h-10 bg-info-bg rounded flex items-center justify-center">
              <Wrench size={20} color="#9B9B9B" />
            </div>
          </div>
          <div className="font-heading text-2xl font-extrabold text-text">{data.maquinaria.length}</div>
          <div className="text-text-muted text-xs mt-0.5">Unidades de Maquinaria</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-lg p-5">
          <h3 className="font-heading text-sm font-bold mb-4">Proyectos por Estado</h3>
          <div className="flex items-end gap-5 h-[180px] px-4">
            {Object.entries(estados).map(([estado, count]) => {
              const maxVal = Math.max(...Object.values(estados))
              const height = (count / maxVal) * 140
              const colors = { 'En ejecución': '#9B9B9B', 'Finalizado': '#059669', 'En planificación': '#D97706', 'Pendiente': '#D97706', 'Suspendido': '#9B9B9B' }
              return (
                <div key={estado} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-sm font-bold">{count}</span>
                  <div className="w-10 rounded-t transition-all" style={{ backgroundColor: colors[estado] || '#999', height: `${height}px` }} />
                  <span className="text-[10px] text-text-muted text-center leading-tight">{estado}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-5">
          <h3 className="font-heading text-sm font-bold mb-4">Actividad Reciente</h3>
          <div className="space-y-3 mt-2">
            {[
              { text: 'Nueva orden de compra OC-2026-003', time: 'Hace 2 horas', color: 'bg-primary' },
              { text: 'Tarea completada: Estudio de suelos', time: 'Hace 5 horas', color: 'bg-success' },
              { text: 'Stock bajo: Grava 3/4"', time: 'Ayer', color: 'bg-warning' },
              { text: 'Mantenimiento programado: Cargador 950K', time: 'Hace 2 días', color: 'bg-text-muted' },
            ].map((a, i) => (
              <div key={i} className="p-3 bg-surface-alt rounded-lg border-l-[3px]" style={{ borderLeftColor: a.color === 'bg-primary' ? '#B91C1C' : a.color === 'bg-success' ? '#059669' : a.color === 'bg-warning' ? '#D97706' : '#9B9B9B' }}>
                <strong className="text-sm">{a.text}</strong>
                <div className="text-xs text-text-muted mt-1">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-5">
        <h3 className="font-heading text-sm font-bold mb-4">Proyectos Activos</h3>
        {proyectosActivos.map(p => (
          <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3.5 border-b border-border-light last:border-none gap-3">
            <div>
              <strong className="text-sm">{p.nombre}</strong>
              <div className="text-sm text-text-muted">{p.ubicacion} - {p.cliente}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[120px]">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${p.progreso}%` }} />
                </div>
                <div className="text-[11px] text-text-muted mt-1 text-right">{p.progreso}%</div>
              </div>
              <span className={`badge ${getBadgeClass(p.estado)}`}>{p.estado}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
