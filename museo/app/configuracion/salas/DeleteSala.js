'use client'
import { deleteSala } from '@/lib/actions/salas'
import { useRouter } from 'next/navigation'

export default function DeleteSala({ id, nombre }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm(`¿Eliminar la sala "${nombre}"?`)) return
    try { await deleteSala(id); router.refresh() }
    catch (e) { alert('Error: ' + e.message) }
  }
  return <button className="btn btn-sm btn-danger" onClick={handleDelete}>Eliminar</button>
}
