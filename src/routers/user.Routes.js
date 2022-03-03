const { Router } = require('express');
const UserController = require('../controllers/userController');

const { verifyToken } = require('../middlewares/authJwt');

class UserRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        //Crear objeto UsuarioController
        const objUserC = new UserController();
        //Crear rutas
        this.router.get('/users', verifyToken, objUserC.getAllUsers);
        this.router.get('/users/:id', verifyToken, objUserC.getUserById);
        this.router.post('/users', verifyToken, objUserC.createUser);                //
        this.router.put('/users', verifyToken, objUserC.updateUser);                 //
        this.router.delete('/users', verifyToken, objUserC.deleteUser);
        this.router.get('/user/cats', verifyToken, objUserC.getAllUserCats);         //
        this.router.post('/user/byEmail', verifyToken, objUserC.getUserByEmail);     //

        //this.router.post('/users/login', objUserC.login);

        //this.router.post('users/login/auth', authorizeRequest); por definir
    }

}

module.exports = UserRouter;