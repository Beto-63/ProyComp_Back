// Sirve para saber si el usuario si nos está mandando su token
// Verificar si el usuario tiene un token y saber que rol tiene

const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const user_catModel = require('../models/user_catModel');

const session_tokenModel = require('../models/session_tokenModel');

// Verificar si estoy enviando un token
const verifyToken = async (req, res, next) => { // Es una funcion intermedia

    try {


        //console.log(req.headers)

        //const token = req.headers["x-access-token"];
        const authorization = req.headers["authorization"];
        //console.log(authorization)

        //Crear variable que me representa el token
        let token = null;
        //Obtener cabecera de la petición
        if (authorization != null && authorization != undefined) {
            let arrayAuth = authorization.split(" ");
            //console.log(arrayAuth[1])
            token = arrayAuth[1];
            //console.log(token);
        }

        //console.log('token '+token)

        if(!token){ // Sino existe el token
            return res.status(403).json({message: 'No token provided'});
        }


        // Se valida si existe el token en la colección 'sessiontokens'
        const tokenFound = await session_tokenModel.findOne({token: token});
        //console.log('Token Found ',tokenFound);
        
        /*if(!tokenFound){ // Sino se encuentra el token en la colección 'sessiontokens'
            return res.status(401).json({message: 'Unauthorized / Este token no existe en la colección: sessiontokens'});
        }*/

        // Se decodifica el token usando el secret
        //const decodedToken = jwt.verify(token, config.SECRET);
        const decodedToken = jwt.verify(token, tokenFound.secret_key);
        //console.log(decodedToken);

        /*if(decodedToken){
            //return res.status(400).json({message: 'Este token no se pudo decodificar'});
        }*/

        // Busqueda por id para saber si el usuario del token existe
        const user = await userModel.findById(decodedToken.id, {password: 0}); // No deseo ver el password
        //console.log(user);

        if(!user){ // Si el usuario no existe
            return res.status(404).json({message: 'No user found'});
        }else{// Si el usuario existe, se buscan los roles

            //console.log('token valido y el usuario existe');

            //console.log('MYmethod:',req.method, '- MYoriginalUrl:',req.originalUrl)
            //console.log(req)

            var originalUrl = req.originalUrl;
            //console.log(originalUrl);


            // TODO - Inicio split ruta --*/




            // TODO - Fin split ruta --*/


            // De todos los roles buscar el que esté incluido en userModel.roles
            //const roles = await roleModel.find({_id: {$in: user.roles}}); // user.roles: El usuario que fué encontrado en la consulta anterior
            const userRoles = await user_catModel.find({name: {$in: user.user_cat}});
            //console.log(userRoles)

            if (userRoles == '' || userRoles == null) {
                return res.status(401).json({message: "No tiene rol asignado en el sistema"});
            }

            for (let i = 0; i < userRoles.length; i++) { // Roles del usuario encontrado

                if(userRoles[i].allowed_routes != '' &&  userRoles[i].allowed_routes != null){ // Si el rol tiene rutas permitidas
                //console.log(userRoles[i].allowed_routes);

                    const objAllowedRoutes = userRoles[i].allowed_routes;
                    //console.log(objAllowedRoutes);

                    for (let j = 0; j < objAllowedRoutes.length; j++) { // Rutas permitidas según los roles que tenga el usuario
                        
                        console.log('Comparación de rutas: ',originalUrl, objAllowedRoutes[j].url, req.method, objAllowedRoutes[j].method);

                        // Cuando la ruta es permitida, permite acceder al contenido
                        if( originalUrl === objAllowedRoutes[j].url && req.method === objAllowedRoutes[j].method  ){ 
                            console.log('Ruta permitida: ',originalUrl, objAllowedRoutes[j].url);
                            next(); // Continua el código
                            return; // No continua el código / se encontró el rol requerido, respuesta true
                        }

                    }

                }

            }

            // No se encontró la ruta / retorna una respuesta false
            return res.status(401).json({message: "No tiene acceso a esta ruta"});

        }


    } catch (error) {
        return res.status(401).json({message: 'Unauthorized', error});
    }

}

module.exports = {
    verifyToken,
    //
}