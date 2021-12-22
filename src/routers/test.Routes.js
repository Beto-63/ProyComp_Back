const { Router } = require('express');
const TestController = require('../controllers/testController');

const { verifyToken } = require('../middlewares/authJwt')

class TestRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        //Crear objeto UsuarioController
        const objTestC = new TestController();

        //Crear rutas
        this.router.get('/test', verifyToken, objTestC.test);

        //this.router.post('users/login/auth', authorizeRequest); por definir
    }

}

module.exports = TestRouter;