const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn =  mongoose.connect("mongodb+srv://rajankit17iitb:srijan123@cluster0.fwlljsl.mongodb.net/srijan", {
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