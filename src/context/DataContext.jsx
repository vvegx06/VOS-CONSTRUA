import { createContext, useContext, useState, useCallback } from 'react'
import MOCK_DATA from '../data/mockData'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [data, setData] = useState(MOCK_DATA)

  const getCitasCliente = useCallback((clienteId) => {
    return data.citas.filter(c => c.clienteId === clienteId)
  }, [data.citas])

  const agendarCita = useCallback((cita) => {
    const nuevaCita = { id: data.citas.length + 1, ...cita, estado: 'Agendada' }
    setData(prev => ({ ...prev, citas: [...prev.citas, nuevaCita] }))
    return nuevaCita
  }, [data.citas])

  const cancelarCita = useCallback((citaId, clienteId) => {
    setData(prev => ({
      ...prev,
      citas: prev.citas.map(c => c.id === citaId && c.clienteId === clienteId ? { ...c, estado: 'Cancelada' } : c)
    }))
  }, [])

  const reprogramarCita = useCallback((citaId, clienteId, nuevaFecha, nuevaHora) => {
    setData(prev => ({
      ...prev,
      citas: prev.citas.map(c => c.id === citaId && c.clienteId === clienteId && c.estado !== 'Cancelada' && c.estado !== 'Finalizada' ? { ...c, fecha: nuevaFecha, hora: nuevaHora, estado: 'Reprogramada' } : c)
    }))
  }, [])

  const getProyectosCliente = useCallback(() => {
    return data.proyectos.slice(0, 3)
  }, [data.proyectos])

  return (
    <DataContext.Provider value={{ data, getCitasCliente, agendarCita, cancelarCita, reprogramarCita, getProyectosCliente, setData }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
