const { Router } = require('express');
const ClientController = require('../controllers/clientController');

const { verifyToken } = require('../middlewares/authJwt');

class ClientRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        const clientC = new ClientController;

        this.router.get('/client', verifyToken, clientC.getAllClients);
        this.router.post('/client', verifyToken, clientC.newClient);         //
        this.router.get('/client/:id', verifyToken, clientC.getClientById);
        this.router.put('/client/update', verifyToken, clientC.editClient);
    }
}
module.exports = ClientRouter;