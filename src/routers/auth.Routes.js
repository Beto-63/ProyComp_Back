const { Router } = require('express');
const AuthController = require('../controllers/authController');

class AuthRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        //Crear objeto UsuarioController
        const objAuthC = new AuthController();

        //Crear rutas
        this.router.post('/register', objAuthC.signUp); // Temporalmente aquí (organizar en el userController)
        this.router.post('/login', objAuthC.signIn);
        this.router.get('/logout', objAuthC.signOut);

        //this.router.post('users/login/auth', authorizeRequest); por definir
    }

}

module.exports = AuthRouter;