const { Schema, model } = require('mongoose');

const stock_itemSchema = Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    channel: {
        type: String
    },
    status: {
        type: Number,
        default: 1,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }


}, { collection: 'stock_item' });

module.exports = model('stock_item', stock_itemSchema);

/* ++++++++++++++++++++++++++++++++++++++++++++++++++
Esta tabla pretende mantener los inventarios de cada producto (no preprarado)
en cada uno de las posibles ubicaciones o Channel

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */