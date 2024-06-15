const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO DB CONNECTED : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
