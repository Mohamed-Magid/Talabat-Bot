const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.DB_CONNECTION_STRING;
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};
module.exports = connectDB;