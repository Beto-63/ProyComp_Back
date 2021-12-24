const user_catModel = require('../models/user_catModel');

const createRoles = async function createRoles() {

    const count = await user_catModel.estimatedDocumentCount();
    //console.log(count);

    if(count > 0){
        return // Ya no sigue ejecutando el código de abajo
    }else{

        try {
            
            // Creacion de roles por defecto
            // Promise.all ejecuta las 3 ordenes a la vez, para mayor rendimiento
            const values = await Promise.all([

                new user_catModel(
                    {
                        "name": "admin",
                        "allowed_routes": [
                            {"url": "/test", "method": "GET"}
                        ]
                    }
                ).save(),

                new user_catModel(
                    {
                        "name": "clerk",
                        "allowed_routes": [
                            {"url": "/test", "method": "GET"}
                        ]
                    }
                ).save(),

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