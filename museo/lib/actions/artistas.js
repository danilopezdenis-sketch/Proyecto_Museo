'use server'
import sequelize from '@/lib/mysql'
import Artista from '@/lib/models/mysql/Artista'
import Obra from '@/lib/models/mysql/Obra'
import { revalidatePath } from 'next/cache'

await sequelize.authenticate()

export async function getArtistas(filtros = {}) {
  const where = {}
  if (filtros.nacionalidad) where.nacionalidad = filtros.nacionalidad
  const artistas = await Artista.findAll({ where, order: [['nombre','ASC']] })
  return JSON.parse(JSON.stringify(artistas))
}

export async function getArtistaById(id) {
  const artista = await Artista.findByPk(id, {
    include: [{ model: Obra, as: 'obras', attributes: ['id','titulo','estado','tecnica','anio_creacion'] }]
  })
  if (!artista) return null
  return JSON.parse(JSON.stringify(artista))
}

export async function createArtista(formData) {
  const data = {
    nombre:             formData.get('nombre'),
    nacionalidad:       formData.get('nacionalidad'),
    anio_nacimiento:    formData.get('anio_nacimiento'),
    anio_fallecimiento: formData.get('anio_fallecimiento') || null,
    biografia:          formData.get('biografia')           || null,
  }
  if (!data.nombre || !data.nacionalidad || !data.anio_nacimiento)
    throw new Error('Nombre, nacionalidad y año de nacimiento son obligatorios')
  await Artista.create(data)
  revalidatePath('/artistas')
  revalidatePath('/')
}

export async function updateArtista(id, formData) {
  const artista = await Artista.findByPk(id)
  if (!artista) throw new Error('Artista no encontrado')
  await artista.update({
    nombre:             formData.get('nombre'),
    nacionalidad:       formData.get('nacionalidad'),
    anio_nacimiento:    formData.get('anio_nacimiento'),
    anio_fallecimiento: formData.get('anio_fallecimiento') || null,
    biografia:          formData.get('biografia')           || null,
  })
  revalidatePath('/artistas')
  revalidatePath(`/artistas/${id}`)
  revalidatePath('/')
}

export async function deleteArtista(id) {
  const artista = await Artista.findByPk(id)
  if (!artista) throw new Error('Artista no encontrado')
  await artista.destroy()
  revalidatePath('/artistas')
  revalidatePath('/')
}
