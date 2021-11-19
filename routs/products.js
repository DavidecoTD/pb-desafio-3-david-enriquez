const express = require('express');
const router = express.Router();
const Manager = require('../classes/manager');
const manager = new Manager(); 

//GET
router.get('/', (req,res) => {
    manager.getAll().then(result => {
        let arreglo = result.products;
        if(arreglo.length>0){
            res.send({usuarios:arreglo});
        }
        else{
            res.status(404).send({message: "No se encuentro usuario "})
        }
    })
})

router.get('/:pid',(req,res) => {
    let id = req.params.pid;
    id = parseInt(id);
    manager.getById(id).then(result => {
        res.send(result.product);
    })
})

//POST
router.post('/', (req,res) => {
    let cuerpo = req.body;
    manager.save(cuerpo).then(result => {
        res.send(result);
    })
})

//PUT
router.put('/:pid',(req,res) => {
    let id = parseInt(req.params.pid);
    let body = req.body;
    manager.updateProducto(id,body).then(result => {
        res.send(result);
    })
})

//DELETE
router.delete('/:pid',(req,res) => {
    let id = parseInt(req.params.pid);
    manager.deleteById(id).then(result => {
        res.send(result);
    })
})

module.exports = router;