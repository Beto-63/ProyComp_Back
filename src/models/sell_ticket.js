const { Schema, model } = require('mongoose');

const sell_ticketSchema = Schema({
    client_id: {
        type: String
    },
    products_sold: {
        type: Array
    },
    amount_sold: {
        type: Number
    },
    date: {
        type: Date
    },
    channel_id: {
        type: String
    },
    payment_method_id: {
        type: String
    },
    user_id: {
        type: String
    }
}, { collection: 'sell_ticket' });

module.exports = model('Sell_ticket', sell_ticketSchema);