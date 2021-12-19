/**
 * Funciones requeridas:
 * 1. Ceracion de Stock Items                                   Probado     createItem
 * 2. Adicionde cantidad a stock (cantidad y ubicacion)         In Progress addQty
 * 3. Consulta de todosd los stock items                        In Progress getAllItems
 * 4. Consulta del stock item por id (todas las ubicaciones)    In Progress getItemById
 * 5. Consulta de stock Item por id y por channel (ubicacion)   In Progress getItemByChannelId
 * 6. Traslado de cantidad de un stock item entre ubicaciones   Pend
 * 7. Consumo de Inventario (en linea / por venta)              Pend
 * 8. Ajuste de Inventario (por impresicion en la preparacion)  In Progress adjustItem
 * 9. Ajuste de Item (nombre, estado)                           In Progress adjustItem
 */





//Importar Modulos
const StockItem = require('../models/stock_item');



class StockController {

    createItem = (req, res) => {
        let { name, quantity, channel, status } = req.body;
        //let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        let decode = true  //borrar al activar seguridad
        //Insertar/crear el Stock Item en la BD
        if (decode) {
            StockItem.create({ name, quantity, channel, status }, (error, data) => {
                if (error) {
                    res.status(500).json({ info: error });
                } else {
                    res.status(201).json(data);
                }
            });
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }

    getAllItems = (req, res) => {
        //let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        let decode = true;    //borrar al activar seguridad
        //recuperar la lista de todos los Stock Item en la BD
        if (decode) {
            StockItem.find((error, data) => {
                if (error) {
                    res.status(500).json({ info: error });
                } else {
                    res.status(201).json(data);
                }
            })
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }

    getItemById = (req, res) => {
        let id = req.params.id;
        //let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        let decode = true;    //borrar al activar seguridad
        //recupera todos los items con el Id especificado en todas las ubicaciones en la BD
        if (decode) {
            StockItem.findById(id, (error, data) => {
                if (error) {
                    res.status(500).json({ info: error });
                } else {
                    res.status(201).json(data);
                }
            })
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }

    getItemByChannelId = (req, res) => {
        let { id, channel } = req.body;
        //let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        let decode = true;    //borrar al activar seguridad
        //retona el Stock Item que conicida Id y en una especifica ubicacion en la BD
        if (decode) {
            StockItem.find({ id, channel }, (error, data) => {
                if (error) {
                    res.status(500).json({ info: error });
                } else {
                    res.status(201).json(data);
                }
            })
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }

    addQty = (req, res) => {
        let { id, channel, qty } = req.body;
        //let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        let decode = true;    //borrar al activar seguridad
        //Adicionaal Stock Item la cantidad especificada para una ubicacion en particular en la BD
        if (decode) {
            StockItem.find({ id, channel }, (error, data) => {
                if (error) {
                    res.status(500).json({ infoFind: error });
                } else {
                    data.qty = + qty
                    StockItem.findByIdAndUpdate(id, data, (err, out) => {
                        if (err) {
                            res.status(500).json({ infoUpdate: err })
                        } else {
                            res.status(201).json(out);
                        }
                    }
                    )

                }
            })
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }

    adjustItem = (req, res) => {
        let { id, channel } = req.body;
        //let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);  // este decode.id me provee el id para verificarw si es un 'admin'
        let decode = true;    //borrar al activar seguridad
        //Ajusta cualquier atributo del Stock Item: status, nombre, ubicacion
        if (decode) {
            StockItem.findOneAndUpdate({ id, channel }, req.body, (error, data) => {
                if (error) {
                    res.status(500).json({ info: error });
                } else {
                    res.status(201).json(data);
                }
            })
        } else {
            res.status(500).json({ info: 'Operacion No autorizada' });
        };
    }
};

module.exports = StockController;   