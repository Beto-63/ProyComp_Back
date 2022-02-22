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
        this.router.get('/stock/channels', objStockC.getAllChannels);
        this.router.post('/stock/channels', objStockC.createChannel);
        this.router.post('/stock/findByName', objStockC.getItemsByName);
        this.router.post('/stock/findByCatName', objStockC.getItemsByCatName);
        this.router.post('/stock/findByChannel', objStockC.getItemsByChannel);
        this.router.post('/stock/findByNameChannel', objStockC.getItemByNameAndChannel);
        this.router.post('/stock/findByCatNameChannel', objStockC.getItemByCatNameAndChannel);
        this.router.put('/stock/addQty', objStockC.addQty);
        this.router.put('/stock/adjust', objStockC.adjustItem);
        this.router.put('/stock/adjust/quantity', objStockC.adjustQuantity);
        this.router.post('/stock/adjust/reason', objStockC.adjustReason);
        this.router.put('/stock/transfer', objStockC.transferQty);
        this.router.put('/stock', objStockC.stockConsumption);
    };
};

module.exports = StockRouter;