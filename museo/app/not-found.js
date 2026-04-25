import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="card" style={{maxWidth:500, margin:'4rem auto', textAlign:'center'}}>
      <p style={{fontSize:48, marginBottom:'1rem'}}>🔍</p>
      <h2 style={{fontSize:18, fontWeight:600, marginBottom:'0.5rem'}}>Página no encontrada</h2>
      <p style={{fontSize:14, color:'#888', marginBottom:'1.5rem'}}>El recurso que buscas no existe o ha sido eliminado.</p>
      <Link href="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  )
}
