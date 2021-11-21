const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String
    }
}, { collection: 'category' });

module.exports = model('Category', categorySchema);