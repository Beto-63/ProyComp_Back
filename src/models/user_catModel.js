const { Schema, model } = require('mongoose');

const user_catSchema = Schema({
    name: {
        type: String,
        enum: ['admin', 'clerk']
    },
    allowed_routes: [{
        url: {
            type: String
        },
        method: {
            type: String
        }
    }]
}, { timestamps: true,  /*collection: 'user_cat'*/ });

module.exports = model('User_Cat', user_catSchema, 'user_cat');