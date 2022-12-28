import mongoose from'mongoose'

const Schema = mongoose.Schema

const carritoSchema = new Schema({
  timestamp : {type: String},
  productos: {type: Array}
})

export const carritos = mongoose.model('Carrito', carritoSchema)