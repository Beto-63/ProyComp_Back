//Importar dependencias
const jwt = require('jsonwebtoken');
//Importar Modulos
const User = require('../models/user');

const { PRIVATE_KEY, TokenController } = require('./tokenController');

class UserController {
    // Antes de fefinir las funciones genero un objeto Token Controller para asi acceder a los metodos de esa clase
    objTokenC = new TokenController();


    //OK
    getAllUsers = (req, res) => {
        let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        //Insertar/crear el Usuario en la BD
        if (decode) {
            User.find((error, data) => {
                if (error) {
                    res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
                } else {
                    res.status(201).json(data);
                }
            })
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }

    //OK pero sin Autenticacion Necedita autenticacion
    getUserById(req, res) {
        let id = req.params.id;
        User.findById(id, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }

    // OK 
    createUser = (req, res) => {
        let { nick, email, password, user_cat } = req.body;
        let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        //Insertar/crear el Usuario en la BD
        if (decode) {
            User.create({ nick, email, password, user_cat }, (error, data) => {
                if (error) {
                    res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
                } else {
                    res.status(201).json(data);
                }
            });
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }

    //OK pero sin probar autenticacion
    updeteUser = (req, res) => {
        //let {id, nombre, apellido} = req.body;
        let id = req.params.id;
        let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        //Insertar/crear el Usuario en la BD
        if (decode) {
            User.findByIdAndUpdate(id, req.body, (error, data) => {
                if (error) {
                    res.status(500).send();
                } else {
                    res.status(200).json(data);
                }
            });
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }

    //OK pero sin Autenticacion, la peticion viene en json no en la ruta.  Necedita autenticacion
    deleteUser(req, res) {
        let { id } = req.body;
        console.log(req.body);
        if (id != null && id != undefined && id != "") {
            User.findByIdAndRemove(id, (error, data) => {
                if (error) {
                    res.status(500).send();
                } else {
                    res.status(200).json(data);
                }
            });
        } else {
            res.status(400).send();
        }
    }
}

module.exports = UserController;