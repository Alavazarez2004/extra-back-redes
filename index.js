const express = require('express');
const db = require('./config/db');  // Asegúrate de importar la configuración de la base de datos
const productoRoutes = require('./routes/productRoutes');
const usuarioRoutes = require('./routes/userRoutes');
const corsMiddleware = require('./middleware/corsMiddleware');

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors'); // Importar cors
require('dotenv').config(); // Cargar las variables de entorno

// Middleware
app.use(corsMiddleware); // Usar middleware de CORS
app.use(express.json()); // Usar express.json() para parsear JSON en las solicitudes

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL de tu frontend, ajusta según sea necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Rutas
app.use('/api/productos', productoRoutes); // Rutas para productos
app.use('/api/usuarios', usuarioRoutes);  // Rutas para usuarios

// Verificar la conexión a la base de datos y sincronizar las tablas
db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    
    // Sincronizar los modelos con la base de datos
    return db.sync({ force: false });  // `force: true` eliminaría las tablas existentes
  })
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch((err) => {
    console.error('Error al conectar o sincronizar la base de datos:', err);
    process.exit(1); // Termina la aplicación si no se puede conectar
  });

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});