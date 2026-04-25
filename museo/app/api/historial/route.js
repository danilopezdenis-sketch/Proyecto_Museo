import { NextResponse } from 'next/server'
import { getEventos, createEvento } from '@/lib/actions/historial'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const filtros = {}
    if (searchParams.get('tipo_evento'))   filtros.tipo_evento   = searchParams.get('tipo_evento')
    if (searchParams.get('id_obra_mysql')) filtros.id_obra_mysql = searchParams.get('id_obra_mysql')
    return NextResponse.json(await getEventos(filtros))
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }) }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const formData = new FormData()
    Object.entries(body).forEach(([k, v]) => {
      if (v != null) formData.append(k, typeof v === 'object' ? JSON.stringify(v) : v)
    })
    await createEvento(formData)
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 400 }) }
}
