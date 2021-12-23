const express = require('express');
const StockController = require("../controllers/stockController") /** aqui definir los que corresponden */

class StockRouter {
    constructor() {
        this.router = express.Router();
        this.#config();
    };

    #config() {
        const objStockC = new StockController();

        //Crear rutas
        this.router.post('/stock', objStockC.createItem);  /** usar este formato para las rutas pertinentes */

    };

}