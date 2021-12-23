const { Router } = require('express');
const UserController = require('../controllers/userController');

class UserRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        //Crear objeto UsuarioController
        const objUserC = new UserController();
        //Crear rutas
        this.router.get('/users', objUserC.getAllUsers);
        this.router.get('/users/:id', objUserC.getUserById);
        this.router.post('/users', objUserC.createUser);
        this.router.put('/users/:id', objUserC.updateUser);
        this.router.delete('/users', objUserC.deleteUser);
        //this.router.post('/users/login', objUserC.login);

        //this.router.post('users/login/auth', authorizeRequest); por definir
    }

}

module.exports = UserRouter;