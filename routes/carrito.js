import { Router } from 'express'
import {Container} from '../controller/contenedor.js'
const carrito = new Container('./files/carrito', ['timestamp', 'products'])

import {MongoDB} from '../controller/mongo.js'
const db = new MongoDB('mongodb+srv://coderhouse:coderhouse@cluster0.6zhqh8c.mongodb.net/?retryWrites=true&w=majority', 'carrito')

import {FirebaseDB} from '../controller/firebase.js'
const fb = new FirebaseDB('carrito')

const router = Router()

/* ------------------------ Cart Endpoints ------------------------ */

// POST /api/carrito

router.post('/', async (req, res) => {
  const { body } = req

  body.timestamp = Date.now()
  body.products = []
  const newCartId = await carrito.save(body)
  const newCartIdMongo = await db.save(body)
  const newCartIdFirebase = await fb.save(body)
  
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
  const wasDeletedMongo = await db.deleteById(id)

  wasDeleted
    ? res.status(200).json({ success: 'cart successfully removed' })
    : res.status(404).json({ error: 'cart not found' })
})

// POST /api/carrito/:id/productos
router.post('/:id/productos/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params

  const product = await carrito.getById(id_prod)
  const productMongo = await db.getById(id_prod)

  if (product) {
    const cartExist = await carrito.addToArrayById(id, { products: product })
    //Mongo falta saber manejar el id
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
  const cartMongo = await db.getById(id)

  cart
    ? res.status(200).json(cart.products)
    : res.status(404).json({ error: 'cart not found' })
})

// DELETE /api/carrito/:id/productos/:id_prod
router.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params
  const productExists = await carrito.getById(id_prod)
  const productExistsMongo = await db.getById(id_prod)
  if (productExists) {
    const cartExists = await carrito.removeFromArrayById(
      id,
      id_prod,
      'products',
    )
    // const cartExistsMongo = await db.removeFromArrayById(
    //   id,
    //   id_prod,
    //   'products',
    // )
    cartExists
      ? res.status(200).json({ success: 'product removed' })
      : res.status(404).json({ error: 'cart not found' })
  } else {
    res.status(404).json({ error: 'product not found' })
  }
})

export const CarritoRoutes = router
