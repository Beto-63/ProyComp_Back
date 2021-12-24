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
    }
}, { timestamps: true, collection: 'cash_ops' });

module.exports = model('CashOps', cashOpsSchema);