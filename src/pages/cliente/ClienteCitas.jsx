import { useState } from 'react'
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

export default function ClienteCitas() {
  const { sesion } = useAuth()
  const { getCitasCliente, agendarCita, cancelarCita } = useData()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ fecha: '', hora: '', motivo: '', notas: '' })

  const citas = getCitasCliente(sesion.id)

  const handleSubmit = (e) => {
    e.preventDefault()
    agendarCita({ clienteId: sesion.id, ...form, estado: 'Agendada' })
    setForm({ fecha: '', hora: '', motivo: '', notas: '' })
    setShowForm(false)
    window.location.reload()
  }

  const handleCancel = (citaId) => {
    if (confirm('¿Está seguro de cancelar esta cita?')) {
      cancelarCita(citaId, sesion.id)
      window.location.reload()
    }
  }

  return (
    <div>
      <div className="bg-text text-white py-12 px-6 text-center rounded-b-lg mb-8">
        <h1 className="font-heading text-2xl lg:text-3xl font-extrabold">Mis Citas</h1>
      </div>

      <div className="container max-w-[800px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading text-lg font-bold">Historial de Citas</h2>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancelar' : '+ Nueva Cita'}
          </button>
        </div>

        {showForm && (
          <div className="bg-surface border border-border rounded-lg p-6 mb-6 animate-fade-in-up">
            <h3 className="font-heading text-base font-bold mb-4">Agendar Nueva Cita</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Hora</label>
                  <input type="time" value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Motivo</label>
                <input type="text" value={form.motivo} onChange={e => setForm({ ...form, motivo: e.target.value })} required placeholder="Motivo de la cita" />
              </div>
              <div className="form-group">
                <label>Notas (opcional)</label>
                <textarea value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} placeholder="Notas adicionales..." />
              </div>
              <button type="submit" className="btn btn-primary">Agendar Cita</button>
            </form>
          </div>
        )}

        <div className="space-y-3">
          {citas.length === 0 ? (
            <p className="text-text-muted text-center py-10">No tiene citas registradas</p>
          ) : citas.map(c => (
            <div key={c.id} className="bg-surface border border-border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <strong className="text-sm">{c.motivo}</strong>
                <div className="text-xs text-text-muted mt-0.5">{formatDate(c.fecha)} - {c.hora}</div>
                {c.notas && <div className="text-xs text-text-muted mt-1 italic">{c.notas}</div>}
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${getBadgeClass(c.estado)}`}>{c.estado}</span>
                {(c.estado === 'Agendada' || c.estado === 'Confirmada' || c.estado === 'Reprogramada') && (
                  <button onClick={() => handleCancel(c.id)} className="btn btn-ghost btn-sm text-danger">Cancelar</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
