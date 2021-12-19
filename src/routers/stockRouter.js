const express = require('express');

class StockRouter {
    constructor() {
        this.router = express.Router();
        this.#config();
    }

    #config() {
        const objStockC = new UserController();
        //Crear rutas
        this.router.get('/stock', objStockC.getAllItems);
    };
}

module.exports = StockRouter;