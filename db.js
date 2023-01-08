const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn =  mongoose.connect("mongodb+srv://doadmin:7cnwG3eXv18654W0@db-mongodb-nyc1-47942-00dc189f.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-47942", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;