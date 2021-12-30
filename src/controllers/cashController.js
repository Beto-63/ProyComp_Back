/**
 * Funciones requeridas:
 * 1. Apertura de caja                          In Progress openRegister
 * 2. Cierre de caja
 * 3. registro de consignaciones                Probado     createDeposit
 * 4. registro de gastos menores                Probado     createExpense
 * 5. Reporete de gastos entre fechas           In progress getAllExpenses
 * 6  Reporte de consignaciones entr fechas  
 * Generar validacion al momneto de entrar gastos o consignaciones

 */

//Importar Modulos
const ExpenseItem = require('../models/expense');
const DepositItem = require('../models/deposit');
const CashOperations = require('../models/cash_operation')


class CashController {

    createExpense = async (req, res) => {
        try {
            //let{ amount, concept, channel } = req.body;
            const data = await ExpenseItem.create(req.body);
            res.status(201).json({ Info: 'Se creo el gasto' })
        } catch (error) {
            res.status(500).json({ info: error });
        }
    }

    getAllExpenses = async (req, res) => {
        try {
            const data = await ExpenseItem.find();
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ info: error });
        }
    }

    createDeposit = async (req, res) => {
        try {
            //let{ amount, channel, bank } = req.body;
            const data = await DepositItem.create(req.body);
            res.status(201).json({ Info: 'Se creo la consignacion' })
        } catch (error) {
            res.status(500).json({ info: error });
        }
    }

    openRegister = async (req, res) => {
        try {
            let data = {};
            let open = {};
            /**este amount_to_deposit debe ser el amount to deposit del cierre anterior menos las consinaciones
             * hechas hasta el momneot de apertra
             */
            let { base_amount, channel, amount_to_deposit } = req.body;
            data = { base_amount: base_amount, channel: channel, amount_to_deposit: amount_to_deposit, operation: 'open' }
            open = await CashOperations.create(data);
            res.status(201).json(open)
        } catch (error) {
            res.status(500).json({ info: error });
        }
    }

    closeRegister = async (req, res) => {
        // try {
        //     //let{ amount, channel, bank } = req.body;
        //     const data = await DepositItem.create(req.body);
        //     res.status(201).json({ Info: 'Se creo la consignacion' })
        // } catch (error) {
        //     res.status(500).json({ info: error });
        // }
    }
};

module.exports = CashController;