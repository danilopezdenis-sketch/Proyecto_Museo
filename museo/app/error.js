'use client'
export default function Error({ error, reset }) {
  return (
    <div className="card" style={{maxWidth:500, margin:'4rem auto', textAlign:'center'}}>
      <p style={{fontSize:40, marginBottom:'1rem'}}>⚠️</p>
      <h2 style={{fontSize:18, fontWeight:600, marginBottom:'0.5rem'}}>Algo ha ido mal</h2>
      <p style={{fontSize:14, color:'#888', marginBottom:'1.5rem'}}>{error?.message || 'Error inesperado. Por favor inténtalo de nuevo.'}</p>
      <button className="btn btn-primary" onClick={reset}>Reintentar</button>
    </div>
  )
}
