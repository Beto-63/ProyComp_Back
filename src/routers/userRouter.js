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
        this.router.get('/generatetoken', objUserC.generateToken);
        this.router.get('/users', objUserC.getAllUsers);
        this.router.get('/users/apellido/:apellido', objUserC.getUserByLastname);
        this.router.get('/users/:id', objUserC.getUserById);
        this.router.post('/users', objUserC.createUser);
        this.router.put('/users/:id', objUserC.updeteUser);
        this.router.delete('/users', objUserC.deleteUser);
    }

}

module.exports = UserRouter;