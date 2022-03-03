const express = require('express');
const CashController = require("../controllers/cashController");

const { verifyToken } = require('../middlewares/authJwt');

class CashRouter {
    constructor() {
        this.router = express.Router();
        this.#config();
    };

    #config() {
        const objCashC = new CashController();

        //Crear rutas
        this.router.post('/cash/expense', verifyToken, objCashC.createExpense);                              //
        this.router.post('/cash/expense/unaccounted', verifyToken, objCashC.getUnAccountedExpenses);         //
        this.router.post('/cash/expense/account', verifyToken, objCashC.setExpenseAsAccounted);              //
        this.router.post('/cash/deposit/unaccounted', verifyToken, objCashC.getUnAccountedDeposits);         //
        this.router.post('/cash/deposit/account', verifyToken, objCashC.setDepositsAsAccounted);             //
        this.router.post('/cash/deposit', verifyToken, objCashC.createDeposit);                              //
        this.router.post('/cash/lastOpen', verifyToken, objCashC.getLastOpenTransactionByChannel);
        this.router.post('/cash/lastOpen/account', verifyToken, objCashC.setLastOpenAsAccounted);            //
        this.router.post('/cash/last/transaction', verifyToken, objCashC.setTransaction);                    //
        this.router.post('/cash/lastClose', verifyToken, objCashC.getLastCloseTransactionByChannel);
        this.router.post('/cash/lastClose/account', verifyToken, objCashC.setLastCloseAsAccounted);          //
        this.router.get('/cash/sellTickets/unaccounted', verifyToken, objCashC.getUnAccoutedSellTickets);    //
        this.router.post('/cash/sellTicket/account', verifyToken, objCashC.setSellTicketAsAccounted);        //

    };

}

module.exports = CashRouter;
// TODO el cierre de caja esta solo para arsenal, hay que probarlo para cada canal se videncian en getlastopentransactionbychannel
//pero puede ser para todas las transacciones consignaciones y gastos