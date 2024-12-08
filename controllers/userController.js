const Usuario = require('../models/User');
const jwt = require('jsonwebtoken');

// Registro de nuevo usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear y guardar el nuevo usuario
    const nuevoUsuario = new Usuario({ nombre, email, password });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario', detalles: err.message });
  }
};

// Autenticación de usuario (login)
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const esValida = await usuario.matchPassword(password);
    if (!esValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Crear JWT
    const token = jwt.sign({ id: usuario._id }, 'mi-secreto', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión', detalles: err.message });
  }
};

module.exports = { registrarUsuario, loginUsuario };