/**
 * Funciones requeridas
 * 1. Ceracion de productos                             Probado
 * 2. listar productos por categoria                    Probado
 * 3. listar productos por categoria y temperatura      Probado
 * 4. Modificacion de Productos                         Probado
 * 5. crear Combo                                       Probado     En desarrollo
 * 6. modificar combo                                   Probado     En desarrollo
 * 7. Crear Categorias de producto
 * 8. Obtener Categorias de Producto
 * 9. obtener detalles del producto por nombre
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
            res.status(201).json({ info: 'Se ha creado en producto' });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    };

    getProductInfo = async (req, res) => {
        try {
            //Obtener los detalles de un producto
            //let { name } = req.body;
            const data = await Product.findOne(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    };


    createCombo = async (req, res) => {
        try {
            let { name, product_id, contents, status } = req.body;
            //Insertar/crear un combo o conjunto de productos
            const data = await Combo.create({ name, product_id, contents, status });
            res.status(201).json({ Info: 'se ha creado el combo' });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    };

    adjustProduct = async (req, res) => {
        try {
            let { id } = req.body;
            //Ajustar/crear el producto para venta en la BD
            const data = await Product.findByIdAndUpdate(id, req.body);
            res.status(201).json({ Info: "El producto ha sido ajustado" });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    };

    adjustCombo = async (req, res) => {
        try {
            let { _id } = req.body;
            console.log(_id)
            //Ajustar/ajusta los combos en la BD
            const data = await Combo.findByIdAndUpdate(_id, req.body);
            res.status(201).json({ Info: "El combo ha sido ajustado" });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
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
                    res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
                };
            } else {
                res.status(404).json({ Error: "Categoria Invalida" })
            }
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
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
                    res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
                };
            } else {
                res.status(404).json({ Error: "Categoria Invalida" })
            }
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    };

    getProductsByCatName = async (req, res) => {
        try {
            let { cat_name } = req.body;
            //recupera todos los items con el nombre especificado en todas las ubicaciones en la BD
            const data = await Product.find({ cat_name: cat_name });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }

    getAllCategories = async (req, res) => {
        try {
            const data = await Category.find()
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    };

    createCategory = async (req, res) => {

        try {
            let { name, status } = req.body;
            //Insertar/crear una nueva categoria de Producto
            const data = await Category.create({ name, status });
            res.status(201).json({ Info: 'Categoria creada' });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }
};

module.exports = ProductController

