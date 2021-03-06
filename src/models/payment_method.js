const { Schema, model } = require('mongoose');

const payment_methodSchema = Schema({
    name: {
        type: String
    },
    status: {
        type: Number,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }
}, { collection: 'payment_method' });

module.exports = model('Payment_method', payment_methodSchema);


/* ++++++++++++++++++++++++++++++++++++++++++++++++++
El negocio recibe 
- Cash 
- Debit y 
- Credit
Cada transaccion debe especificar el medio de pago

La base de datos ya esta cargada con esa informacion para
el proyecto

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */