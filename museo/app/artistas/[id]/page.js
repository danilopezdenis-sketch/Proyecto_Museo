import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArtistaById } from '@/lib/actions/artistas'

const BADGE = {
  'Expuesta':        'badge-success',
  'En Depósito':     'badge-neutral',
  'En Restauración': 'badge-warning',
  'Prestada':        'badge-info',
}

export default async function ArtistaPage({ params }) {
  const { id } = await params
  const artista = await getArtistaById(id)
  if (!artista) notFound()

  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <Link href="/artistas" className="link" style={{fontSize:'13px'}}>← Volver a artistas</Link>
          <h1 className="page-title" style={{marginTop:'4px'}}>{artista.nombre}</h1>
          <p className="page-sub">{artista.nacionalidad} · {artista.anio_nacimiento} – {artista.anio_fallecimiento || 'actualidad'}</p>
        </div>
        <Link href={`/artistas/editar/${artista.id}`} className="btn">Editar</Link>
      </div>

      <div className="grid-2">
        <div className="card">
          <p className="section-title">Datos del artista</p>
          <table className="table">
            <tbody>
              <tr><td className="text-muted" style={{width:'40%'}}>Nacionalidad</td><td>{artista.nacionalidad}</td></tr>
              <tr><td className="text-muted">Nacimiento</td><td>{artista.anio_nacimiento}</td></tr>
              <tr><td className="text-muted">Fallecimiento</td><td>{artista.anio_fallecimiento || 'Vivo/a'}</td></tr>
            </tbody>
          </table>
          {artista.biografia && (
            <div style={{marginTop:'1rem'}}>
              <p style={{fontSize:'13px', fontWeight:500, color:'#444', marginBottom:'6px'}}>Biografía</p>
              <p style={{fontSize:'14px', lineHeight:'1.7', color:'#555'}}>{artista.biografia}</p>
            </div>
          )}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="section-title" style={{margin:0}}>Obras en la colección ({artista.obras?.length || 0})</p>
          </div>
          {(!artista.obras || artista.obras.length === 0) ? (
            <p className="text-muted" style={{fontSize:'14px'}}>No hay obras registradas de este artista.</p>
          ) : (
            <table className="table">
              <thead><tr><th>Título</th><th>Año</th><th>Estado</th></tr></thead>
              <tbody>
                {artista.obras.map(obra => (
                  <tr key={obra.id}>
                    <td><Link href={`/obras/${obra.id}`} className="link">{obra.titulo}</Link></td>
                    <td style={{fontSize:'13px', color:'#888'}}>{obra.anio_creacion || '—'}</td>
                    <td><span className={`badge ${BADGE[obra.estado] || 'badge-neutral'}`}>{obra.estado}</span></td>
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
