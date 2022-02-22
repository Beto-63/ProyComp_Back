const { Schema, model } = require('mongoose');

const adjustmentSchema = Schema({
    name: {
        type: String
    },
    difference: {
        type: Number
    },
    reason: {
        type: String
    },
    channel: {
        type: String
    },
    cat_name: {
        type: String
    },
    user_email: {
        type: String
    },



}, { timestamp: true, collection: 'adjustment' });

module.exports = model('adjustment', adjustmentSchema);