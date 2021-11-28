const User = require('../models/user');
const jwt = require('jsonwebtoken');

class UserController {

    getAllUsers(req, res) {
        User.find((error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);

            }
        });

    }

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

    createUser(req, res) {
        let objUser = req.body;
        if (objUser.nombre && objUser.apellido) {
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

    deleteUser(req, res) {
        let { id } = req.body;
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

    getUserByLastname(req, res) {
        let apellido = req.params.apellido;
        User.find({ apellido }, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        });
    }

    generateToken(req, res) {
        let token = jwt.sign({ nombre: "andres" }, "misionticUPBColombia");
        res.status(200).json({ token });
    }
}

module.exports = UserController;