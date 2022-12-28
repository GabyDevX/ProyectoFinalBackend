import mongoose from'mongoose'
import * as modelProd from "./../models/producto.js"
import * as modelCar from "./../models/carrito.js"

class Mongo {

    constructor(url, type) {
        this.url = url,
        this.type = type
    }

    async connect() {
        await mongoose.connect(this.url,
        {
        useNewUrlParser: true,
        })
    }

    async getById(id) {
        this.connect()

        if(this.type == "producto"){

            const product = await modelProd.productos.find({_id : id})
    
            console.log(product);
        
        } else {

            const cart = await modelCar.carritos.find({_id : id})
    
            console.log(cart);

        }
        
    }

    async deleteById(id) {
        this.connect()

        if(this.type == "producto"){

            const product = await modelProd.productos.deleteOne({_id : id})

            console.log(product);
        
        } else {

            const cart = await modelCar.carritos.deleteOne({_id : id})
    
            console.log(cart);

        }
        
    }

    async updateById(id, newData) {
         this.connect()

         if(this.type == "producto"){

            const product = await modelProd.productos.updateOne({_id : id}, {
            $set: {...newData}
            })

            console.log(product);
        
        } else {

            const cart = await modelCar.carritos.updateOne({_id : id}, {
            $set: {...newData}
            })
    
            console.log(cart);

        }
        
    }

    async addToArrayById(id, objectToAdd) {
        
    }

    async removeFromArrayById(id, objectToRemoveId, keyName) {

    }

    async save(object) {

        this.connect()

        if(this.type == "producto"){

            const saveProduct = new modelProd.productos(object)

            const saved = await saveProduct.save()

            console.log(saved._id);
        
        } else {

            const saveCart = new modelCar.carritos(object)

            const saved = await saveCart.save()
    
            console.log(saved._id);

        }
        
    }

    async deleteAll() {

    }

    async getData() {
        
    }
}

export const MongoDB = Mongo