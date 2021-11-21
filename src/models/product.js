const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    cat_id: {
        type: String
    },
    img_url: {
        type: String
    },
    ingredient_id: {
        type: String
    },
    ingredient_qty: {
        type: Number
    }
}, { collection: 'product' });

module.exports = model('Product', productSchema);