import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSalas, createSala, updateSala, deleteSala } from '@/lib/actions/salas'
import DeleteSala from './DeleteSala'

const ESTADO_BADGE = { 'Abierta':'badge-success', 'Cerrada':'badge-neutral', 'En Reforma':'badge-warning' }

export default async function SalasPage() {
  const salas = await getSalas()

  async function actionCreate(formData) {
    'use server'
    await createSala(formData)
    redirect('/configuracion/salas')
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Configuración — Salas</h1>
        <p className="page-sub">Gestión de las salas del museo</p>
      </div>
      <div className="grid-2">
        <div className="card">
          <p className="section-title">Nueva sala</p>
          <form action={actionCreate}>
            <div className="form-group">
              <label className="form-label">Nombre *</label>
              <input className="form-control" name="nombre" required placeholder="Nombre de la sala" />
            </div>
            <div className="form-group">
              <label className="form-label">Planta *</label>
              <input className="form-control" name="planta" required placeholder="ej. Planta 1" />
            </div>
            <div className="form-group">
              <label className="form-label">Capacidad de obras</label>
              <input className="form-control" name="capacidad_obras" type="number" min="0" defaultValue={20} />
            </div>
            <div className="form-group">
              <label className="form-label">Estado</label>
              <select className="form-control" name="estado">
                <option value="Abierta">Abierta</option>
                <option value="Cerrada">Cerrada</option>
                <option value="En Reforma">En Reforma</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">Añadir sala</button>
          </form>
        </div>

        <div className="card">
          <p className="section-title">Salas registradas ({salas.length})</p>
          {salas.length === 0 ? (
            <p className="text-muted" style={{fontSize:'14px'}}>No hay salas registradas.</p>
          ) : (
            <table className="table">
              <thead><tr><th>Nombre</th><th>Planta</th><th>Estado</th><th></th></tr></thead>
              <tbody>
                {salas.map(sala => (
                  <tr key={sala.id}>
                    <td style={{fontWeight:500, fontSize:'14px'}}>{sala.nombre}</td>
                    <td style={{fontSize:'13px', color:'#888'}}>{sala.planta}</td>
                    <td><span className={`badge ${ESTADO_BADGE[sala.estado]}`}>{sala.estado}</span></td>
                    <td><DeleteSala id={sala.id} nombre={sala.nombre} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
