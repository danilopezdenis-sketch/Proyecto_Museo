import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createEvento } from '@/lib/actions/historial'
import { getObras } from '@/lib/actions/obras'

export default async function NuevoEventoPage({ searchParams }) {
  const p = await searchParams
  const obras = await getObras()

  async function action(formData) {
    'use server'
    await createEvento(formData)
    redirect('/historial')
  }

  return (
    <div style={{maxWidth:620}}>
      <div className="page-header">
        <Link href="/historial" className="link" style={{fontSize:'13px'}}>← Volver al historial</Link>
        <h1 className="page-title" style={{marginTop:'4px'}}>Nuevo evento</h1>
      </div>
      <div className="card">
        <form action={action}>
          <div className="form-group">
            <label className="form-label">Obra *</label>
            <select className="form-control" name="id_obra_mysql" required defaultValue={p.obra || ''}>
              <option value="">Selecciona una obra</option>
              {obras.map(o => <option key={o.id} value={o.id}>{o.titulo}</option>)}
            </select>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Tipo de evento *</label>
              <select className="form-control" name="tipo_evento" required>
                <option value="restauracion">Restauración</option>
                <option value="prestamo">Préstamo</option>
                <option value="traslado">Traslado</option>
                <option value="inspeccion">Inspección</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Fecha *</label>
              <input className="form-control" name="fecha" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Responsable *</label>
            <input className="form-control" name="responsable" required placeholder="Nombre del responsable" />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción *</label>
            <textarea className="form-control" name="descripcion" required rows={3} placeholder="Describe el evento..." />
          </div>
          <div className="form-group">
            <label className="form-label">Metadatos adicionales (JSON)</label>
            <textarea className="form-control" name="metadatos" rows={4} placeholder='{"clave": "valor", "otra": "info"}' style={{fontFamily:'monospace', fontSize:'13px'}} />
            <p className="form-hint">Opcional. Datos adicionales en formato JSON según el tipo de evento.</p>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-primary" type="submit">Guardar evento</button>
            <Link href="/historial" className="btn">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
