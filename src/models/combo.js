const { Schema, model } = require('mongoose');

const comboSchema = Schema({
    name: {
        type: String
    },

    products: [{
        name: { type: String },
        quantity: { type: Number }
    }],
}, { collection: 'combo' });

module.exports = model('Combo', comboSchema);

/**++++++++++++++++++++++++++++++++++++++++++++
 * La coleccion combos sirve a productos para hacer la lssta de los elementos
 * que se empaqueta como combo. La coleccion Product tiene el precio del conjunto
 * asi como el estado. Aqui solo residiran las mezclas de productos que existan 
 * en product. 
 * La funcionalidad de creacion de combos se haceprimero, aparte de la de productos
 * en productos se crea el Producto-combo y se le asocia el nombre del combo en la
 * coleccion combo 
 * 
 * En el sell ticket aparecera el precio del combo, pero los items del combo
 *(en el precio del item habra que definir que poner en el sell ticket, pues 
 * no cuadraria la multiplicacion de los items por su precio individual con los
 * de la venta debido al descuento ) 
 *  
 * Cuanco se venda un combo y se vaya adescontar del inventario se debe recorrer
 * cada uno de los componentes del combo como si fueran productos corrientes   
 */