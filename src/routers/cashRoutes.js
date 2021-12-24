const express = require('express');
const CashController = require("../controllers/cashController");

class CashRouter {
    constructor() {
        this.router = express.Router();
        this.#config();
    };

    #config() {
        const objCashC = new CashController();

        //Crear rutas
        this.router.post('/cash/expense', objCashC.createExpense);
        this.router.get('/cash/expense', objCashC.getAllExpenses);
        this.router.post('/cash/deposit', objCashC.createDeposit);
        this.router.post('/cash/openReg', objCashC.openRegister);
        this.router.post('/cash/openReg', objCashC.closeRegister);
    };

}

module.exports = CashRouter;