//Importar dependencias
const jwt = require('jsonwebtoken');
//Importar Modulos
const User = require('../models/user');
const { PRIVATE_KEY } = require('./tokenController');

class UserController {
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
    //OK pero sin Autenticacion Necedita autenticacion
    getAllUsers(req, res) {
        User.find((error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);

            }
        });
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
    // OK pero sin Autenticacion Necedita autenticacion
    createUser(req, res) {
        let objUser = req.body;
        if (objUser.nick && objUser.email && objUser.user_cat && objUser.password) {
            User.create(objUser, (error, data) => {
                if (error) {
                    res.status(500).send();
                } else {
                    res.status(201).json(data);
                }
            });
        } else {
            res.status(400).send();
        }

    }
    //OK pero sin Autenticacion Necedita autenticacion
    updeteUser(req, res) {
        //let {id, nombre, apellido} = req.body;
        let id = req.params.id;
        User.findByIdAndUpdate(id, req.body, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        });
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