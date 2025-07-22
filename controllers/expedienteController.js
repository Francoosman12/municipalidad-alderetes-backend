// controllers/expedienteController.js
const Expediente = require('../models/Expediente');

const crearExpediente = async (req, res) => {
  try {
    // Verificamos que el usuario esté disponible
    if (!req.usuario || !req.usuario._id) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    // Extraer datos del body (vía FormData: campo "data")
    const expedienteData = JSON.parse(req.body.data || "{}");

    // Obtener URLs de los archivos subidos a Cloudinary
    const archivoUrls = req.files?.map((archivo) => archivo.path) || [];

    const nuevoExpediente = new Expediente({
      ...expedienteData,
      archivos: archivoUrls,
      creadoPor: req.usuario._id,
    });

    await nuevoExpediente.save();
    res.status(201).json(nuevoExpediente);
  } catch (error) {
    console.error('❌ Error al crear expediente:', error);
    res.status(500).json({
      mensaje: 'Error al crear expediente',
      error: error.message || error,
    });
  }
};

const obtenerExpedientes = async (req, res) => {
  try {
    const expedientes = await Expediente.find();
    res.status(200).json(expedientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener expedientes', error });
  }
};

const actualizarExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const expedienteActualizado = await Expediente.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!expedienteActualizado) {
      return res.status(404).json({ mensaje: 'Expediente no encontrado' });
    }

    res.status(200).json(expedienteActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar expediente', error });
  }
};

const eliminarExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const expedienteEliminado = await Expediente.findByIdAndDelete(id);

    if (!expedienteEliminado) {
      return res.status(404).json({ mensaje: 'Expediente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Expediente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar expediente', error });
  }
};

module.exports = {
  crearExpediente,
  obtenerExpedientes,
  actualizarExpediente,
  eliminarExpediente
};