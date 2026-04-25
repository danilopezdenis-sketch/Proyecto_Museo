import { NextResponse } from 'next/server'
import { getObraById, updateObra, deleteObra } from '@/lib/actions/obras'

export async function GET(_, { params }) {
  try {
    const obra = await getObraById(params.id)
    if (!obra) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
    return NextResponse.json(obra)
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }) }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const formData = new FormData()
    Object.entries(body).forEach(([k, v]) => v != null && formData.append(k, v))
    await updateObra(params.id, formData)
    return NextResponse.json({ ok: true })
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 400 }) }
}

export async function DELETE(_, { params }) {
  try {
    await deleteObra(params.id)
    return NextResponse.json({ ok: true })
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 400 }) }
}
