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

    createProduct = async (req, res) => {
        try {
            let { name, description, price, cat_name, temperature, img_url, stock_name, stock_qty, status } = req.body;
            //Insertar/crear el producto para venta en la BD
            const data = await Product.create({ name, description, price, cat_name, temperature, img_url, stock_name, stock_qty, status });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ info: error });
        };
    };

    adjustProduct = async (req, res) => {
        try {
            let { id } = req.body;
            //Ajustar/crear el producto para venta en la BD
            const data = await Product.findByIdAndUpdate(id, req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ info: error });
        };
    };

    selectByCategory = async (req, res) => {
        try {
            let { cat_name } = req.body;
            //busca todos los productos de una categoria 
            const data = await Product.find({ cat_name: cat_name });
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ info: error });
        };
    };

    selectByCatAndTemp = async (req, res) => {
        try {
            let { cat_name, temperature } = req.body;
            console.log(cat_name, temperature)
            //busca todos los productos de una categoria y una temperatura 
            const data = await Product.find({ cat_name: cat_name, temperature: temperature });
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ info: error });
        };
    };
};

module.exports = ProductController

