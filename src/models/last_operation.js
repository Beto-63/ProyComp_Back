const { Schema, model } = require('mongoose');

const last_operationSchema = Schema({


    operation: {
        type: String,
        enum: { values: ['open', 'close'], message: '{VALUE} is not supported' }
    },
    amount_to_deposit: {
        type: Number
    },
    cash_on_hand: {
        type: Number
    },
    change_amount: {
        type: Number
    },
    cahnnel: {
        type: String
    },
    user_email: {
        type: String
    },
    status: {
        type: Number,
        defualt: 1,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    },


}, { timestamps: true, collection: 'last_cash_operation' });

module.exports = model('LastOperation', last_operationSchema);

/**
 * Aqui se registra la apertura y cierre de cada dia.
 * Al hacer una apertura:
 *      Se toman los datos de cierre de Cash on hand, y to-deposit del cierre anterior y
 *      Se da status de 0 al ultimo cierre
 *      (SI HAY UN REGISTRO ANTERIOR DE APERTURA status=1 UNO NO PERMITO 
 *      UNA NUEVA APERTURA)
 *      registro la nueva apertura y los dato de base y to_deposit con 
 *      operatio=open para cada canel
 * 
 * Al hacer un cierre:
 *      Se toman los datos de cash_on_hand al momento de cierre
 *      este se compara con:
 *            la Base de apertura ultima  
 *          + el monto to_deposit de la ultima apertura
 *          + Ventas en efectivo Suma de sell tickets en status 1
 *          - deposit con status 1
 *          - expenses con status 1
 *      Estos dos valores de cash_on_hand y el calculo deben coincidir!
 * 
 * Por "contabilizar" 1 // ya "contabilizado"
 * 
 *  
 */