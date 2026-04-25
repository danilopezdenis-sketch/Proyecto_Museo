'use client'
import { deleteArtista } from '@/lib/actions/artistas'
import { useRouter } from 'next/navigation'

export default function DeleteArtista({ id, nombre }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm(`¿Eliminar el artista "${nombre}"? Se eliminarán también sus asociaciones.`)) return
    try {
      await deleteArtista(id)
      router.refresh()
    } catch (e) {
      alert('Error al eliminar: ' + e.message)
    }
  }
  return <button className="btn btn-sm btn-danger" onClick={handleDelete}>Eliminar</button>
}
