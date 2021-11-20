const express = require('express');

class IndexRouter{
    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
        this.router.get('/', (req, res)=>{
            console.log('nueva petición GET');            
            res.status(200).json({mensaje: 'Conexión exitosa'});
        });
        /*
        this.router.get('/:nombre', (req, res)=>{
            let nombre = req.params.nombre;
            console.table({nombre});
            res.status(200).send();
        });
        */
    }
}

module.exports = IndexRouter;