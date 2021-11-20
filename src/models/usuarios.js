const {Schema, model} = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    }
}, {collection: 'usuarios'});

module.exports = model('Usuario', usuarioSchema);