import {db} from './../firebaseInit/firebase.js'

class Firebase {

    constructor(type) {
        this.type = type,
        this.queryProd = db.collection('productos'),
        this.queryCar = db.collection('carritos')
    }

    async getById(id, tipo = this.type) {

        try {

            if(tipo == "producto"){
    
                const doc = this.queryProd.doc(`${id}`)
    
                const item = await doc.get()
    
                const response = item.data()

                return response
            
            } else {
    
                const doc = this.queryCar.doc(`${id}`)
    
                const item = await doc.get()
    
                const response = item.data()
    
                return response
            }
            
        } catch (error) {
            console.log(error);
        }

        
    }

    async deleteById(id) {

        try {
            
            if(this.type == "producto"){
    
                const doc = this.queryProd.doc(`${id}`)
    
                const item = await doc.get()
                
                const response = item.data()
                
                await doc.delete()
                
                return response
            
            } else {
    
                const doc = this.queryCar.doc(`${id}`)
    
                const item = await doc.get()
                
                const response = item.data()
                
                await doc.delete()
                
                return response
    
            }

        } catch (error) {
            console.log(error);
        }

        
    }

    async updateById(id, newData) {

        try {
            
            if(this.type == "producto"){
    
               const doc = this.queryProd.doc(`${id}`)
    
               const item = await doc.update(newData)
               
               return item
           
           } else {
    
               const doc = this.queryCar.doc(`${id}`)
               
               const item = await doc.update(newData)
    
               return item
    
           }

        } catch (error) {
            console.log(error);
        }

        
    }

    async addToArrayById(id, objectToAddId) {
        try {
            const doc = this.queryCar.doc(`${id}`)
    
            const item = await doc.get()
    
            const carrito = item.data()

            const docProd = this.queryProd.doc(`${objectToAddId}`)
    
            const itemProd = await docProd.get()

            const producto = itemProd.data()

            producto.id = objectToAddId

            carrito.products.push(producto)
    
            const updated = await doc.update(carrito)
            
            console.log(carrito);

            return updated

        } catch (error) {
            console.log(error);
        }
    }

    async removeFromArrayById(id, objectToRemoveId, keyName) {
        const doc = this.queryCar.doc(`${id}`)
    
        const item = await doc.get()

        const carrito = item.data()

        carrito.products = carrito.products.filter(e => e.id !== objectToRemoveId)

        const updated = await doc.update(carrito)
            
        console.log(carrito);

        return updated

    }

    async save(object) {

        try {
            
            if(this.type == "producto"){
    
                const data = await this.queryProd.add(object)
    
                return data.id
            
            } else {
                
                const data = await this.queryCar.add(object)
    
                return data.id
    
            }

        } catch (error) {
            console.log(error);
        }

        
    }
}

export const FirebaseDB = Firebase