const jwt = require('jsonwebtoken');
//Importar Modulos
const userModel = require('../models/user');
//const user_catModel = require('../models/user_catModel');
const session_tokenModel = require('../models/session_tokenModel');

const { random_secret_key } = require('../libs/jwt_secret_random_key');

// Recuperación de contraseña
const { sendRecoveryEmail } = require('../utils/sendEmail');
const crypto = require("crypto");
//const bcrypt = require("bcrypt");
const recovery_tokenModel = require('../models/recovery_tokenModel');

const validate_mongodb_format_id = require('../libs/validate_mongodb_formatid');
const { recovery_verification_code } = require('../libs/recovery_verification_code');


class AuthController {

    // Register
    /*signUp = async (req, res) => {

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
    

    }*/

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


    // Enviar correo con contraseña temporal, para ser cambiada después
    generateNewTempPassword = async (req, res) => {

        /*
        https://dev.to/jahangeer/how-to-implement-password-reset-via-email-in-node-js-132m
        */

        /* Link preferido:
        https://blog.logrocket.com/implementing-a-secure-password-reset-in-node-js/
        */

        try {

            //const { id } = req.params;
            const { user_id } = req.body;
            //console.log(req.body);


            // Validar si el user_id, es una cadena válida con formato _id de MongoDB
            const isvalididformat = validate_mongodb_format_id(user_id); // libs
            if (!isvalididformat) {
                return res.status(400).json({ msg: "Este formato de id no es valido" });
            }

            // Validar si el id de usuario existe
            const user = await userModel.findOne({_id: user_id});

            if(!user){
                return res.status(400).json({ message: 'El id de usuario no existe' });
            }

            // Como el usuario existe y el admin solicitó restablecer contraseña,
            // cambiar el status de ese usuario a: 2
            await userModel.findByIdAndUpdate(user._id, {
                status: 2
            }, {new: true});

            // Buscar si el usuario antes había generado un link
            let recovery_tokenFound = await recovery_tokenModel.findOne({ user_id: user._id });
            //if (token) await recovery_tokenModel.deleteOne();

            // Se eliminan las solicitudes anteriores
            if(recovery_tokenFound){
                const removedPreviewSessions = await recovery_tokenModel.deleteMany({ user_id: user._id});
                console.log(removedPreviewSessions);
            }
            
            // Se genera el código de verificación para el cambio de contraseña
            const codigoGenerado = recovery_verification_code();


            // Se genera un nuevo token para el link
            let resetToken = crypto.randomBytes(32).toString("hex");
            //const hashedToken = await bcrypt.hash(resetToken, 10);

            await new recovery_tokenModel({
                user_id: user._id,
                reset_token: resetToken,
                verification_code: codigoGenerado,
                createdAt: Date.now(),
            }).save();

            let link = `${process.env.BASE_URL}/recovery/${resetToken}/${user._id}`;

            let email = user.email;
            let subject = 'Restablecimiento de contraseña sistema Doko';
            let content = `
            
            <html>
                <head>
                    <style>
                    </style>
                </head>
                <body>
                    <p>Hola `+user.nick+`,</p>
                    <p>Ha solicitado resetear su contraseña.</p>

                    <p>Por favor, dar click en el siguiente link para restablecer su contraseña</p>
                    <a href="http://`+link+`">Restablecer Contraseña</a>

                    <p>Luego ingrese el siguiente código de verificación:</p>
                    <p>`+codigoGenerado+`</p>

                </body>
            </html>

            `;

            // Aquí se envia el correo (Comentada para evitar hacer SPAM)
            //sendRecoveryEmail(email, subject, content);

            return res.status(200).json({ message: 'Envio del link para reset del password', link });

        } catch (error) {
            return res.status(401).json({message: 'Error al hacer generateNewTempPassword', error});
        }

    }

    // Solicitud get para validar link y mostrar formulario
    passwordResetRequest = async (req, res) => { // Metodo GET

        // Se recibe el link con el token para validar si el link es válido
        // y saber si puedo mostrar el formulario o no. (Posiblemente redireccionar al Login en el frontend)

        //console.log(req.params);
        const { 
            token,
            userId
        } = req.params;

        // Se valida si el link existe en las solicitudes de recuperación de contraseña
        const found = await recovery_tokenModel.findOne({ reset_token: token, user_id: userId });
        //console.log(found);

        // Se valida si el link es válido o no
        if(!found){
            return res.status(400).json({ message: 'Link invalido' });
        }else{
            return res.status(200).json({ message: 'El link es válido / mostrar el formulario para restablecer contraseña' });
        }

    }

    // Recibir los datos para el cambio de contraseña
    passwordReset = async (req, res) => { // Metodo POST

        //console.log(req.params);
        const params = req.params;

        const {
            token,
            userId
        } = req.params;

        //console.log(req.body);
        const body = req.body;

        const { 
            codigoVerificacion,
            password1,
            password2
        } = req.body;

        // Se valida si el link existe en las solicitudes de recuperación de contraseña
        const found = await recovery_tokenModel.findOne({ verification_code: codigoVerificacion });

        // Se valida si el código de verificación es válido o no
        if(!found){
            return res.status(400).json({ message: 'Código de verificación incorrecto' });
        }


        if (password1 != password2) {
            return res.status(400).json({ message: 'Las contraseñas no coinciden' });
        }

        return res.status(200).json({ params, body });

    }

}

module.exports = AuthController;