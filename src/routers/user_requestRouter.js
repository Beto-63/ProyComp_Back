const { Router } = require('express');
const User_requestController = require('../controllers/user_requestController');
class User_requestRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        //Crear objeto User_requestC
        const objUser_requestC = new User_requestController();
        //Crear rutas
        this.router.get('/user_request', objUser_requestC.getAllUser_requests);
        this.router.post('/user_request', objUser_requestC.createUser_request);
        this.router.delete('/user_request', objUser_requestC.deleteUser_request);
    }
}

module.exports = User_requestRouter;