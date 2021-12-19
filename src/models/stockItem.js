const { Schema, model } = require('mongoose');

const ingredient_stockSchema = Schema({
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


}, { collection: 'ingredient_stock' });

module.exports = model('Ingredient_stock', ingredient_stockSchema);

/* ++++++++++++++++++++++++++++++++++++++++++++++++++
Esta tabla pretende mantener los inventarios de cada producto (no preprarado)
en cada uno de las posibles ubicaciones o Channel

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */