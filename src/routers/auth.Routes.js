const { Router } = require('express');
const AuthController = require('../controllers/authController');

const { verifyToken } = require('../middlewares/authJwt');

class AuthRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        //Crear objeto UsuarioController
        const objAuthC = new AuthController();

        //Crear rutas
        //this.router.post('/register', objAuthC.signUp); // Temporalmente aquí (organizar en el userController)
        this.router.post('/login', objAuthC.signIn);
        this.router.get('/logout', objAuthC.signOut);


        // Generar link de recuperación de contraseña
        this.router.post('/lost-password', objAuthC.generateNewTempPassword);

        // Valido si puedo mostrar el formulario o no
        this.router.get('/recovery/:token', objAuthC.passwordResetRequest);

        // Recibo los datos de recuperación de la contraseña
        this.router.post('/recovery', objAuthC.passwordReset);

        // Valida el token para permitir navegación en el frontend
        this.router.get('/verify', verifyToken, objAuthC.verifyNavigation);

        //this.router.post('users/login/auth', authorizeRequest); por definir
    }

}

module.exports = AuthRouter;