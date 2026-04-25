'use server'
import { connectMongo } from '@/lib/mongodb'
import Evento from '@/lib/models/mongo/Evento'
import { revalidatePath } from 'next/cache'

export async function getEventos(filtros = {}) {
  await connectMongo()
  const query = {}
  if (filtros.tipo_evento)   query.tipo_evento   = filtros.tipo_evento
  if (filtros.id_obra_mysql) query.id_obra_mysql  = Number(filtros.id_obra_mysql)
  const eventos = await Evento.find(query).sort({ fecha: -1 }).lean()
  return JSON.parse(JSON.stringify(eventos))
}

export async function createEvento(formData) {
  try {
    await connectMongo()
    let metadatos = {}
    const metadatosRaw = formData.get('metadatos')
    if (metadatosRaw) { try { metadatos = JSON.parse(metadatosRaw) } catch {} }
    const data = {
      id_obra_mysql: Number(formData.get('id_obra_mysql')),
      tipo_evento:   formData.get('tipo_evento'),
      responsable:   formData.get('responsable'),
      descripcion:   formData.get('descripcion'),
      fecha:         formData.get('fecha') || new Date(),
      metadatos,
    }
    if (!data.id_obra_mysql || !data.tipo_evento || !data.responsable || !data.descripcion)
      throw new Error('Todos los campos son obligatorios')
    await Evento.create(data)
    revalidatePath('/historial')
  } catch (e) {
    console.error('ERROR createEvento:', e)
    throw e
  }
}
export async function updateEvento(id, formData) {
  await connectMongo()
  const evento = await Evento.findById(id)
  if (!evento) throw new Error('Evento no encontrado')
  let metadatos = evento.metadatos
  const metadatosRaw = formData.get('metadatos')
  if (metadatosRaw) { try { metadatos = JSON.parse(metadatosRaw) } catch {} }
  await evento.updateOne({
    tipo_evento:  formData.get('tipo_evento'),
    responsable:  formData.get('responsable'),
    descripcion:  formData.get('descripcion'),
    fecha:        formData.get('fecha') || evento.fecha,
    metadatos,
  })
  revalidatePath('/historial')
}

export async function deleteEvento(id) {
  await connectMongo()
  const evento = await Evento.findByIdAndDelete(id)
  if (!evento) throw new Error('Evento no encontrado')
  revalidatePath('/historial')
}
