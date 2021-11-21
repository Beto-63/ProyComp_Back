const { Schema, model } = require('mongoose');

const userSchema = Schema({
    nick: {
        type: String
    },
    email: {
        type: String
    },
    user_cat: {
        type: String
    },
}, { collection: 'user' });

module.exports = model('User', userSchema);