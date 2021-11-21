const { Schema, model } = require('mongoose');

const channelSchema = Schema({
    name: {
        type: String
    }
}, { collection: 'channel' });

module.exports = model('Channel', channelSchema);