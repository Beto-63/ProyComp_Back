const mongoose = require('mongoose');
const { db } = require('./db');

class ConnDb {
    constructor() {
        this.connection();
    }

    async connection() {
        this.conn = await mongoose.connect(db);
    }
}

module.exports = ConnDb;