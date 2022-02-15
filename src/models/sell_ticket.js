const { Schema, model } = require('mongoose');

const sell_ticketSchema = Schema({

    products_sold: [{
        name: { type: String },
        quantiry: { type: Number },
        price: { type: Number }
    }],
    amount_sold: {
        type: Number
    },
    channel: {
        type: String
    },
    payment_method: {
        type: String
    },
    user_name: {
        type: String
    },
    sale_origin: {
        type: String
    },
    status: {
        type: Number,
        default: 1,
        enum: { values: [0, 1], message: '{VALUE} is not supported' }
    }
}, { timestamps: true, collection: 'sell_ticket' });

module.exports = model('Sell_ticket', sell_ticketSchema);

/* ++++++++++++++++++++++++++++++++++++++++++++++++++
Tal vez es la coleccion mas compleja
Debe tener: 
- Id del cliente en la base de datos para ligar 
la venta con las caracterisitidas demograficas del cliente
Productos
- Productos vendidos es un arreglo de Objetos 
    - [{prucuct name, qty, precio del item individual}]
- Monto de la venta total
- Channel name
- Payment Method
- User_name
- date ******Debe capturar el dia y la hora (tmestamp)******

Esta coleccion debe ser recorrida para hacer cierre de caja y generar estadisticas 

Quedan por definir como capturar date & Time en Mongo, 
Tambien debe definirse si finalmente se podran aplicar 
descuentos y con que criterio

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */