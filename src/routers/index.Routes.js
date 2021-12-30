const express = require('express');

class IndexRouter {
    constructor() {
        this.router = express.Router();
        this.#config();
    }

    #config() {
        this.router.get('/', (req, res) => {
            res.status(200).json({ mensaje: 'Conexión exitosa' });
        });
    }
}

module.exports = IndexRouter;