'use server'
import sequelize from '@/lib/mysql'
import Obra from '@/lib/models/mysql/Obra'
import Artista from '@/lib/models/mysql/Artista'
import Sala from '@/lib/models/mysql/Sala'
import Exposicion from '@/lib/models/mysql/Exposicion'
import { revalidatePath } from 'next/cache'

await sequelize.authenticate()

export async function getObras(filtros = {}) {
  const where = {}
  if (filtros.estado)        where.estado        = filtros.estado
  if (filtros.id_sala)       where.id_sala        = filtros.id_sala
  if (filtros.id_artista)    where.id_artista     = filtros.id_artista
  if (filtros.id_exposicion) where.id_exposicion  = filtros.id_exposicion
  const obras = await Obra.findAll({
    where,
    include: [
      { model: Artista,    as: 'artista',    attributes: ['id','nombre'] },
      { model: Sala,       as: 'sala',       attributes: ['id','nombre'] },
      { model: Exposicion, as: 'exposicion', attributes: ['id','titulo'] },
    ],
    order: [['titulo','ASC']],
  })
  return JSON.parse(JSON.stringify(obras))
}

export async function getObraById(id) {
  const obra = await Obra.findByPk(id, {
    include: [
      { model: Artista,    as: 'artista' },
      { model: Sala,       as: 'sala' },
      { model: Exposicion, as: 'exposicion' },
    ],
  })
  if (!obra) return null
  return JSON.parse(JSON.stringify(obra))
}

export async function createObra(formData) {
  const data = {
    imagen_url: formData.get('imagen_url') || null,
    titulo:            formData.get('titulo'),
    id_artista:        formData.get('id_artista'),
    id_sala:           formData.get('id_sala')           || null,
    id_exposicion:     formData.get('id_exposicion')     || null,
    anio_creacion:     formData.get('anio_creacion')     || null,
    tecnica:           formData.get('tecnica')           || null,
    dimensiones:       formData.get('dimensiones')       || null,
    estado:            formData.get('estado'),
    descripcion:       formData.get('descripcion')       || null,
    fecha_adquisicion: formData.get('fecha_adquisicion') || null,
  }
  if (!data.titulo || !data.id_artista) throw new Error('Título y artista son obligatorios')
  await Obra.create(data)
  revalidatePath('/obras')
}

export async function updateObra(id, formData) {
  const obra = await Obra.findByPk(id)
  if (!obra) throw new Error('Obra no encontrada')
  await obra.update({
    titulo:            formData.get('titulo'),
    id_artista:        formData.get('id_artista'),
    id_sala:           formData.get('id_sala')           || null,
    id_exposicion:     formData.get('id_exposicion')     || null,
    anio_creacion:     formData.get('anio_creacion')     || null,
    tecnica:           formData.get('tecnica')           || null,
    dimensiones:       formData.get('dimensiones')       || null,
    estado:            formData.get('estado'),
    descripcion:       formData.get('descripcion')       || null,
    fecha_adquisicion: formData.get('fecha_adquisicion') || null,
  })
  revalidatePath('/obras')
  revalidatePath(`/obras/${id}`)
}

export async function deleteObra(id) {
  const obra = await Obra.findByPk(id)
  if (!obra) throw new Error('Obra no encontrada')
  await obra.destroy()
  revalidatePath('/obras')
}
