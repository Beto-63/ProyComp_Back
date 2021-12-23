const { Schema, model } = require('mongoose');

const depositSchema = Schema({

    date: {
        type: Date
    },
    amount: {
        type: Number
    },
    cahnnel: {
        type: String
    },
    bank: {
        type: String
    }

}, { collection: 'deposit' });

module.exports = model('Deposit', depositSchema);