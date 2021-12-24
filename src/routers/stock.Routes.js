const express = require('express');
const StockController = require("../controllers/stockController")

class StockRouter {
    constructor() {
        this.router = express.Router();
        this.#config();
    }

    #config() {
        const objStockC = new StockController();
        //Crear rutas
        this.router.post('/stock', objStockC.createItem);
        this.router.get('/stock', objStockC.getAllItems);
        this.router.post('/stock/findByName', objStockC.getItemsByName);
        this.router.post('/stock/findByNameChannel', objStockC.getItemByNameAndChannel);
        this.router.put('/stock/addQty', objStockC.addQty);
        this.router.put('/stock/adjust', objStockC.adjustItem);
        this.router.put('/stock/transfer', objStockC.transferQty);
    };
};

module.exports = StockRouter;