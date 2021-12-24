const { Schema, model } = require('mongoose');

const expenseSchema = Schema({


    amount: {
        type: Number
    },
    concept: {
        type: String
    },
    channel: {
        type: String
    }

}, { timestamps: true, collection: 'expense' });

module.exports = model('Expense', expenseSchema);