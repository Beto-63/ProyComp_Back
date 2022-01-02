/**Revisar la concepcion de esto para manejar el estado de la caja
 * incluyendo los campos de reumen del dia
 * Sirve para consultas diarias por ubicacion
 */

const { Schema, model } = require('mongoose');

const cashOpsSchema = Schema({
    base_amount: {
        type: Number
    },
    channel: {
        type: String
    },
    amount_to_deposit: {
        type: Number
    },
    operation: {
        type: String,
        enum: { values: ['open', 'close'], message: '{VALUE} is not supported' }
    },
    status: {
        type: String,
        enum: { values: ['open', 'close'], message: '{VALUE} is not supported' }
    }
}, { timestamps: true, collection: 'cash_ops' });

module.exports = model('CashOps', cashOpsSchema);

/**
 * Esta estructuda de datos no esta terminada y no creo que sea definitiva
 *  */ 