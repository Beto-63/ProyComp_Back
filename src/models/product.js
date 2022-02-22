const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        index: true,
        unique: true
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
    combo_name: {
        type: String
    },
    fill: {
        type: String,
        enum: { values: ['Té', 'Infusión'], message: '{VALUE} is not supported' }
    },
    temperature: {
        type: String,
        enum: { values: ['Caliente', 'Frío'], message: '{VALUE} is not supported' }

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
        default: 1,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }
}, { collection: 'product' });

module.exports = model('Product', productSchema);

/* ++++++++++++++++++++++++++++++++++++++++++++++++++
Los productos se caractarizan por:
name: debe ser unico
description:
price: incluido el precio del conjunto de articulos que se incluye en un combo
cat_name: te, infusion, accesorio, paquete, evento, combo. ===hay unos no incentaribels que creo sobran en el sistema=====
    temperature: solo aplica estas dos cat_name: Te o Infusion
    combo_name: solo aplica a cat_name: Combo
    fill: solo aplica a cat_name Paquetes y deb ser alguna de estas dos cat_name: Te o Infusion
img_url: a futuro carga de imagener (no se usa actualmente)
stock_name: producto a descontar del inventarios cuando se raliza una venta
stock_qty: cantidad del produsto a descontar por unidad vendida
status: 0-descontinuado 1- activo

Parece que esto no se requiere
++OJO++ Se incluyo un product_id para lograr la inclusion de 
las ventas por WIX. Las ventas por Wix van a ser contabilizadas 
como hechas por Arsenal, pues son despachadas desde alli.Adicionalmente 
afectan los inventariables de esa Ubicacion

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */