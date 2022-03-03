/**
 * Funciones requeridas:
 * 1. Ceracion de Stock Items                                       Probado     createItem
 * 2. Consultar todos los Items                                     Probado     getAllItems
 * 3. Consultar todos los Canales                                   Probado     getAllChannels
 * 4. Crea un canal                                                 PROBAR      createChannel
 * 5. Consulta de stockItems por Nombre (todas las ubicaciones)     Probado     getItemByName   
 * 6. Consulta de StockItems por categoria                          Probado     getItemsByCatName      
 * 7. Consulta de stockItem por nombre y por channel (ubicacion)   Probado     getItemByNameAndChannel 
 * 8. Consulta de stockItems por cat_name y por channel             FALTA       getItemByCatAndChannel
 * 9. Adicion de cantidad a stock (cantidad y ubicacion)            Probado     addQty
 *10. Ajuste de Item (excepto cantidad o cantidad/ ambos casos)     Probado     adjustItem
 *11. Traslado de cantidad de un stock item entre ubicaciones       Probado     transferQty
 *12. Consumo de Inventario (en linea / por venta) COMPLEJO             EN DEFINICION
 */





//Importar Modulos
const { findByIdAndUpdate, findOne } = require('../models/stock_item');
const StockItem = require('../models/stock_item');
const Product = require('../models/product');
const Combo = require('../models/combo');
const SellTicket = require('../models/sell_ticket');
const Channel = require('../models/channel')
const Reason = require('../models/adjustment')

const bringComboItems = async (name) => {
    let objs = await Combo.findOne({ name: name })
    return (objs.products)
}

const bringStockQty = async (name) => {
    let obj = await Product.findOne({ name: name })
    console.log("para", name, "descontar", obj.stock_qty)
    return { name_to_discount: obj.stock_name, qty_to_discount: obj.stock_qty }
}

const discountElement = async (arreglo) => {
    let objStock = {}
    let newQty = 0
    for (let index = 0; index < arreglo.length; index++) {
        const e = arreglo[index];
        objStock = await StockItem.findOne({ channel: e.channel, name: e.name })
        newQty = objStock.quantity - e.qty_to_discount
        StockItem.findByIdAndUpdate({ _id: objStock._id }, { quantity: newQty })
    }

}
class StockController {

    createItem = async (req, res) => {
        try {
            let { name, quantity, channel, cat_name, status } = req.body;
            //Insertar/crear el Stock Item en la BD
            const data = await StockItem.create({ name, quantity, channel, cat_name, status });
            res.status(201).json({ Info: 'Se creo el elemento inventariable' });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    };


    getAllItems = async (req, res) => {
        try {
            //recuperar la lista de todoslos canales
            const data = await StockItem.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }

    createChannel = async (req, res) => {
        try {
            let { name, status } = req.body;
            //Insertar/crear el un Canal de distribucion
            const data = await Channel.create({ name, status });
            res.status(201).json({ Info: 'Se creo el canal' });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    };

    getAllChannels = async (req, res) => {
        try {
            //recuperar la lista de todos los canales activos
            const data = await Channel.find({ status: 1 });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }

    adjustItem = async (req, res) => {
        try {
            let { id } = req.body;
            //Ajusta cualquier atributo del Stock Item: cantidad, status, nombre, ubicacion
            const data = await StockItem.findByIdAndUpdate({ _id: id }, req.body);
            res.status(201).json({ Info: 'Se ajustaron los datos del elemento inventariable' });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }

    adjustQuantity = async (req, res) => {
        try {
            let { id } = req.body;
            //Ajusta solo la cantidad del Stock Item
            //TODO Cuando se trate de cantidades guardar las cantidades ajustadas en una nueva coleccion
            const data = await StockItem.findByIdAndUpdate({ _id: id }, req.body);
            res.status(201).json({ Info: 'Se ajusto la cantidad en el inventario' });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }

    adjustReason = async (req, res) => {
        try {
            let { id } = req.body;
            //Ajusta solo la cantidad del Stock Item
            //TODO Cuando se trate de cantidades guardar las cantidades ajustadas en una nueva coleccion
            const data = await Reason.create(req.body);
            res.status(201).json({ Info: 'Se ajusto la cantidad en el inventario' });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }


    getItemsByName = async (req, res) => {
        try {
            let { name } = req.body;
            //recupera todos los items con el nombre especificado en todas las ubicaciones en la BD
            const data = await StockItem.find({ name: name });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }

    getItemsByCatName = async (req, res) => {
        try {
            let { cat_name } = req.body;
            //recupera todos los items con el nombre especificado en todas las ubicaciones en la BD
            const data = await StockItem.find({ cat_name: cat_name });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }

    getItemsByChannel = async (req, res) => {
        try {
            let { channel } = req.body;
            //recupera todos los items con el nombre especificado en todas las ubicaciones en la BD
            const data = await StockItem.find({ channel: channel });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        };
    }



    getItemByNameAndChannel = async (req, res) => {
        try {
            let { name, channel } = req.body;
            //retona el Stock Item que conicida Nombre y en una especifica ubicacion en la BD
            const data = await StockItem.findOne({ name: name, channel: channel });
            if (data.status == 1) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ Error: "El item del stock esta inactivo" })
            }
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    };

    getItemByCatNameAndChannel = async (req, res) => {
        try {
            let { cat_name, channel } = req.body;
            //retona los Stock Items que conicidan la categoria y una especifica ubicacion en la BD
            const data = await StockItem.find({ cat_name: cat_name, channel: channel });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
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
                res.status(404).json({ Error: "El item del stock esta inactivo" })
            }
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
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
                res.status(404).json({ Error: "El item del stock esta inactivo" })
            }
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    stockConsumption = async (req, res) => {
        console.log("lo que llega ", req.body)
        let comboItems = []
        let aDescontar = []
        try {
            const { channel, products } = req.body;
            for (const element of products) {
                if (element.cat_name !== 'Combo') {
                    console.log("sin combo", element)
                    aDescontar = [...aDescontar, { channel: channel, name: element.stock_name, qty_to_discount: (element.stock_qty * element.quantity) }]
                } else {
                    console.log("CON combo", element)
                    comboItems = await bringComboItems(element.combo_name)
                    console.log("Combo Items", comboItems)
                    for (let index = 0; index < comboItems.length; index++) {
                        let x = await bringStockQty(comboItems[index].name)
                        let multimplier = x.qty_to_discount
                        let nameStock = x.name_to_discount
                        aDescontar = [...aDescontar, { channel: channel, name: nameStock, qty_to_discount: (comboItems[index].quantity * element.quantity * element.stock_qty * multimplier) }]
                    }
                }
            }
            await discountElement(aDescontar)
            console.log("a descontar", aDescontar)

            res.status(201).json({ info: "Transferencia exitosa" });
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }

        //TODO al terminar este debo revisar la definicion de codigos res.status(###)
        // try {
        //     const { channel, products } = req.body;
        //     let aDescontar = []
        //     let deCombos = []
        //     let comboQtys = []
        //     try {
        //         for (const e of products) {
        //             if ((e.cat_name) === 'Combo') {
        //                 //let newCombo = await Combo.find({ name: e.combo_name })
        //                 deCombos = bringComboItems(e.combo_name)
        //                 console.log("desde el for each: deCombos =", deCombos)
        //                 comboQtys = [...comboQtys, e.quantity]
        //             } else {
        //                 aDescontar = [...aDescontar, { channel: channel, stock_name: e.stock_name, qty_to_discount: e.stock_qty * e.quantity }]
        //             }
        //         }
        //         console.log("deCombos ", deCombos, comboQtys)
        //         console.log("Lo que se va a descontar sin combos", aDescontar)
        //         deCombos.forEach((element, index) => {
        //             aDescontar = [...aDescontar, { channel: channel, stock_name: element.name, qty_to_discount: element.quantity * comboQtys[index] }]
        //         });
        //     } catch (error) {
        //         res.status(501).json({ Detalle: "No se logro desempacar la informacion de la venta" });
        //     }
        //     console.log(aDescontar)
        //     //falta el fetch
        //     res.status(201).json({ info: "Descontada venta del inventario" });

        // } catch (error) {
        //     res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        // }
    }
}

/**
         * Aun no se si hacerlos para ser corrido en el 
         * cierre o si debe ser corrido en cada venta
         * Esta version seria para cada venta
         */




module.exports = StockController;   