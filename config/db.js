const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de la base de datos
  process.env.DB_PASS, // Contraseña de la base de datos
  {
    host: process.env.DB_HOST,   // Host de la base de datos
    dialect: 'mysql',            // Especifica el dialecto, puede ser 'mysql', 'postgres', 'sqlite', etc.
    logging: false,              // Deshabilitar el logging si no lo necesitas
  }
);

module.exports = sequelize;