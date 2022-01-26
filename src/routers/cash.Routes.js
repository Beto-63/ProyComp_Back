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
        this.router.get('/cash/lastOpen', objCashC.getLastOpenTransaction);
        this.router.post('/cash/lastOpen/account', objCashC.setLastOpenAsAccounted);
        this.router.post('/cash/last/transaction', objCashC.setTransaction);
        this.router.get('/cash/lastClose', objCashC.getLastCloseTransaction);
        this.router.post('/cash/lastClose/account', objCashC.setLastCloseAsAccounted);
        this.router.get('/cash/sellTickets/unaccounted', objCashC.getUnAccoutedSellTickets);
        this.router.post('/cash/sellTicket/account', objCashC.setSellTicketAsAccounted);

    };

}

module.exports = CashRouter;