const { Router } = require('express');
// Importar todos los routers;
const CarritoRoutes = require('./carrito');
const ProductosRoutes = require('./productos');


const router = Router();

// Configurar los routers
router.use('/api/carrito', CarritoRoutes);
router.use('/api/productos', ProductosRoutes);


module.exports = router;