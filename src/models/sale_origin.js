const { Schema, model } = require('mongoose');

const saleOriginSchema = Schema({
    name: {
        type: String
    },
    status: {
        type: Number,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }
}, { collection: 'sale_origin' });

module.exports = model('Origin', saleOriginSchema);