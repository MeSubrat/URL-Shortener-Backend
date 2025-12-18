const mongoose = require('mongoose');
const mongoDbURI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(mongoDbURI)
        console.log('MongoDb connected! ', conn.connection.host);
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
}

module.exports = connectDb;