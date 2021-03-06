/**
 * Funciones requeridas:
 *  1. createExpense                                    Funcionando
 *  2. getUnAccountedExpenses                           Funcionando
 *  3. setExpensesAsAccounted                           Funcionando
 *  4. createDeposit                                    Funcionando
 *  5. getUnAccountedDeposits                           Funcionando
 *  6. setDepositsAsAccounted                           Funcionando
 *  7. getLastOpenTransaction                           Funcionando
 *  8 .setLastOpenAsAccounted                           Funcionando
 *  9. setTransaction (puede ser open or close)         Funcionando
 * 10. getLastCloseTransaction                          Funcionando
 * 11. setLastCloseAsAccounted                          Funcionando
 * 13. getAllUnaccoutedSellTicks                        Funcionando
 * 14. setSellTicketAs Accounted                        Funcionando
 */

//Importar Modelos
const ExpenseItem = require('../models/expense');
const DepositItem = require('../models/deposit');
const LastOperation = require('../models/last_operation');
const SellTicket = require('../models/sell_ticket');

class CashController {

    createExpense = async (req, res) => {
        //Crea los reportes de gastos menores con status:1 por default de la base de datos
        try {
            //let{ expense_amount, description, channel, expense_type } = req.body;
            const data = await ExpenseItem.create(req.body);
            res.status(201).json({ Info: 'Se creo el gasto' })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    getUnAccountedExpenses = async (req, res) => {
        //Retorna la lista de gastos no contados en un cierre de caja cuando se especifica el Channel
        try {
            const { channel } = req.body
            const data = await ExpenseItem.find({ channel: channel, status: 1 });
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    setExpenseAsAccounted = async (req, res) => {
        //Los gastos que se cuentan en un cierre se dan por contados status:0
        try {
            let { id } = req.body
            const data = await ExpenseItem.findByIdAndUpdate({ _id: id }, { status: 0 });
            res.status(201).json({ info: 'El gasto se tuvo en cuenta ya en un cierre' })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    createDeposit = async (req, res) => {
        //Crea los reportes de consignacion con status:1 por default de la base de datos
        try {
            //let{ amount, channel } = req.body;
            const data = await DepositItem.create(req.body);
            res.status(201).json({ Info: 'Se creo la consignacion' })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    getUnAccountedDeposits = async (req, res) => {
        //Retorna la lista de consignaciones no contados en un cierre de caja
        try {
            const { channel } = req.body
            const data = await DepositItem.find({ channel: channel, status: 1 });
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    setDepositsAsAccounted = async (req, res) => {
        //Las consignaciones que se cuentan en un cierre se dan por contadas status:0
        try {
            let { id } = req.body
            const data = await DepositItem.findByIdAndUpdate({ _id: id }, { status: 0 });
            res.status(201).json({ Info: 'La consignaci??n se tuvo en cuenta ya en un cierre' })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    getLastOpenTransactionByChannel = async (req, res) => {
        //Retorna, si esta vigente(status:1) , la ultima transaccion de apertura
        //Tiene que existir para proceder con un cierre 
        try {
            const { channel } = req.body
            const data = await LastOperation.find({ operation: 'open', status: 1, channel: channel });
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    setLastOpenAsAccounted = async (req, res) => {
        //Al proceder a registrar un cierre se requiere des habilitar el registro de la ultima Apertura 
        try {
            let { id } = req.body
            const data = await LastOperation.findByIdAndUpdate({ _id: id }, { status: 0 });
            res.status(201).json({ Info: "La ultima apertura se ha tenido en cuenta" })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    setTransaction = async (req, res) => {
        //Registra las apertura y cierres con status:1 por default.
        //Si llega con close ser?? para el cierre, si llega con open ser?? para la apertura
        //let {operation, amount_to_deposit, cash_on_hand, change_amount, channel} = req.body;
        try {
            const data = await LastOperation.create(req.body);
            res.status(201).json({ Info: `${data.operation} exitoso` })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    getLastCloseTransactionByChannel = async (req, res) => {
        //Retorna, si esta vigente(status:1) , la ultima transaccion de cierre
        //Tiene que existir para proceder con una apertura
        try {
            const { channel } = req.body
            const data = await LastOperation.find({ operation: 'close', status: 1, channel: channel });
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    setLastCloseAsAccounted = async (req, res) => {
        //Al proceder a registrar una apertura se requiere des habilitar el registro del ultimo Cierre 
        try {
            let { id } = req.body
            const data = await LastOperation.findByIdAndUpdate({ _id: id }, { status: 0 });
            res.status(201).json({ Info: "El ultimo cierre se ha tenido en cuenta" })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    getUnAccoutedSellTickets = async (req, res) => {
        //Retorna la lista tickets de venta No contados en un cierre de caja es decir con status:1
        try {
            const data = await SellTicket.find({ status: 1 });
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    setSellTicketAsAccounted = async (req, res) => {
        //Los tickets de venta que se cuentan en un cierre se dan por contados status:0
        try {
            let { id } = req.body
            const data = await SellTicket.findByIdAndUpdate({ _id: id }, { status: 0 });
            res.status(201).json({ Info: 'Las ventas se han tenido en cuenta en el cierre' })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

}

module.exports = CashController;