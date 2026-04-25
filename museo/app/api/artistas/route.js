import { NextResponse } from 'next/server'
import { getArtistas, createArtista } from '@/lib/actions/artistas'

export async function GET() {
  try { return NextResponse.json(await getArtistas()) }
  catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }) }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const formData = new FormData()
    Object.entries(body).forEach(([k, v]) => v != null && formData.append(k, v))
    await createArtista(formData)
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 400 }) }
}
