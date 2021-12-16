const { Schema, model } = require('mongoose');

const channelSchema = Schema({
    name: {
        type: String
    }
}, { collection: 'channel' });

module.exports = model('Channel', channelSchema);



/* ++++++++++++++++++++++++++++++++++++++++++++++++++
EL Channel es el canal de venta.
Actualmente hay dos canales de venta:
- Arsenal 
- Wix
- Bodega

En su primera puesta en producccion la aplicacion solo 
servira para atender la tienda de Casa Arsenal, pero en una 
posterior version debe incluir las ventas por internet que 
Wix Genera

Ya estan poblados en la base de datos de proyecto

+++++++++++++++++++++++++++++++++++++++++++++++++++++ */