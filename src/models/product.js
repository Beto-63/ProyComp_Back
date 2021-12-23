const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    cat_name: {
        type: String
    },
    temperature: {
        type: String,
        enum: ['caliente', 'frio']
    },
    img_url: {
        type: String
    },
    stock_name: {
        type: String
    },
    stock_qty: {
        type: Number
    },
    status: {
        type: Number,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }
}, { collection: 'product' });

module.exports = model('Product', productSchema);

/* ++++++++++++++++++++++++++++++++++++++++++++++++++
Las categorias de producto sirven para seleccionar dentro del
Catalogo de productos
Actualmente se considera deben ser:
Caliente
Frio
Paquete
Accesorio
Combo
Ya quedan creadas en Mongo para el  proyecto (no para produccion)  

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */