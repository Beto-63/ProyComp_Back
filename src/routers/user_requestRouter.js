const { Router } = require('express');
const User_requestController = require('../controllers/user_requestController');

class User_requestRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        //Crear objeto UsuarioController
        const objUser_requestC = new User_requestController();
        //Crear rutas
        this.router.get('/user_request', objUser_requestC.getAllUser_requests);
        //this.router.get('/usuarios/apellido/:apellido', objUsuarioC.buscarPorApellido);      
        //this.router.get('/usuarios/:id', objUsuarioC.obtenerUsuario);
        this.router.post('/user_request', objUser_requestC.createUser_request);
        //this.router.put('/usuarios/:id', objUsuarioC.actualizarUsuario);   
        //this.router.delete('/usuarios', objUsuarioC.eliminarUsuario);
    }

}

module.exports = User_requestRouter;