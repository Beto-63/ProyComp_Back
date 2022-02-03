const { Router } = require('express');

const SalesController = require('../controllers/salesController');

class SalesRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }

    #config() {
        const objSalesC = new SalesController();

        this.router.get('/sales', objSalesC.getTodaySales)
        this.router.get('/paymentMethods', objSalesC.getPaymentMethods)
        this.router.post('/sales/byMethod', objSalesC.setDailySales)
    }
}

module.exports = SalesRouter;
