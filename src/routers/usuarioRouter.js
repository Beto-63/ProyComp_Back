const {Router} = require('express');
const UsuarioController = require('../controllers/usuarioController');

class UsuarioRouter{
    constructor(){
        this.router = Router();
        this.#config();
    }
    #config(){
        //Crear objeto UsuarioController
        const objUsuarioC = new UsuarioController();
        //Crear rutas
        this.router.get('/generartoken', objUsuarioC.generarToken);
        this.router.get('/usuarios', objUsuarioC.obtenerTodoLosUsuarios);  
        this.router.get('/usuarios/apellido/:apellido', objUsuarioC.buscarPorApellido);      
        this.router.get('/usuarios/:id', objUsuarioC.obtenerUsuario);
        this.router.post('/usuarios', objUsuarioC.crearUsuario);   
        this.router.put('/usuarios/:id', objUsuarioC.actualizarUsuario);   
        this.router.delete('/usuarios', objUsuarioC.eliminarUsuario); 
    }

}

module.exports = UsuarioRouter;