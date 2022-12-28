import {db} from './../firebaseInit/firebase.js'

class Firebase {

    constructor(type) {
        this.type = type,
        this.queryProd = db.collection('productos'),
        this.queryCar = db.collection('carritos')
    }

    static async connect() {

    }

    async getById(id) {

        if(this.type == "producto"){

            const doc = this.queryProd.doc(`${id}`)

            const item = await doc.get()

            const response = item.data()

            console.log(response);
        
        } else {

            const doc = this.queryCar.doc(`${id}`)

            const item = await doc.get()

            const response = item.data()

            console.log(response);
        }
        
    }

    async deleteById(id) {

        if(this.type == "producto"){

            const doc = this.queryProd.doc(`${id}`)

            
            const item = await doc.get()
            
            const response = item.data()
            
            await doc.delete()
            console.log('Se ha eliminado el siguiente producto');
            console.log(response);
        
        } else {

            const doc = this.queryCar.doc(`${id}`)

            
            const item = await doc.get()
            
            const response = item.data()
            
            await doc.delete()
            console.log('Se ha eliminado el siguiente carrito');
            console.log(response);

        }
        
    }

    async updateById(id, newData) {

         if(this.type == "producto"){

            const doc = this.queryProd.doc(`${id}`)

            const item = await doc.update(newData)
            
            console.log('El producto se ha actualizado correctamente');
        
        } else {

            const doc = this.queryCar.doc(`${id}`)
            
            const item = await doc.update(newData)

            console.log('El carrito se ha actualizado correctamente');

        }
        
    }

    async addToArrayById(id, objectToAdd) {
        
    }

    async removeFromArrayById(id, objectToRemoveId, keyName) {

    }

    async save(object) {

        if(this.type == "producto"){

            const doc = this.queryProd.doc()
            
            const data = await doc.create(object)

            console.log(doc);
            console.log(data);
        
        } else {

            const doc = this.queryCar.doc()
            
            const data = await doc.create(object)

            console.log(doc);
            console.log(data);

        }
        
    }

    async deleteAll() {

    }

    async getData() {
        
    }
}

export const FirebaseDB = Firebase