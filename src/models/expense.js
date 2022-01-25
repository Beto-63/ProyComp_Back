const { Schema, model } = require('mongoose');

const expenseSchema = Schema({
    expense_amount: {
        type: Number
    },
    channel: {
        type: String
    },
    description: {
        type: String
    },
    expense_type: {
        type: String
    },
    status: {
        type: Number,
        default: 1,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    },

}, { timestamps: true, collection: 'expense' });

module.exports = model('Expense', expenseSchema);

/**Esta coleccion registrara los gastos menores que se hagan  
 * en cada ubicacion (con status 1 por default)
 * Al momento de hacer cierre y tomados se cuenta de cambia 
 * el status a 0 (Por "contabilizar" 1 // ya "contabilizado")
 * */