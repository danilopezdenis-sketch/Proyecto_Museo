'use server'
import sequelize from '@/lib/mysql'
import Exposicion from '@/lib/models/mysql/Exposicion'
import { revalidatePath } from 'next/cache'

await sequelize.authenticate()

export async function getExposiciones() {
  const exposiciones = await Exposicion.findAll({ order: [['fecha_inicio','DESC']] })
  return JSON.parse(JSON.stringify(exposiciones))
}

export async function createExposicion(formData) {
  await Exposicion.create({
    titulo:       formData.get('titulo'),
    descripcion:  formData.get('descripcion') || null,
    fecha_inicio: formData.get('fecha_inicio'),
    fecha_fin:    formData.get('fecha_fin')    || null,
    estado:       formData.get('estado')       || 'Próxima',
  })
  revalidatePath('/configuracion/exposiciones')
  revalidatePath('/')
}

export async function updateExposicion(id, formData) {
  const exp = await Exposicion.findByPk(id)
  if (!exp) throw new Error('Exposición no encontrada')
  await exp.update({
    titulo:       formData.get('titulo'),
    descripcion:  formData.get('descripcion') || null,
    fecha_inicio: formData.get('fecha_inicio'),
    fecha_fin:    formData.get('fecha_fin')    || null,
    estado:       formData.get('estado'),
  })
  revalidatePath('/configuracion/exposiciones')
  revalidatePath('/')
}

export async function deleteExposicion(id) {
  const exp = await Exposicion.findByPk(id)
  if (!exp) throw new Error('Exposición no encontrada')
  await exp.destroy()
  revalidatePath('/configuracion/exposiciones')
  revalidatePath('/')
}
