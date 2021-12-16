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
    }

}, { collection: 'ingredient_stock' });

module.exports = model('Ingredient_stock', ingredient_stockSchema);

/* ++++++++++++++++++++++++++++++++++++++++++++++++++
Esta tabla pretende mantener los 

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */