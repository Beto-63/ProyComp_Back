//Importar dependencias
const jwt = require('jsonwebtoken');
//Importar Modulos
const User = require('../models/user');
const user_catModel = require('../models/user_catModel');


class UserController {

    getAllUsers = async (req, res) => {

        try {
            const users = await User.find();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ "Error Type": error.name, "Detalle": error.message });
        }

    }


    getUserById = async (req, res) => {

        try {

            const { id } = req.params;

            const user = await User.findById(id);

            // Si el id no se encuentra en DB y la consulta es vacia
            if (user == null) {
                return res.status(404).json({ message: 'Usuario no encontrada' });
            }

            return res.status(200).json(user);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    }

    getUserByEmail = async (req, res) => {
        try {
            const { email } = req.body;
            console.log(email)
            const user = await User.findOne({ email: email })
            // Si el corrreo no se encuentra en DB y la consulta es vacia
            if (user == null) {
                return res.status(404).json({ message: 'Usuario no encontrada' });
            }
            console.log(user)
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }


    createUser = async (req, res) => {

        try {

            //return res.status(200).json({ message: 'Register' });

            const { name, email, password, personal_email, phone_number, user_cat, channel } = req.body;

            // Validar si el usuario ya existe, antes de guardar
            const nameFound = await User.findOne({ name: name });
            if (nameFound) {
                return res.status(400).json({ message: 'Este nombre ya existe' });
            }
            const emailFound = await User.findOne({ email: email });
            if (emailFound) {
                return res.status(400).json({ message: 'El email ya existe' });
            }

            // encriptando la contraseña
            const encryptedPassword = await User.encryptPassword(password);

            const newUser = new User({
                name: name,
                email: email,
                password: encryptedPassword,
                personal_email: personal_email,
                phone_number: phone_number,
                user_cat: user_cat,
                channel: channel,
                status: 2  // este status es de creacion, requerira se defina un nuevo password por el Usuario
            });


            //TODO - Gestion / verificación de user_cat aquí
            if (user_cat != null) {

                //Validar si los user_cat dados en el formulario son validos o no

                // Buscar de todos los 'name' de la colección 'user_cat', 
                // si en uno de ellos '$in', existe el rol que me envió el usuario por req.body
                const foundRoles = await user_catModel.find({ name: { $in: user_cat } });
                //console.log('foundRoles: ',foundRoles);

                if (foundRoles != null && foundRoles != '') {

                    // Guardar arreglo de los roles encontrados, pero solo los id's
                    // map: quiero recorrer cada uno de los objetos
                    // y por cada objeto, solo quiero obtener el _id
                    //newUser.roles = foundRoles.map(role => role._id);
                    newUser.user_cat = foundRoles.map(role => role.name);
                    // Por ahora los user_cat seran sencillos asi queda para eventuales roles mixtos 
                } else {

                    // Se asigna el rol predeterminado 'user'
                    const role = await user_catModel.findOne({ name: "clerk" }); // findOne devuelve un solo objeto
                    //newUser.roles = [role._id]; // [ ] array con el id del rol 'user'
                    newUser.user_cat = [role.name];

                }

            } else { // Si el usuario no ingresó ningún rol

                // Se asigna el rol predeterminado 'clerk'
                const role = await user_catModel.findOne({ name: "clerk" }); // findOne devuelve un solo objeto

                //newUser.roles = [role._id]; // [ ] array con el id del rol 'user'
                newUser.user_cat = [role.name];

            };

            const savedUser = await newUser.save();


            return res.status(201).json({ message: 'Usuario creado correctamente', savedUser });

        } catch (error) {
            return res.status(401).json({ message: 'Error al hacer register', error });
        }

    }


    updateUser = async (req, res) => {
        //no se como funciona este id creo que el que va en la ruta
        try {

            const { id } = req.params;

            const { name, email, password, user_cat, channel, status } = req.body;

            // Se valida si existe un suario con este id
            const response = await User.findById(id);
            if (response == null) {
                return res.status(400).json({ message: 'Usuario no encontrado para editar' });
            }

            // encriptando la contraseña
            if (password != '' && password != null) {
                var encryptedPassword = await User.encryptPassword(password);
            }
            // TODO aqui me falta crear un objeto con la info no variada y la info variada antes de hacer la actualizacion
            const updatedUser = await User.findByIdAndUpdate(id, {
                name: name,
                email: email,
                password: encryptedPassword,
            }, { new: true });


            //TODO - Gestion / verificación de user_cat aquí
            if (user_cat != null) {
                //console.log('llego hasta aqui')

                //Validar si los user_cat dados en el formulario son validos o no

                // Buscar de todos los 'name' de la colección 'user_cat', 
                // si en uno de ellos '$in', existe el rol que me envió el usuario por req.body
                const foundRoles = await user_catModel.find({ name: { $in: user_cat } });
                //console.log('foundRoles: ',foundRoles);

                if (foundRoles != null && foundRoles != '') {

                    // Guardar arreglo de los roles encontrados, pero solo los id's
                    // map: quiero recorrer cada uno de los objetos
                    // y por cada objeto, solo quiero obtener el _id
                    //newUser.roles = foundRoles.map(role => role._id);

                    //updatedUser.user_cat = foundRoles.map(role => role.name);
                    //console.log(updatedUser.user_cat)

                    const user_cat = foundRoles.map(role => role.name);

                    await User.findByIdAndUpdate(id, {
                        user_cat: user_cat
                    }, { new: true });

                } else {

                    // Se asigna el rol predeterminado 'clerk'
                    const role = await user_catModel.findOne({ name: "clerk" }); // findOne devuelve un solo objeto
                    //newUser.roles = [role._id]; // [ ] array con el id del rol 'user'
                    const user_cat = [role.name];
                    //console.log(updatedUser.user_cat)

                    await User.findByIdAndUpdate(id, {
                        user_cat: user_cat
                    }, { new: true });

                }

            } else { // Si el usuario no ingresó ningún rol

                // Se asigna el rol predeterminado 'clerk'
                const role = await user_catModel.findOne({ name: "clerk" }); // findOne devuelve un solo objeto

                //newUser.roles = [role._id]; // [ ] array con el id del rol 'user'
                const user_cat = [role.name];

                await User.findByIdAndUpdate(id, {
                    user_cat: user_cat
                }, { new: true });

            };

            // Si el id no se encuentra en DB y la consulta es vacia
            if (updatedUser == null) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }


            return res.status(201).json({ message: 'Usuario actualizado correctamente' /*, updatedUser*/ });

        } catch (error) {
            return res.status(401).json({ message: 'Error al hacer updateUser', error });
        }

    }


    deleteUser = async (req, res) => {

    }

    getAllUserCats = async (req, res) => {
        try {
            const data = await user_catModel.find();
            return res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
        }
    }
}

module.exports = UserController;