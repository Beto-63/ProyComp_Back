const { Schema, model } = require('mongoose');

const comboSchema = Schema({
    product_id: {
        type: number
    },
    contents: {
        type: Array
    },
    status: {
        type: Number,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }
}, { collection: 'category' });

module.exports = model('Category', comboSchema);

/**++++++++++++++++++++++++++++++++++++++++++++
 * los combos si bien son un producto "vendible", son grupos de productos, 
 * por tanto tienen asociado un product_id que los identifica tanto en la 
 * coleccion de Products como en la coleccion de combos
 * Adicionalmente contienen un array y cede elemento del array, sera un array de:
 *      [ product_id, qty]
 * Adicionalmente tendran status
 * 
 * Cuanco se venda un combo y se vaya adescontar del inventario se debe recorrer
 * cada uno de los componentes del combo como si fueran productos corrientes   
 */