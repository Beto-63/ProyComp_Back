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
        this.router.put('/product', objProductC.adjustProduct);
        this.router.post('/product/selectCat', objProductC.selectByCategory);
        this.router.post('/product/selectCatTemp', objProductC.selectByCatAndTemp);
    };
};

module.exports = ProductRouter;