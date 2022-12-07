const { Router } = require('express')
const Contenedor = require('../controller/contenedor')
const carrito = new Contenedor('./files/carrito', ['timestamp', 'products'])

const router = Router()

/* ------------------------ Cart Endpoints ------------------------ */

// POST /api/carrito

router.post('/', async (req, res) => {
  const { body } = req

  body.timestamp = Date.now()
  body.products = []
  const newCartId = await carrito.save(body)

  newCartId
    ? res.status(200).json({ success: 'cart added with ID: ' + newCartId })
    : res
        .status(400)
        .json({ error: 'invalid key. Please verify the body content' })
})

// DELETE /api/carrito/id
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const wasDeleted = await carrito.deleteById(id)

  wasDeleted
    ? res.status(200).json({ success: 'cart successfully removed' })
    : res.status(404).json({ error: 'cart not found' })
})

// POST /api/carrito/:id/productos
router.post('/:id/productos/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params

  const product = await contenedor.getById(id_prod)

  if (product) {
    const cartExist = await carrito.addToArrayById(id, { products: product })
    cartExist
      ? res.status(200).json({ success: 'product added' })
      : res.status(404).json({ error: 'cart not found' })
  } else {
    res.status(404).json({
      error: 'product not found, verify the ID in the body content is correct.',
    })
  }
})

// GET /api/carrito/:id/productos
router.get('/:id/productos', async (req, res) => {
  const { id } = req.params
  const cart = await carrito.getById(id)

  cart
    ? res.status(200).json(cart.products)
    : res.status(404).json({ error: 'cart not found' })
})

// DELETE /api/carrito/:id/productos/:id_prod
router.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params
  const productExists = await contenedor.getById(id_prod)
  if (productExists) {
    const cartExists = await carrito.removeFromArrayById(
      id,
      id_prod,
      'products',
    )
    cartExists
      ? res.status(200).json({ success: 'product removed' })
      : res.status(404).json({ error: 'cart not found' })
  } else {
    res.status(404).json({ error: 'product not found' })
  }
})

module.exports = router
