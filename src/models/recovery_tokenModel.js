const { Schema, model } = require('mongoose');

const recovery_tokenSchema = Schema({
    user_id: {
        //type: String
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    reset_token: {
        type: String,
        required: true,
    },
    verification_code: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // 10 minutos antes de expirar // this is the expiry time in seconds
    },
    /*secret_key: {
        type: String
    },*/
}, { /*timestamps: true,*/  collection: 'recoverytokens' });

module.exports = model('RecoveryToken', recovery_tokenSchema);