const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String
    },
    status: {
        type: Number,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }
}, { collection: 'category' });

module.exports = model('Category', categorySchema);

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