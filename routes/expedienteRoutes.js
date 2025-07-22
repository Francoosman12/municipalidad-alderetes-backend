const express = require('express');
const router = express.Router();
const {
  crearExpediente,
  obtenerExpedientes,
  actualizarExpediente,
  eliminarExpediente
} = require('../controllers/expedienteController');
const upload = require('../middlewares/upload');
const Expediente = require('../models/Expediente');
const auth = require('../middlewares/auth');


// Crear expediente
router.post('/', auth, crearExpediente);

// Obtener todos los expedientes
router.get('/', obtenerExpedientes);

// Actualizar expediente por ID
router.put('/:id', actualizarExpediente);

// Eliminar expediente por ID
router.delete('/:id', eliminarExpediente);

// Subir archivo individual (opcional)
router.post('/archivo', upload.single('archivo'), (req, res) => {
  res.status(200).json({
    mensaje: 'Archivo subido correctamente',
    url: req.file.path
  });
});

// Ingresar expediente con archivo adjunto
router.post('/ingresar', auth, upload.array('archivo'), crearExpediente);

module.exports = router;