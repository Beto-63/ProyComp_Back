/**
 * Funcionalidades
 * 1. Guardar la ventas del dia  totales y por payment method           Probado
 * 2. Reporte de ventas cerradas por dia (desde - hasta) y canal
 * 3. Ventas desde la Ultima apertura por canal                         sin Vanal Ok
 * 
 */


// Importar Modulos
const Sales = require('../models/daily_sales');
const SellTicket = require('../models/sell_ticket');

class SalesController {

    setDailySales = async (req, res) => {
        try {
            /**Vamos a recibir dos arreglos:
             *      Uno con los "sell-tickes" del dia del cierre y (Arreglo de Objetos)
             *      Otro con los diferentes medios de pago (Arreglo de Objetos / como esta en Mongo)
             *  y finalmente guardaremos el total de las ventas en total_amount y
             *  un arreglo de [ventas, metodo de pago] del Dia */
            let { sell_tickets, payment_method, channel } = req.body;
            let temp = 0;
            let totalSales = 0;
            let salesByPmntM = [[]];

            payment_method.forEach((eachM, index) => {
                temp = 0;
                sell_tickets.forEach(eachT => {
                    if (eachT.payment_method === eachM.name) {
                        temp = temp + eachT.amount_sold;
                    }
                });
                console.log(eachM.name, temp)
                salesByPmntM[index] = [eachM.name, temp];
                totalSales = totalSales + temp;
            });
            const data = await Sales.create({ total_amount: totalSales, amount_by_method: salesByPmntM, channel: channel })
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    // getDailySales = async (req, res) => {

    // }

    getTodaySales = async (req, res) => {
        try {
            const data = await SellTicket.find({ status: 1 })
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }

    }

};

module.exports = SalesController