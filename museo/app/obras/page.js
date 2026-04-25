import Link from 'next/link'
import { getObras } from '@/lib/actions/obras'
import { getSalas } from '@/lib/actions/salas'
import { getArtistas } from '@/lib/actions/artistas'
import { getExposiciones } from '@/lib/actions/exposiciones'
import DeleteObra from './DeleteObra'

const BADGE = {
  'Expuesta':         'badge-success',
  'En Depósito':      'badge-neutral',
  'En Restauración':  'badge-warning',
  'Prestada':         'badge-info',
}

export default async function ObrasPage({ searchParams }) {
  const p = await searchParams
  const filtros = {
    estado:        p.estado        || '',
    id_sala:       p.id_sala       || '',
    id_artista:    p.id_artista    || '',
    id_exposicion: p.id_exposicion || '',
  }
  const [obras, salas, artistas, exposiciones] = await Promise.all([
    getObras(Object.fromEntries(Object.entries(filtros).filter(([,v]) => v))),
    getSalas(), getArtistas(), getExposiciones(),
  ])

  const q = p.q?.toLowerCase() || ''
  const obrasFiltradas = q
    ? obras.filter(o => o.titulo.toLowerCase().includes(q) || o.artista?.nombre.toLowerCase().includes(q))
    : obras

  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Obras</h1>
          <p className="page-sub">{obrasFiltradas.length} resultado{obrasFiltradas.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/obras/nueva" className="btn btn-primary">+ Nueva obra</Link>
      </div>

      <form className="filters-bar" method="GET">
        <input className="search-input" name="q" placeholder="Buscar por título o artista..." defaultValue={p.q || ''} />
        <select className="filter-select" name="estado" defaultValue={filtros.estado}>
          <option value="">Todos los estados</option>
          <option value="Expuesta">Expuesta</option>
          <option value="En Depósito">En Depósito</option>
          <option value="En Restauración">En Restauración</option>
          <option value="Prestada">Prestada</option>
        </select>
        <select className="filter-select" name="id_sala" defaultValue={filtros.id_sala}>
          <option value="">Todas las salas</option>
          {salas.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
        </select>
        <select className="filter-select" name="id_artista" defaultValue={filtros.id_artista}>
          <option value="">Todos los artistas</option>
          {artistas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
        </select>
        <select className="filter-select" name="id_exposicion" defaultValue={filtros.id_exposicion}>
          <option value="">Todas las exposiciones</option>
          {exposiciones.map(e => <option key={e.id} value={e.id}>{e.titulo}</option>)}
        </select>
        <button className="btn" type="submit">Filtrar</button>
        <Link href="/obras" className="btn">Limpiar</Link>
      </form>

      <div className="card">
        {obrasFiltradas.length === 0 ? (
          <div className="empty-state">No se encontraron obras con estos filtros.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Artista</th>
                <th>Técnica</th>
                <th>Sala</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {obrasFiltradas.map(obra => (
                <tr key={obra.id}>
                  <td><Link href={`/obras/${obra.id}`} className="link" style={{fontWeight:500}}>{obra.titulo}</Link></td>
                  <td>
                    {obra.artista
                      ? <Link href={`/artistas/${obra.artista.id}`} className="link">{obra.artista.nombre}</Link>
                      : <span className="text-muted">—</span>}
                  </td>
                  <td style={{color:'#888', fontSize:'13px'}}>{obra.tecnica || '—'}</td>
                  <td style={{fontSize:'13px'}}>{obra.sala?.nombre || <span className="text-muted">—</span>}</td>
                  <td><span className={`badge ${BADGE[obra.estado] || 'badge-neutral'}`}>{obra.estado}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <Link href={`/obras/editar/${obra.id}`} className="btn btn-sm">Editar</Link>
                      <DeleteObra id={obra.id} titulo={obra.titulo} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
