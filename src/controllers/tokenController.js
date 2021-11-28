const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

class TokenController {
    constructor() {
        this.verifyAuth = this.verifyAuth.bind(this);
    }

    verifyAuth(req, res, next) {
        let token = this.getToken(req);
        let decode = jwt.decode(token, PRIVATE_KEY);
        if (decode != null && decode != undefined) {
            next();
        } else {
            res.status(401).json({ info: 'Requiere autenticación' });
        }
    }

    getToken(req) {
        //Crear variable que me representa el token
        let token = null;
        //Obtener cabecera de la petición
        let authorization = req.headers.authorization;
        //Validar
        if (authorization != null && authorization != undefined) {
            let arrayAuth = authorization.split(" ");
            token = arrayAuth[1];
        }

        return token;
    }
}

module.exports = {
    TokenController,
    PRIVATE_KEY
}