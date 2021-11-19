const fs = require('fs');
const { EventEmitter } = require('stream');
class Manager {
    async save(product){
        try{
            let data = await fs.promises.readFile('./files/products.txt','utf-8')
            let products = JSON.parse(data);
            if(products.some(pro=>pro.title === product.title)){
                return {status:'error', message:'el producto ya existe'}
            }else{
                let dataObj = {
                    title: product.title,
                    price: product.price,
                    thunbnail: product.thunbnail,
                    id:product.id
                }
                products.push(dataObj);
                try{
                    await fs.promises.writeFile('./files/products.txt',JSON.stringify(products,null,2));
                    return {status:'success',message:'producto creado con exito'}
                }catch(err){
                    return {status:'error', message: 'No se pudo crear el producto'}

                }

            }


        }catch{
            let dataObj = {
                title: product.title,
                price: product.price,
                thunbnail: product.thunbnail,
                id:product.id
            }
            try{
                await fs.promises.writeFile('./files/products.txt',JSON.stringify([dataObj],null,2))
                return {status:'success',message:'producto creado con exito'}
            }catch(error){
                return {status:'error', message: 'No se pudo crear el producto' + error}
            }


        }
    }
    async getById(id){
        try{
            let data = await fs.promises.readFile('./files/products.txt','utf-8')
            let products = JSON.parse(data);
            let product = products.find(prod => prod.id===id);
            if(product){
                return {status:'Success', product:product}
            }
        }catch(err){
            return  {status:'error', message: 'No se encontro producto'}

        }
    }
    async getAll(){
        try{
            let data = await fs.promises.readFile('./files/products.txt','utf-8')
            let products = JSON.parse(data);
            if(products){
                return {status:'Success', products:products}
            }
        }catch(err){
            return  {status:'error', message: 'No se encontraron productos'}

        }
    }
    async getRandom(){
        try{
            let data = await fs.promises.readFile('./files/products.txt','utf-8')
            let products = JSON.parse(data);
            let aletaorio = Math.floor(Math.random()* (products.length));

            if(products){
                return {status:'Success', products:products[aletaorio]}
            }
        }catch(err){
            return  {status:'error', message: 'No se encontraron productos'}

        }
    }
    async deleteById(id){
        try{
            let data = await fs.promises.readFile('./files/products.txt','utf-8')
            let products = JSON.parse(data);
            let index = products.findIndex(prod => prod.id===id);
            let productId = products.splice(index,1);
            await fs.promises.writeFile('./files/products.txt',JSON.stringify(productId,null,2))
        }catch(err){
            return  {status:'error', message: 'No se encontro producto'}

        }
    }
    async deletAll(){
        try{
            let data = await fs.promises.readFile('./files/products.txt','utf-8')
            let products = JSON.parse(data);
            if(products){
                await fs.promises.writeFile('./files/products.txt',JSON.stringify([],null,2))

            }
        }catch(err){
            return  {status:'error', message: 'No se encontraron productos'}

        }
    }
    async updateProducto(id,body){
        try{
            let data = await fs.promises.readFile('./files/products.txt','utf-8');
            let products = JSON.parse(data);
            if(!products.some(prod=>prod.id===id)) return {status:"error", message:"No hay ningún producto con el id especificado"}
            let result = products.map(prod=>{
                if(prod.id===id){
                    body = Object.assign(body)
                    return body
                }
                else{
                    return prod;
                }
            })
            try{
                await fs.promises.writeFile('./files/products.txt',JSON.stringify(result,null,2));
                return {status:"success", message:"Producto actualizado"}
            }catch{
                return {status:"error", message:"Error al actualizar el producto"}
            }
        }catch{
            return {status:"error",message:"Fallo al actualizar el producto"}
        }
    }







}

module.exports = Manager;