//Importar dependencias
const { Router } = require('express');

//Importar modulos
const ProductController = require('../controllers/productController');



class ProductRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }

    #config() {
        const objProductC = new ProductController();
        //Crear rutas
        this.router.post('/product', objProductC.createProduct);
    };
};

module.exports = ProductRouter;