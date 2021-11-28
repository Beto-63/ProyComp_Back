const { Schema, model } = require('mongoose');

const userSchema = Schema({
    nick: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: "string"
    },
    user_cat: {
        type: String,
        enum: ['clerk', 'admin']
    },
}, { collection: 'user' });

module.exports = model('User', userSchema);