'use client'
import { deleteEvento } from '@/lib/actions/historial'
import { useRouter } from 'next/navigation'

export default function DeleteEvento({ id }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm('¿Eliminar este evento del historial?')) return
    try {
      await deleteEvento(id)
      router.refresh()
    } catch (e) {
      alert('Error al eliminar: ' + e.message)
    }
  }
  return <button className="btn btn-sm btn-danger" onClick={handleDelete}>Eliminar</button>
}
