/**
 * Funciones requeridas:
 * 1. Ceracion de Stock Items                                   Probado
 * 2. Adicionde cantidad a stock (cantidad y unicacion)         pend
 * 3. Consulta de todosd los stock items                        In Progress sin ruta
 * 4. Consulta del stock item por id (todas las ubicaciones)    Pend
 * 5. Consulta de stock Item por id y por channel (ubicacion)   Pend
 * 6. Traslado de cantidad de un stock item entre ubicaciones   Pend
 * 7. Consumo de Inventario (en linea / por venta)              Pend
 * 8. Ajuste de Inventario (por impresicion en la preparacion)  Pend
 * 9. Ajuste de Item (nombre, estado)                           Pend
 */





//Importar Modulos
const StockItem = require('../models/stockItem');



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
        //Insertar/crear el Stock Item en la BD
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
};

module.exports = StockController;   