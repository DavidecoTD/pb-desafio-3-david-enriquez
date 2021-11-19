const express = require('express');
const app = express();
const Manager  = require('./classes/manager');
const manager = new Manager();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`el servidor esta escuchando en el puerto ${PORT}`)
})

const productRouter = require('./routs/products');


app.use('/api/productos', productRouter);