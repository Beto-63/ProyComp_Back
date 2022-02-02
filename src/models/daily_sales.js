const { Schema, model } = require('mongoose');

const dailySalesSchema = Schema({
    total_amount: {
        type: Number
    },
    amount_by_method: {
        type: Array
        //este array contiene las ventas dicriminadas por medio de pago asi [medio_de_pago, cantidad]
    }

}, { timestamps: true, collection: 'sell_ticket' });

module.exports = model('DaylySales', dailySalesSchema);