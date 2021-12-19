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
    cat_id: {
        type: String
    },
    img_url: {
        type: String
    },
    stock_id: {
        type: String
    },
    stock_qty: {
        type: Number
    },
    status: {
        type: Number,
        enum: [0, 1]
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