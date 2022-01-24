/**
 * Funciones requeridas:
 * 1. Ceracion de Stock Items                                       Probado     createItem
 * 2. Adicion de cantidad a stock (cantidad y ubicacion)            Probado     addQty
 * 3. Consulta de todod los stock items                             Probado     getAllItems 
 * 4. Consulta del stockItem por Nombre (todas las ubicaciones)     Probado     getItemByName        
 * 5. Consulta de stock Item por nombre y por channel (ubicacion)   Probado     getItemByChannelId  
 * 6. Traslado de cantidad de un stock item entre ubicaciones       Probado     transferQty
 * 7. Consumo de Inventario (en linea / por venta) COMPLEJO         Pend        Ya funciona para productos NO para COMBOS
 * 8. Ajuste de Inventario (por impresicion en la preparacion)      Probado     adjustItem
 * 9. Ajuste de Item (nombre, estado)                               Probado     adjustItem
 *10. Consulta del stockItem por categoria (todas las ubicaciones) 
*/





//Importar Modulos
const { findByIdAndUpdate, findOne } = require('../models/stock_item');
const StockItem = require('../models/stock_item');
const Product = require('../models/product');
const Combo = require('../models/combo');
const SellTicket = require('../models/sell_ticket');
const Channel = require('../models/channel')


class StockController {

    createItem = async (req, res) => {
        try {
            let { name, quantity, channel, cat_name, status } = req.body;
            //Insertar/crear el Stock Item en la BD
            const data = await StockItem.create({ name, quantity, channel, cat_name, status });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ info: error });
        }
    };


    getAllItems = async (req, res) => {
        try {
            //recuperar la lista de todoslos canales
            const data = await StockItem.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ info: error });
        };
    }

    createChannel = async (req, res) => {
        try {
            let { name, status } = req.body;
            //Insertar/crear el un Canal de distribucion
            const data = await Channel.create({ name, status });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ info: error });
        }
    };

    getAllChannels = async (req, res) => {
        try {
            //recuperar la lista de todos los canales activos
            const data = await Channel.find({ status: 1 });
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ info: error });
        };
    }

    adjustItem = async (req, res) => {
        try {
            let { id } = req.body;
            //Ajusta cualquier atributo del Stock Item: cantidad, status, nombre, ubicacion
            const data = await StockItem.findByIdAndUpdate({ _id: id }, req.body);
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

    getItemsByCatName = async (req, res) => {
        try {
            let { cat_name } = req.body;
            //recupera todos los items con el nombre especificado en todas las ubicaciones en la BD
            const data = await StockItem.find({ cat_name: cat_name });
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
            if (data.status == 1) {
                res.status(201).json(data);
            } else {
                res.json({ Error: "El item del stock esta inactivo" })
            }
        } catch (error) {
            res.status(400).json({ info: error });
        }
    }

    addQty = async (req, res) => {
        try {
            let { name, channel, qty } = req.body;
            const data = await StockItem.findOne({ name, channel });
            if (data.status == 1) {
                data.quantity = data.quantity + qty;
                await StockItem.findByIdAndUpdate({ _id: data.id }, data);
                res.status(201).json({ info: "Actualizacion exitosa" });
            } else {
                res.json({ Error: "El item del stock esta inactivo" })
            }
        } catch (error) {
            res.status(400).json({ info: error });
        };
    }

    transferQty = async (req, res) => {

        try {
            let { name, source, destination, qty } = req.body;
            const data = await StockItem.findOne({ name: name, channel: source });
            const data2 = await StockItem.findOne({ name: name, channel: destination });
            if (data.status == 1 && data2.status == 1) {
                data.quantity = data.quantity - qty;
                await StockItem.findOneAndUpdate({ _id: data._id }, data);
                data2.quantity = data2.quantity + qty;
                await StockItem.findOneAndUpdate({ _id: data2._id }, data2);
                res.status(201).json({ info: "Transferencia exitosa" });
            } else {
                res.json({ Error: "El item del stock esta inactivo" })
            }
        } catch (error) {
            res.status(400).json({ info: error });
        }
    }

    stockConsumption = async (req, res) => {

        try {
            const { sell_ticket_id, channel } = req.body;
            let objSellTicket, objProduct, objStock, objCombo = {}
            let consumption = null
            objSellTicket = await SellTicket.findOne({ _id: sell_ticket_id });
            console.log("Sell Ticket", objSellTicket);
            objSellTicket.products_sold.forEach(async (element) => {
                objProduct = await Product.findById({ _id: element[0] });
                console.log("producto = ", objProduct);
                if (objProduct.cat_name != 'combo') {
                    console.log("producto, cantidad, precio =", element[0], element[1], element[2])

                    objStock = await StockItem.findOne({ name: objProduct.stock_name, channel: channel });
                    console.log("stock item", objStock);
                    consumption = element[1] * objProduct.stock_qty;
                    console.log("consumption", consumption);
                    objStock.quantity = objStock.quantity - consumption;
                    console.log("Nueva Cantidad", objStock.quantity)
                    await StockItem.findOneAndUpdate({ name: objProduct.stock_name, channel: channel }, objStock);
                }
                // Aqui debo descomponer el combo y repetir lo de arriba para cada elemento
                else {
                    objCombo = await Combo.findById({ _id: element[0] });
                    console.log("Combo", objCombo);
                    //     objCombo = await Combo.findOne()
                    //     console.log("combo", objCombo)
                };
                res.status(201).json({ info: "Descontada venta del inventario" });
            });
        } catch (error) {
            res.status(400).json({ info: error });
        }
    }
}

/**
         * Aun no se si hacerlos para ser corrido en el 
         * cierre o si debe ser corrido en cada venta
         * Esta version seria para cada venta
         */




module.exports = StockController;   