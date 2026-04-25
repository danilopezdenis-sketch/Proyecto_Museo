'use client'
import { deleteExposicion } from '@/lib/actions/exposiciones'
import { useRouter } from 'next/navigation'

export default function DeleteExposicion({ id, titulo }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm(`¿Eliminar la exposición "${titulo}"?`)) return
    try { await deleteExposicion(id); router.refresh() }
    catch (e) { alert('Error: ' + e.message) }
  }
  return <button className="btn btn-sm btn-danger" onClick={handleDelete}>Eliminar</button>
}
