const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db'); // Configuración de conexión a la base de datos

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios', // Nombre de la tabla en la base de datos
  timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
});

// Método para comparar contraseñas al hacer login
Usuario.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hook para encriptar la contraseña antes de guardar el usuario
Usuario.beforeCreate(async (usuario) => {
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(usuario.password, salt);
});

// Hook para actualizar el hash de la contraseña si fue modificada
Usuario.beforeUpdate(async (usuario) => {
  if (usuario.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
  }
});

module.exports = Usuario;