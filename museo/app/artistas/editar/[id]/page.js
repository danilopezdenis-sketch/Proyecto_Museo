import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getArtistaById, updateArtista } from '@/lib/actions/artistas'

export default async function EditarArtistaPage({ params }) {
  const { id } = await params
  const artista = await getArtistaById(id)
  if (!artista) notFound()

  async function action(formData) {
    'use server'
    await updateArtista(id, formData)
    redirect(`/artistas/${id}`)
  }

  return (
    <div style={{maxWidth:600}}>
      <div className="page-header">
        <Link href={`/artistas/${id}`} className="link" style={{fontSize:'13px'}}>← Volver al artista</Link>
        <h1 className="page-title" style={{marginTop:'4px'}}>Editar artista</h1>
      </div>
      <div className="card">
        <form action={action}>
          <div className="form-group">
            <label className="form-label">Nombre completo *</label>
            <input className="form-control" name="nombre" required defaultValue={artista.nombre} />
          </div>
          <div className="form-group">
            <label className="form-label">Nacionalidad *</label>
            <input className="form-control" name="nacionalidad" required defaultValue={artista.nacionalidad} />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Año de nacimiento *</label>
              <input className="form-control" name="anio_nacimiento" type="number" required min="1" max="2025" defaultValue={artista.anio_nacimiento} />
            </div>
            <div className="form-group">
              <label className="form-label">Año de fallecimiento</label>
              <input className="form-control" name="anio_fallecimiento" type="number" min="1" max="2025" defaultValue={artista.anio_fallecimiento || ''} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Biografía</label>
            <textarea className="form-control" name="biografia" rows={4} defaultValue={artista.biografia || ''} />
          </div>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-primary" type="submit">Guardar cambios</button>
            <Link href={`/artistas/${id}`} className="btn">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
