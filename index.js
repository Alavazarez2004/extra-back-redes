const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const productoRoutes = require('./routes/productRoutes');
const usuarioRoutes = require('./routes/userRoutes');
const corsMiddleware = require('./middleware/corsMiddleware');

const app = express();

// Middleware
app.use(corsMiddleware); // Usar middleware de CORS
app.use(bodyParser.json()); // Parsear JSON en las solicitudes

// Conectar a la base de datos
connectDB();

// Rutas
app.use(productoRoutes); // Rutas para productos
app.use(usuarioRoutes);  // Rutas para usuarios

// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor corriendo en puerto 5000');
});
