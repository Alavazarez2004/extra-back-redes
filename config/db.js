const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mi-base-datos', {
    });
    console.log('Conexión a la base de datos exitosa');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    process.exit(1); // Detener el servidor si no se puede conectar a la base de datos
  }
};

module.exports = connectDB;