import mongoose from'mongoose'
import * as modelProd from "./../models/producto.js"
import * as modelCar from "./../models/carrito.js"

class Mongo {

    constructor(url, type) {
        this.url = url,
        this.type = type
    }

    async connect() {
        try {
            
            await mongoose.connect(this.url,
            {
            useNewUrlParser: true,
            })

        } catch (error) {
            console.log(error);
        }
        
    }

    async getById(id, tipo = this.type) {

        try {
            
            this.connect()
    
            if(tipo == "producto"){
    
                const product = await modelProd.productos.find({_id : id})

                return product
            
            } else {
    
                const cart = await modelCar.carritos.find({_id : id})
                console.log(cart);
                return cart
    
            }

        } catch (error) {
            console.log(error);
        }
        
    }

    async deleteById(id) {

        try {
            
            this.connect()
    
            if(this.type == "producto"){
    
                const product = await modelProd.productos.deleteOne({_id : id})
    
                console.log(product);

                return product
            
            } else {
    
                const cart = await modelCar.carritos.deleteOne({_id : id})
        
                console.log(cart);

                return product
    
            }

        } catch (error) {
            console.log(error);
        }
        
        
    }

    async updateById(id, newData) {

        try {
            
            this.connect()
    
            if(this.type == "producto"){
    
               const product = await modelProd.productos.updateOne({_id : id}, {
               $set: {...newData}
               })
    
               console.log(product);
               return product
           
           } else {
    
               const cart = await modelCar.carritos.updateOne({_id : id}, {
               $set: {...newData}
               })
       
               console.log(cart);
               return cart

           }

        } catch (error) {
            console.log(error);
        }
        
    }

    async addToArrayById(id, objectToAddId) {
        try {
            this.connect()

            const carrito = await modelCar.carritos.findOne({_id : id})

            const product = await modelProd.productos.findOne({_id : objectToAddId})

            carrito.products.push(JSON.parse(JSON.stringify(product)))

            const updated = await modelCar.carritos.updateOne({_id : id}, {
               $set: {...carrito}
               })      
               
            return updated
            
        } catch (error) {
            console.log(error);
        }
    }

    async removeFromArrayById(id, objectToRemoveId, keyName) {
        const carrito = await modelCar.carritos.findOne({_id : id})

        console.log(carrito.products);

        carrito.products = carrito.products.filter(e => e._id !== objectToRemoveId)

        console.log(carrito.products);

        const updated = await modelCar.carritos.updateOne({_id : id}, {
               $set: {...carrito}
               })

        return updated
    }

    async save(object) {

        try {
            
            this.connect()
    
            if(this.type == "producto"){
    
                const saveProduct = new modelProd.productos(object)
    
                const saved = await saveProduct.save()
    
                console.log(saved._id);
                return saved._id
            
            } else {
    
                const saveCart = new modelCar.carritos(object)
                
                const saved = await saveCart.save()
                
                console.log(saved._id);
                return saved._id
    
            }


        } catch (error) {
            console.log(error);
        }

    }

}

export const MongoDB = Mongo