//Importar dependencias
const jwt = require('jsonwebtoken');
//Importar Modulos
const User = require('../models/user');
const User_request = require('../models/user_request');
const { PRIVATE_KEY, TokenController } = require('./tokenController');

class UserController {
    // Antes de fefinir las funciones genero un objeto Token Controller para asi acceder a los metodos de esa clase
    objTokenC = new TokenController();


    //OK retorna el token con usuario autenticado
    login(req, res) {
        //Capturar datos del cuerpo de la petición
        let { email, password } = req.body;
        User.findOne({ email, password }, (error, data) => {
            if (error) {
                console.log(email, password); //borrar
                res.status(500).json({ error });
            } else {
                if (data != null && data != undefined) {
                    //Generar/crear token
                    let token = jwt.sign({ id: data._id, email: data.email }, PRIVATE_KEY);
                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ info: 'Credenciales inválidas' });
                }
            }
        });
    }

    //OK
    getAllUsers = (req, res) => {
        let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        //Insertar/crear el Usuario en la BD
        if (decode) {
            User.find((error, data) => {
                if (error) {
                    res.status(500).json({ info: error });
                } else {
                    res.status(201).json(data);
                }
            })
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }
    //para ser usado en el Alta de usuarios no se ha probado
    getAllUser_requests = (req, res) => {
        let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        //Insertar/crear el Usuario en la BD
        if (decode) {
            User_request.find((error, data) => {
                if (error) {
                    res.status(500).json({ info: error });
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
                    res.status(500).json({ info: error });
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