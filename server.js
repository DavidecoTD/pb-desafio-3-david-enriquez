const Manager  = require('./classes/manager');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const manager = new Manager();

const server = app.listen(PORT, () => {
    console.log(`el servidor esta escuchando en el puerto ${PORT}`)
})


app.get('/productos', (req,res) =>{
    manager.getAll().then(result => {
        res.send(result.products)
    })

} )

app.get('/productoRandom', (req,res) =>{
    manager.getRandom().then(result => {
        res.send(result.products)
    })

} )