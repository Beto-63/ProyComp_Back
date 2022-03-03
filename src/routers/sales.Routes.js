const { Router } = require('express');

const SalesController = require('../controllers/salesController');

const { verifyToken } = require('../middlewares/authJwt');

class SalesRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }

    #config() {
        const objSalesC = new SalesController();

        this.router.get('/sales', verifyToken, objSalesC.getTodaySales)
        this.router.get('/paymentMethods', verifyToken, objSalesC.getPaymentMethods) //
        this.router.post('/sales/byMethod', verifyToken, objSalesC.setDailySales)    //
    }
}

module.exports = SalesRouter;
