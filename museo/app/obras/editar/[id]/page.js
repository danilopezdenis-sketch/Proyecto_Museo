import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getObraById, updateObra } from '@/lib/actions/obras'
import { getArtistas } from '@/lib/actions/artistas'
import { getSalas } from '@/lib/actions/salas'
import { getExposiciones } from '@/lib/actions/exposiciones'

export default async function EditarObraPage({ params }) {
  const { id } = await params
  const [obra, artistas, salas, exposiciones] = await Promise.all([
    getObraById(id), getArtistas(), getSalas(), getExposiciones(),
  ])
  if (!obra) notFound()

  async function action(formData) {
    'use server'
    await updateObra(id, formData)
    redirect(`/obras/${id}`)
  }

  return (
    <div style={{maxWidth:680}}>
      <div className="page-header">
        <Link href={`/obras/${id}`} className="link" style={{fontSize:'13px'}}>← Volver a la obra</Link>
        <h1 className="page-title" style={{marginTop:'4px'}}>Editar obra</h1>
      </div>
      <div className="card">
        {obra.imagen_url && (
          <div style={{marginBottom:'1rem'}}>
            <img src={obra.imagen_url} alt={obra.titulo} style={{width:'100%', maxHeight:'200px', objectFit:'cover', borderRadius:'8px'}} />
          </div>
        )}
        <form action={action}>
          <div className="grid-2">
            <div className="form-group" style={{gridColumn:'1/-1'}}>
              <label className="form-label">Título *</label>
              <input className="form-control" name="titulo" required defaultValue={obra.titulo} />
            </div>
            <div className="form-group" style={{gridColumn:'1/-1'}}>
              <label className="form-label">URL de imagen</label>
              <input className="form-control" name="imagen_url" type="url" placeholder="https://..." defaultValue={obra.imagen_url || ''} />
              <p className="form-hint">Enlace directo a una imagen de la obra (opcional)</p>
            </div>
            <div className="form-group">
              <label className="form-label">Artista *</label>
              <select className="form-control" name="id_artista" required defaultValue={obra.id_artista}>
                <option value="">Selecciona artista</option>
                {artistas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Estado</label>
              <select className="form-control" name="estado" defaultValue={obra.estado}>
                <option value="En Depósito">En Depósito</option>
                <option value="Expuesta">Expuesta</option>
                <option value="En Restauración">En Restauración</option>
                <option value="Prestada">Prestada</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Sala</label>
              <select className="form-control" name="id_sala" defaultValue={obra.id_sala || ''}>
                <option value="">Sin sala asignada</option>
                {salas.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Exposición</label>
              <select className="form-control" name="id_exposicion" defaultValue={obra.id_exposicion || ''}>
                <option value="">Sin exposición</option>
                {exposiciones.map(e => <option key={e.id} value={e.id}>{e.titulo}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Año de creación</label>
              <input className="form-control" name="anio_creacion" type="number" min="0" max="2025" defaultValue={obra.anio_creacion || ''} />
            </div>
            <div className="form-group">
              <label className="form-label">Técnica</label>
              <input className="form-control" name="tecnica" defaultValue={obra.tecnica || ''} />
            </div>
            <div className="form-group">
              <label className="form-label">Dimensiones</label>
              <input className="form-control" name="dimensiones" defaultValue={obra.dimensiones || ''} />
            </div>
            <div className="form-group">
              <label className="form-label">Fecha de adquisición</label>
              <input className="form-control" name="fecha_adquisicion" type="date" defaultValue={obra.fecha_adquisicion || ''} />
            </div>
            <div className="form-group" style={{gridColumn:'1/-1'}}>
              <label className="form-label">Descripción</label>
              <textarea className="form-control" name="descripcion" rows={4} defaultValue={obra.descripcion || ''} />
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-primary" type="submit">Guardar cambios</button>
            <Link href={`/obras/${id}`} className="btn">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}