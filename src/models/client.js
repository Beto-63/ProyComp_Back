const { Schema, model } = require('mongoose');

const clientSchema = Schema({
    email: {
        type: String
    },
    gender: {
        type: String
    },
    age_group: {
        type: String
    }
}, { collection: 'client' });

module.exports = model('Client', clientSchema);