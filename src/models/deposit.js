const { Schema, model } = require('mongoose');

const depositSchema = Schema({


    amount: {
        type: Number
    },
    cahnnel: {
        type: String
    },
    bank: {
        type: String
    }

}, { timestamps: true, collection: 'deposit' });

module.exports = model('Deposit', depositSchema);