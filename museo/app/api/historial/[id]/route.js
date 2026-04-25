import { NextResponse } from 'next/server'
import { deleteEvento, updateEvento } from '@/lib/actions/historial'

export async function DELETE(_, { params }) {
  try { await deleteEvento(params.id); return NextResponse.json({ ok: true }) }
  catch (e) { return NextResponse.json({ error: e.message }, { status: 400 }) }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const formData = new FormData()
    Object.entries(body).forEach(([k, v]) => {
      if (v != null) formData.append(k, typeof v === 'object' ? JSON.stringify(v) : v)
    })
    await updateEvento(params.id, formData)
    return NextResponse.json({ ok: true })
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 400 }) }
}
