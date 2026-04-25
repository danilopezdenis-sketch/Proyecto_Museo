import { redirect } from 'next/navigation'
import { getExposiciones, createExposicion, deleteExposicion } from '@/lib/actions/exposiciones'
import DeleteExposicion from './DeleteExposicion'

const BADGE = { 'Activa':'badge-success', 'Próxima':'badge-info', 'Finalizada':'badge-neutral' }

export default async function ExposicionesPage() {
  const exposiciones = await getExposiciones()

  async function actionCreate(formData) {
    'use server'
    await createExposicion(formData)
    redirect('/configuracion/exposiciones')
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Configuración — Exposiciones</h1>
        <p className="page-sub">Gestión de exposiciones temporales y permanentes</p>
      </div>
      <div className="grid-2">
        <div className="card">
          <p className="section-title">Nueva exposición</p>
          <form action={actionCreate}>
            <div className="form-group">
              <label className="form-label">Título *</label>
              <input className="form-control" name="titulo" required placeholder="Título de la exposición" />
            </div>
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" name="descripcion" rows={2} placeholder="Descripción breve..." />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Fecha inicio *</label>
                <input className="form-control" name="fecha_inicio" type="date" required />
              </div>
              <div className="form-group">
                <label className="form-label">Fecha fin</label>
                <input className="form-control" name="fecha_fin" type="date" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Estado</label>
              <select className="form-control" name="estado">
                <option value="Próxima">Próxima</option>
                <option value="Activa">Activa</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">Añadir exposición</button>
          </form>
        </div>

        <div className="card">
          <p className="section-title">Exposiciones ({exposiciones.length})</p>
          {exposiciones.length === 0 ? (
            <p className="text-muted" style={{fontSize:'14px'}}>No hay exposiciones registradas.</p>
          ) : (
            <table className="table">
              <thead><tr><th>Título</th><th>Estado</th><th>Inicio</th><th></th></tr></thead>
              <tbody>
                {exposiciones.map(exp => (
                  <tr key={exp.id}>
                    <td style={{fontWeight:500, fontSize:'13px'}}>{exp.titulo}</td>
                    <td><span className={`badge ${BADGE[exp.estado]}`}>{exp.estado}</span></td>
                    <td style={{fontSize:'12px', color:'#888'}}>{new Date(exp.fecha_inicio).toLocaleDateString('es-ES')}</td>
                    <td><DeleteExposicion id={exp.id} titulo={exp.titulo} /></td>
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
