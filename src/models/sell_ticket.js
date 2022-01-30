const { Schema, model } = require('mongoose');

const sell_ticketSchema = Schema({
    client_id: {
        type: String
    },
    products_sold: {
        type: Array
        //este array contiene el _id del producto vendido, la cantidad vendida y el precio unitario del producto
    },
    amount_sold: {
        type: Number
    },
    channel_id: {
        type: String
    },
    payment_method: {
        type: String
    },
    user_id: {
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
- Productos vendidos es un arreglo con los 
    - [prucuct id, qty, monto en pesos del line item]
- Monto de la venta total
- date ******Debe capturar el dia y la hora******
- Channel id
- Payment Method
- User Id

Esta coleccion debe ser recorrida para hacer cierre de caja y generar estadisticas 

Quedan por definir como capturar date & Time en Mongo, 
Tambien debe definirse si finalmente se podran aplicar 
descuentos y con que criterio

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */