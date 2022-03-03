const { Router } = require('express');
const Sell_ticketController = require('../controllers/sell_ticketController');

const { verifyToken } = require('../middlewares/authJwt');

class Sell_ticketRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        //Objeto tipo Sell_ticket controller
        const Sell_ticketC = new Sell_ticketController();
        //Configurando las rutas
        this.router.get('/sell_ticket', verifyToken, Sell_ticketC.getAllTickets);
        this.router.get('/origins', verifyToken, Sell_ticketC.getAllSaleOrigins);        //
        this.router.get('/sell_ticket/date', verifyToken, Sell_ticketC.getTicketByDate);
        this.router.post('/sell_ticket', verifyToken, Sell_ticketC.newTicket);           //
        this.router.get('/sell_ticket/:id', verifyToken, Sell_ticketC.getTicketById);
    }
}
module.exports = Sell_ticketRouter;