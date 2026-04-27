'use server'
import sequelize from '@/lib/mysql'
import Sala from '@/lib/models/mysql/Sala'
import { revalidatePath } from 'next/cache'

await sequelize.authenticate()

export async function getSalas() {
  const salas = await Sala.findAll({ order: [['nombre','ASC']] })
  return JSON.parse(JSON.stringify(salas))
}

export async function createSala(formData) {
  await Sala.create({
    nombre:          formData.get('nombre'),
    planta:          formData.get('planta'),
    capacidad_obras: formData.get('capacidad_obras') || 20,
    estado:          formData.get('estado') || 'Abierta',
  })
  revalidatePath('/configuracion/salas')
  revalidatePath('/')
}

export async function updateSala(id, formData) {
  const sala = await Sala.findByPk(id)
  if (!sala) throw new Error('Sala no encontrada')
  await sala.update({
    nombre:          formData.get('nombre'),
    planta:          formData.get('planta'),
    capacidad_obras: formData.get('capacidad_obras'),
    estado:          formData.get('estado'),
  })
  revalidatePath('/configuracion/salas')
  revalidatePath('/')
}

export async function deleteSala(id) {
  const sala = await Sala.findByPk(id)
  if (!sala) throw new Error('Sala no encontrada')
  await sala.destroy()
  revalidatePath('/configuracion/salas')
  revalidatePath('/')
}
