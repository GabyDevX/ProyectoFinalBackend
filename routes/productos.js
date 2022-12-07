const { Router } = require('express')
const Contenedor = require('../controller/contenedor')
const contenedor = new Contenedor('./files/productos', [
  'timestamp',
  'title',
  'price',
  'description',
  'code',
  'image',
  'stock',
])

const router = Router()

/* ------------------------ Product Endpoints ------------------------ */

// GET api/productos
router.get('/:id?', async (req, res) => {
  const { id } = req.params
  if (id) {
    const product = await contenedor.getById(id)

    product
      ? res.status(200).json(product)
      : res.status(400).json({ error: 'product not found' })
  } else {
    const products = await contenedor.getAll()
    res.status(200).json(products)
  }
})

// POST api/productos
router.post('/', async (req, res, next) => {
  const { body } = req

  body.timestamp = Date.now()

  const newProductId = await contenedor.save(body)

  newProductId
    ? res
        .status(200)
        .json({ success: 'product added with ID: ' + newProductId })
    : res
        .status(400)
        .json({ error: 'invalid key. Please verify the body content' })
})

// PUT api/productos/:id
router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const wasUpdated = await contenedor.updateById(id, body)

  wasUpdated
    ? res.status(200).json({ success: 'product updated' })
    : res.status(404).json({ error: 'product not found' })
})

// DELETE /api/productos/:id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const wasDeleted = await contenedor.deleteById(id)

  wasDeleted
    ? res.status(200).json({ success: 'product successfully removed' })
    : res.status(404).json({ error: 'product not found' })
})

module.exports = router
