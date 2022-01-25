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
        this.router.get('/cash/expense/unaccounted', objCashC.getUnAccountedExpenses);
        this.router.post('/cash/expense/account', objCashC.setExpenseAsAccounted);
        this.router.get('/cash/deposit/unaccounted', objCashC.getUnAccountedDeposits);
        this.router.post('/cash/deposit/account', objCashC.setDepositsAsAccounted);
        this.router.post('/cash/deposit', objCashC.createDeposit);
        this.router.post('/cash/deposit/find', objCashC.getDepositsByDate); // no se requeriran

    };

}

module.exports = CashRouter;