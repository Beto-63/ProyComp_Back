const {Router} = require('express');
const ClientController = require('../controllers/clientController');

class ClientRouter{
    constructor(){
        this.router = Router();
        this.#config();
    }
    #config(){
        const clientC = new ClientController;

        this.router.get('/client', clientC.getAllClients);
        this.router.post('/client', clientC.newClient);
        this.router.get('/client/:id', clientC.getClientById);
        this.router.put('/client/update', clientC.editClient);
    }
}
module.exports = ClientRouter;