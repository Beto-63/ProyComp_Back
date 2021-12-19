/**
 * Funciones requeridas
 * 1. Ceracion de productos            Probado
 * 2. Modificacion de Productos 
 */

// Importar Modulos
const Product = require('../models/product');

class ProductController {
    createProduct = (req, res) => {
        let { name, description, price, cat_id, img_url, stock_id, stock_qty, status } = req.body;
        //let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        let decode = true  //borrar al activar seguridad
        //Insertar/crear el producto para venta en la BD
        if (decode) {
            Product.create({ name, description, price, cat_id, img_url, stock_id, stock_qty, status }, (error, data) => {
                if (error) {
                    res.status(500).json({ info: error });
                } else {
                    res.status(200).json(data);
                }
            });
        } else {
            res.status(500).json({ info: 'Operacion No Autorizada' });
        };
    };
};

module.exports = ProductController

