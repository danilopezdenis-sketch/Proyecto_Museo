import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Museo — Gestión de Colecciones',
  description: 'Sistema de gestión del museo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="main-content">{children}</main>
      </body>
    </html>
  )
}
