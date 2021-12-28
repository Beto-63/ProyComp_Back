const {Router} = require('express');
const Sell_ticketController = require('../controllers/sell_ticketController');

class Sell_ticketRouter{
    constructor(){
        this.router = Router();
        this.#config();
    }
    #config(){
        //Objeto tipo Sell_ticket controller
        const Sell_ticketC = new Sell_ticketController();
        //Configurando las rutas
        this.router.get('/sell_ticket', Sell_ticketC.getAllTickets);
        this.router.post('/sell_ticket', Sell_ticketC.newTicket);
        this.router.get('/sell_ticket/date', Sell_ticketC.getTicketByDate);
    }
}
module.exports = Sell_ticketRouter;