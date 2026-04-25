import mongoose from 'mongoose'

const EventoSchema = new mongoose.Schema({
  id_obra_mysql: { type: Number, required: true },
  tipo_evento:   { type: String, required: true, enum: ['restauracion','prestamo','traslado','inspeccion'] },
  fecha:         { type: Date, default: Date.now },
  responsable:   { type: String, required: true },
  descripcion:   { type: String, required: true },
  metadatos:     { type: mongoose.Schema.Types.Mixed },
}, { collection: 'eventos' })

export default mongoose.models.Evento || mongoose.model('Evento', EventoSchema)
