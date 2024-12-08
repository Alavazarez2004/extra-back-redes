const Producto = require('../models/Product');

const crearProducto = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ error: "El nombre y el precio son obligatorios" });
    }

    const nuevoProducto = new Producto({ nombre, precio });
    await nuevoProducto.save();
    res.status(201).json({ message: "Producto creado", producto: nuevoProducto });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el producto", detalles: err.message });
  }
};


const modificarProducto = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el id del producto desde los parámetros de la URL
    const { nombre, precio } = req.body; // Obtenemos el nuevo nombre y precio del cuerpo de la solicitud

    // Verificamos si se proporcionó un nombre o precio para actualizar
    if (!nombre || !precio) {
      return res.status(400).json({ error: "El nombre y el precio son obligatorios" });
    }

    // Buscar el producto por _id y actualizarlo
    const productoModificado = await Producto.findByIdAndUpdate(
      id, // Usamos el id (_id) para buscar el producto
      { nombre, precio }, // Actualizamos el nombre y precio
      { new: true } // Devolvemos el producto actualizado
    );

    if (!productoModificado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto modificado correctamente', producto: productoModificado });
  } catch (err) {
    res.status(500).json({ error: 'Error al modificar el producto', detalles: err.message });
  }
};


const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos', detalles: err.message });
  }
};

// Eliminar un producto por nombre
const eliminarProducto = async (req, res) => {
  try {
    const { nombre } = req.params; // El nombre del producto se obtiene de los parámetros de la URL
    
    // Buscar el producto por nombre y eliminarlo
    const productoEliminado = await Producto.findOneAndDelete({ nombre });

    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado correctamente', producto: productoEliminado });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto', detalles: err.message });
  }
};

module.exports = { crearProducto, obtenerProductos, eliminarProducto, modificarProducto };