/**
 * Funciones requeridas:
 * 1. Apertura de caja                          definir amount to deposit      openRegister
 * 2. Cierre de caja
 * 3. registro de consignaciones                Probar acumulado     createDeposit
 * 4. registro de gastos menores                Probado     createExpense
 * 5. Reporte de gastos entre fechas            Probado     getExpensesByDate
 * 6  Reporte de consignaciones entre fechas    Probado     getDepositsByDate
 * Generar validacion al momneto de entrar gastos o consignaciones

 */

//Importar Modulos
const ExpenseItem = require('../models/expense');
const DepositItem = require('../models/deposit');
const CashOperation = require('../models/cash_operation');
const SellTicket = require('../models/sell_ticket');




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

    //Quitar los console log son de prueba para la expresion de las horas respecto de las 
    // guardadas en la BD
    getExpensesByDate = async (req, res) => {
        //Recupera los gastos entre dos fecha/hora
        try {
            let { fechaInicial, fechaFinal } = req.body;
            const data = await ExpenseItem.find({
                "$and": [{
                    "createdAt": {
                        "$gte": fechaInicial,
                        "$lte": fechaFinal
                    }
                }]
            })
            console.log(data[0].createdAt.toString())
            console.log(data[0].createdAt)
            res.status(201).json({ resultado: data })
        } catch (error) {
            res.status(500).json({ Info: error })
        }

    }


    getAllExpenses = async (req, res) => {      //not needed
        try {
            const data = await ExpenseItem.find();
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ info: error });
        }

    }

    createDeposit = async (req, res) => {
        try {
            //let{ amount, channel, bank, date } = req.body;

            const data = await DepositItem.create(req.body);
            res.status(201).json({ Info: 'Se creo la consignacion' })
        } catch (error) {
            res.status(500).json({ info: error });
        }
    }

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
            res.status(500).json({ Info: error })
        }
    }

    openRegister = async (req, res) => {
        try {
            let data = {};
            let open = {};
            /**El amount to deposit debe se tomado del cierre del dia anterior
             */
            let { base_amount, channel } = req.body;

            data = { base_amount: base_amount, channel: channel, amount_to_deposit: amount_to_deposit, operation: 'open' }
            open = await CashOperation.create(data);
            res.status(201).json(open)
        } catch (error) {
            res.status(500).json({ info: error });
        }
    }

    closeRegister = async (req, res) => {
        // 
        /**
         * debe recibir solo el monto de efectivo en caja y calcular:
         * - las ventas del dia en efectivo, desla la hora de la apertura hasta la hora del cierre
         * - Monto por consignar en la apertura
         * - Las consignaciones desde la la hora de la apertura hasta la hora del cierre
         * - Gastos menores desde la Hora de la apertura hasta la hora del cierre
         * -calcular y guardar el monto de efectivo a depositar al cierre:
         *      ventas en efectivo + monto por consignar en la apertura - consignaciones del dia
         *      - gestos menores del dia
         * Calcular las ventas por cada medio de pago (efectivo, debit/credit, wix)
         */
    }
};

module.exports = CashController;