import Link from 'next/link'
import { getObras } from '@/lib/actions/obras'
import { getArtistas } from '@/lib/actions/artistas'
import { getEventos } from '@/lib/actions/historial'

export default async function Dashboard() {
  const [obras, artistas, eventos] = await Promise.all([
    getObras(), getArtistas(), getEventos(),
  ])

  const totalObras     = obras.length
  const totalArtistas  = artistas.length
  const enRestauracion = obras.filter(o => o.estado === 'En Restauración')
  const prestadas      = obras.filter(o => o.estado === 'Prestada')
  const expuestas      = obras.filter(o => o.estado === 'Expuesta').length
  const enDeposito     = obras.filter(o => o.estado === 'En Depósito').length
  const ultimosEventos = eventos.slice(0, 5)

  const etiquetaTipo = {
    restauracion: { label: 'Restauración', cls: 'badge-warning' },
    prestamo:     { label: 'Préstamo',     cls: 'badge-info'    },
    traslado:     { label: 'Traslado',     cls: 'badge-neutral' },
    inspeccion:   { label: 'Inspección',   cls: 'badge-success' },
  }

  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Panel general</h1>
          <p className="page-sub">Resumen del estado de la colección</p>
        </div>
        <Link href="/obras/nueva" className="btn btn-primary">+ Nueva obra</Link>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total obras</div>
          <div className="stat-value">{totalObras}</div>
          <div className="stat-sub">{expuestas} expuestas</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Artistas</div>
          <div className="stat-value">{totalArtistas}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">En depósito</div>
          <div className="stat-value text-muted">{enDeposito}</div>
          <div className="stat-sub">no expuestas</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">En restauración</div>
          <div className="stat-value text-warning">{enRestauracion.length}</div>
          {enRestauracion.length > 0 && <div className="stat-sub">requieren atención</div>}
        </div>
        <div className="stat-card">
          <div className="stat-label">Prestadas</div>
          <div className="stat-value text-info">{prestadas.length}</div>
          <div className="stat-sub">fuera del museo</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Eventos registrados</div>
          <div className="stat-value">{eventos.length}</div>
          <div className="stat-sub">en historial</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="section-title" style={{margin:0}}>Alertas activas</p>
            {(enRestauracion.length + prestadas.length) === 0 && (
              <span className="badge badge-success">Todo en orden</span>
            )}
          </div>
          {enRestauracion.length === 0 && prestadas.length === 0 && (
            <p className="text-muted" style={{fontSize:'14px'}}>No hay alertas pendientes.</p>
          )}
          {enRestauracion.slice(0,4).map(obra => (
            <div key={obra.id} className="alert bg-warning-soft">
              <span className="alert-icon">⚠</span>
              <div>
                <span className="text-warning" style={{fontWeight:500}}>En restauración — </span>
                <Link href={`/obras/${obra.id}`} className="link">{obra.titulo}</Link>
                {obra.artista && <span className="text-muted"> · {obra.artista.nombre}</span>}
              </div>
            </div>
          ))}
          {prestadas.slice(0,3).map(obra => (
            <div key={obra.id} className="alert bg-info-soft">
              <span className="alert-icon">↗</span>
              <div>
                <span className="text-info" style={{fontWeight:500}}>Prestada — </span>
                <Link href={`/obras/${obra.id}`} className="link">{obra.titulo}</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="section-title" style={{margin:0}}>Últimos eventos</p>
            <Link href="/historial" className="link" style={{fontSize:'13px'}}>Ver todos →</Link>
          </div>
          {ultimosEventos.length === 0 ? (
            <p className="text-muted" style={{fontSize:'14px'}}>No hay eventos registrados.</p>
          ) : (
            <table className="table">
              <thead><tr><th>Tipo</th><th>Responsable</th><th>Fecha</th></tr></thead>
              <tbody>
                {ultimosEventos.map(ev => {
                  const meta = etiquetaTipo[ev.tipo_evento] || { label: ev.tipo_evento, cls: 'badge-neutral' }
                  const fecha = new Date(ev.fecha).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' })
                  return (
                    <tr key={ev._id}>
                      <td><span className={`badge ${meta.cls}`}>{meta.label}</span></td>
                      <td style={{fontSize:'13px'}}>{ev.responsable}</td>
                      <td style={{fontSize:'13px', color:'#888'}}>{fecha}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
          <div className="mt-2">
            <Link href="/historial/nuevo" className="btn btn-sm">+ Registrar evento</Link>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <p className="section-title">Distribución por estado</p>
        <div style={{display:'flex', gap:'1.5rem', flexWrap:'wrap'}}>
          {[
            { label:'Expuestas',       value: expuestas,             cls:'badge-success' },
            { label:'En depósito',     value: enDeposito,            cls:'badge-neutral' },
            { label:'En restauración', value: enRestauracion.length, cls:'badge-warning' },
            { label:'Prestadas',       value: prestadas.length,      cls:'badge-info'    },
          ].map(item => (
            <div key={item.label} style={{display:'flex', alignItems:'center', gap:'8px'}}>
              <span className={`badge ${item.cls}`}>{item.label}</span>
              <span style={{fontWeight:600, fontSize:'16px'}}>{item.value}</span>
              <span className="text-muted" style={{fontSize:'13px'}}>
                ({totalObras > 0 ? Math.round((item.value / totalObras) * 100) : 0}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
