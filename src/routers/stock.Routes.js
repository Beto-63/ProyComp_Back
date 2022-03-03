const express = require('express');
const StockController = require("../controllers/stockController")

const { verifyToken } = require('../middlewares/authJwt');

class StockRouter {
    constructor() {
        this.router = express.Router();
        this.#config();
    }

    #config() {
        const objStockC = new StockController();
        //Crear rutas
        this.router.post('/stock', verifyToken, objStockC.createItem);
        this.router.get('/stock', verifyToken, objStockC.getAllItems);
        this.router.get('/stock/channels', verifyToken, objStockC.getAllChannels);
        this.router.post('/stock/channels', verifyToken, objStockC.createChannel);
        this.router.post('/stock/findByName', verifyToken, objStockC.getItemsByName);
        this.router.post('/stock/findByCatName', verifyToken, objStockC.getItemsByCatName);
        this.router.post('/stock/findByChannel', verifyToken, objStockC.getItemsByChannel);
        this.router.post('/stock/findByNameChannel', verifyToken, objStockC.getItemByNameAndChannel);
        this.router.post('/stock/findByCatNameChannel', verifyToken, objStockC.getItemByCatNameAndChannel);
        this.router.put('/stock/addQty', verifyToken, objStockC.addQty);
        this.router.put('/stock/adjust', verifyToken, objStockC.adjustItem);
        this.router.put('/stock/adjust/quantity', verifyToken, objStockC.adjustQuantity);
        this.router.post('/stock/adjust/reason', verifyToken, objStockC.adjustReason);
        this.router.put('/stock/transfer', verifyToken, objStockC.transferQty);
        this.router.put('/stock', verifyToken, objStockC.stockConsumption);
    };
};

module.exports = StockRouter;