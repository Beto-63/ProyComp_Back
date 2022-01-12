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
    },
    date: {
        type: Date
    },

}, { timestamps: true, collection: 'expense' });

module.exports = model('Expense', expenseSchema);