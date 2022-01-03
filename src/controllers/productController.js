/**
 * Funciones requeridas
 * 1. Ceracion de productos                             Probado
 * 2. listar productos por categoria                    Probado
 * 3. listar productos por categoria y temperatura      Probado
 * 4. Modificacion de Productos                         Probado
 * 5. crear Combo                                       Probado
 * 6. modificar combo                                   Probado
 */

// Importar Modulos
const Product = require('../models/product');
const Combo = require('../models/combo');
const Category = require('../models/category')


class ProductController {

    createProduct = async (req, res) => {
        try {
            let { product_id, name, description, price, cat_name, temperature, img_url, stock_name, stock_qty, status } = req.body;
            //Insertar/crear el producto para venta en la BD
            const data = await Product.create({ product_id, name, description, price, cat_name, temperature, img_url, stock_name, stock_qty, status });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ info: error });
        };
    };

    createCombo = async (req, res) => {
        try {
            let { name, product_id, contents, status } = req.body;
            //Insertar/crear un combo o conjunto de productos
            const data = await Combo.create({ name, product_id, contents, status });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ info: error }); S
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

    adjustCombo = async (req, res) => {
        try {
            let { _id } = req.body;
            console.log(_id)
            //Ajustar/ajusta los combos en la BD
            const data = await Combo.findByIdAndUpdate(_id, req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ info: error });
        };
    };

    selectByCategory = async (req, res) => {
        try {
            const { cat_name } = req.body;
            let catObj = await Category.findOne({ name: cat_name });
            //Si la categoria esta activa devuelve la busqueda
            if (catObj.status == 1) {
                try {

                    //busca todos los productos de una categoria 
                    const data = await Product.find({ cat_name: cat_name });
                    res.status(200).json(data);
                } catch (error) {
                    res.status(400).json({ info: error });
                };
            } else {
                res.json({ Error: "Categoria Invalida" })
            }
        } catch (error) {
            res.status(400).json({ info: error });
        }
    };

    selectByCatAndTemp = async (req, res) => {
        try {
            let { cat_name, temperature } = req.body;
            let catObj = await Category.findOne({ name: cat_name });
            //Si la categoria esta activa devuelve la busqueda
            if (catObj.status == 1) {
                try {
                    //busca todos los productos de una categoria y una temperatura 
                    const data = await Product.find({ cat_name: cat_name, temperature: temperature });
                    res.status(200).json(data);
                } catch (error) {
                    res.status(400).json({ info: error });
                };
            } else {
                res.json({ Error: "Categoria Invalida" })
            }
        } catch (error) {
            res.status(400).json({ info: error });
        }
    };
};

module.exports = ProductController

