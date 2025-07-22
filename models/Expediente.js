// models/Expediente.js
const mongoose = require('mongoose');

const expedienteSchema = new mongoose.Schema({
ciudadano: {
  nombre: { type: String, required: true },
  dni: { type: String, required: true },
  direccion: String,
  telefono: String,
  email: String
},
  sectorDestino: {
  type: String,
  enum: [
    'Salud',
    'Educación',
    'Desarrollo Social',
    'Obras Públicas',
    'Seguridad',
    'Transporte',
    'Justicia',
    'Medio Ambiente',
    'Cultura',
    'Economía',
    'Trabajo',
    'Vivienda'
  ],
  required: true
},
descripcion: String,
  estado: {
    type: String,
    enum: ['pendiente', 'en proceso', 'resuelto'],
    default: 'pendiente'
  },
  archivos: [String],
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  creadoPor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Usuario'
}
});

module.exports = mongoose.model('Expediente', expedienteSchema);