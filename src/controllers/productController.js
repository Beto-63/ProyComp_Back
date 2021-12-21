/**
 * Funciones requeridas
 * 1. Ceracion de productos                             Probado
 * 2. listar productos por categoria                    Probado
 * 3. listar productos por categoria y temperatura      Probado
 * 4. Modificacion de Productos                         Probado
 */

// Importar Modulos
const Product = require('../models/product');

class ProductController {
    createProduct = (req, res) => {
        let { name, description, price, cat_name, temperature, img_url, stock_name, stock_qty, status } = req.body;
        //Insertar/crear el producto para venta en la BD
        Product.create({ name, description, price, cat_name, temperature, img_url, stock_name, stock_qty, status }, (error, data) => {
            if (error) {
                res.status(500).json({ info: error });
            } else {
                res.status(200).json(data);
            }
        });

    };

    adjustProduct = (req, res) => {
        let { id } = req.body;
        //Ajustar/crear el producto para venta en la BD
        Product.findByIdAndUpdate(id, req.body, (error, data) => {
            if (error) {
                res.status(500).json({ info: error });
            } else {
                res.status(200).json(data);
            }
        });
    };

    selectByCategory = (req, res) => {
        let { cat_name } = req.body;
        //busca todos los productos de una categoria 
        Product.find({ cat_name: cat_name }, (error, data) => {
            if (error) {
                res.status(500).json({ info: error });
            } else {
                res.status(200).json(data);
            }
        });

    };

    selectByCatAndTemp = (req, res) => {
        let { cat_name, temperature } = req.body;
        console.log(cat_name, temperature)
        //busca todos los productos de una categoria y una temperatura 
        Product.find({ cat_name: cat_name, temperature: temperature }, (error, data) => {
            if (error) {
                res.status(500).json({ info: error });
            } else {
                res.status(200).json(data);
            }
        });

    };
};

module.exports = ProductController

