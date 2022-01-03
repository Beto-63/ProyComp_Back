const { Schema, model } = require('mongoose');

const depositSchema = Schema({


    amount: {
        type: Number
    },
    cahnnel: {
        type: String
    },
    Concept: {
        type: String
    },
    date: {
        type: Date
    }

}, { timestamps: true, collection: 'deposit' });

module.exports = model('Deposit', depositSchema);