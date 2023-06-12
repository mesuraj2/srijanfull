const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.set('strictPopulate',false)
    const conn =  mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //console.log(`MongoDB Connected`);
  } catch (error) {
    //console.log(`Error: ${error.message}`);
    process.exit();
    
  }
};
module.exports = connectDB;