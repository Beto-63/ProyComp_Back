const jwt = require('jsonwebtoken');
//Importar Modulos
const userModel = require('../models/user');
const user_catModel = require('../models/user_catModel');
const session_tokenModel = require('../models/session_tokenModel');

const { random_secret_key } = require('../libs/jwt_secret_random_key');

class AuthController {

    // Register
    signUp = async (req, res) => {

        try {

            //return res.status(200).json({ message: 'Register' });
    
            const {nick, email, password, user_cat} = req.body;

            // Validar si el usuario ya existe, antes de guardar
            const nickFound = await userModel.findOne({nick: nick});
            if(nickFound){
                return res.status(400).json({message: 'Este nick ya existe'});
            }
            const emailFound = await userModel.findOne({email: email});
            if(emailFound){
                return res.status(400).json({message: 'El email ya existe'});
            }

            // encriptando la contraseña
            const encryptedPassword = await userModel.encryptPassword(password);

            const newUser = new userModel({
                nick: nick,
                email: email,
                password: encryptedPassword
            });

            //TODO - Gestion / verificación de user_cat aquí
            if(user_cat != null){

                //Validar si los user_cat dados en el formulario son validos o no

                // Buscar de todos los 'name' de la colección 'user_cat', 
                // si en uno de ellos '$in', existe el rol que me envió el usuario por req.body
                const foundRoles = await user_catModel.find({name: {$in: user_cat}});
                //console.log('foundRoles: ',foundRoles);
        
                if(foundRoles != null && foundRoles != ''){
        
                    // Guardar arreglo de los roles encontrados, pero solo los id's
                    // map: quiero recorrer cada uno de los objetos
                    // y por cada objeto, solo quiero obtener el _id
                    //newUser.roles = foundRoles.map(role => role._id);
                    newUser.user_cat = foundRoles.map(role => role.name);
        
                }else{
        
                    // Se asigna el rol predeterminado 'user'
                    const role = await user_catModel.findOne({name: "clerk"}); // findOne devuelve un solo objeto
                    //newUser.roles = [role._id]; // [ ] array con el id del rol 'user'
                    newUser.user_cat = [role.name];

                }

            }else{ // Si el usuario no ingresó ningún rol
        
                // Se asigna el rol predeterminado 'clerk'
                const role = await user_catModel.findOne({name: "clerk"}); // findOne devuelve un solo objeto

                //newUser.roles = [role._id]; // [ ] array con el id del rol 'user'
                newUser.user_cat = [role.name];

            };


            const savedUser = await newUser.save();

            const random_password = random_secret_key();
            //console.log(random_password);

            const token = jwt.sign({id: savedUser._id}, random_password, {
                expiresIn: 86400 // 24 horas
            });

            // Se guarda la nueva sesión
            const newSession = new session_tokenModel({
                user_id: savedUser._id,
                token: token,
                secret_key: random_password
            });
        
            await newSession.save();

            return res.status(201).json({token});

        } catch (error) {
            return res.status(401).json({message: 'Error al hacer register', error});
        }
    

    }

    // Login
    signIn = async (req, res) => {
        //return res.status(200).json({ message: 'Login' });

        try {
            
            //const userFound = await userModel.findOne({email: req.body.email}).populate("roles"); // Recorre los roles y ve lo que hay dentro 'poblarlos'
            const userFound = await userModel.findOne({email: req.body.email}) /*.populate("roles")*/;
            //console.log(userFound);

            if (!userFound) { // Sino se encuentra el usuario
                return res.status(400).json({message: 'Usuario no encontrado'});
            }

            const matchPassword = await userModel.comparePassword(req.body.password, userFound.password)
            
            if (!matchPassword) { // Sino coinciden las contraseñas
                return res.status(400).json({token: null, message: 'Invalid password'});
            }


            // Validar si existe una sesion anterior registrada en la colección 'sessiontokens'

            // Si si, eliminar todas las sesiones existentes según el id del usuario
            const removedPreviewSessions = await session_tokenModel.deleteMany({ user_id: userFound._id});
            //console.log(removedPreviewSessions);
            //return res.status(201).json({ removedPreviewSessions, message: ''});


            const random_password = random_secret_key();
            //console.log(random_password);


            // Generar el token
            /*const token = jwt.sign({id: userFound._id}, config.SECRET, {
                expiresIn: 86400
            });*/
            const token = jwt.sign({id: userFound._id}, random_password, {
                expiresIn: 86400
            });
            //console.log(token);

            const newSession = new session_tokenModel({
                user_id: userFound._id,
                token: token,
                secret_key: random_password
            });

            await newSession.save();


            return res.status(201).json({token});

        } catch (error) {
            return res.status(401).json({message: 'Error al hacer login', error});
        }

    }

    // Logout
    signOut = async (req, res) => {
        //return res.status(200).json({ message: 'Logout' });

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
                return res.status(403).json({message: 'No token provided (logout)'});
            }


            /*gfhjgfjhgjhgfjfghkf*/

            const tokenFound = await session_tokenModel.findOne({token: token});
            //console.log('Token Found ',tokenFound);

            // Se decodifica el token usando el secret
            //const decodedToken = jwt.verify(token, config.SECRET);
            const decodedToken = jwt.verify(token, tokenFound.secret_key);
            //console.log(decodedToken);

            if(decodedToken){
                const removedPreviewSessions = await session_tokenModel.deleteMany({ user_id: decodedToken.id});
                console.log(removedPreviewSessions);
                return res.status(200).json({ message: 'Ha salido correctamente del sistema', removedPreviewSessions });
                //return res.status(200).json({ message: 'Ha salido correctamente del sistema'});
            }

            
        } catch (error) {
            return res.status(401).json({message: 'Error al hacer logout / token invalido', error});
        }

    }

}

module.exports = AuthController;