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
}

module.exports = User_requestController;