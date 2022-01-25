/**
 * Funciones requeridas:
 *  1. createExpense                                    Funcionando
 *  2. getUnAccountedExpenses                           Funcionando
 *  3. setExpensesAsAccounted                           Funcionando
 *  4. createDeposit                                    Funcionando
 *  5. getUnAccountedDeposits                           Funcionando
 *  6. setDepositsAsAccounted                           Funcionando
 *  7. getOpenTransaction
 *  8. markLastOpenAsAccounted

 *  5. getLastUnaccountedClose /si si existe (staus:1) --> Abra recupere  _id, operation, cahsonHand(-1), Amount to deposit(-1)
 *  6. setLastCloseAsAccounted / con el id de el anterior
 *  7. Create Open transaction
    
    

 */

//Importar Modulos
const ExpenseItem = require('../models/expense');
const DepositItem = require('../models/deposit');
//const ToDeposit = require('../models/to_deposit');
const LastOperation = require('../models/last_cash_operation');

const SellTicket = require('../models/sell_ticket');





class CashController {

    createExpense = async (req, res) => {
        try {
            //let{ expense_amount, description, channel, expense_type } = req.body;
            const data = await ExpenseItem.create(req.body);
            res.status(201).json({ Info: 'Se creo el gasto' })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    getUnAccountedExpenses = async (req, res) => {
        try {
            const data = await ExpenseItem.find({ status: 1 });
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }


    setExpenseAsAccounted = async (req, res) => {
        try {
            let { id } = req.body
            const data = await ExpenseItem.findByIdAndUpdate({ _id: id, status: 1 }, { status: 0 });
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }



    createDeposit = async (req, res) => {
        try {
            //let{ amount, channel } = req.body;
            const data = await DepositItem.create(req.body);
            res.status(201).json({ Info: 'Se creo la consignacion' })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    getUnAccountedDeposits = async (req, res) => {
        try {
            const data = await DepositItem.find({ status: 1 });
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    setDepositsAsAccounted = async (req, res) => {
        try {
            let { id } = req.body
            const data = await DepositItem.findOneAndUpdate({ _id: id, status: 1 }, { status: 0 });
            res.status(201).json({ Info: "Estado cambiado" })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }

    // TODO getOpenTransaction

    // TODO markLastOpenAsAccounted


    // Para el proceso de apertura
    // TODO getLastUnaccountedClose /si si existe (staus:1) --> Abra recupere  _id, operation, cahsonHand(-1), Amount to deposit(-1)
    // TODO setLastCloseAsAccounted / con el id de el anterior
    // TODO Create Open transaction
    /**
     *      operation : 'open',
     *      cash_on_hand : cashon hand (-1)
     *      change_amount : lo que defina el cajero (input)
     *      amount_to_deposit : amoun to deposit anterior - change amount actual
     *      channel : provendra del token, pero 'Arsenal' por ahora
     *      status: 1 por default
     *      
     *  */



    // TODO getCloseTransaction

    // TODO markLastCloseAsAccounted

    // TODO 
    // TODO 


    getDepositsByDate = async (req, res) => {
        try {
            let { fechaInicial, fechaFinal } = req.body;
            const data = await DepositItem.find({
                "$and": [{
                    "createdAt": {
                        "$gte": fechaInicial,
                        "$lte": fechaFinal
                    }
                }]
            })
            res.status(201).json({ resultado: data })
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message })
        }
    }
}
module.exports = CashController;