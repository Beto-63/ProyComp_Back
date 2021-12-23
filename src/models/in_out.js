const { Schema, model } = require('mongoose');

const inAndOutSchema = Schema({

    date: {
        type: Date
    },
    amount: {
        type: Number
    },
    concept: {
        type: String
    },
    cahnnel: {
        type: String
    }

}, { collection: 'in_out_cash' });

module.exports = model('InOutCash', InAndOutSchema);