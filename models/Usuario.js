const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  sector: {
    type: String,
    enum: [
      'Salud', 'Educación', 'Desarrollo Social', 'Obras Públicas',
      'Seguridad', 'Transporte', 'Justicia', 'Medio Ambiente',
      'Cultura', 'Economía', 'Trabajo', 'Vivienda', 'Secretaría'
    ],
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'superAdmin'],
    default: 'admin'
  }
}, { timestamps: true });

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

usuarioSchema.methods.compararContraseña = function (input) {
  return bcrypt.compare(input, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);