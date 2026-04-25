import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createArtista } from '@/lib/actions/artistas'

export default function NuevoArtistaPage() {
  async function action(formData) {
    'use server'
    await createArtista(formData)
    redirect('/artistas')
  }
  return (
    <div style={{maxWidth:600}}>
      <div className="page-header">
        <Link href="/artistas" className="link" style={{fontSize:'13px'}}>← Volver a artistas</Link>
        <h1 className="page-title" style={{marginTop:'4px'}}>Nuevo artista</h1>
      </div>
      <div className="card">
        <form action={action}>
          <div className="form-group">
            <label className="form-label">Nombre completo *</label>
            <input className="form-control" name="nombre" required placeholder="Nombre del artista" />
          </div>
          <div className="form-group">
            <label className="form-label">Nacionalidad *</label>
            <input className="form-control" name="nacionalidad" required placeholder="ej. Española" />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Año de nacimiento *</label>
              <input className="form-control" name="anio_nacimiento" type="number" required min="1" max="2025" placeholder="ej. 1881" />
            </div>
            <div className="form-group">
              <label className="form-label">Año de fallecimiento</label>
              <input className="form-control" name="anio_fallecimiento" type="number" min="1" max="2025" placeholder="Dejar vacío si vive" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Biografía</label>
            <textarea className="form-control" name="biografia" rows={4} placeholder="Breve biografía del artista..." />
          </div>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-primary" type="submit">Guardar artista</button>
            <Link href="/artistas" className="btn">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
