const { Schema, model } = require('mongoose');

const comboSchema = Schema({
    name: {
        type: String
    },
    product_id: {
        type: Number
    },
    contents: [{
        category_name: { type: String },
        quantity: { type: Number }
    }],
    price: {
        type: Number
    },
    status: {
        type: Number,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }
}, { collection: 'combo' });

module.exports = model('Combo', comboSchema);

/**++++++++++++++++++++++++++++++++++++++++++++
 * los combos si bien son un producto "vendible", son grupos de productos, 
 * por tanto tienen asociado un product_id que los identifica tanto en la 
 * coleccion de Products como en la coleccion de combos
 * Adicionalmente contienen un array de objetos:
 *      [ category_name, qty]
 * El te o la infusion que incluya sera definido en la venta y asi complementado 
 * se pondra en el sell ticket 
 * Adicionalmente tendran status
 * 
 * Cuanco se venda un combo y se vaya adescontar del inventario se debe recorrer
 * cada uno de los componentes del combo como si fueran productos corrientes   
 */