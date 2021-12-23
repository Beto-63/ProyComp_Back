/**
 * Funciones requeridas:
 * 1. Ceracion de Stock Items                                       Probado     createItem
 * 2. Adicionde cantidad a stock (cantidad y ubicacion)             Probado     addQty
 * 3. Consulta de todod los stock items                             Probado     getAllItems 
 * 4. Consulta del stockItem por Nombre (todas las ubicaciones)     Probado     getItemByName         Falla
 * 5. Consulta de stock Item por nombre y por channel (ubicacion)   Probado     getItemByChannelId  Tengo problema de conceptualizacion id es unico 
 * 6. Traslado de cantidad de un stock item entre ubicaciones       in progress transferQty
 * 7. Consumo de Inventario (en linea / por venta) COMPLEJO         Pend
 * 8. Ajuste de Inventario (por impresicion en la preparacion)      Probado     adjustItem
 * 9. Ajuste de Item (nombre, estado)                               Probado     adjustItem
 */





//Importar Modulos
const { findByIdAndUpdate } = require('../models/stock_item');
const StockItem = require('../models/stock_item');



class StockController {

    createItem = async (req, res) => {
        try {
            let { name, quantity, channel, status } = req.body;
            //Insertar/crear el Stock Item en la BD
            const data = await StockItem.create({ name, quantity, channel, status });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ info: error });
        }
    };


    getAllItems = async (req, res) => {
        try {
            //recuperar la lista de todos los Stock Item en la BD
            const data = await StockItem.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ info: error });
        };
    }

    adjustItem = async (req, res) => {
        try {
            let { id, channel } = req.body;
            //Ajusta cualquier atributo del Stock Item: cantidad, status, nombre, ubicacion
            const data = await StockItem.findOneAndUpdate({ _id: id, channel: channel }, req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ info: error });
        };
    }

    getItemsByName = async (req, res) => {
        try {
            let { name } = req.body;
            //recupera todos los items con el nombre especificado en todas las ubicaciones en la BD
            const data = await StockItem.find({ name: name });
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ info: error });
        };
    }

    getItemByNameAndChannel = async (req, res) => {
        try {
            let { name, channel } = req.body;
            //retona el Stock Item que conicida Nombre y en una especifica ubicacion en la BD
            const data = await StockItem.findOne({ name: name, channel: channel });
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ info: error });
        }
    }

    addQty = async (req, res) => {
        try {
            let { name, channel, qty } = req.body;
            const data = await StockItem.findOne({ name, channel });
            data.quantity = data.quantity + qty;
            await StockItem.findByIdAndUpdate(data._id, data);
            res.status(201).json({ info: "Actualizacion exitosa" });
        } catch (error) {
            res.status(400).json({ info: error });
        };
    }

    transferQty = async (req, res) => {

        try {
            let { name, source, destination, qty } = req.body
            console.log(name, source, destination, qty);
            const data = await StockItem.findOne({ name, source });
            console.log("data 1 Original: ", data);
            data.quantity = data.quantity - qty;
            console.log("data 1 restado: ", data);
            //console.log("data.quantity", data.quantity);
            await StockItem.findByIdAndUpdate(data._id, data);
            data = {};
            //res.status(201).json({ info: "Disminucion exitosa" });
            try {
                const data2 = await StockItem.findOne({ name, destination });
                console.log("data 2 Original: ", data2);
                data2.quantity = data2.quantity + qty;
                //console.log("data2.quantity", data2.quantity)
                console.log("data 2 adicionado: ", data2);
                await StockItem.findByIdAndUpdate(data2._id, data2);
                res.status(201).json({ info: "Adicion exitosa" });
            } catch (error) {
                res.status(400).json({ info: error });
            }

        } catch (error) {

        }
    }

};

module.exports = StockController;   