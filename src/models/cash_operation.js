const { Schema, model } = require('mongoose');

const cashOpsSchema = Schema({

    date: {
        type: Date
    },
    base_amount: {
        type: Number
    },
    cahnnel: {
        type: String
    },
    amount_to_deposit: {
        type: Number
    },
    operation: {
        type: String,
        enum: { values: ['open', 'close'], message: '{VALUE} is not supported' }
    }
}, { collection: 'cash_ops' });

module.exports = model('CashOps', cashOpsSchema);