const User_request = require('../models/user_request');
const jwt = require('jsonwebtoken');

class User_requestController {

    getAllUser_requests(req, res) {
        User_request.find((error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);

            }
        });

    }
    /*
        obtenerUsuario(req, res) {
            let id = req.params.id;
            Usuario.findById(id, (error, data) => {
                if (error) {
                    res.status(500).send();
                } else {
                    res.status(200).json(data);
                }
            })
        }
    */
    createUser_request(req, res) {
        let objUser_request = req.body;
        if (objUser_request.nick && objUser_request.email && objUser_request.user_cat) {
            User_request.create(objUser_request, (error, data) => {
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
    /*
        actualizarUsuario(req, res) {
            //let {id, nombre, apellido} = req.body;
            let id = req.params.id;
            Usuario.findByIdAndUpdate(id, req.body, (error, data) => {
                if (error) {
                    res.status(500).send();
                } else {
                    res.status(200).json(data);
                }
            });
        }
*/
    deleteUser_request(req, res) {
        let { id } = req.body;
        if (id != null && id != undefined && id != "") {
            User_request.findByIdAndRemove(id, (error, data) => {
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
    /*    
            buscarPorApellido(req, res) {
                let apellido = req.params.apellido;
                Usuario.find({ apellido }, (error, data) => {
                    if (error) {
                        res.status(500).send();
                    } else {
                        res.status(200).json(data);
                    }
                });
            }
        
            generarToken(req, res) {
                let token = jwt.sign({ nombre: "andres" }, "misionticUPBColombia");
                res.status(200).json({ token });
            }
        */
}

module.exports = User_requestController;