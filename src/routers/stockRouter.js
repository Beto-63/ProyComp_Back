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
    };
};

module.exports = StockRouter;