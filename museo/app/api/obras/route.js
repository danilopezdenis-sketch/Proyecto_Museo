import { NextResponse } from 'next/server'
import { getObras, createObra } from '@/lib/actions/obras'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const filtros = {}
    if (searchParams.get('estado'))        filtros.estado        = searchParams.get('estado')
    if (searchParams.get('id_sala'))       filtros.id_sala       = searchParams.get('id_sala')
    if (searchParams.get('id_artista'))    filtros.id_artista    = searchParams.get('id_artista')
    if (searchParams.get('id_exposicion')) filtros.id_exposicion = searchParams.get('id_exposicion')
    const obras = await getObras(filtros)
    return NextResponse.json(obras)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const formData = new FormData()
    Object.entries(body).forEach(([k, v]) => v != null && formData.append(k, v))
    await createObra(formData)
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
