const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = Schema({
    nick: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    user_cat: [{
        type: String,
        enum: { values: ['admin', 'clerk'], message: '{VALUE} is not supported' }
    }],
    status: {
        type: Number,
        default: 0,
        enum: { values: [0, 1, 2], message: '{VALUE} is not supported' } // 0: deshabilitado, 1: activo, 2: restablecer contraseña
    }
}, { timestamps: true,  collection: 'user' });

// Se ejecuta antes de guardar el dato en la base de datos
/*userSchema.pre("save", async function (next) {
    const user = this; // Hace referencia al objeto userSchema

    console.log('Se ejecutó el pre de modificar password');

    if (!user.isModified("password")) {
        return next(); // Si el usuario no está modificado en su campo password, no ejecute el 'pre'
    }

    const salt = await bcrypt.genSalt(10); // String generado para cifrar la contraseña
    const hash = await bcrypt.hash(user.password, salt); // El hash es el dato cifrado
    user.password = hash; // Se guarda la contraseña cifrada

    next(); // Para que continue con el resto de código

});*/

// Cifrar contraseña al crear el usuario   // Contraseña ingresada por el usuario al crear la cuenta
userSchema.statics.encryptPassword = async (password) => {

    const salt = await bcrypt.genSalt(10); // String generado para cifrar la contraseña
    const hash = await bcrypt.hash(password, salt); // El hash es el dato cifrado
    return hash; // Se guarda la contraseña cifrada
};

// Comparar contraseñas                    // contraseña guardada, contraseña nueva
userSchema.statics.comparePassword = async (password, receivedPassword) => {  // Se recibe la contraseña que nos pasa el usuario

    // Se compara la contraseña pasada por el usuario 'paswword', con la actual almacenada en BD 'this.password'
    return await bcrypt.compare(password, receivedPassword); // Si coinciden devuelve true, sino false
};

module.exports = model('User', userSchema);