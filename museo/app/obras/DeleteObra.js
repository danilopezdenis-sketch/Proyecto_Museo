'use client'
import { deleteObra } from '@/lib/actions/obras'
import { useRouter } from 'next/navigation'

export default function DeleteObra({ id, titulo }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm(`¿Eliminar la obra "${titulo}"? Esta acción no se puede deshacer.`)) return
    try {
      await deleteObra(id)
      router.refresh()
    } catch (e) {
      alert('Error al eliminar: ' + e.message)
    }
  }
  return <button className="btn btn-sm btn-danger" onClick={handleDelete}>Eliminar</button>
}
