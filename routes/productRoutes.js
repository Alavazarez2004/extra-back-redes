const express = require('express');
const { crearProducto, obtenerProductos, eliminarProducto, modificarProducto } = require('../controllers/productController');
const router = express.Router();

// Rutas para productos
router.post('/create', crearProducto);
router.get('/get', obtenerProductos);
router.delete('/delete/:nombre', eliminarProducto);
router.put('/edit/:id', modificarProducto);

module.exports = router;