//FILE MANAGMENT

const fs = require('fs')

class Container {
  constructor(name) {
    this.name = name
  }

  async save(obj) {
    try {
      const newObject = obj
      newObject.id = 1
      //If the file doesn't exist, this take the execution to the catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        info = JSON.parse(info)
        const ids = info.map((el) => el.id)
        const lastId = Math.max(...ids)
        newObject.id = lastId === -Infinity ? 1 : lastId + 1
      } else {
        info = []
      }
      info.push(newObject)
      await fs.promises.writeFile(
        `./${this.name}.txt`,
        JSON.stringify(info, null, 2),
      )
      return newObject.id
    } catch (error) {
      const newObject = obj
      newObject.id = 1
      await fs.promises.writeFile(
        `./${this.name}.txt`,
        JSON.stringify([newObject], null, 2),
      )
      return newObject.id
    }
  }

  async getById(id) {
    try {
      //If the file doesn't exist, this take the execution to the catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        info = JSON.parse(info)
        const item = info.find((el) => el.id === id) || null
        return item
        // !== null ? item : 'The object does not exist'
      } else {
        return 'The file is empty'
      }
    } catch (error) {
      return 'The file does not exist'
    }
  }

  async getAll() {
    try {
      //If the file doesn't exist, this take the execution to the catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        return JSON.parse(info)
      } else {
        return 'The file is empty'
      }
    } catch (error) {
      //   return 'The file does not exist or contains invalid data'
      await fs.promises.writeFile(
        `./${this.name}.txt`,
        JSON.stringify([], null, 2),
      )
    }
  }

  async deleteById(id) {
    try {
      //If the file doesn't exist, this take the execution to the catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        info = JSON.parse(info)
        if (info.find((el) => el.id === id) === undefined) {
          console.log(`The object with the id: ${id}, doesn't exist`)
          return
        }
        const newList = info.filter((el) => el.id !== id)
        await fs.promises.writeFile(
          `./${this.name}.txt`,
          JSON.stringify(newList, null, 2),
        )
        console.log(`The object with the id: ${id}, has been deleted`)
      } else {
        console.log('The file is empty')
      }
    } catch (error) {
      console.log('The file does not exist')
    }
  }

  async deleteAll() {
    try {
      //If the file doesn't exist, this take the execution to the catch'
      await fs.promises.readFile(`./${this.name}.txt`)
      await fs.promises.writeFile(`./${this.name}.txt`, '')
      console.log('All the objects have been deleted successfully')
    } catch (error) {
      console.log(`The file with the name: ${this.name}.txt, doesn't exist`)
    }
  }
}

const carritoArchivo = new Container('carritosArchivo')
mensajesArchivo.getAll()

const productosArchivo = new Container('productosArchivo')
productosArchivo.getAll()

//SERVIDOR

const express = require('express')
const { ROUTER } = express

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('public'))

const routerProductos = new Router()
const routerCarrito = new Router()

const administrador = true

let productos = [
  // {
  //     id: 1,
  //     timestamp: '2323423',
  //     nombre: 'nombre',
  //     descripcion: 'descripcion',
  //     codigo: 'codigo',
  //     foto: 'url',
  //     precio: 1,
  //     stock: 1
  // }
]

let carrito = [
  //   {
  //     id: 1,
  //     timestamp: '2323423',
  //     productos: [
  //       {
  //         id: 1,
  //         timestamp: '2323423',
  //         nombre: 'nombre',
  //         descripcion: 'descripcion',
  //         codigo: 'codigo',
  //         foto: 'url',
  //         precio: 1,
  //         stock: 1,
  //       },
  //     ],
  //   },
]

const traerMensajes = async () => {
  carrito = await carritoArchivo.getAll()
}

const traerProductos = async () => {
  productos = await productosArchivo.getAll()
}

//PERSISTIR CON FILE SYSTEM

//PRODUCTOS

//GET /:id
routerProductos.get('/:id?', (req, res) => {
  //!ID ? TODOS : UNO
  const id = req.params.id
  console.log(id)
  const item = productos.find((el) => el.id === Number(id)) || null
  item != null ? res.json(item) : res.json({ error: 'producto no encontrado' })
})

//POST
routerProductos.post('/', (req, res) => {
  const newProduct = req.body
  const ids = productos.map((el) => el.id)
  const lastId = Math.max(...ids)
  newProduct.id = lastId === -Infinity ? 1 : lastId + 1
  productos.push(newProduct)
  res.json({ ok: 'ok' })
})

// PUT /:id
routerProductos.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const newPersona = req.body
  newPersona.id = id
  const item = productos.find((el) => el.id === id) || null
  if (item != null) {
    const index = productos.indexOf(item)
    productos[index] = newPersona
    res.json({ ok: 'ok' })
  } else {
    res.json({ error: 'producto no encontrado' })
  }
})

// DELETE /:id
routerProductos.delete('/:id', (req, res) => {
  const id = req.params.id
  const newProducts = productos.filter((p) => p.id !== Number(id))
  productos = newProducts
  res.json({ ok: 'ok' })
})

//CARRITO

//POST
routerCarrito.post('/', (req, res) => {
  const newCarrito = req.body
  const ids = carrito.map((el) => el.id)
  const lastId = Math.max(...ids)
  newCarrito.id = lastId === -Infinity ? 1 : lastId + 1
  carrito.push(newCarrito)
  res.json({ ok: 'ok' })
  return newCarrito.id
})

// DELETE /:id
routerCarrito.delete('/:id', (req, res) => {
  //Vacia y elimina
  const id = req.params.id
  const newProducts = productos.filter((p) => p.id !== Number(id))
  productos = newProducts
  res.json({ ok: 'ok' })
})

//GET /:id
routerCarrito.get('/:id/productos', (req, res) => {
  //Todos los productos dentro del carrito
  const id = req.params.id
  console.log(id)
  const item = productos.find((el) => el.id === Number(id)) || null
  item != null
    ? res.json(item.productos)
    : res.json({ error: 'carrito no encontrado' })
})

//POST PARA PROBAR
routerCarrito.post('/:id/productos/:id_prod', (req, res) => {
  //Insert en el carrito id
  const id = Number(req.params.id)
  const id_prod = Number(req.params.id_prod)
  const itemCarrito = carrito.find((el) => el.id === id) || null
  const itemProducto = productos.find((el) => el.id === id_prod) || null
  if (itemCarrito != null) {
    const index = carrito.indexOf(itemCarrito)
    if (itemProducto != null) {
      carrito[index].productos.push(itemProducto)
    } else {
      res.json({ error: 'producto no encontrado' })
    }
  } else {
    res.json({ error: 'carrito no encontrado' })
  }
  res.json({ ok: 'ok' })
})

// DELETE PARA PROBAR
routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
  //Elimina un producto por su id que este dentro del carrito id
  const id = Number(req.params.id)
  const id_prod = Number(req.params.id_prod)
  const itemCarrito = carrito.find((el) => el.id === id) || null
  if (itemCarrito != null) {
    const index = carrito.indexOf(itemCarrito)
    const newList = itemCarrito[index].productos.filter(
      (el) => el.id !== id_prod,
    )
    carrito[index].productos = newList
  } else {
    res.json({ error: 'carrito no encontrado' })
  }
  res.json({ ok: 'ok' })
})

app.use('api/productos', routerProductos)
app.use('api/carrito', routerCarrito)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
