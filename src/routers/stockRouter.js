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
        this.router.get('/stock/:id', objStockC.getItemById);
        this.router.get('/stock/find', objStockC.getItemByChannelId);
        this.router.put('/stock/addQty', objStockC.addQty);
        this.router.put('/stock/adjustItem', objStockC.adjustItem);

    };
};

module.exports = StockRouter;