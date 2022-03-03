const user_catModel = require('../models/user_catModel');

const createRoles = async function createRoles() {

    const count = await user_catModel.estimatedDocumentCount();
    //console.log(count);

    if (count > 0) {
        return // Ya no sigue ejecutando el código de abajo
    } else {

        try {

            // Creacion de roles por defecto
            // Promise.all ejecuta las 3 ordenes a la vez, para mayor rendimiento
            const values = await Promise.all([

                new user_catModel(
                    {
                        "name": "admin",
                        "allowed_routes": [
                            { "url": "/verify", "method": "GET" },
                            //{ "url": "/test", "method": "GET" }
                            { "url": "/stock/channels", "method": "GET" },
                            { "url": "/user/cats", "method": "GET" },
                            { "url": "/user/byEmail", "method": "POST" },
                            { "url": "/users", "method": "PUT" },
                            { "url": "/users", "method": "POST" },
                            { "url": "/product/categories", "method": "GET" },
                            { "url": "/stock/addQty", "method": "PUT" },
                            { "url": "/stock/findByCatName", "method": "POST" },
                            { "url": "/stock/adjust", "method": "PUT" },
                            { "url": "/stock/findByCatNameChannel", "method": "POST" },
                            { "url": "/stock/findByNameChannel", "method": "POST" },
                            { "url": "/stock/adjust/quantity", "method": "PUT" },
                            { "url": "/stock/adjust/reason", "method": "POST" },
                            { "url": "/stock", "method": "POST" },
                            { "url": "/stock/transfer", "method": "PUT" },
                            { "url": "/stock/findByName", "method": "POST" },
                            { "url": "/product/combo", "method": "GET" },
                            { "url": "/product/findByCatName", "method": "POST" },
                            { "url": "/product/info", "method": "POST" },
                            { "url": "/product", "method": "PUT" },
                            { "url": "/product/selectCat", "method": "POST" },
                            { "url": "/product/selectPacketAndFill", "method": "POST" },
                            { "url": "/product/combo", "method": "POST" },
                            { "url": "/product", "method": "POST" },
                        ]
                    }
                ).save(),

                new user_catModel(
                    {
                        "name": "clerk",
                        "allowed_routes": [
                            { "url": "/verify", "method": "GET" },
                            // {"url": "/test", "method": "GET"},
                            { "url": "/origins", "method": "GET" },
                            { "url": "/paymentMethods", "method": "GET" },
                            { "url": "/product/categories", "method": "GET" },
                            { "url": "/client", "method": "POST" },
                            { "url": "/product/findByCatName", "method": "POST" },
                            { "url": "/product/selectCatTemp", "method": "POST" },
                            { "url": "/sell_ticket", "method": "POST" },
                            { "url": "/cash/deposit", "method": "POST" },
                            { "url": "/stock/findByChannel", "method": "POST" },
                            { "url": "/stock/findByChannel`", "method": "PUT" },
                            { "url": "/cash/last/transaction", "method": "POST" },
                            { "url": "/sales/byMethod", "method": "POST" },
                            { "url": "/cash/expense/account", "method": "POST" },
                            { "url": "/cash/deposit/account", "method": "POST" },
                            { "url": "/cash/sellTicket/account", "method": "POST" },
                            { "url": "/cash/lastOpen/account", "method": "POST" },
                            { "url": "/cash/expense", "method": "POST" },
                            { "url": "/cash/lastClose/account", "method": "POST" },
                            { "url": "/cash/sellTickets/unaccounted", "method": "GET" },
                            { "url": "/cash/expense/unaccounted", "method": "POST" },
                            { "url": "/cash/deposit/unaccounted", "method": "POST" },


                        ]
                    }
                ).save(),

                /*new user_catModel(
                    {
                        "categoria_de_ruta": "productos ", 
                        "rutas": [
                            {"url": "/test", "method": "GET"}
                        ]
                    }
                ).save(),*/

            ]);

            console.log(values);

        } catch (error) {
            console.error(error);
        }

    }

}

module.exports = {
    createRoles,
    //
}