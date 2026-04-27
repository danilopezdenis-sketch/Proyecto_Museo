import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">🏛 Museo</Link>
      <div className="navbar-links">
        <Link href="/obras">Obras</Link>
        <Link href="/artistas">Artistas</Link>
        <Link href="/historial">Historial</Link>
        <Link href="/configuracion/salas">Configuración</Link>
        <Link href="/configuracion/exposiciones">Exposiciones</Link>
      </div>
    </nav>
  )
}
