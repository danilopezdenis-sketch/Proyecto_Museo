import Link from 'next/link'
import { getArtistas } from '@/lib/actions/artistas'
import DeleteArtista from './DeleteArtista'

export default async function ArtistasPage({ searchParams }) {
  const p = await searchParams
  const artistas = await getArtistas()
  const q = p.q?.toLowerCase() || ''
  const filtrados = q ? artistas.filter(a => a.nombre.toLowerCase().includes(q) || a.nacionalidad.toLowerCase().includes(q)) : artistas
  const nacionalidades = [...new Set(artistas.map(a => a.nacionalidad))].sort()

  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Artistas</h1>
          <p className="page-sub">{filtrados.length} artista{filtrados.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/artistas/nuevo" className="btn btn-primary">+ Nuevo artista</Link>
      </div>

      <form className="filters-bar" method="GET">
        <input className="search-input" name="q" placeholder="Buscar por nombre o nacionalidad..." defaultValue={p.q || ''} />
        <button className="btn" type="submit">Buscar</button>
        <Link href="/artistas" className="btn">Limpiar</Link>
      </form>

      <div className="card">
        {filtrados.length === 0 ? (
          <div className="empty-state">No se encontraron artistas.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Nacionalidad</th>
                <th>Nacimiento</th>
                <th>Fallecimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(artista => (
                <tr key={artista.id}>
                  <td><Link href={`/artistas/${artista.id}`} className="link" style={{fontWeight:500}}>{artista.nombre}</Link></td>
                  <td style={{fontSize:'13px'}}>{artista.nacionalidad}</td>
                  <td style={{fontSize:'13px'}}>{artista.anio_nacimiento}</td>
                  <td style={{fontSize:'13px', color:'#888'}}>{artista.anio_fallecimiento || 'Vivo/a'}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link href={`/artistas/editar/${artista.id}`} className="btn btn-sm">Editar</Link>
                      <DeleteArtista id={artista.id} nombre={artista.nombre} />
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
