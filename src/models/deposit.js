const { Schema, model } = require('mongoose');

const bankDepositSchema = Schema({


    amount: {
        type: Number
    },
    channel: {
        type: String
    },
    status: {
        type: Number,
        default: 1,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }


}, { timestamps: true, collection: 'deposit' });

module.exports = model('Deposit', bankDepositSchema);

/**Esta coleccion registrara las consignaciones que se hagan a 
 * cuenta en cada ubicacion (con status 1 por default)
 * Al momento de hacer cierre y tomados se cuenta de cambia 
 * el status a 0 (Por "contabilizar" 1 // ya "contabilizado")
 * */