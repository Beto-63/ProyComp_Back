const { Schema, model } = require('mongoose');

const payment_methodSchema = Schema({
    name: {
        type: String
    }
}, { collection: 'payment_method' });

module.exports = model('Payment_method', payment_methodSchema);