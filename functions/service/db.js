const mongoose = require('mongoose');
const functions = require('firebase-functions');
// Connect to MongoDB
exports.connectToDatabase = async () => {
    try {
      const mongourl  = functions.config().config.mongourl;
      await mongoose.connect(mongourl, {});
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
};