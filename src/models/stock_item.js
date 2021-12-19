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
        enum: [0, 1]
    }


}, { collection: 'stock_item' });

module.exports = model('stock_item', stock_itemSchema);

/* ++++++++++++++++++++++++++++++++++++++++++++++++++
Esta tabla pretende mantener los inventarios de cada producto (no preprarado)
en cada uno de las posibles ubicaciones o Channel

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */