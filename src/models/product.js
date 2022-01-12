const { Schema, model } = require('mongoose');

const productSchema = Schema({
    product_id: {
        type: String,
        index: true,
        unique: true
    },
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
++OJO++ Se incluyo un product_id para lograr la inclusion de 
las ventas por WIX. Las ventas por Wix van a ser contabilizadas 
como hechas por Arsenal, pues son despachadas desde alli.Adicionalmente 
afectan los inventariables de esa Ubicacion
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