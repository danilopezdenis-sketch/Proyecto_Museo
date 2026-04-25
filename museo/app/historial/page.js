import Link from 'next/link'
import { getEventos } from '@/lib/actions/historial'
import DeleteEvento from './DeleteEvento'

const TIPOS = {
  restauracion: { label: 'Restauración', cls: 'badge-warning' },
  prestamo:     { label: 'Préstamo',     cls: 'badge-info'    },
  traslado:     { label: 'Traslado',     cls: 'badge-neutral' },
  inspeccion:   { label: 'Inspección',   cls: 'badge-success' },
}

export default async function HistorialPage({ searchParams }) {
  const p = await searchParams
  const filtros = {}
  if (p.tipo_evento) filtros.tipo_evento = p.tipo_evento
  const eventos = await getEventos(filtros)

  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Historial de eventos</h1>
          <p className="page-sub">{eventos.length} evento{eventos.length !== 1 ? 's' : ''} registrado{eventos.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/historial/nuevo" className="btn btn-primary">+ Nuevo evento</Link>
      </div>

      <form className="filters-bar" method="GET">
        <select className="filter-select" name="tipo_evento" defaultValue={p.tipo_evento || ''}>
          <option value="">Todos los tipos</option>
          <option value="restauracion">Restauración</option>
          <option value="prestamo">Préstamo</option>
          <option value="traslado">Traslado</option>
          <option value="inspeccion">Inspección</option>
        </select>
        <button className="btn" type="submit">Filtrar</button>
        <Link href="/historial" className="btn">Limpiar</Link>
      </form>

      <div className="card">
        {eventos.length === 0 ? (
          <div className="empty-state">No hay eventos registrados.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>ID Obra</th>
                <th>Descripción</th>
                <th>Responsable</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map(ev => {
                const tipo = TIPOS[ev.tipo_evento] || { label: ev.tipo_evento, cls: 'badge-neutral' }
                const fecha = new Date(ev.fecha).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' })
                return (
                  <tr key={ev._id}>
                    <td><span className={`badge ${tipo.cls}`}>{tipo.label}</span></td>
                    <td><Link href={`/obras/${ev.id_obra_mysql}`} className="link">#{ev.id_obra_mysql}</Link></td>
                    <td style={{fontSize:'13px', maxWidth:'260px'}}>{ev.descripcion}</td>
                    <td style={{fontSize:'13px'}}>{ev.responsable}</td>
                    <td style={{fontSize:'13px', color:'#888'}}>{fecha}</td>
                    <td><DeleteEvento id={ev._id} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
