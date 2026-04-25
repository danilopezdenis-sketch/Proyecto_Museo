import { NextResponse } from 'next/server'
import { getArtistaById, updateArtista, deleteArtista } from '@/lib/actions/artistas'

export async function GET(_, { params }) {
  try {
    const a = await getArtistaById(params.id)
    if (!a) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(a)
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }) }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const formData = new FormData()
    Object.entries(body).forEach(([k, v]) => v != null && formData.append(k, v))
    await updateArtista(params.id, formData)
    return NextResponse.json({ ok: true })
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 400 }) }
}

export async function DELETE(_, { params }) {
  try { await deleteArtista(params.id); return NextResponse.json({ ok: true }) }
  catch (e) { return NextResponse.json({ error: e.message }, { status: 400 }) }
}
