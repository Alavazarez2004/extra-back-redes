const Producto = require('../models/Product');
const db = require('../config/db');

// Crear un producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ error: "El nombre y el precio son obligatorios" });
    }

    // Crear el producto utilizando el modelo Sequelize
    const productoCreado = await Producto.create({ nombre, precio });

    res.status(201).json({
      message: "Producto creado",
      producto: {
        id: productoCreado.id,
        nombre,
        precio,
      },
    });
  } catch (err) {
    console.error(err);  // Para ver más detalles en la consola
    res.status(500).json({ error: "Error al crear el producto", detalles: err.message });
  }
};

// Modificar un producto
const modificarProducto = async (req, res) => {
  try {
    const { id } = req.params;  // Obtener el id del producto desde los parámetros de la URL
    const { nombre, precio } = req.body;  // Obtener el nombre y precio del cuerpo de la solicitud

    // Validación de entrada
    if (!nombre || !precio) {
      return res.status(400).json({ error: "El nombre y el precio son obligatorios" });
    }

    // Usar Sequelize para actualizar el producto
    const [affectedCount] = await Producto.update(
      { nombre, precio },  // Los valores a actualizar
      { where: { id } }     // Condición donde id es igual al parámetro proporcionado
    );

    // Si no se encontró el producto
    if (affectedCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Respuesta exitosa
    res.status(200).json({ message: 'Producto modificado correctamente' });
  } catch (err) {
    console.error(err);  // Mostrar el error en la consola
    res.status(500).json({ error: 'Error al modificar el producto', detalles: err.message });
  }
};

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const [productos] = await db.query('SELECT * FROM productos');
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos', detalles: err.message });
  }
};

// Eliminar un producto por nombre
const eliminarProducto = async (req, res) => {
  try {
    const { nombre } = req.params; // El nombre del producto se obtiene de los parámetros de la URL

    // Buscar el producto para verificar que existe
    const producto = await Producto.findOne({ where: { nombre } });

    // Si no se encuentra el producto, devolvemos un error 404
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Eliminar el producto
    await Producto.destroy({ where: { nombre } });

    // Respuesta exitosa
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error(err);  // Mostrar el error en la consola
    res.status(500).json({ error: 'Error al eliminar el producto', detalles: err.message });
  }
};

module.exports = { crearProducto, obtenerProductos, eliminarProducto, modificarProducto };