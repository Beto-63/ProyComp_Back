const { Schema, model } = require('mongoose');

const clientSchema = Schema({
    email: {
        type: String
    },
    gender: {
        type: String
    },
    age_group: {
        type: String,
        enum: ['0-11', '12-19', '20-29', '30-40', '41-60', '61-80', '81-100']
    }
}, { collection: 'client' });

module.exports = model('Client', clientSchema);


/* ++++++++++++++++++++++++++++++++++++++++++++++++++
La tipificacion del cliente es un elemento de informacion 
que se quiere tener, por ahora se guardara edad y genero, 
opcionalmente puede ingresar el correo electronico

Esta informacion no requiere de una precarga para las pruebas
de funcionalidad del proyecto
+++++++++++++++++++++++++++++++++++++++++++++++++++++ */