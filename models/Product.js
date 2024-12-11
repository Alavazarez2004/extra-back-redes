const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importar la configuración de conexión

// Definir el modelo Producto
const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2), // Ajusta el tamaño y la precisión según sea necesario
    allowNull: false,
  },
}, {
  tableName: 'productos', // Nombre de la tabla en la base de datos
  timestamps: false, // Si no quieres `createdAt` y `updatedAt`
});

module.exports = Producto;