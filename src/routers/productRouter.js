//Importar dependencias
const express = require('express');

//Importar modulos
const ProductController = require('../controllers/productController');



class ProductRouter {
    constructor() {
        this.router = express.Router();
        this.#config();
    }

    #config() {
        const objProductC = new ProductController();
        //Crear rutas
        this.router.post('/product', objProductC.createProduct);
    };
};

module.exports = ProductController;