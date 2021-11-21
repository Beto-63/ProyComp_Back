const { Schema, model } = require('mongoose');

const user_requestSchema = Schema({
    nick: {
        type: String
    },
    email: {
        type: String
    },
    user_cat: {
        type: String
    },
}, { collection: 'user_request' });

module.exports = model('User_request', user_requestSchema);