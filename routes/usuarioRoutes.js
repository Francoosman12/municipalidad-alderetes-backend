const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuarioController');
const auth = require('../middlewares/auth'); // Middleware de autenticación

// 🔐 Registro y login
router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);

// 📥 Obtener todos los usuarios (protegido)
router.get('/', auth, obtenerUsuarios);

// 📄 Obtener usuario por ID (protegido)
router.get('/:id', auth, obtenerUsuarioPorId);

// ✏️ Actualizar usuario por ID (protegido)
router.put('/:id', auth, actualizarUsuario);

// 🗑️ Eliminar usuario por ID (protegido)
router.delete('/:id', auth, eliminarUsuario);

module.exports = router;