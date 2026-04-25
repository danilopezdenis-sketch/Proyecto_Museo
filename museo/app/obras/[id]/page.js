import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getObraById } from '@/lib/actions/obras'
import { getEventos } from '@/lib/actions/historial'

const BADGE = {
  'Expuesta':        'badge-success',
  'En Depósito':     'badge-neutral',
  'En Restauración': 'badge-warning',
  'Prestada':        'badge-info',
}

export default async function ObraPage({ params }) {
  const { id } = await params
  const [obra, todosEventos] = await Promise.all([
    getObraById(id),
    getEventos({ id_obra_mysql: id }),
  ])
  if (!obra) notFound()

  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <Link href="/obras" className="link" style={{fontSize:'13px'}}>← Volver a obras</Link>
          <h1 className="page-title" style={{marginTop:'4px'}}>{obra.titulo}</h1>
          <p className="page-sub">{obra.anio_creacion || 'Fecha desconocida'} · {obra.tecnica || 'Técnica desconocida'}</p>
        </div>
        <Link href={`/obras/editar/${obra.id}`} className="btn">Editar</Link>
      </div>

      <div className="grid-2">
        <div>
          {obra.imagen_url && (
            <div className="card mb-2" style={{padding:'0', overflow:'hidden'}}>
              <img
                src={obra.imagen_url}
                alt={obra.titulo}
                style={{width:'100%', maxHeight:'340px', objectFit:'cover', display:'block'}}
              />
            </div>
          )}
          <div className="card mb-2">
            <p className="section-title">Información general</p>
            <table className="table">
              <tbody>
                <tr><td className="text-muted" style={{width:'40%'}}>Estado</td>
                    <td><span className={`badge ${BADGE[obra.estado]}`}>{obra.estado}</span></td></tr>
                <tr><td className="text-muted">Artista</td>
                    <td>{obra.artista
                      ? <Link href={`/artistas/${obra.artista.id}`} className="link">{obra.artista.nombre}</Link>
                      : '—'}</td></tr>
                <tr><td className="text-muted">Sala</td>
                    <td>{obra.sala?.nombre || '—'}</td></tr>
                <tr><td className="text-muted">Exposición</td>
                    <td>{obra.exposicion
                      ? <Link href="/configuracion/exposiciones" className="link">{obra.exposicion.titulo}</Link>
                      : '—'}</td></tr>
                <tr><td className="text-muted">Año de creación</td>
                    <td>{obra.anio_creacion || '—'}</td></tr>
                <tr><td className="text-muted">Técnica</td>
                    <td>{obra.tecnica || '—'}</td></tr>
                <tr><td className="text-muted">Dimensiones</td>
                    <td>{obra.dimensiones || '—'}</td></tr>
                <tr><td className="text-muted">Adquirida</td>
                    <td>{obra.fecha_adquisicion
                      ? new Date(obra.fecha_adquisicion).toLocaleDateString('es-ES')
                      : '—'}</td></tr>
              </tbody>
            </table>
          </div>
          {obra.descripcion && (
            <div className="card">
              <p className="section-title">Descripción</p>
              <p style={{fontSize:'14px', lineHeight:'1.7', color:'#444'}}>{obra.descripcion}</p>
            </div>
          )}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="section-title" style={{margin:0}}>Historial de eventos</p>
            <Link href={`/historial/nuevo?obra=${obra.id}`} className="btn btn-sm">+ Añadir evento</Link>
          </div>
          {todosEventos.length === 0 ? (
            <p className="text-muted" style={{fontSize:'14px'}}>No hay eventos registrados para esta obra.</p>
          ) : (
            todosEventos.map(ev => {
              const fecha = new Date(ev.fecha).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' })
              const tipos = { restauracion:'badge-warning', prestamo:'badge-info', traslado:'badge-neutral', inspeccion:'badge-success' }
              return (
                <div key={ev._id} style={{borderBottom:'1px solid #f0f0eb', paddingBottom:'12px', marginBottom:'12px'}}>
                  <div className="flex items-center justify-between">
                    <span className={`badge ${tipos[ev.tipo_evento] || 'badge-neutral'}`}>{ev.tipo_evento}</span>
                    <span style={{fontSize:'12px', color:'#888'}}>{fecha}</span>
                  </div>
                  <p style={{fontSize:'13px', marginTop:'6px'}}>{ev.descripcion}</p>
                  <p style={{fontSize:'12px', color:'#888', marginTop:'3px'}}>Por: {ev.responsable}</p>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}