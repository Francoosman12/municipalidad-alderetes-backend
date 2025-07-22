require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');
const expedienteRoutes = require('./routes/expedienteRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); // ✅ Importar rutas de usuario
const cors = require('cors');


const app = express();

// Middleware para parsear JSON
app.use(express.json());

app.use(cors());

// Conexión a la base de datos
conectarDB();

// Rutas
app.use('/api/expedientes', expedienteRoutes);
app.use('/api/usuarios', usuarioRoutes); // ✅ Usar rutas de usuario

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});