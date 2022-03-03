//Importar dependencias
const { Router } = require('express');

//Importar modulos
const ProductController = require('../controllers/productController');

const { verifyToken } = require('../middlewares/authJwt');

class ProductRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }

    #config() {
        const objProductC = new ProductController();
        //Crear rutas
        this.router.post('/product', verifyToken, objProductC.createProduct);                                //
        this.router.put('/product', verifyToken, objProductC.adjustProduct);                                 //
        this.router.post('/product/info', verifyToken, objProductC.getProductInfo);                          //
        this.router.get('/product/categories', verifyToken, objProductC.getAllCategories);                   //
        this.router.post('/product/findByCatName', verifyToken, objProductC.getProductsByCatName);           //
        this.router.post('/product/category', verifyToken, objProductC.createCategory);
        this.router.post('/product/combo', verifyToken, objProductC.createCombo);                            //
        this.router.put('/product/combo', verifyToken, objProductC.adjustCombo);
        this.router.get('/product/combo', verifyToken, objProductC.getAllCombos);                            //
        this.router.post('/product/combo/findByName', verifyToken, objProductC.getComboByName);
        this.router.post('/product/selectCat', verifyToken, objProductC.selectByCategory);                   //
        this.router.post('/product/selectCatTemp', verifyToken, objProductC.selectByCatAndTemp);             //
        this.router.post('/product/selectPacketAndFill', verifyToken, objProductC.selectByPacketFillSize);   //
    };
};

module.exports = ProductRouter;