const express = require('express');
const { crearProducto, obtenerProductos, eliminarProducto, modificarProducto } = require('../controllers/productController');
const router = express.Router();

// Rutas para productos
router.post('/api/products', crearProducto);
router.get('/api/products', obtenerProductos);
router.delete('/api/products/:nombre', eliminarProducto);
router.put('/api/products/:id', modificarProducto);

module.exports = router;