// models/producto.js
const mongoose = require('mongoose');

// Definir el esquema para el producto
const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  }
});

// Crear el modelo usando el esquema
const Producto = mongoose.model('Productos', productoSchema);

module.exports = Producto;